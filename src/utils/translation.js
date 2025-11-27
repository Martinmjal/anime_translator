/**
 * Translates a batch of words using the Python backend proxy.
 */
const BACKEND_URL = 'http://localhost:8000/translate';

export const translateBatch = async (words, targetLanguage, apiKey) => {
  if (!words || words.length === 0) return {};

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        words: words,
        targetLang: targetLanguage
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Translation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Returns { "word": "translation" }
  } catch (error) {
    console.error("Translation Error:", error);
    throw error;
  }
};
