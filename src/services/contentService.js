import { AI_CURATED_CONTENT, getContentForInterest } from '../data/aiCuratedContent';

/**
 * ContentService
 * Simulates the 'Delivery API' of the Content Microservice.
 * 
 * Responsibilities:
 * - Fetch validated content
 * - Enforce safety checks (simulated)
 * - Track freshness
 */

export const ContentService = {
    /**
     * Fetch knowledge for a specific category.
     * @param {string} interestId 
     * @returns {object} curated data
     */
    getKnowledge: async (interestId) => {
        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 300));

        const content = getContentForInterest(interestId);

        // Simulate "Validation Check" middleware
        if (content.trustScore < 85) {
            console.warn(`Content for ${interestId} has low trust score.`);
        }

        return content;
    },

    /**
     * Check if content needs refresh (Story Requirement: 90 days)
     * @param {string} lastUpdatedDate 
     */
    isFresh: (lastUpdatedDate) => {
        const updated = new Date(lastUpdatedDate);
        const now = new Date();
        const diffDays = Math.ceil(Math.abs(now - updated) / (1000 * 60 * 60 * 24));
        return diffDays < 90;
    }
};
