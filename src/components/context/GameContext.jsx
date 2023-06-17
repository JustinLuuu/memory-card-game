import React, { createContext, useState } from 'react';
const GameContext = createContext();

const GameProvider = ({ children }) => {
    const [numberMoves, setNumberMoves] = useState(0);
    const [win, setWin] = useState(false);

    const addNumberMoves = () => {
        setNumberMoves(prevState => prevState + 1);
    }

    const setWinFinish = () => {
        setWin(true);
    }

    const data = {
        numberMoves,
        addNumberMoves,
        win,
        setWinFinish
    };

    return (
        <GameContext.Provider value={data}>
            {children}
        </GameContext.Provider>
    )
}

export { GameProvider }
export default GameContext;