import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/v1/contact';

export const storeContact = createAsyncThunk('contacts', async (contactData) => {
  const response = await axios.post(apiUrl, contactData);
  //console.log(response);
  return response.data;
});

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: '',
    error: null,
    loading: false, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(storeContact.pending, (state) => {
        state.status = 'loading';
        state.loading = true; 
      })
      .addCase(storeContact.fulfilled, (state) => {
        state.status = 'succeeded';
        state.loading = false; 
      })
      .addCase(storeContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading = false; 
      });
  },
});

export const selectLoading = (state) => state.contact.loading; 
//console.log(selectLoading);
export default contactSlice.reducer;
