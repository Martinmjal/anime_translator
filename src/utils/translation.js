/**
 * Google Cloud Translation API integration.
 */

const API_ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';

/**
 * Translates a batch of words using Google Cloud Translation API.
 * @param {string[]} words - Array of words to translate.
 * @param {string} targetLanguage - Target language code (e.g., 'en', 'es').
 * @param {string} apiKey - Google Cloud API Key.
 * @returns {Promise<Object>} - Map of original word -> translated word.
 */
export const translateBatch = async (words, targetLanguage, apiKey) => {
  if (!words || words.length === 0) return {};
  if (!apiKey) {
    console.warn("No API key provided");
    return {};
  }

  // Deduplicate words to save API quota
  const uniqueWords = [...new Set(words.filter(w => w.trim().length > 0))];

  if (uniqueWords.length === 0) return {};

  try {
    const response = await fetch(`${API_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: uniqueWords,
        target: targetLanguage,
        format: 'text'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Translation API request failed');
    }

    const data = await response.json();
    const translations = data.data.translations;

    // Map back to original words
    const translationMap = {};
    uniqueWords.forEach((word, index) => {
      if (translations[index]) {
        translationMap[word] = translations[index].translatedText;
      }
    });

    return translationMap;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
};
