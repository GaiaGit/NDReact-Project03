import { AsyncStorage } from 'react-native';
import { FLASHCARDS_KEY, initlocalStorage } from './helpers';

// Reference: UdaciFitness Project

export function apiGetDecks() {
  return AsyncStorage.getItem(FLASHCARDS_KEY).then(decks => {
    return !decks ? initlocalStorage() : JSON.parse(decks);
  });
}

export function apiAddDeck(newDeck) {
  return AsyncStorage.mergeItem(FLASHCARDS_KEY, JSON.stringify(newDeck));
}

export function apiAddCard({deck, newCard}) {
  return AsyncStorage.getItem(FLASHCARDS_KEY, (e, localStorageData) => {
    const decks = JSON.parse(localStorageData);
    const deckData = JSON.stringify(decks[deck].questions);
    const deckCards = JSON.parse(deckData);
    deckCards[deckCards.length] = newCard;
    const cardData = { [deck]: {title: deck, questions: deckCards} };
    
    AsyncStorage.mergeItem(FLASHCARDS_KEY, JSON.stringify(cardData));
  });
}
