// matchSlice.js
// redux slice for a matching game, with the pinyin and simplified characters. 
// The slice will store the current game state, the current score, the time and the current game board.
// Remember to pull the vocab from vocabSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const matchWords = useSelector((state) => state.vocab.words);



export const matchSlice = createSlice({
    name: 'match',
    initialState: {
        words: matchWords,
        game: {
        board: [],
        score: 0,
        time: 0,
        state: 'idle',
        },
    },
    reducers: {
        startGame: (state, action) => {
        state.game = {
            score: 0,
            time: 0,
            state: 'playing',
          };
        },
        endGame: (state) => {
        state.game.state = 'ended';
        },
        incrementScore: (state) => {
        state.game.score += 1;
        },
        incrementTime: (state) => {
        state.game.time += 1;
        },
    },
    extraReducers: {
        [fetchVocab.fulfilled]: (state, action) => {
        state.game.board = action.payload;
        },
    },
    });

    export const { startGame, endGame, incrementScore, incrementTime } = matchSlice.actions;
    export default matchSlice.reducer;
