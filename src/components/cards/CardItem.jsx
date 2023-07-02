import React from 'react'

export const CardItem = ({
    card,
    color,
    isFlipped,
    handleChoice
}) => {

    const handleClickCard = () => {
        if (!isFlipped) {
            handleChoice(card);
        }
    }

    return (
        <li
            className={`card-grid-item ${isFlipped && "card-grid-item-flipped"}`}
            style={{ ...(isFlipped && { backgroundColor: color }) }}
            onClick={handleClickCard}
        >
            {
                isFlipped ? (
                    <img
                        src={card.src}
                        alt="card-front"
                        className="card-grid-item-img"
                    />
                ) : (
                    <img
                        src="/questionMark.png"
                        width={90}
                        height={90}
                        alt="card-back"
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
