import React, { useState, useContext } from 'react';
import GameContext from '../context/GameContext';

export const FormPlayerName = () => {
  const { numberErrors, resetGame } = useContext(GameContext);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length > 0) {
      let scorePlayerList = localStorage.getItem("record");
      scorePlayerList = scorePlayerList ? JSON.parse(scorePlayerList) : [];
      scorePlayerList.push({
        player: inputValue,
        score: numberErrors,
      });
      scorePlayerList.length > 10 && scorePlayerList.shift();
      localStorage.setItem("record", JSON.stringify(scorePlayerList));
      resetGame();
    }
  }

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <label>
        ENTER YOUR NAME:
      </label>

      <input
        type="text"
        value={inputValue}
        min={1}
        max={20}
        autoComplete="on"
        autoFocus
        onChange={(e) => setInputValue(e.target.value.toLocaleLowerCase())}
      />

      <button type="submit">
        SUBMIT
      </button>
    </form>
  )
}
