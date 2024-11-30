import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchNewsByCategory = createAsyncThunk(
  'news/fetchNewsByCategory',
  async ({ slug }) => {
    const response = await axios.get(`${apiUrl}/v1/get-news/${slug}`);
    console.log(response);
    return response.data; 
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    categorySlug: '',
    status: 'idle',
    error: null,
     
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload.news; 
        state.categorySlug = action.payload.categorySlug;
       
      })
      .addCase(fetchNewsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// export const { resetNews } = newsSlice.actions;

export default newsSlice.reducer;
