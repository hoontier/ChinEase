//store.js
import { configureStore } from '@reduxjs/toolkit';
import { vocabSlice } from './vocabSlice';
export const store = configureStore({
    reducer: {
        vocab: vocabSlice.reducer,
    },
});