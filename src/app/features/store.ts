//store.ts
import { configureStore } from '@reduxjs/toolkit';
import wordsReducer from './wordsSlice';  // Assuming wordsSlice.ts is in the same directory as store.ts

const store = configureStore({
  reducer: {
    words: wordsReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
