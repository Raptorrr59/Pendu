import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './Keyboard.css';
import WORD_LIST from './Word';
//import Keyboard from './Keyboard';
import { generateKey } from 'crypto';
import { resolveObjectURL } from 'buffer';
import { resolveModuleName } from 'typescript';

function App() {
  const [count, setCount] = useState(10);
  const [word, setWord] = useState(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
  const [status, setStatus] = useState(word.split('').map(() => '_'));
  //let keyboard;

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && count > 0) {
        setCount(count - 1);
      }
    }
    window.addEventListener('keyup', handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    }
  }, [count]);

  //keyboard = generateKeyboard();

  if (status.join('') === word.toUpperCase()) {
    return (
      <div className="End">
        <header className="App-header">
          <p>Félicitations, vous avez gagné !</p>
          <p>Il vous restait encore {count} échecs possibles</p>
          <p>Le mot à trouver était: {word}</p>
          <button onClick={() => { window.location.reload() }}>Rejouer</button>
        </header>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="End">
        <header className="App-header">
          <p>Perdu !</p>
          <p>Le mot à trouver était: {word}</p>
          <button onClick={() => { window.location.reload() }}>Rejouer</button>
        </header>
      </div>
    );
  }

  const checkForLetter = (letter: string) => {
    let check = false;
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter.toLowerCase()) {
        status[i] = letter;
        check = true;
      }
    }
    if (!check) {
      setCount(count - 1);
    }
    setStatus(status);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {status.join(' ')}
          <br />
          Vous avez le droit à: {count} erreurs
        </p>
        <div>
        <button className='Keyboard' onClick={() => { checkForLetter('A') }}> A </button>
        <button className='Keyboard' onClick={() => { checkForLetter('Z') }}> Z </button>
        <button className='Keyboard' onClick={() => { checkForLetter('E') }}> E </button>
        <button className='Keyboard' onClick={() => { checkForLetter('R') }}> R </button>
        <button className='Keyboard' onClick={() => { checkForLetter('T') }}> T </button>
        <button className='Keyboard' onClick={() => { checkForLetter('Y') }}> Y </button>
        <button className='Keyboard' onClick={() => { checkForLetter('U') }}> U </button>
        <button className='Keyboard' onClick={() => { checkForLetter('I') }}> I </button>
        <button className='Keyboard' onClick={() => { checkForLetter('O') }}> O </button>
        <button className='Keyboard' onClick={() => { checkForLetter('P') }}> P </button>
        </div>
        <div>
        <button className='Keyboard' onClick={() => { checkForLetter('Q') }}> Q </button>
        <button className='Keyboard' onClick={() => { checkForLetter('S') }}> S </button>
        <button className='Keyboard' onClick={() => { checkForLetter('D') }}> D </button>
        <button className='Keyboard' onClick={() => { checkForLetter('F') }}> F </button>
        <button className='Keyboard' onClick={() => { checkForLetter('G') }}> G </button>
        <button className='Keyboard' onClick={() => { checkForLetter('H') }}> H </button>
        <button className='Keyboard' onClick={() => { checkForLetter('J') }}> J </button>
        <button className='Keyboard' onClick={() => { checkForLetter('K') }}> K </button>
        <button className='Keyboard' onClick={() => { checkForLetter('L') }}> L </button>
        <button className='Keyboard' onClick={() => { checkForLetter('M') }}> M </button>
      </div>
      <div>
        <button className='Keyboard' onClick={() => { checkForLetter('W') }}> W </button>
        <button className='Keyboard' onClick={() => { checkForLetter('X') }}> X </button>
        <button className='Keyboard' onClick={() => { checkForLetter('C') }}> C </button>
        <button className='Keyboard' onClick={() => { checkForLetter('V') }}> V </button>
        <button className='Keyboard' onClick={() => { checkForLetter('B') }}> B </button>
        <button className='Keyboard' onClick={() => { checkForLetter('N') }}> N </button>
      </div>
      </header>
      </div>
    
  );
}

export default App;