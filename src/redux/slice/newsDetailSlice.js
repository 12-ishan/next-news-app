import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNewsDetails = createAsyncThunk(
  'news/fetchNewsDetails',
  async ({slug }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/news-detail/${slug}`);
      
      return response.data.response;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


const newsDetailSlice = createSlice({
  name: 'newsDetail',
  initialState: {
    newsDetail: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewsDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.newsDetail = action.payload.news.newsDetails;
      })
      .addCase(fetchNewsDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  },
});

export default newsDetailSlice.reducer;
