//wordsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface WordsState {
  words: { [key: string]: any }[];
  vocabList: string[];
}

// Initial state
const initialState: WordsState = {
  words: [],
  vocabList: [],
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    // Add a word to the words array
    addWord: (state, action: PayloadAction<{ [key: string]: any }>) => {
      state.words.push(action.payload);
    },

    // Remove a word from the words array by index
    removeWord: (state, action: PayloadAction<number>) => {
      state.words.splice(action.payload, 1);
    },

    // Add a vocabulary string to the vocabList array
    addVocab: (state, action: PayloadAction<string>) => {
      state.vocabList.push(action.payload);
    },

    // Remove a vocabulary string from the vocabList array by index
    removeVocab: (state, action: PayloadAction<number>) => {
      state.vocabList.splice(action.payload, 1);
    },

    // You can add more reducers if needed
  },
});

// Export actions for use in components and elsewhere
export const { addWord, removeWord, addVocab, removeVocab } = wordsSlice.actions;

// Export the reducer to be used in the store
export default wordsSlice.reducer;
