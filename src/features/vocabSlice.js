//vocabSlice.js
import { createSlice } from '@reduxjs/toolkit';
import words from '../../words.json';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];  // Swap the elements
  }
}


const initialState = {
  words: [],
  activeCards: [],
  vocabListPart: '',
  vocabList: words.flatMap(vocab => Object.keys(vocab)),
  selectedVocabLists: [],
  currentCard: 0,
  isFlipped: false,
  isRandom: false,
  isFlashcardsView: false,
  isMenuHidden: false
};


export const vocabSlice = createSlice({
    name: 'vocab',
    initialState,
    reducers: {
        setVocabList: (state, action) => {
            state.vocabList = action.payload;
        },
        setWords: (state, action) => {
          const vocabNamesInput = action.payload;
          const mergedWords = [];
        
          // Ensure vocabNames is always an array
          const vocabNames = Array.isArray(vocabNamesInput) ? vocabNamesInput : [vocabNamesInput];
        
          vocabNames.forEach(vocabName => {
            const vocabItem = words.find(vocab => vocab[vocabName]);
            if (vocabItem) {
              mergedWords.push(...vocabItem[vocabName]);
            } else {
              console.error(`Vocab list name "${vocabName}" not found in words.json.`);
            }
          });
        
          if (mergedWords.length > 0) {
            const totalWords = mergedWords.length;
            const splitIndex = Math.floor(totalWords / 2);
        
            switch(state.vocabListPart) {
              case 'firstHalf':
                state.words = mergedWords.slice(0, splitIndex);
                break;
              case 'secondHalf':
                state.words = mergedWords.slice(splitIndex);
                break;
              case 'all':
              default:
                state.words = mergedWords; // Keep the whole list
                break;
            }
          } else {
            state.words = [];
          }
          state.activeCards = state.words; // Set activeCards whenever words are set
        },
        removeActiveCard: (state, action) => {
          if (state.currentCard >= 0 && state.currentCard < state.activeCards.length) {
              state.activeCards.splice(state.currentCard, 1);
              if (state.currentCard >= state.activeCards.length && state.activeCards.length > 0) {
                  state.currentCard = state.activeCards.length - 1;
              }
          }
        },      
        setVocabListPart: (state, action) => { // Add this reducer
          state.vocabListPart = action.payload;
        },  
        setSelectedVocabLists: (state, action) => {
          state.selectedVocabLists = action.payload;
        },
        setCurrentCard: (state, action) => {
          state.currentCard = action.payload;
        },
        toggleRandom: (state) => {
            state.isRandom = !state.isRandom;
        },
        randomizeActiveCards: (state) => {
          shuffleArray(state.activeCards);
          state.currentCard = 0; // Optional: Reset the current card to the first position after shuffling
        },      
        setFlipped: (state, action) => {
            state.isFlipped = action.payload;
        },
        resetVocabWords: (state) => {
          const vocabNames = state.selectedVocabLists;
          const mergedWords = [];
      
          vocabNames.forEach(vocabName => {
              const vocabItem = words.find(vocab => vocab[vocabName]);
              if (vocabItem) {
                  mergedWords.push(...vocabItem[vocabName]);
              } else {
                  console.error(`Vocab list name "${vocabName}" not found in words.json.`);
              }
          });
      
          if (mergedWords.length > 0) {
              const totalWords = mergedWords.length;
              const splitIndex = Math.floor(totalWords / 2);
      
              switch(state.vocabListPart) {
                  case 'firstHalf':
                      state.words = mergedWords.slice(0, splitIndex);
                      break;
                  case 'secondHalf':
                      state.words = mergedWords.slice(splitIndex);
                      break;
                  case 'all':
                  default:
                      state.words = mergedWords; // Keep the whole list
                      break;
              }
          } else {
              state.words = [];
          }
      
          state.activeCards = state.words; // Set activeCards whenever words are reset
          state.currentCard = 0; // Reset the current card index to the first position
          state.isFlipped = false; // Ensure card is not flipped
        } ,
        setIsFlashcardsView: (state, action) => {
          state.isFlashcardsView = !state.isFlashcardsView;
        },
        setIsMenuHidden: (state, action) => {
          state.isMenuHidden = !state.isMenuHidden;
        }
    }
});


export const { setVocabList, setWords, removeActiveCard, setVocabListPart, setSelectedVocabLists, setCurrentCard, setFlipped, toggleRandom, randomizeActiveCards, resetVocabWords, setIsFlashcardsView, setIsMenuHidden } = vocabSlice.actions;

export const selectWords = state => state.vocab.words;
export const selectActiveCards = state => state.vocab.activeCards; 
export const selectVocabList = state => state.vocab.vocabList;
export const selectSelectedVocabLists = state => state.vocab.selectedVocabLists;
export const selectCurrentCard = state => state.vocab.currentCard;
export const selectIsFlipped = state => state.vocab.isFlipped;
export const selectIsRandom = state => state.vocab.isRandom;
export const selectVocabListPart = state => state.vocab.vocabListPart; 
export const selectVocabListNames = state => state.vocab.vocabList;
export const selectIsFlashcardsView = state => state.vocab.isFlashcardsView;
export const selectIsMenuHidden = state => state.vocab.isMenuHidden;