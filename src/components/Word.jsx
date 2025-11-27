import React, { useState } from 'react';

const Word = ({ word, translation, complexity, showComplexity }) => {
    const [isHovered, setIsHovered] = useState(false);

    let complexityClass = '';
    if (showComplexity && complexity && complexity !== 'ignored') {
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
