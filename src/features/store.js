//store.js
import { configureStore } from '@reduxjs/toolkit';
import { vocabSlice } from './vocabSlice'; 
import sqlTestSlice from './sqlTestSlice'; 

export const store = configureStore({
    reducer: {
        vocab: vocabSlice.reducer,
        sqlTest: sqlTestSlice.reducer,
    },
});