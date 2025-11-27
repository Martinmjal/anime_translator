import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Load frequency data
// We'll use a local JSON file for reliability since specific npm packages can be flaky.
// I will create this file in the next step.
let frequencyList = new Set();
let top1000 = new Set();
let top5000 = new Set();

const loadFrequencyData = () => {
    try {
        // We'll assume a file 'german_frequency.json' exists with an array of words ordered by frequency
        const dataPath = path.join(__dirname, 'german_frequency.json');
        if (fs.existsSync(dataPath)) {
            const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
            // data is array of strings ordered by frequency (most common first)
            data.forEach((word, index) => {
                const clean = word.toLowerCase();
                if (index < 1000) top1000.add(clean);
                if (index < 5000) top5000.add(clean);
                frequencyList.add(clean);
            });
            console.log(`Loaded ${data.length} words for frequency analysis.`);
        } else {
            console.warn("german_frequency.json not found. Using fallback/empty list.");
        }
    } catch (err) {
        console.error("Error loading frequency data:", err);
    }
};

loadFrequencyData();

app.post('/complexity', (req, res) => {
    const { words } = req.body;

    if (!words || !Array.isArray(words)) {
        return res.status(400).json({ error: "Invalid input. Expected { words: [] }" });
    }

    const results = {};

    words.forEach(word => {
        const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "");

        // Default to 'complex' (red)
        let color = 'red'; // Rare/Complex

        // Check our lists
        if (top1000.has(cleanWord)) {
            color = 'green'; // Common/Simple
        } else if (top5000.has(cleanWord)) {
            color = 'yellow'; // Medium
        }

        // Use the existing "ignored words" logic from frontend? 
        // The user wants the backend to decide. 
        // We can add the ignore list here too or keep it frontend.
        // For now, let's just return the complexity color.

        results[word] = color;
    });

    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Complexity server running on http://localhost:${PORT}`);
});
