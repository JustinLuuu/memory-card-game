import React, { createContext, useState } from 'react';
const GameContext = createContext();

const GameProvider = ({ children }) => {
    const [numberMoves, setNumberMoves] = useState(0);
    const [numberErrors, setNumberErrors] = useState(0);
    const [isWinner, setIsWinner] = useState(false);

    const addNumberMoves = () => {
        setNumberMoves(prevState => prevState + 1);
    }

    const addNumberErrors = () => {
        setNumberErrors(prevState => prevState + 1);
    }

    const declareWinner = () => {
        setIsWinner(true);
    }

    const resetGame = () => {
        setIsWinner(false);
        setNumberErrors(0);
        setNumberMoves(0);
    }

    const data = {
        numberMoves,
        addNumberMoves,
        numberErrors,
        addNumberErrors,
        isWinner,
        declareWinner,
        resetGame,
    };

    return (
        <GameContext.Provider value={data}>
            {children}
        </GameContext.Provider>
    )
}

export { GameProvider }
export default GameContext;