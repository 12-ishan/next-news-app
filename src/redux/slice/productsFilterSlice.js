import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductsByfilter = createAsyncThunk(
  'products/fetchProductsByfilter',
  async ({ slug, optionId }) => {
    console.log("Selected Option ID:", optionId);
    
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/get-filtered-products/${slug}/${optionId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch filtered products');
    }
  }
);


const productsFilterSlice = createSlice({
  name: 'products',
  initialState: {
    filteredproducts: [],
    categorySlug: '', 
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByfilter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByfilter.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.filteredproducts = Array.isArray(action.payload.products) ? action.payload.products : []; 
        state.categorySlug = action.payload.categorySlug; 
        
      })
      .addCase(fetchProductsByfilter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsFilterSlice.reducer;
