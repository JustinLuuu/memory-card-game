import React, { useContext } from 'react'
import { CardsGrid } from './cards/CardsGrid';
import { useDelayUnmount } from '../hooks/useDelayUnmount';
import GameContext from './context/GameContext';
import { RecordSection } from './success/RecordSection';

export const MainContent = () => {
    const { isWinner } = useContext(GameContext);
    const shouldRenderChild = useDelayUnmount(isWinner, 500);
    const mountedStyle = { animation: "inAnimation 500ms ease-in" };
    const unmountedStyle = { animation: "outAnimation 510ms ease-in" };

    return (
        <main className="main">
            {
                !shouldRenderChild ? (
                    <CardsGrid styleProps={isWinner ? unmountedStyle : mountedStyle} />
                ) : (
                    <RecordSection styleProps={isWinner ? mountedStyle : unmountedStyle} />
                )
            }
        </main>
    )
}
