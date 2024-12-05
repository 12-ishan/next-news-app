import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.API_URL;

export const newsSearch = createAsyncThunk(
  'search/searchProducts',
  async (searchQuery) => {
    const response = await axios.get(`${apiUrl}/v1/search?query=${searchQuery}`);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newsSearch.pending, (state) => {
        state.status = 'loading';
        state.results = [];
      })
      .addCase(newsSearch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload.results;
      })
      .addCase(newsSearch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
