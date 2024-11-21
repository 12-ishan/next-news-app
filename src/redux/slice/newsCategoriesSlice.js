import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNewsCategories = createAsyncThunk(
  'newsCategory/fetchNewsCategories',
  async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/v1/news-category');
    return response.data.categories;
  }
);

const newsCategorySlice = createSlice({
  name: 'productCategory',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewsCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
       
      })
      .addCase(fetchNewsCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default newsCategorySlice.reducer;
