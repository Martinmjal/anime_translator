import React, { useState } from 'react';
import CaptionInput from './components/CaptionInput';
import CaptionDisplay from './components/CaptionDisplay';
import Controls from './components/Controls';
import './index.css';

function App() {
  const [captions, setCaptions] = useState('');
  const [processedCaptions, setProcessedCaptions] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [showComplexity, setShowComplexity] = useState(false);

  const handleProcess = () => {
    setProcessedCaptions(captions);
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
            targetLanguage={targetLanguage}
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
