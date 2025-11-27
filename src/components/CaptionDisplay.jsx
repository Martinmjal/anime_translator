import React from 'react';
import Word from './Word';

const CaptionDisplay = ({ text, translationMap, showComplexity }) => {
    if (!text) return null;

    const words = text.split(/(\s+)/).filter(w => w.trim().length > 0);

    return (
        <div className="caption-display">
            {words.map((word, index) => (
                <Word
                    key={index}
                    word={word}
                    translation={translationMap[word]}
                    showComplexity={showComplexity}
                />
            ))}
        </div>
    );
};

export default CaptionDisplay;
