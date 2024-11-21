import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch cart items

export const fetchWishListItems = createAsyncThunk(
  'wishList/fetchWishListItems',
  async (token) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/wish-list/fetch', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },

      });
      console.log(response)
      return response.data.wishlist; 
    } catch (error) {
      if (error.response) {
        console.error('Failed to fetch cart items:', error.response.status, error.response.data);
      } else {
        console.error('Failed to fetch cart items:', error.message);
      }
      throw error;
    }
  }
);

export const addToWishList = createAsyncThunk(
  'wishList/addToWishList',
  async ({ product_id, variation_id, quantity, token }) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/wish-list/add',
        { product_id, variation_id, quantity },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        }
      );
      return response.data.wishList; 
    } catch (error) {
      if (error.response) {
        console.error('Failed to add to cart:', error.response.status, error.response.data);
      } else {
        console.error('Failed to add to cart:', error.message);
      }
      throw error;
    }
  }
);

export const removeFromWishList = createAsyncThunk(
    'wishList/removeFromWishList',
    async ({id, token}) => { 
     
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/v1/wish-list/remove/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        return response.data.wishlist; 
      } catch (error) {
        if (error.response) {
          console.error('Failed to remove from cart:', error.response.status, error.response.data);
        } else {
          console.error('Failed to remove from cart:', error.message);
        }
        throw error;
      }
    }
  );



 
  


const wishListSlice = createSlice({
  name: 'wishList',
  initialState: {
   wishlist: [],
   // totalAmount: 0,
   // manageCartCount: 0,
    status: 'idle',
    error: null,
  //   loadingMessage: '',
  // successMessage: '',
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishListItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishListItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishlist = action.payload; 
        console.log(state.wishlist)
  
      })
      .addCase(fetchWishListItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(addToWishList.pending, (state) => {
        state.status = 'loading';
      })
       
      .addCase(addToWishList.fulfilled, (state, action) => {
        
        state.status = 'succeeded';
        state.wishList = action.payload; 
     
        //state.manageCartCount = (state.manageCartCount) + 1;
        
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      builder
      .addCase(removeFromWishList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromWishList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishlist = state.wishlist.filter(item => item.id !== action.meta.arg.id);
      })
      .addCase(removeFromWishList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    
  },
});

export default wishListSlice.reducer;
