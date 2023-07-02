import React, { useContext } from 'react';
import GameContext from './context/GameContext';

export const Header = () => {
    const { numberErrors, isWinner } = useContext(GameContext);
    
    return (
        <header className="header-main">
            <h1>
                Memory Game🧠
            </h1>

            {
                !isWinner && (
                    <p className="header-main-moves">
                        ERRORS
                        <small className="header-main-moves-number">
                            {numberErrors}
                        </small>
                    </p>
                )
            }
        </header>
    )
}
