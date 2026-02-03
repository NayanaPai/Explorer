import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the API only if key exists
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

if (!API_KEY) {
    console.warn("GeminiService: VITE_GEMINI_API_KEY is missing or empty.");
} else {
    console.log("GeminiService: API Key found. Service initialized.");
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
            console.warn("Gemini API Key missing. Falling back to simulation.");
            throw new Error("API_KEY_MISSING");
        }

        try {
            console.log("GeminiService: Generating recommendations...");
            // Try 1.5 Flash first (Available & Fast)
            let model;
            try {
                model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            } catch (e) {
                console.warn("GeminiService: 1.5 Flash failed, trying gemini-pro...");
                model = genAI.getGenerativeModel({ model: "gemini-pro" });
            }

            const prompt = `
            You are an expert Educational Coach AI. 
            Analyze this student's learning history JSON and recommend 3 specific "Next Steps" to foster longitudinal engagement.
            
            HISTORY: ${JSON.stringify(userHistory)}
            
            RULES:
            1. Create exactly 3 recommendations:
               - One "RESUME" type (to finish incomplete work).
               - One "CHALLENGE" type (to deepen a high-engagement topic).
               - One "SYNTHESIS" type (connecting two different interests).
            2. For each, provide a "reasoning" string explaining WHY you chose this based on the data.
            3. Return ONLY valid JSON in this format:
            [
              {
                "type": "RESUME",
                "title": "...",
                "subtitle": "...",
                "reasoning": "...",
                "action": "Continue"
              },
              ...
            ]
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Clean markdown code blocks if present
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);

        } catch (error) {
            console.error("Gemini API Error (Recommendations):", error);
            // If both failed, rethrow
            throw error;
        }
    },

    /**
     * Curate Multi-Category Content (Platform Agent logic)
     * Gather, verify, and structure knowledge from vetted sites.
     */
    curateFullInterestPackage: async (interestId, title) => {
        if (!genAI) {
            console.warn("Gemini API Key missing. Falling back to simulation.");
            throw new Error("API_KEY_MISSING");
        }

        try {
            console.log(`GeminiService: Curating content for ${title}...`);

            // Try 1.5 Flash first
            let model;
            try {
                model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            } catch (e) {
                model = genAI.getGenerativeModel({ model: "gemini-pro" });
            }

            const prompt = `
            You are a "Platform Sourcing Agent" for a Children's Interest Discovery Platform.
            
            OBJECTIVE:
            Research the topic "${title}" (ID: ${interestId}) and curate 4 actionable cards for a learner (Age 8-12).
            
            VETTED SOURCES (Only use these or similar trusted educational sites):
            - NASA Kids Club
            - National Geographic Kids
            - Smithsonian Learning Lab
            - PBS Kids / PBS LearningMedia
            - BBC Bitesize
            - Science News for Students
            
            REQUIREMENTS:
            1. Categorize content into: KNOWLEDGE, EVENTS, MENTORS, EXPERIMENTS.
            2. Language: Use "Grade 5" readability level. Simplify complex terms.
            3. Safety: Ensure all experiments are safe for home with adult supervision.
            
            STRUCTURE:
            Return exactly one JSON object with these keys:
            {
              "knowledge": { "title": "...", "summary": "...", "funFact": "...", "source": "..." },
              "events": { "title": "...", "summary": "...", "date": "...", "link": "...", "source": "..." },
              "mentors": { "title": "...", "bio": "...", "expertise": "...", "source": "..." },
              "experiments": { "title": "...", "steps": ["...", "..."], "safetyNote": "...", "source": "..." },
              "verificationLog": [
                { "step": "Sourcing", "status": "Pass", "details": "Verified via [Source name]" },
                ...
              ]
            }
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const curatedData = JSON.parse(jsonStr);

            // Add metadata
            return {
                ...curatedData,
                lastUpdated: new Date().toISOString().split('T')[0],
                sourceType: "Live Platform Agent (Gemini)",
                interestId
            };

        } catch (error) {
            console.error("Gemini Curation Error:", error);
            // Check for 404/not found specifically and maybe try one last gasp?
            if (error.message.includes('not found')) {
                console.error("Critical Model 404: The requested Gemini models are not enabled for this API Key.");
            }
            throw error;
        }
    }
};
