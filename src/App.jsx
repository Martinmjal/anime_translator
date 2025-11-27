import React, { useState } from 'react';
import CaptionInput from './components/CaptionInput';
import CaptionDisplay from './components/CaptionDisplay';
import Controls from './components/Controls';
import { translateBatch } from './utils/translation';
import './index.css';

function App() {
  const [captions, setCaptions] = useState('');
  const [processedCaptions, setProcessedCaptions] = useState('');
  const [translationMap, setTranslationMap] = useState({});
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [showComplexity, setShowComplexity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const handleProcess = async () => {
    if (!captions.trim()) return;

    setIsLoading(true);
    setError(null);
    setProcessedCaptions(captions);

    // Split words for translation
    // Simple split by whitespace, cleaning punctuation for lookup
    const words = captions.split(/(\s+)/).filter(w => w.trim().length > 0);

    try {
      const translations = await translateBatch(words, targetLanguage, apiKey);
      setTranslationMap(translations);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to translate. Check API Key.");
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
            showComplexity={showComplexity}
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
