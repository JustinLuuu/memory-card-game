import React, { useContext } from 'react'
import GameContext from '../context/GameContext';

export const Header = () => {
    const { numberErrors } = useContext(GameContext);

    return (
        <header>
            <h2 className="record-section-title">
                RECORD
            </h2>

            <p className="record-section-sub">
                You found all the pairs with: {numberErrors} errors
            </p>
        </header>
    )
}
