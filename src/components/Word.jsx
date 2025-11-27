import React, { useState } from 'react';
import { getWordComplexity } from '../utils/complexity';

const Word = ({ word, translation, showComplexity }) => {
    const [isHovered, setIsHovered] = useState(false);

    const complexity = getWordComplexity(word);

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
            {isHovered && translation && (
                <span className="tooltip">
                    {translation}
                </span>
            )}
            {' '}
        </span>
    );
};

export default Word;
