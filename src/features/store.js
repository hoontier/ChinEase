//store.js
import { configureStore } from '@reduxjs/toolkit';
import { vocabSlice } from './vocabSlice';
// import { matchSlice } from './matchSlice';
export const store = configureStore({
    reducer: {
        vocab: vocabSlice.reducer,
        // match: matchSlice.reducer,
    },
});