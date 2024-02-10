//vocabSlice.js
import { createSlice } from '@reduxjs/toolkit';
import words from '../../words.json';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];  // Swap the elements
  }
}

function createWordGroups(words, groupSize = 7) {
  let groups = [];
  for (let i = 0; i < words.length; i += groupSize) {
    groups.push(words.slice(i, i + groupSize));
  }
  return groups;
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
  view: 'list',
  isMenuHidden: false,
  isShowingTraditionalDifferences: false
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
        
          // Update state.words with all merged words
          state.words = mergedWords;
        
          // Update activeCards based on vocabListPart
          if (state.vocabListPart.startsWith('group')) {
            const groupIndex = parseInt(state.vocabListPart.replace('group', ''), 10) - 1;
            const wordGroups = createWordGroups(mergedWords);
            state.activeCards = wordGroups[groupIndex] || [];
          } else {
            // Calculate splitIndex for 'firstHalf' and 'secondHalf'
            const splitIndex = Math.floor(mergedWords.length / 2);
        
            switch (state.vocabListPart) {
              case 'firstHalf':
                state.activeCards = mergedWords.slice(0, splitIndex);
                break;
              case 'secondHalf':
                state.activeCards = mergedWords.slice(splitIndex);
                break;
              case 'all':
              default:
                state.activeCards = mergedWords; // Default to showing all words
                break;
            }
          }
        },               
        removeActiveCard: (state, action) => {
          if (state.currentCard >= 0 && state.currentCard < state.activeCards.length) {
            state.activeCards.splice(state.currentCard, 1);
            // Reset currentCard to 0 if it exceeds the length of the modified activeCards
            if (state.currentCard >= state.activeCards.length) {
              state.currentCard = 0;
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
        setView: (state, action) => {
          state.view = action.payload;
        },
        setIsMenuHidden: (state, action) => {
          state.isMenuHidden = !state.isMenuHidden;
        },
        setIsShowingTraditionalDifferences: (state, action) => {
          state.isShowingTraditionalDifferences = !state.isShowingTraditionalDifferences;
        },
        filterTraditionalDifferences: (state) => {
          if (state.isShowingTraditionalDifferences) {
              state.activeCards = state.activeCards.filter((card) => {
                  return card.simplified !== card.traditional;
              });
          } else {
              state.activeCards = state.words;
          }
      },
    }
});


export const { setVocabList, setWords, removeActiveCard, setVocabListPart, setSelectedVocabLists, setCurrentCard, setFlipped, toggleRandom, randomizeActiveCards, resetVocabWords, setView, setIsMenuHidden, filterTraditionalDifferences, setIsShowingTraditionalDifferences } = vocabSlice.actions;

export const selectWords = state => state.vocab.words;
export const selectActiveCards = state => state.vocab.activeCards; 
export const selectVocabList = state => state.vocab.vocabList;
export const selectSelectedVocabLists = state => state.vocab.selectedVocabLists;
export const selectCurrentCard = state => state.vocab.currentCard;
export const selectIsFlipped = state => state.vocab.isFlipped;
export const selectIsRandom = state => state.vocab.isRandom;
export const selectVocabListPart = state => state.vocab.vocabListPart; 
export const selectVocabListNames = state => state.vocab.vocabList;
export const selectView = state => state.vocab.view;
export const selectIsMenuHidden = state => state.vocab.isMenuHidden;
export const selectIsShowingTraditionalDifferences = state => state.vocab.isShowingTraditionalDifferences;