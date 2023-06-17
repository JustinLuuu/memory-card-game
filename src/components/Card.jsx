import React from 'react'

export const Card = ({ card, isFlipped, handleChoice }) => {

    const handleClickCard = () => {
        if (!isFlipped) {
            handleChoice(card);
        }
    }

    return (
        <li
            className={`card-grid-item ${isFlipped && "card-grid-item-flipped"}`}
            onClick={handleClickCard}
        >
            {
                isFlipped ? (
                    <img
                        src={card.src}
                        alt={card.key}
                        className="card-grid-item-img"
                    />
                ) : (
                    <img
                        src="src\assets\questionMark.png"
                        width={90}
                        height={90}
                        alt={card.key}
                    />
                )
            }

            {
                isFlipped &&
                <strong className="card-grid-item-key">
                    {card.key}
                </strong>
            }
        </li>
    )
}
