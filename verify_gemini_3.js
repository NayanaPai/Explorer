import { GeminiService } from './src/services/geminiService.js';
// dotenv removed

// Load environment variables if not using Vite's import.meta.env mechanism in this script context
// However, since geminiService.js might depend on ENV vars, we need to ensure they are available.
// Given the file content previously viewed, the API KEY is hardcoded for now (commented out env var),
// so this script should work directly if we can import the module.

// We need to mock 'import.meta.env' if it's used, but looking at geminiService.js:
// const API_KEY = 'AIza...'; // Hardcoded
// So we don't need complex env setup for this specific test case.

async function testGemini() {
    console.log("Starting Gemini 3 Verification...");

    // 1. Test Recommendations
    try {
        console.log("\n--- Testing generateRecommendations ---");
        const recommendations = await GeminiService.generateRecommendations([{ topic: "Space", difficulty: "Beginner" }]);
        console.log("Recommendations Success:", recommendations.length > 0);
        console.log("Result sample:", JSON.stringify(recommendations[0], null, 2));
    } catch (e) {
        console.error("Recommendations Failed:", e.message);
    }

    // 2. Test Curation
    try {
        console.log("\n--- Testing curateFullInterestPackage ---");
        const curation = await GeminiService.curateFullInterestPackage("test-id", "Black Holes");
        console.log("Curation Success:", !!curation.knowledge);
        console.log("Source Type:", curation.sourceType);
    } catch (e) {
        console.error("Curation Failed:", e.message);
    }
}

testGemini();
