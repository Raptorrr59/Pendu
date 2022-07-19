import './Keyboard.scss'
import { Fragment, useState } from 'react'
import {Link} from 'react-router-dom'

function Row (prop: any) {
  return (
    <div>
      { prop.row.map((letter: string) => {
        return <button className="Keyboard" onClick={() => { prop.checkForLetter(letter) }} disabled={prop.letters.includes(letter)}>{letter}</button>
      })}
    </div>
  )
}

function Keyboard (prop: any) {
  const [firstLine] = useState(["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"]);
  const [secondLine] = useState(["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"]);
  const [thirdLine] = useState(["W", "X", "C", "V", "B", "N"]);

  return (
      <Fragment>
        <Row row={firstLine} checkForLetter={prop.checkForLetter} letters={prop.letters} />
        <Row row={secondLine} checkForLetter={prop.checkForLetter} letters={prop.letters} />
        <Row row={thirdLine} checkForLetter={prop.checkForLetter} letters={prop.letters} />
      </Fragment>
  )
}

function Button () {
  return (
    <Link to="/">
      <button className="Keyboard">
        Rejouer
      </button>
    </Link>
  )
}


export {Keyboard, Button};