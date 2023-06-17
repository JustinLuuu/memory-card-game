import React, { useContext, useEffect, useState, useRef } from 'react';
import { Card } from './Card';
import { fetchRandomUsers } from '../helpers/fetchRandomUsers';
import GameContext from './context/GameContext';
// import cardsMock from "../mocks/cards.json";

export const CardsGrid = () => {
    const { addNumberMoves } = useContext(GameContext);

    const refCurrentKey = useRef("");
    const refClickDisabled = useRef(false);
    const [cardList, setCardList] = useState([]);
    const [agrouppedCards, setAgrouppedCards] = useState({});

    const handleDisableClick = () => {
        refClickDisabled.current = true;
    }

    const handleAbleClick = () => {
        refClickDisabled.current = false;
    }

    const shuffleCards = async () => {
        const cards = await fetchRandomUsers();
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

    const handleFlipShowCard = (card, isFailed) => {
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

        if (!isFailed) {
            refCurrentKey.current = !isAllFlipped ? card.key : "";
        }

        if (isAllFlipped) {
            addNumberMoves();
        }
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

        handleDisableClick();
        setTimeout(() => {
            refCurrentKey.current = "";
            setAgrouppedCards(newAgrouppedValue);
            handleAbleClick();
            addNumberMoves();
        }, 1000);
    }

    const handleChoice = (card) => {
        if (refClickDisabled.current) {
            return;
        }

        const isFailed = (
            refCurrentKey.current &&
            refCurrentKey.current !== card.key
        );

        handleFlipShowCard(card, isFailed);
        isFailed && handleFlipHideCards();
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
