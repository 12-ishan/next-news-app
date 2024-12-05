import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.API_URL;

export const fetchNewsByCategory = createAsyncThunk(
  'news/fetchNewsByCategory',
  async ({ slug, page }) => {
    try {
     
      const response = await axios.get(`${apiUrl}/v1/get-news/${slug}?page=${page}&perPage=2`);
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);


const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    currentPage: 1,
    totalPages: 1,
    categoryName: '',
    categorySlug: '',
    loading: false,
    error: null,
  },
  reducers: {
    resetNews: (state) => {
      state.news = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.categoryName = '';
      state.categorySlug = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsByCategory.fulfilled, (state, action) => {
        const { news, categoryName, categorySlug, totalPages, currentPage } = action.payload;

        state.loading = false;
        state.error = null;

        if (currentPage > 1) {
          state.news = [...state.news, ...news];  
        } else {
          state.news = news;  
        }

        state.currentPage = currentPage;
        state.totalPages = totalPages;
        state.categoryName = categoryName;
        state.categorySlug = categorySlug;
      })
    
      .addCase(fetchNewsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetNews } = newsSlice.actions;
export default newsSlice.reducer;
