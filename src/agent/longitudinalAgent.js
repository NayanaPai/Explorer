import { GeminiService } from '../services/geminiService';

/**
 * Longitudinal Learning Agent
 * 
 * Analyzes user history to provide "Nudge", "Deepen", and "Connect" recommendations.
 * Uses Live Gemini API if available, otherwise falls back to local simulation.
 */

export const LongitudinalAgent = {
    /**
     * Generate the "Next Best Steps" based on history.
     * @param {object} history (from userHistory.js)
     * @returns {Promise<Array>}
     */
    analyzePath: async (history) => {
        // 1. Try Live Reasoning provided by Gemini 3.0 Pro
        try {
            if (GeminiService.isAvailable()) {
                console.log("LongitudinalAgent: Requesting Live Reasoning from Gemini...");
                const liveRecs = await GeminiService.generateRecommendations(history);
                // Tag them as Live
                return liveRecs.map(r => ({ ...r, _source: 'LIVE (Gemini)' }));
            } else {
                console.warn("LongitudinalAgent: GeminiService reports API NOT available (Check .env).");
            }
        } catch (error) {
            console.error("LongitudinalAgent: Live API Call Failed. Details:", error);
            console.error("LongitudinalAgent: Error Name:", error.name);
            console.error("LongitudinalAgent: Error Message:", error.message);
        }

        // 2. Fallback: Local Rule-Based Logic (The "Mock" Agent)
        const recommendations = [];

        // RETENTION LOOP (The "Nudge")
        const incomplete = history.incompleteActivities[0];
        if (incomplete) {
            recommendations.push({
                type: 'RESUME',
                title: incomplete.title,
                subtitle: `You're ${incomplete.progress * 100}% there!`,
                reasoning: "Gemini noticed you started this 2 days ago. Finishing small projects builds confidence.",
                priority: 'High',
                action: 'Continue',
                _source: 'MOCK (Simulation)'
            });
        }

        // GROWTH LOOP (The "Challenge")
        const deepInterest = Object.entries(history.engagement).find(([k, v]) => v > 60);
        if (deepInterest) {
            const [interest, minutes] = deepInterest;
            recommendations.push({
                type: 'CHALLENGE',
                title: `${interest.charAt(0).toUpperCase() + interest.slice(1)} Fair Project`,
                subtitle: "Level 2: Expert Mode",
                reasoning: `You've spent ${Math.floor(minutes / 60)} hours on ${interest}. You're ready to move from 'Consumer' to 'Creator'.`,
                priority: 'Medium',
                action: 'Start Challenge',
                _source: 'MOCK (Simulation)'
            });
        }

        // SYNTHESIS LOOP (The "Connection")
        const interests = history.selectedInterestIds;
        if (interests.includes('art') && (interests.includes('space') || interests.includes('science'))) {
            recommendations.push({
                type: 'SYNTHESIS',
                title: "Paint a Nebula",
                subtitle: "Art + Space Fusion",
                reasoning: "Gemini sees you love both Creativity and Space. True innovation happens at the intersection of fields!",
                priority: 'Low',
                action: 'Try Fusion',
                _source: 'MOCK (Simulation)'
            });
        }

        // Simulate network delay for the "thinking" effect if strictly local
        if (!GeminiService.isAvailable()) {
            await new Promise(r => setTimeout(r, 800));
        }

        return recommendations;
    }
};
