import {Fragment, useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import './App.scss';
import './Keyboard.scss';
import {Lost, Won} from './Win';
import List from './Word';
import {Keyboard} from './Buttons';


function Main() {
  const [count, setCount] = useState(10);
  const [turn, setTurn] = useState(1);
  const [word, setWord] = useState(List[Math.floor(Math.random() * List.length)]);
  const [guess, setGuess] = useState(word.split('').map(() => '_'));
  const [letters, setLetters] = useState<Array<String>>([]);
  const [win, setWin] = useState(false);
  const [lost, setLost] = useState(false);

  function App() {

    document.title = 'Jeu du Pendu';

    useEffect(() => {
      if (win || lost) {
        setCount(10);
        setTurn(1);
        setWord(List[Math.floor(Math.random() * List.length)]);
        setGuess(word.split('').map(() => '_'));
        setLetters([]);
        setWin(false);
        setLost(false);
        setTimeout(() => {
        }, 5);
      }
    });

    if (guess.length !== word.length) {
      setGuess(word.split('').map(() => '_'));
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      if (key >= 'a' && key <= 'z' && !letters.includes(key.toUpperCase())) {
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
      setWin(true);
      return <Navigate replace to ='/won' />;
    }

    if (count === 0) {
      setLost(true);
      return <Navigate replace to ='/lost' />;
    }

    return (
      <Fragment>
          <p className='Turns'>Tours: {turn} </p>
          <p>
            {guess.join(' ')}
            <br />
            Vous avez le droit à: {count} erreurs
          </p>
          <Keyboard checkForLetter={checkForLetter} letters={letters}/>
        </Fragment>
    );
  }

  function AppRouter() {
    return (
      <Fragment>
        <header className="App-header">
          <p>Jeu du Pendu</p>
        </header>
        <Router>
          <Routes>
            <Route path="/" element={<body className='App'> <App /> </body>} />
            {count === 0 && <Route path="/lost" element={<Fragment><head><title>Perdu!</title></head><body className='End'> <Lost word={word} turn={turn}/> </body></Fragment>} />}
            {(guess.join('') === word.toUpperCase() || guess.join('') === word.toLowerCase()) && <Route path="/won" element={<Fragment><head><title>Gagné!</title></head><body className='End'> <Won word={word} turn={turn} count={count} setWord={setWord}/> </body></Fragment>} />}
            <Route path="*" element={<body className='App'> <App /> </body>} />
          </Routes>
        </Router>
        <footer className='App-footer'>
          <p>Créé par Damien Birembaut</p>
        </footer>
      </Fragment>
    );
  }

  return ( <AppRouter /> );
}

export default Main;