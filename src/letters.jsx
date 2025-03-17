import React from 'react';

export const Letters = ({ selectedLetters, onLetterSelect }) => {
    const alphabet = 'azertyuiopqsdfghjklmwxcvbn'.split('');

    return (
        <div className="letters">
            {alphabet.map(letter => (
                <button
                    key={letter}
                    onClick={() => onLetterSelect(letter)}
                    disabled={selectedLetters.includes(letter)}>
                    {letter}
                </button>
            ))}
        </div>
    );
};