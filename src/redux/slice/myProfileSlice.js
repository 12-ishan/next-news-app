import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfile = createAsyncThunk('fetchProfile', async (_, thunkAPI) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/my-profile', { withCredentials: true })
        .then(response => console.log(response))
        .catch(error => console.error(error));
        
        return response.data;
    } catch (error) {
        // Ensure error.response.data is an object with a 'message' property
        return thunkAPI.rejectWithValue(error.response ? error.response.data : { message: 'An error occurred' });
    }
});

const myProfileSlice = createSlice({
    name: 'myProfile',
    initialState: {
        customer: null,
        isAuth: '',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.isAuth = 'loading';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isAuth = 'succeeded';
                state.customer = action.payload.customer;
               
                state.error = null; 
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isAuth = 'failed';
                state.error = action.payload ? action.payload.message : 'An error occurred';
            });
    },
});

export default myProfileSlice.reducer;
