import React, { useEffect, useState, useRef } from 'react'
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
    const refCurrentKey = useRef("");
    const [cardList, setCardList] = useState([]);
    const [agrouppedCards, setAgrouppedCards] = useState({});

    const shuffleCards = () => {
        const shuffledCards =
            [...cards, ...cards, ...cards]
                .sort(() => Math.random() - 0.5)
                .map((card) => (
                    {
                        id: crypto.randomUUID(),
                        ...card,
                    }
                ));
        setCardList(shuffledCards);
    }

    const agroupCards = () => {
        const agroupped = cardList.reduce((acc, card) => {
            const key = card.key;
            const group = acc[key];
            acc[key] = group ? {
                ...group,
                items: [...group.items, { ...card, flipped: false }],
            } : {
                finished: false,
                items: [{ ...card, flipped: false }],
            }
            return acc;
        }, {});
        setAgrouppedCards(agroupped);
    }

    const handleFlipShowCard = (card) => {
        const group = agrouppedCards[card.key];
        const itemsUpdated = group.items.map((item) => (
            item.id === card.id ? {
                ...item,
                flipped: true,
            } : item
        ));
        const isAllFlipped = itemsUpdated.every(card => card.flipped);

        setAgrouppedCards({
            ...agrouppedCards,
            [card.key]: {
                finished: isAllFlipped,
                items: itemsUpdated,
            },
        });
        refCurrentKey.current = !isAllFlipped ? card.key : "";
    }

    const handleFlipHideCards = () => {
        const newAgrouppedValue = Object.keys(agrouppedCards)
            .reduce((acc, key) => {
                const group = agrouppedCards[key];
                acc[key] = !group.finished ? {
                    ...group,
                    items: group.items.map(card => ({ ...card, flipped: false })),
                } : group;
                return acc;
            }, {});

        setTimeout(() => {
            setAgrouppedCards(newAgrouppedValue);
            refCurrentKey.current = "";
        }, 1000);
    }

    const handleChoice = (card) => {
        if (
            !refCurrentKey.current ||
            refCurrentKey.current === card.key
        ) {
            handleFlipShowCard(card);
        } else {
            handleFlipHideCards();
        }
    }

    const cardIsFlipped = (card) => {
        const group = agrouppedCards[card.key];
        const isFlipped = group.items.find(c => c.id === card.id).flipped;
        return group.finished || isFlipped;
    }

    useEffect(() => {
        shuffleCards();
    }, []);

    useEffect(() => {
        cardList.length > 0 && agroupCards();
    }, [cardList]);

    return (
        <ul className="card-grid">
            {Object.keys(agrouppedCards).length > 0 && cardList.map((card, index) => (
                <Card
                    key={index}
                    card={card}
                    isFlipped={cardIsFlipped(card)}
                    handleChoice={handleChoice}
                />
            ))}
        </ul>
    )
}
