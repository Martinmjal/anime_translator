/**
 * Logic to determine word complexity.
 * Ignores function words and categorizes others based on length/rarity.
 */

const IGNORED_WORDS = new Set([
    "die", "der", "das", "und", "in", "zu", "den", "von", "mit", "sich", "des", "auf", "für", "ist", "im", "dem", "nicht", "ein", "eine", "einen", "einem", "einer", "als", "auch", "es", "an", "werden", "aus", "er", "hat", "dass", "sie", "nach", "wird", "bei", "eines", "oder", "um", "am", "sind", "noch", "wie", "einigen", "zum", "war", "haben", "nur", "oder", "aber", "vor", "zur", "bis", "mehr", "durch", "man", "sein", "wurde", "sei", "pro", "wenn", "kann", "diese", "über", "wir", "ich", "du", "ihr", "uns", "euch", "ihnen", "mein", "dein", "sein", "unser", "euer", "ihr", "ja", "nein", "doch", "mal", "nun", "also"
]);

export const getWordComplexity = (word) => {
    if (!word) return 'ignored';

    const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "");

    if (IGNORED_WORDS.has(cleanWord)) {
        return 'ignored';
    }

    // Simple heuristic: length
    // In a real app, this would use a frequency list
    if (cleanWord.length <= 4) {
        return 'simple'; // Green
    } else if (cleanWord.length <= 8) {
        return 'medium'; // Yellow
    } else {
        return 'complex'; // Red
    }
};
