import React, { useContext, useEffect, useState, useRef } from 'react';
import { CardItem } from './CardItem';
import { fetchRandomUsers } from '../../helpers/fetchRandomUsers';
import GameContext from '../context/GameContext';
import { useAbleClick } from '../../hooks/useAbleClick';
// import cardsMock from "../../mocks/cards.json";
import { Loader } from '../Loader';

export const CardsGrid = ({ styleProps }) => {
    const { addNumberMoves, addNumberErrors, declareWinner } = useContext(GameContext);
    const refCurrentKey = useRef("");
    const [cardList, setCardList] = useState([]);
    const [agrouppedCards, setAgrouppedCards] = useState({});
    const [refClickDisabled, handleDisableClick, handleAbleClick] = useAbleClick();
    const isCardsAgroupped = (Object.keys(agrouppedCards).length > 0);

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
        const colors = ["#F8A1A4", "#FFCCA9", "#98E0AD", "#94D8F6"];
        let indexColor = 0;

        const agroupped = cardList.reduce((acc, card) => {
            const key = card.key;
            const group = acc[key];
            acc[key] = group ? {
                ...group,
                items: [...group.items, { ...card, flipped: false }],
            } : {
                finished: false,
                color: colors[indexColor++],
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
                ...agrouppedCards[card.key],
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
            addNumberErrors();
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

    const handleCheckWin = () => {
        const allGroupFinished = Object.keys(agrouppedCards)
            .every((key) => agrouppedCards[key].finished);
        allGroupFinished && declareWinner();
    }

    const returnColor = (card) => {
        const group = agrouppedCards[card.key];
        return group.color;
    }

    const returnIsFlipped = (card) => {
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

    useEffect(() => {
        isCardsAgroupped && handleCheckWin();
    }, [agrouppedCards]);

    return (
        isCardsAgroupped ? (
            <ul
                className="card-grid"
                style={styleProps}
            >
                {
                    isCardsAgroupped && cardList.map((card) => (
                        <CardItem
                            key={card.id}
                            card={card}
                            color={returnColor(card)}
                            isFlipped={returnIsFlipped(card)}
                            handleChoice={handleChoice}
                        />
                    ))
                }
            </ul>
        ) : (
            <Loader />
        )
    )
}
