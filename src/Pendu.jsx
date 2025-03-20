import React, { useState, useEffect } from 'react';
import {Letters} from './letters';
import {Word} from './word';

export const Pendu = () => {
    // État local pour le mot sélectionné, les lettres devinées et les mauvaises lettres
    const [selectedWord, setSelectedWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const maxIncorrectGuesses = 6;

    // Fonction pour récupérer un mot aléatoire depuis une API
    const fetchRandomWord = async () => {
            const response = await fetch('http://localhost:3333/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                 // permet de prendre les données françaises
                body: new URLSearchParams({ locale: 'fr-FR' })
            });
            const data = await response.json();
            setSelectedWord(data.word);
    };

    // Fonction pour démarrer un nouveau jeu en réinitialisant les state
    const StartGame = () => {
        fetchRandomWord();
        setGuessedLetters([]);
        setIncorrectGuesses(0);
    };

    // demarre le jeu
    useEffect(() => {
    StartGame();
    }, []);

    // si le joueur a plus de 6 mauvaises lettres, il a perdu
    const GameOver = incorrectGuesses >= maxIncorrectGuesses;
    // on enleve les espaces du mot et on compare les lettres devinées avec le mot
    const Win = selectedWord.split('').every(letter => guessedLetters.includes(letter) || letter === '-');

    
    // Fonction pour gérer la sélection d'une lettre
    const selectedLetters = (letter) => {
        // si on gagne ou on perd en renvoie la bonne div
        if (GameOver || Win){
            return;
            // si la lettre a déjà été devinée, on la disabled 
        } else if (guessedLetters.includes(letter)){
            return;
        } else {
            // on ajoute la lettre devinée au tableau des lettres devinées
            setGuessedLetters([...guessedLetters, letter]);
        
            // si la lettre n'est pas dans le mot, on incrémente le nombre de mauvaises lettres
        if (!selectedWord.includes(letter)) {
            setIncorrectGuesses(incorrectGuesses + 1);
        }
    }
    };

    // Fonction pour gérer la saisie au clavier
    const handleKeyPress = (event) => {
        // on met la lettre en minuscule
        const letter = event.key.toLowerCase();
        // on verifie si la lettre est une lettre de l'alphabet
            
        if (letter.match(/^[a-z]$/)) {
            selectedLetters(letter);
        }
    };

    // // Ajout de l'écouteur d'événements pour la saisie au clavier
    useEffect(() => {
        // on ajoute l'écouteur d'événements pour la saisie au clavier
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            // on enleve l'écouteur d'événements pour la saisie au clavier
            window.removeEventListener('keydown', handleKeyPress);
        };
        // on ajoute guessedLetters, incorrectGuesses et selectedWord pour que useEffect soit appelé à chaque fois que l'un de ces états change
    }, [guessedLetters, incorrectGuesses, selectedWord]);



    return (
        <div className="pendu">
            <img className='nourriture' src="./img/nourriture.png" alt="" />
            <img className='cassoulet' src="./img/cassoulet.png" alt="" />
            <img className='fondue' src="./img/fondue.png" alt="" />
            <img className='ramen' src="./img/ramen.png" alt="" />
            <h1>Le Pendu</h1>
            <div className="pendu-graphic">
                <img src={`./img/pendu_${incorrectGuesses}.png`} alt='' />
            </div>
            {/* // permet d'afficher le mot à deviner et les lettres devinées */}
            <Word selectedWord={selectedWord} guessedLetters={guessedLetters} />
            {GameOver && <div className="gameOver">Perdu ! le mot était : {selectedWord}</div>}
            {Win && <div className="win">Bravo ! vous avez deviné le mot!</div>}
            <Letters selectedLetters={guessedLetters} onLetterSelect={selectedLetters} />
            <button onClick={StartGame}>rejouer</button>
        </div>
    );
};