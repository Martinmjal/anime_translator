import React from 'react';

const CaptionInput = ({ value, onChange, onProcess }) => {
    return (
        <div className="input-container">
            <textarea
                className="caption-textarea"
                placeholder="Paste your German captions here..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button className="process-btn" onClick={onProcess}>
                Translate & Analyze
            </button>
        </div>
    );
};

export default CaptionInput;
