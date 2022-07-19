import {Fragment} from 'react';
import './App.scss';
import './Keyboard.scss';
import {Button} from './Buttons';

function Lost(prop: any) {
  document.title = 'Perdu!';

  return (
    <Fragment>
        <p>Perdu !</p>
        <p>Vous avez joué {prop.turn} tours.</p>
        <p>Le mot à trouver était: {prop.word}</p>
        <Button />
    </Fragment>
  );
}

function Won(prop: any) {
  document.title = 'Gagné!';

  return (
    <Fragment>
        <p>Félicitations, vous avez gagné !</p>
        <p>Il vous restait encore {prop.count} erreurs possibles et vous avez pris {prop.turn} tours pour trouver le mot</p>
        <p>Le mot à trouver était: {prop.word}</p>
        <Button />
    </Fragment>
  );
}

export {Lost, Won};