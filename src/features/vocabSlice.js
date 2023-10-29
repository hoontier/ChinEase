//vocabSlice.js
import { createSlice } from '@reduxjs/toolkit';
import words from '../../words.json';

const initialState = {
  words: [],
  vocabListPart: '',
  vocabList: words.flatMap(vocab => Object.keys(vocab)),
  selectedVocabLists: [] 
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
        },        
        setVocabListPart: (state, action) => { // Add this reducer
          state.vocabListPart = action.payload;
        },  
        setSelectedVocabLists: (state, action) => {
          state.selectedVocabLists = action.payload;
        }        
    },
});

export const { setVocabList, setWords, setVocabListPart, setSelectedVocabLists } = vocabSlice.actions;

export const selectWords = (state) => state.vocab.words;
export const selectVocabListNames = (state) => state.vocab.vocabList; // selector to get the vocab list names
