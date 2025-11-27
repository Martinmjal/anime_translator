import React, { useState } from 'react';
import CaptionInput from './components/CaptionInput';
import CaptionDisplay from './components/CaptionDisplay';
import Controls from './components/Controls';
import { translateBatch } from './utils/translation';
import { fetchComplexityBatch } from './utils/complexity';
import './index.css';

function App() {
  const [captions, setCaptions] = useState('');
  const [processedCaptions, setProcessedCaptions] = useState('');
  const [translationMap, setTranslationMap] = useState({});
  const [complexityMap, setComplexityMap] = useState({});
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [showComplexity, setShowComplexity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // We no longer need the API key in the frontend state as the backend handles it.
  // const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; 

  const handleAddToKnown = async (word) => {
    try {
      await fetch('http://localhost:8000/known-words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word })
      });
      // Update local state to reflect change immediately (optional, or refetch)
      setComplexityMap(prev => ({ ...prev, [word]: 'ignored' }));
    } catch (err) {
      console.error("Failed to add known word:", err);
    }
  };

  const handleProcess = async () => {
    if (!captions.trim()) return;

    setIsLoading(true);
    setError(null);
    setProcessedCaptions(captions);

    const words = captions.split(/(\s+)/).filter(w => w.trim().length > 0);

    try {
      // Parallel fetch: Translation + Complexity
      const [translations, complexities] = await Promise.all([
        translateBatch(words, targetLanguage), // No API key needed
        fetchComplexityBatch(words)
      ]);

      setTranslationMap(translations);
      setComplexityMap(complexities);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to process text.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Anime Translator</h1>
        <p>Learn German while watching your favorite shows</p>
      </header>

      <main className="main-content">
        <section className="input-section">
          <CaptionInput
            value={captions}
            onChange={setCaptions}
            onProcess={handleProcess}
          />
          {isLoading && <div className="loading-indicator">Translating...</div>}
          {error && <div className="error-message">{error}</div>}
        </section>

        <section className="controls-section">
          <Controls
            targetLanguage={targetLanguage}
            setTargetLanguage={setTargetLanguage}
            showComplexity={showComplexity}
            setShowComplexity={setShowComplexity}
          />
        </section>

        <section className="display-section">
          <CaptionDisplay
            text={processedCaptions}
            translationMap={translationMap}
            complexityMap={complexityMap}
            showComplexity={showComplexity}
            onWordClick={handleAddToKnown}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2024 Anime Translator</p>
      </footer>
    </div>
  );
}

export default App;
