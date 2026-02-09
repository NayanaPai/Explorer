import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBeBvCJo_7FhDyOnr6j01uctooHnGBXdFc";

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
     * @param {object} userHistory ~
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
            console.log("GeminiService: Attempting recommendations with gemini-3-flash-preview...");
            return await runPrompt("gemini-3-flash-preview");
        } catch (error) {
            console.warn("GeminiService: gemini-3-flash-preview failed, trying gemini-3-pro-preview...", error.message);
            try {
                return await runPrompt("gemini-3-pro-preview");
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
            console.log(`GeminiService: Curating ${title} with gemini-3-flash-preview...`);
            const data = await runCuration("gemini-3-flash-preview");
            return {
                ...data,
                lastUpdated: new Date().toISOString().split('T')[0],
                sourceType: "Live Agent (Flash 3)",
                interestId
            };
        } catch (error) {
            console.warn(`GeminiService: Flash 3 failed for ${title}, trying gemini-3-pro-preview...`, error.message);
            try {
                const data = await runCuration("gemini-3-pro-preview");
                return {
                    ...data,
                    lastUpdated: new Date().toISOString().split('T')[0],
                    sourceType: "Live Agent (Pro 3 Fallback)",
                    interestId
                };
            } catch (fallbackError) {
                console.error("GeminiService: All models failed for curation.", fallbackError.message);
                throw fallbackError;
            }
        }
    },

    /**
     * Generates 3 mini-articles (TLDRs) for a specific subtopic
     */
    generateMiniArticles: async (topic, subtopic) => {
        if (!GeminiService.isAvailable()) {
            throw new Error("API_KEY_MISSING");
        }

        const prompt = `
        You are an expert educator for middle school students.
        Create 3 "TLDR" style micro-learning cards about the subtopic "${subtopic}" within the field of "${topic}".
        
        Format the output as a JSON array of objects with this structure:
        [
            {
                "id": 1,
                "title": "Catchy Title",
                "summary": "Two sentence easy-to-understand summary.",
                "funFact": "A surprising fact related to this."
            }
        ]

        Make the content engaging, factual, and safe.
        RETURN ONLY THE JSON ARRAY. NO MARKDOWN BLOCK.
        `;

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Clean markdown if present
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanText);
        } catch (error) {
            console.error("GeminiService: Article generation failed", error);
            throw error;
        }
    },

    /**
     * Find events for a topic
     */
    findEvents: async (topic, subtopic) => {
        if (!GeminiService.isAvailable()) {
            throw new Error("API_KEY_MISSING");
        }

        const prompt = `
        Find 2 real or realistic upcoming educational events, webinars, or challenges for a middle school student interested in "${subtopic}" (${topic}).
        Sources can be NASA, Smithsonian, National Geographic, DevPost, Eventbrite, or major Museums.
        
        Return JSON array:
        [
            {
                "title": "Event Title",
                "startTime": "YYYY-MM-DDTHH:MM:00Z" (Must be future date within next 30 days),
                "endTime": "YYYY-MM-DDTHH:MM:00Z",
                "location": "Online or City, Country",
                "eligibility": "Age range or 'Open to all'",
                "source": "Source Name",
                "link": "https://...",
                "description": "Brief description."
            }
        ]
        RETURN ONLY JSON.
        `;

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const events = JSON.parse(cleanText);

            // Post-process to ensure IDs and InterestID match
            return events.map(e => ({
                ...e,
                id: 'gen_' + Math.random().toString(36).substr(2, 9),
                interestId: topic, // We match the parent topic ID roughly
                subtopic: subtopic
            }));

        } catch (error) {
            console.error("GeminiService: Event finding failed", error);
            throw error;
        }
    },

    /**
     * Expand taxonomy with new subtopics
     */
    expandTaxonomy: async (interestId, currentSubtopics) => {
        if (!GeminiService.isAvailable()) {
            throw new Error("API_KEY_MISSING");
        }

        const prompt = `
        You are an expert curriculum designer.
        Generate 10 NEW, unique, and exciting subtopics for the interest area "${interestId}" that are NOT in this list: ${JSON.stringify(currentSubtopics)}.
        Focus on "deep cuts" or advanced/fun niche topics suitable for curious middle schoolers.
        
        Return JSON array of strings:
        ["Topic 1", "Topic 2", ...]
        `;

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanText);
        } catch (error) {
            console.error("GeminiService: Taxonomy expansion failed", error);
            throw error;
        }
    }
};
