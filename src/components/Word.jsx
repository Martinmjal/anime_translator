import React, { useState } from 'react';
import { translateWord } from '../utils/translation';
import { getWordComplexity } from '../utils/complexity';

const Word = ({ word, targetLanguage, showComplexity }) => {
    const [isHovered, setIsHovered] = useState(false);

    const complexity = getWordComplexity(word);
    const translation = translateWord(word, targetLanguage);

    let complexityClass = '';
    if (showComplexity && complexity !== 'ignored') {
        complexityClass = `complexity-${complexity}`;
    }

    return (
        <span
            className={`word-container ${complexityClass}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {word}
            {isHovered && (
                <span className="tooltip">
                    {translation}
                </span>
            )}
            {' '}
        </span>
    );
};

export default Word;
