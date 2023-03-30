import React, { useEffect, useState } from 'react'
import { Card } from './Card'

const cards = [
    {
        key: "ball",
        src: "src/assets/ball.png"
    },
    {
        key: "clown",
        src: "src/assets/clown.png"
    },
    {
        key: "sun",
        src: "src/assets/sun.png"
    },
    {
        key: "robot",
        src: "src/assets/robot.png"
    },
];

export const CardsGrid = () => {
    const [cardList, setCardList] = useState([]);
    const [activeItems, setActiveItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);
    const [finishedItems, setFinishedItems] = useState([]);

    const formatCardList = () => {
        let cardsList = [...cards, ...cards, ...cards]
            .sort(() => Math.random() - 0.5)
            .map((card) => (
                {
                    ...card,
                    id: crypto.randomUUID(),
                })
            );

        setCardList(cardsList);
    }

    const handleChoice = (card) => {
        if (!visibleItems.includes(card.id)) {
            setActiveItems([...activeItems, card.key]);
            setVisibleItems([...visibleItems, card.id]);
        }
    }

    useEffect(() => {
        formatCardList();
    }, []);

    useEffect(() => {
        if (activeItems.length > 1) {
            const areEquals = activeItems.every(i => i === activeItems[0]);
            if (!areEquals) {
                setVisibleItems([]);
                setActiveItems([]);
            }
        }
    }, [activeItems]);

    return (
        <section className="card-grid">
            {cardList.map((card, index) => (
                <Card
                    key={index}
                    card={card}
                    isFlipped={visibleItems.includes(card.id) || finishedItems.includes(card.id)}
                    handleChoice={handleChoice}
                />
            ))}
        </section>
    )
}
