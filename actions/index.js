import { GET_DECKS, ADD_DECK, ADD_CARD } from './types';

export const getDecks = decks => ({
    type: GET_DECKS,
    decks
});

export const addDeck = deck => ({
    type: ADD_DECK,
    deck
});

export const addCard = card => ({
    type: ADD_CARD,
    card
});
