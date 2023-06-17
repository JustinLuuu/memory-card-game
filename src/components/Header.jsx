import React, { useContext } from 'react';
import GameContext from './context/GameContext';

export const Header = () => {
    const { numberMoves } = useContext(GameContext);

    return (
        <header className="header-main">
            <h1>
                Memory Game🧠
            </h1>
            
            <p className="header-main-moves">
                Moves
                <small className="header-main-moves-number">
                    {numberMoves}
                </small>
            </p>
        </header>
    )
}
