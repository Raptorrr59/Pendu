import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import WORD_LIST from './Word';

function App() {
  const [count, setCount] = useState(10);
  const [word, setWord] = useState(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
  const [status, setStatus] = useState(word.split('').map(() => '_'));

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setCount(count - 1);
      }
    }
    window.addEventListener('keyup', handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    }
  }, [count]);

  if (count === 0) {
    return (
      <div className="End">
        <header className="App-header">
          <p>Game Over</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {word}
          <br />
          {status.join(' ')}
          <br />
          Remaining tries: {count}
        </p>
      </header>
    </div>
  );
}

export default App;