import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const searchProducts = createAsyncThunk(
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
      .addCase(searchProducts.pending, (state) => {
        state.status = 'loading';
        state.results = [];
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload.results;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
