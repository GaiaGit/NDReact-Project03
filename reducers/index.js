import { GET_DECKS, ADD_DECK, ADD_CARD } from '../actions/types';

function decks(state = {}, action) {

  switch (action.type) {

    case GET_DECKS:
        return {...state, ...action.decks};

    case ADD_DECK:
        return {...state, ...action.deck};

    case ADD_CARD:
        const {title, questions, question, answer} = action.card;
        const cardData = {question, answer};
        const card = JSON.parse(JSON.stringify(questions)).concat([cardData]);
        
        return {
          ...state,
          [title]: {
            ...state[title],
            questions: card
          }
        };

    default:
        return state;
  }
}

export default decks;
