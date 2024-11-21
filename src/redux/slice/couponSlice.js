// src/redux/slice/registerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const coupon = createAsyncThunk(
  'coupon',
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/coupon', couponCode);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const couponSlice = createSlice({
  name: 'coupon',
  initialState: {
    amount: 0,
    applying: false,
    error: null,
    responseMessage: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(coupon.pending, (state) => {
        state.applying = true;
        state.error = null;
        state.responseMessage = '';
      })
      .addCase(coupon.fulfilled, (state, action) => {
        state.applying = false;
        state.amount = action.payload.amount;
        state.responseMessage = action.payload.message;
       
      })
      .addCase(coupon.rejected, (state, action) => {
        state.applying = false;
        state.error = action.payload;
        state.responseMessage = action.payload.message;
      });
  },
});

export const selectApplying = (state) => state.coupon.applying;
export const selectError = (state) => state.coupon.error;
export const selectResponseMessage = (state) => state.coupon.responseMessage;

export default couponSlice.reducer;
