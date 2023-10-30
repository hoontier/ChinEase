//sqlTestSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to test the database connection
export const testDbConnection = createAsyncThunk('sqlTest/testDbConnection', async () => {
  const response = await axios.get('/api/test-db');
  return response.data;
});

const sqlTestSlice = createSlice({
  name: 'sqlTest',
  initialState: {
    status: 'idle',
    error: null,
    message: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(testDbConnection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(testDbConnection.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(testDbConnection.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default sqlTestSlice.reducer;