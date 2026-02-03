import { GeminiService } from '../services/geminiService';
import { INTERESTS } from '../data/interests';

/**
 * Curation Agent
 * 
 * Represents the interface to the LangGraph-powered backend agent.
 * Handles content retrieval demand and freshness checks.
 */

export const CurationAgent = {
    /**
     * Ask the Agent for content on a specific topic.
     * Uses the Live Platform Agent (Gemini) with a local fallback.
     */
    ask: async (topicId) => {
        const interest = INTERESTS.find(i => i.id === topicId);
        const title = interest ? interest.title : topicId;

        try {
            if (GeminiService.isAvailable()) {
                console.log(`CurationAgent: Requesting live curation for ${title}...`);
                const curatedData = await GeminiService.curateFullInterestPackage(topicId, title);
                console.log(`CurationAgent: Successfully received live data for ${title}`);

                // Add "Trust Badge" metadata
                return {
                    ...curatedData,
                    _source: 'LIVE_AGENT',
                    _trustScore: 98
                };
            } else {
                console.warn("CurationAgent: GeminiService reports API NOT available (Missing Key).");
            }
        } catch (error) {
            console.error("CurationAgent: Live curation failed. Falling back to knowledge graph.", error);
        }

        // Fallback: This would normally hit a local DB or the mock graph
        // To keep it simple for this story, we'll return a structured "offline" version
        return {
            knowledge: { title: `All about ${title}`, summary: "Learn the basics of this amazing field.", funFact: "Information coming soon!", source: "Offline Repository" },
            events: null,
            mentors: null,
            experiments: null,
            verificationLog: [{ step: "Fallback", status: "Warning", details: "Using local cached data" }],
            _source: 'MOCK_AGENT',
            _trustScore: 70
        };
    },

    /**
     * Check if the content is still valid according to Agent policies.
     */
    validate: (content) => {
        return content.trustScore > 90;
    }
};
