import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchOrderDetails = createAsyncThunk('order/fetchOrderDetails', async ({id}) => {
    try {
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        
        // Perform the request with the Bearer token and Accept header
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/order-details/${id}`, {
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

// Thunk for fetching order details
// export const fetchOrderDetails = createAsyncThunk(
//   'order/fetchOrderDetails',
//   async ({ order_id }, thunkAPI) => {
//     try {
//         const token = localStorage.getItem('token');
        
//       const response = await axios.get(`http://127.0.0.1:8000/api/v1/order-details/${order_id}`), {headers: {
//         'Authorization': `Bearer ${token}`,
//         'Accept': 'application/json',
//     },}; 
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data); 
//     }
//   }
// );

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderData: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderData = action.payload.orderDetail;
       
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default orderSlice.reducer;
