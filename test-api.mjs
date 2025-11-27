import fs from 'fs';
import path from 'path';
import { translateBatch } from './src/utils/translation.js';

// Simple .env parser
const loadEnv = () => {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        if (!fs.existsSync(envPath)) {
            console.error('Error: .env file not found.');
            return {};
        }
        const envContent = fs.readFileSync(envPath, 'utf-8');
        const env = {};
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                env[match[1].trim()] = match[2].trim();
            }
        });
        return env;
    } catch (error) {
        console.error('Error loading .env:', error);
        return {};
    }
};

const runTest = async () => {
    console.log('--- Starting API Verification Script ---');

    const env = loadEnv();
    const apiKey = env.VITE_GOOGLE_API_KEY;

    if (!apiKey) {
        console.error('Error: VITE_GOOGLE_API_KEY not found in .env file.');
        process.exit(1);
    }

    console.log('API Key found (masked):', apiKey.substring(0, 5) + '...');

    const testWords = ['Apfel', 'Welt', 'Programmieren'];
    const targetLang = 'en';

    console.log(`Translating words: ${JSON.stringify(testWords)} to '${targetLang}'...`);

    try {
        const results = await translateBatch(testWords, targetLang, apiKey);
        console.log('--- Translation Results ---');
        console.table(results);

        // Basic validation
        if (results['Apfel'] && results['Apfel'].toLowerCase().includes('apple')) {
            console.log('✅ Verification PASSED: "Apfel" translated correctly.');
        } else {
            console.error('❌ Verification FAILED: Unexpected translation for "Apfel".');
        }
    } catch (error) {
        console.error('❌ API Request Failed:', error.message);
    }
};

runTest();
