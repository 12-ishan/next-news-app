// src/redux/slice/registerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); 

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('http://127.0.0.1:8000/api/v1/checkout', orderData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const storePayment = createAsyncThunk(
//   'storePayment',
//   async (paymentData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/v1/store-payment', paymentData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const storePayment = createAsyncThunk(
  'order/storePayment',
  async (paymentData, { rejectWithValue }) => {
    try {
     
      const sessionId = localStorage.getItem('session_id');
      const cartItems = JSON.parse(localStorage.getItem('cartItems'));
      const totalAmount = localStorage.getItem('totalAmount');

      const response = await axios.post('http://127.0.0.1:8000/api/v1/success-payment', {
        ...paymentData,
        sessionId,
        cartItems,
        totalAmount
      });

      localStorage.removeItem('cartItems');
      localStorage.removeItem('totalAmount');
      localStorage.removeItem('session_id');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    ordering: false,
    error: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.ordering = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.ordering = false;
        state.order_id = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.ordering = false;
        state.error = action.payload;
      })
      .addCase(storePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(storePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(storePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default orderSlice.reducer;
