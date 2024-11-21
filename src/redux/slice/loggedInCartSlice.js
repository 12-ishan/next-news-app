import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch cart items

export const fetchCartItems = createAsyncThunk(
  'loggedInCart/fetchCartItems',
  async (token) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/cart/fetch', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },

      });
      return response.data.cart; 
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

export const addToCartLoggedIn = createAsyncThunk(
  'loggedInCart/addToCartLoggedIn',
  async ({ product_id, variation_id, quantity, token }) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/cart/add',
        { product_id, variation_id, quantity },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        }
      );
     

      return response.data.cart; 
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

export const removeFromCart = createAsyncThunk(
    'loggedInCart/removeFromCart',
    async ({id, token}) => { 
     
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/v1/cart/remove/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        return response.data.cart; 
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



  export const updateCart = createAsyncThunk(
    'loggedInCart/updateCart',
    async ({ productDetail, quantity, token }) => {  
      try {
      
        const payload = {
          product_id: productDetail.id,  
          quantity: quantity
        };
  
        const response = await axios.post('http://127.0.0.1:8000/api/v1/cart/update', payload, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
  
        return response.data.cart; 
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
  


const loggedInCartSlice = createSlice({
  name: 'loggedInCart',
  initialState: {
    cart: [],
    totalAmount: 0,
    manageCartCount: 0,
    status: 'idle',
    error: null,
    loadingMessage: '',
  successMessage: '',
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload; 
       
        state.loadingMessage = '';
        state.successMessage = 'Added to cart!';
        
        state.manageCartCount = state.cart.length;
      
        
        // state.totalAmount = state.cart.reduce((total, item) => {
        //   return total + item.product.price * item.quantity;
        // }, 0);
        state.totalAmount = state.cart.reduce((total, item) => {
          const price = item.selected_variation && item.selected_variation.price ? item.selected_variation.price : item.product.price;
          return total + price * item.quantity;
        }, 0);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(addToCartLoggedIn.pending, (state) => {
        state.status = 'loading';
      })
       
      .addCase(addToCartLoggedIn.fulfilled, (state, action) => {
        
        state.status = 'succeeded';
        state.cart = action.payload; 
     
        state.manageCartCount = (state.manageCartCount) + 1;
        
      })
      .addCase(addToCartLoggedIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      builder
      .addCase(updateCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload; 
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      builder
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartData = action.payload; 
        
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default loggedInCartSlice.reducer;
