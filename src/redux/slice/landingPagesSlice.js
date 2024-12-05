// landingPagesSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.API_URL;

export const landingPages = createAsyncThunk('landingPages/fetch', async (slug, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/v1/landing-pages/${slug}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const landingPagesSlice = createSlice({
  name: 'landingPage',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(landingPages.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(landingPages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(landingPages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch data';
      });
  },
});

export default landingPagesSlice.reducer;
