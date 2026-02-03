import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the API only if key exists
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

if (!API_KEY) {
    console.warn("GeminiService: VITE_GEMINI_API_KEY is missing or empty.");
} else {
    // Log masked key for debugging
    const masked = API_KEY.substring(0, 4) + "****" + API_KEY.substring(API_KEY.length - 4);
    console.log(`GeminiService: API Key found (${masked}). Service initialized.`);
    if (!API_KEY.startsWith("AIza")) {
        console.warn("GeminiService: API Key format looks unusual. Standard keys usually start with 'AIza'.");
    }
}

export const GeminiService = {
    isAvailable: () => !!genAI,

    /**
     * Generate Longitudinal Recommendations
     * @param {object} userHistory 
     * @returns {Promise<Array>} List of recommendations
     */
    generateRecommendations: async (userHistory) => {
        if (!genAI) {
            console.warn("GeminiService: No API Key. Falling back to Mock.");
            throw new Error("API_KEY_MISSING");
        }

        const runPrompt = async (modelName) => {
            const model = genAI.getGenerativeModel({ model: modelName });
            const prompt = `
                You are an expert Educational Coach AI. 
                Analyze this student's learning history JSON and recommend 3 specific "Next Steps" to foster longitudinal engagement.
                HISTORY: ${JSON.stringify(userHistory)}
                RULES:
                1. Create exactly 3 recommendations: One "RESUME", one "CHALLENGE", one "SYNTHESIS".
                2. Return ONLY valid JSON: [{"type": "...", "title": "...", "subtitle": "...", "reasoning": "...", "action": "..."}]
            `;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        };

        try {
            console.log("GeminiService: Attempting recommendations with gemini-1.5-flash...");
            return await runPrompt("gemini-1.5-flash");
        } catch (error) {
            console.warn("GeminiService: gemini-1.5-flash failed, trying gemini-pro...", error.message);
            try {
                return await runPrompt("gemini-pro");
            } catch (fallbackError) {
                console.error("GeminiService: All models failed.", fallbackError.message);
                throw fallbackError;
            }
        }
    },

    /**
     * Curate Multi-Category Content (Platform Agent logic)
     * Gather, verify, and structure knowledge from vetted sites.
     */
    curateFullInterestPackage: async (interestId, title) => {
        if (!genAI) {
            throw new Error("API_KEY_MISSING");
        }

        const runCuration = async (modelName) => {
            const model = genAI.getGenerativeModel({ model: modelName });
            const prompt = `
                Research the topic "${title}" and curate 4 actionable cards for a learner (Age 8-12).
                VETTED SOURCES (Only use these or similar trusted educational sites): NASA Kids Club, National Geographic Kids, Smithsonian Learning Lab, PBS Kids.
                CATEGORIES: KNOWLEDGE, EVENTS, MENTORS, EXPERIMENTS.
                Return ONLY valid JSON:
                {
                  "knowledge": { "title": "...", "summary": "...", "funFact": "...", "source": "..." },
                  "events": { "title": "...", "summary": "...", "date": "...", "link": "...", "source": "..." },
                  "mentors": { "title": "...", "bio": "...", "expertise": "...", "source": "..." },
                  "experiments": { "title": "...", "steps": ["...", "..."], "safetyNote": "...", "source": "..." },
                  "verificationLog": [
                    { "step": "Sourcing", "status": "Pass", "details": "Verified via [Source name]" }
                  ]
                }
            `;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        };

        try {
            console.log(`GeminiService: Curating ${title} with gemini-1.5-flash...`);
            const data = await runCuration("gemini-1.5-flash");
            return {
                ...data,
                lastUpdated: new Date().toISOString().split('T')[0],
                sourceType: "Live Agent (Flash)",
                interestId
            };
        } catch (error) {
            console.warn(`GeminiService: Flash failed for ${title}, trying gemini-pro...`, error.message);
            try {
                const data = await runCuration("gemini-pro");
                return {
                    ...data,
                    lastUpdated: new Date().toISOString().split('T')[0],
                    sourceType: "Live Agent (Pro Fallback)",
                    interestId
                };
            } catch (fallbackError) {
                console.error("GeminiService: All models failed for curation.", fallbackError.message);
                throw fallbackError;
            }
        }
    }
};
