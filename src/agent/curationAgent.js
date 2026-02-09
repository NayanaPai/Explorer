import { DEMO_ARTICLES } from '../data/demoContent';
import { GeminiService } from '../services/geminiService';
import { INTERESTS } from '../data/interests';
import { KnowledgeGraphService } from '../services/knowledgeGraphService';

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

        // 1. Check Local Knowledge Graph first (Cache Strategy)
        const cachedNode = await KnowledgeGraphService.getNode(topicId);
        if (cachedNode) {
            console.log(`CurationAgent: Found local knowledge for ${title}`);
            return {
                ...cachedNode.content,
                _source: 'LOCAL_STORE', // Mark as local
                _trustScore: 99
            };
        }

        try {
            if (GeminiService.isAvailable()) {
                console.log(`CurationAgent: Requesting live curation for ${title}...`);
                const curatedData = await GeminiService.curateFullInterestPackage(topicId, title);
                console.log(`CurationAgent: Successfully received live data for ${title}`);

                // 2. Save to Knowledge Graph for future
                await KnowledgeGraphService.addNode(topicId, curatedData);

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
            console.error("CurationAgent: Live curation failed. Falling back to mock.", error);
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
     * Generates deep-dive articles for Learn Drill Down
     */
    generateArticles: async (topic, subtopic) => {
        // 0. CHECK DEMO CONTENT FIRST
        // Construct key: interest_category_subtopic (simplified for this demo to just match Physics > Gravity)
        const demoKey = `${topic}_${subtopic}`.toLowerCase().replace(/ /g, '_');
        // Our demo key is 'science_physics_gravity' -- but the params passed might be simple
        // topic='science', subtopic='Gravity'
        // For the specific user request "Physics->Gravity", let's be flexible

        // Check strict key or partial match for demo
        if (topic === 'science' && (subtopic === 'Gravity' || subtopic === 'physics')) {
            if (DEMO_ARTICLES['science_physics_gravity']) {
                console.log("CurationAgent: Serving pre-curated DEMO content for Gravity.");
                // Artificial delay to simulate "fast" network fetch but not instant 0ms
                await new Promise(r => setTimeout(r, 600));
                return DEMO_ARTICLES['science_physics_gravity'];
            }
        }

        try {
            // 1. Check Cache first (Future optimization: KnowledgeGraphService.getArticles...)

            // 2. Call Gemini
            if (GeminiService.isAvailable()) {
                return await GeminiService.generateMiniArticles(topic, subtopic);
            }

            console.warn("CurationAgent: Gemini offline, using fallback for articles.");
        } catch (error) {
            console.warn("CurationAgent: Article generation failed, using mock.", error);
        }

        // Fallback Mock Data
        return [
            {
                id: 1,
                title: `The Basics of ${subtopic} (Offline)`,
                summary: `We couldn't reach the AI agent right now, but ${subtopic} is definitely interesting! Try checking your internet connection.`,
                funFact: "Robots need internet too!"
            },
            {
                id: 2,
                title: "Mock Article 2",
                summary: "This is a placeholder article because the API is unavailable.",
                funFact: "Placeholder fact."
            },
            {
                id: 3,
                title: "Mock Article 3",
                summary: "This is another placeholder article.",
                funFact: "Another placeholder fact."
            }
        ];
    },

    /**
     * Check if the content is still valid according to Agent policies.
     */
    validate: (content) => {
        return content.trustScore > 90;
    }
};
