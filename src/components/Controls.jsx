import React from 'react';

const Controls = ({ targetLanguage, setTargetLanguage, showComplexity, setShowComplexity }) => {
    return (
        <div className="controls-container">
            <div className="control-group">
                <label htmlFor="language-select">Target Language:</label>
                <select
                    id="language-select"
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="language-select"
                >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                </select>
            </div>

            <div className="control-group toggle-group">
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={showComplexity}
                        onChange={(e) => setShowComplexity(e.target.checked)}
                    />
                    <span className="slider round"></span>
                </label>
                <span className="toggle-label">Show Word Complexity</span>
            </div>
        </div>
    );
};

export default Controls;
