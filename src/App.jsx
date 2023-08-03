import { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(allNewDice());

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
  function rollUnheldDice() {
    const newNum = [];
    for (let i = 0; i < dice.length; i++) {
      const die = dice[i];

      if (die.isHeld === false) {
        newNum.push({
          ...die,
          value: Math.ceil(Math.random() * 6),
        });
      } else {
        newNum.push(die);
      }
    }
    return newNum;
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) };
      })
    );
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
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
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
      <Confetti />
    </main>
  );
}
