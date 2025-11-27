import React, { useState } from 'react';

const Word = ({ word, translation, complexity, showComplexity, onAddToKnown }) => {
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
                    <div className="tooltip-translation">{translation}</div>
                    {showComplexity && complexity !== 'ignored' && (
                        <button
                            className="known-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToKnown();
                            }}
                        >
                            Mark as Known
                        </button>
                    )}
                </span>
            )}
            {' '}
        </span>
    );
};

export default Word;
