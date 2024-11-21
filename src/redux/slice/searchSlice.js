import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const searchProducts = createAsyncThunk(
  'search/searchProducts',
  async (searchQuery) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/search?query=${searchQuery}`);
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
