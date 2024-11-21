// src/redux/slice/registerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerCustomer = createAsyncThunk(
  'register/registerCustomer',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/customer-register', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    registering: false,
    error: null,
    responseMessage: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerCustomer.pending, (state) => {
        state.registering = true;
        state.error = null;
        state.responseMessage = '';
      })
      .addCase(registerCustomer.fulfilled, (state, action) => {
        state.registering = false;
        state.responseMessage = action.payload.message;
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.registering = false;
        state.error = action.payload;
        state.responseMessage = action.payload.message;
      });
  },
});

export const selectRegistering = (state) => state.register.registering;
export const selectError = (state) => state.register.error;
export const selectResponseMessage = (state) => state.register.responseMessage;

export default registerSlice.reducer;
