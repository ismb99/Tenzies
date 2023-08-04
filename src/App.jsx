import { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [gameFinished, setGameFinished] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    checkValues();
  }, [dice]);

  console.log(count);

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
    setCount((oldCount) => oldCount + 1);
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld === false
          ? { ...die, value: Math.ceil(Math.random() * 6) }
          : die;
      })
    );
  }

  function checkValues() {
    const firstValue = dice[0].value;
    const allSame = dice.every((die) => die.value === firstValue);
    if (allSame) {
      setGameFinished(true);
    } else {
      setGameFinished(false);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function newGame() {
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
      {/* if gameFinished true render confetti and newGame else render rollDice */}
      <h2>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste similique
        neque cumque in.
      </h2>
      <div className="dice-container">{diceElements}</div>

      <h3>Num Rolls:{count}</h3>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
      {gameFinished ? (
        <>
          <button className="roll-dice" onClick={newGame}>
            New Game
          </button>
          <Confetti />
        </>
      ) : null}
    </main>
  );
}
