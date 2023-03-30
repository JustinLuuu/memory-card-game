import React, { useState } from 'react'

export const Card = ({ card, isFlipped, handleChoice }) => {

    const handleClickCard = () => {
        handleChoice(card);
    }

    return (
        <article
            className={`card-grid-item ${isFlipped && "card-grid-item-flipped"}`}
            onClick={handleClickCard}
        >
            {
                isFlipped ? (
                    <img
                        src={card.src}
                        width={90}
                        height={90}
                        alt="front-image-card"
                    />
                ) : (
                    <img
                        src="src\assets\questionMark.png"
                        width={90}
                        height={90}
                        alt="back-image-card"
                    />
                )
            }
        </article>
    )
}
