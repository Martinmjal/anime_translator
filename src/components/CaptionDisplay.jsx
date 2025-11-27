import React from 'react';
import Word from './Word';

const CaptionDisplay = ({ text, targetLanguage, showComplexity }) => {
    if (!text) return null;

    // Split by whitespace but keep punctuation attached to words for now, 
    // or better: split by space and let Word handle punctuation cleaning for lookup
    // A simple split by space is a good start.
    const words = text.split(/(\s+)/).filter(w => w.trim().length > 0);

    return (
        <div className="caption-display">
            {words.map((word, index) => (
                <Word
                    key={index}
                    word={word}
                    targetLanguage={targetLanguage}
                    showComplexity={showComplexity}
                />
            ))}
        </div>
    );
};

export default CaptionDisplay;
