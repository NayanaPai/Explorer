import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

// Manual .env parsing since we are in a simple node script
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);

if (!match || !match[1]) {
    console.error("❌ Could not find VITE_GEMINI_API_KEY in .env");
    process.exit(1);
}

const API_KEY = match[1].trim();
const genAI = new GoogleGenerativeAI(API_KEY);

async function testModel(modelName) {
    console.log(`\nTesting Model: ${modelName}...`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, are you there?");
        const response = await result.response;
        console.log(`✅ SUCCESS! ${modelName} responded:`, response.text().slice(0, 50) + "...");
        return true;
    } catch (error) {
        console.error(`❌ FAILED for ${modelName}.`);
        console.error(`   Error: ${error.message}`);
        return false;
    }
}

async function runDiagnosis() {
    console.log("--- GEMINI CONNECTION DIAGNOSIS ---");
    console.log(`API Key detected: ${API_KEY.slice(0, 4)}...${API_KEY.slice(-4)}`);

    // 1. Test the requested model
    const v3 = await testModel("gemini-1.5-pro");

    // 2. Test the fallback/stable model
    if (!v3) {
        console.log("--> Attempting fallback to 'gemini-1.5-pro' to verify API Key validity...");
        await testModel("gemini-1.5-pro");
    }
}

runDiagnosis();
