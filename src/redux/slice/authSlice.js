import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//import Cookies from 'js-cookie';

const getCsrfToken = async () => {
    try {
      await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });
    } catch (error) {
      console.error('Error retrieving CSRF token:', error);
      throw error;
    }
  };

export const login = createAsyncThunk('auth/login', async (credentials) => {
    try{

       
    const response = await axios.post('http://127.0.0.1:8000/api/v1/customer-login', credentials);

    return response.data;
    }
    catch(error){
        if (error.response) {
            console.error('Failed to login:', error.response.status, error.response.data);
        } else {
            console.error('Failed to login:', error.message);
        }
        throw error;
    }
});




export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        
        // Perform the request with the Bearer token and Accept header
        const response = await axios.post(
            'http://127.0.0.1:8000/api/v1/logout',
            {}, // No data to send in the body for logout, so this is an empty object
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                
            }
        );
        
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Failed to fetch profile:', error.response.status, error.response.data);
        } else {
            console.error('Failed to fetch profile:', error.message);
        }
        throw error;
    }
});





export const fetchProfile = createAsyncThunk('auth/fetchProfile', async () => {
    try {
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        
        // Perform the request with the Bearer token and Accept header
        const response = await axios.get('http://127.0.0.1:8000/api/v1/my-profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
          //  withCredentials: true, // Ensure credentials (cookies) are sent with the request
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Failed to fetch profile:', error.response.status, error.response.data);
        } else {
            console.error('Failed to fetch profile:', error.message);
        }
        throw error;
    }
});

// Define your localStorage token key
const localStorageTokenKey = 'token';

// Fetch token from localStorage
const initialToken = localStorage.getItem(localStorageTokenKey) || null;
//const initialToken = typeof window !== 'undefined' ? localStorage.getItem(localStorageTokenKey) : null;


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        customer: {},
        orders: {},
        token: initialToken !== null ? initialToken : null, // Set token only if it's present,
        status: 'idle',
        error: null,
       // token: null,
    },
    reducers: {
        resetToken: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder

        .addCase(login.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.customer = action.payload.customer;
            state.token = action.payload.token;

            localStorage.setItem("token", action.payload.token);

        })
        .addCase(logout.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.token = '';

            localStorage.removeItem("token");

        })

            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.customer = action.payload.customer;
                state.orders = action.payload.orders;
                state.status = 'succeeded';
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export the resetToken action so it can be dispatched from components
export const { resetToken } = authSlice.actions;

export default authSlice.reducer;
