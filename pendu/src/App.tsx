import React, {useEffect, useState} from 'react';
import {
  Link
} from "react-router-dom";
import './App.css';
import './Keyboard.scss';
import WORD_LIST from './Word';

function App() {
  const [count, setCount] = useState(10);
  const [turn, setTurn] = useState(1);
  const [word] = useState(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
  const [guess, setGuess] = useState(word.split('').map(() => '_'));
  const [letters, setLetters] = useState<Array<String>>([]);

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;
    if (key >= 'a' && key <= 'z') {
      console.log(key);
      checkForLetter(key.toUpperCase());
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    }
  });

  const checkForLetter = (letter: string) => {
    setTurn(turn + 1);
    let check = false;
    let temp = guess.slice();
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] === letter.toUpperCase()) {
        return;
      }
    }
    setLetters([...letters, letter.toUpperCase()]);
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter.toLowerCase()) {
        temp[i] = letter;
        check = true;
        setGuess(temp);
      }
    }
    if (!check && count > 0) {
      setCount(count - 1);
    }
  }

  if (guess.join('') === word.toUpperCase() || guess.join('') === word.toLowerCase()) {
    return (
      <div>
        <header className="App-header">
          <p> Jeu du Pendu</p>
        </header>
        <body className="End">
          <p>Félicitations, vous avez gagné !</p>
          <p>Il vous restait encore {count} échecs possibles et vous avez pris {turn} tours pour trouver le mot</p>
          <p>Le mot à trouver était: {word}</p>
          <button className="Keyboard" onClick={() => { window.location.reload() }}>Rejouer</button>
        </body>
        <footer className='App-footer'>
          <p>Créé par Damien Birembaut</p>
        </footer>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div>
        <header className="App-header">
          <p> Jeu du Pendu</p>
        </header>
        <body className='End'>
          <p>Perdu !</p>
          <p>Le mot à trouver était: {word}</p>
          <button className="Keyboard" onClick={() => { window.location.reload() }}>Rejouer</button>
        </body>
        <footer className='App-footer'>
          <p>Créé par Damien Birembaut</p>
        </footer>
      </div>
    );
  }

  return (
    <div>
      <header className="App-header">
        <p> Jeu du Pendu</p>
      </header>
      <body className="App">
        <h1 className='Turns'>Tours: {turn} </h1>
        <p>
          {guess.join(' ')}
          <br />
          Vous avez le droit à: {count} erreurs
        </p>
        <div>
        { ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"].map((letter) => { 
          return <button className="Keyboard" onClick={() => { checkForLetter(letter) }} disabled={letters.includes(letter)}>{letter}</button>
          })}
        </div>
        <div>
        { ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"].map((letter) => {
          return <button className="Keyboard" onClick={() => { checkForLetter(letter) }} disabled={letters.includes(letter)}>{letter}</button>
          })}
      </div>
      <div>
        { ["W", "X", "C", "V", "B", "N"].map((letter) => {
          return <button className="Keyboard" onClick={() => { checkForLetter(letter) }} disabled={letters.includes(letter)}>{letter}</button>
          })}
      </div>
      <p>
        {letters.join(', ')}
      </p>
    </body>
    <footer className='App-footer'>
      <p>Créé par Damien Birembaut</p>
    </footer>
    </div>
  );
}

export default App;