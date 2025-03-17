import React from 'react';

export const Word = ({ selectedWord, guessedLetters }) => {
    return (
        <div className="word">
            {selectedWord.split('').map((letter, index) => (
                <span key={index} className="letter">
                    {letter === '-' ? '-' : (guessedLetters.includes(letter) ? letter : '_')}
                </span>
            ))}
        </div>
    );
};