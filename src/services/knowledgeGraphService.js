/**
 * Knowledge Graph Service
 * 
 * Manages the local persistence of knowledge mined by the Gemini Agent.
 * Simulates a future Graph DB connection by using localStorage for now.
 */

const STORAGE_KEY = 'explorer_knowledge_graph_v1';

export const KnowledgeGraphService = {

    /**
     * Retrieve the entire graph from storage
     */
    getGraph: () => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : { nodes: {} };
        } catch (e) {
            console.error("KnowledgeGraph: Failed to parse storage", e);
            return { nodes: {} };
        }
    },

    /**
     * Save the entire graph to storage
     */
    saveGraph: (graph) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(graph));
        } catch (e) {
            console.error("KnowledgeGraph: Failed to save to storage (Quota?)", e);
        }
    },

    /**
     * Get a node (topic) from the graph
     * @param {string} topicId 
     * @returns {object|null} The stored content or null
     */
    getNode: (topicId) => {
        const graph = KnowledgeGraphService.getGraph();
        const nodes = graph.nodes[topicId];

        if (!nodes || nodes.length === 0) return null;

        // For now, return the most recent one. 
        // In future, this could rotate or be randomized.
        return nodes[nodes.length - 1];
    },

    /**
     * Add a verified node to the graph
     * @param {string} topicId 
     * @param {object} content The full curated package
     */
    addNode: (topicId, content) => {
        const graph = KnowledgeGraphService.getGraph();

        if (!graph.nodes[topicId]) {
            graph.nodes[topicId] = [];
        }

        const newNode = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            content: content,
            source: 'gemini-3-flash-preview'
        };

        graph.nodes[topicId].push(newNode);

        // Basic Limit: Keep last 5 entries per topic to avoid quota issues
        if (graph.nodes[topicId].length > 5) {
            graph.nodes[topicId] = graph.nodes[topicId].slice(-5);
        }

        KnowledgeGraphService.saveGraph(graph);
        console.log(`KnowledgeGraph: Saved new node for ${topicId}`);
    }
};
