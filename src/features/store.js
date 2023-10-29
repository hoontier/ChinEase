//store.js
import { configureStore } from '@reduxjs/toolkit';
import { vocabSlice } from './vocabSlice'; // Replace with your actual relative path

export const store = configureStore({
    reducer: {
        vocab: vocabSlice.reducer
    },
});