// src/redux/slice/registerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.API_URL;

export const generalSettings = createAsyncThunk(
  'settings/generalSettings',
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/v1/home`);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const websiteLogo = createAsyncThunk(
  'logo/websiteLogo',
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/v1/website-logo`);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const generalSettingsSlice = createSlice({
  name: 'settings',
  initialState: {
    data: [],
    websiteLogo: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generalSettings.pending, (state) => {
        state.status = 'loading';
        state.data = [];
      })
      .addCase(generalSettings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(generalSettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(websiteLogo.pending, (state) => {
        state.status = 'loading';
        state.websiteLogo = [];
      })
      .addCase(websiteLogo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.websiteLogo = action.payload.data;
      })
      .addCase(websiteLogo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});





export default generalSettingsSlice.reducer;
