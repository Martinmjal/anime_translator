/**
 * Logic to determine word complexity.
 * Fetches complexity from the backend API.
 */

const BACKEND_URL = 'http://localhost:3000/complexity';

// Cache to store complexity results to avoid repeated API calls
const complexityCache = {};

export const fetchComplexityBatch = async (words) => {
    if (!words || words.length === 0) return {};

    const uniqueWords = [...new Set(words.filter(w => w.trim().length > 0))];

    // Filter out words we already have in cache
    const wordsToFetch = uniqueWords.filter(word => !complexityCache[word]);

    if (wordsToFetch.length > 0) {
        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ words: wordsToFetch })
            });

            if (response.ok) {
                const data = await response.json();
                // Update cache
                Object.assign(complexityCache, data);
            } else {
                console.error("Failed to fetch complexity:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching complexity:", error);
        }
    }

    // Return all requested complexities from cache
    const results = {};
    uniqueWords.forEach(word => {
        results[word] = complexityCache[word] || 'red'; // Default to red on error
    });

    return results;
};

// Synchronous fallback (deprecated, but kept for immediate render if needed)
// Now we rely on the async fetch in App.jsx
export const getWordComplexity = (word) => {
    return complexityCache[word] || 'ignored';
};
