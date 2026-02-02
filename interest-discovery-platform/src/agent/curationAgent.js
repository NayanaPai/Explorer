import { AI_KNOWLEDGE_GRAPH } from './knowledgeGraph';

/**
 * Curation Agent
 * 
 * Represents the interface to the LangGraph-powered backend agent.
 * Handles content retrieval demand and freshness checks.
 */

export const CurationAgent = {
    /**
     * Ask the Agent for content on a specific topic.
     * @param {string} topicId 
     */
    ask: async (topicId) => {
        // Simulate Agent Processing Time (Graph Traversal)
        await new Promise(resolve => setTimeout(resolve, 600));

        const knowledge = AI_KNOWLEDGE_GRAPH[topicId];

        if (!knowledge) {
            return {
                summary: "The agent is currently researching this topic. Check back soon!",
                keyPoints: [],
                funFact: "Research in progress...",
                lastUpdated: new Date().toISOString().split('T')[0],
                sourceType: "Agent Queue",
                verificationLog: []
            };
        }

        return knowledge;
    },

    /**
     * Check if the content is still valid according to Agent policies.
     */
    validate: (content) => {
        return content.trustScore > 90;
    }
};
