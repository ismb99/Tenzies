import { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Timer from "./Timer";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [gameFinished, setGameFinished] = useState(false);
  const [rollCount, setRollCount] = useState(0);

  useEffect(() => {
    checkValues();
  }, [dice]); // kör checkValue varje gång state ändras på dice

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }
  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld === false
          ? { ...die, value: Math.ceil(Math.random() * 6) }
          : die;
      })
    );
    setRollCount((oldCount) => oldCount + 1);
  }

  function checkValues() {
    const firstValue = dice[0].value;
    const allHeld = dice.every((die) => die.isHeld);
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setGameFinished(true);
      console.log("You won");
    } else {
      setGameFinished(false);
    }

    // allSameValue ? setGameFinished(true) : setGameFinished(false);
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function newGame() {
    setRollCount(0);
    setDice(allNewDice);
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Play until all dice show the same number. Click on each die to keep its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>

      <h3>Roll Count: {rollCount}</h3>
      <Timer />

      {gameFinished ? (
        <>
          <Confetti />
          <button className="roll-dice" onClick={newGame}>
            New Game
          </button>
        </>
      ) : (
        <button className="roll-dice" onClick={rollDice}>
          Roll
        </button>
      )}
    </main>
  );
}
