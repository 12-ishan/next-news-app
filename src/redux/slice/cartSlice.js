import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const loadCartFromLocalStorage = () => {

  // if (typeof window === 'undefined') {
  //   return { cartItems: [], totalAmount: 0, sessionId: null }; // Fallback for server-side
  // }

  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 0;
  const sessionId = localStorage.getItem('session_id') || null;
  return { cartItems, totalAmount, sessionId };
};



export const syncCart = createAsyncThunk(
  'syncCart',
  async (cart) => {
    const sessionId = localStorage.getItem('session_id') || null;
    const response = await axios.post('http://127.0.0.1:8000/api/v1/cart/sync', {
      cart,
      sessionId,
      withCredentials: true,
    });
    return response.data;
  }
);

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // cartSlice.js

    storeInCart(state, action) {
      const { productDetail, productVariation, quantity } = action.payload;
      const qty = Number(quantity) || 1;
    
      const isVariationProduct = productDetail.type === 1;

      let attributes = [];
    
      // Check if productVariation exists and has attributes
      const variationAttributes = isVariationProduct && productVariation 
        ? productVariation.attribute || [] // Default to empty array if attribute is undefined
        : [];

    
      // Map attributes correctly
      if (isVariationProduct && productVariation) {
      const attributes = variationAttributes.attribute.length > 0
        ? variationAttributes.attribute.map(attr => ({
            attribute_name: attr.attribute_name || "Unknown", // Default name
            option_name: attr.option_name || "Unknown", // Default option
          }))
        : []; 
        }// Keep it empty if no attributes are available
    
      // Determine price based on variation
      const price = isVariationProduct && productVariation?.price
          ? Number(productVariation.price)
          : Number(productDetail.price);
    
      // Check if product already exists in the cart
      const existingProduct = state.cartItems.find(item =>
        item.product_id === productDetail.id && 
        (!isVariationProduct || item.variation_id === productVariation.id)
      );
    
      if (existingProduct) {
        // Update existing product quantity and total price
        existingProduct.quantity += qty;
        existingProduct.total_price += price * qty;
      } else {
        // Create a new cart item
        const newCartItem = {
          product_id: productDetail.id,
          product_name: productDetail.name,
          product_image: productDetail.image,
          product_price: price,
          total_price: price * qty,
          quantity: qty,
          type: productDetail.type,
          variation_id: isVariationProduct ? productVariation.id : null, // Store variation ID
          attributes, // Store mapped attributes
        };
    
        // Add new cart item to the state
        state.cartItems.push(newCartItem);
      }
    
      // Update total amount in the state
      state.totalAmount += price * qty;
    
      // Persist cart items and total amount in local storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    },
    
    
    
    
    

    updateGuestCart(state, action) {
      const { productId, newQuantity, productVariation } = action.payload;

      const isVariationProduct = productVariation !== undefined;
      const variationKey = isVariationProduct
        ? productVariation.attribute.map(attr => `${attr.attribute_name}:${attr.option_name}`).join(', ')
        : null;

      const productToUpdate = state.cartItems.find(item =>
        item.product_id === productId && (!isVariationProduct || item.variation_key === variationKey)
      );

      if (productToUpdate) {
        const oldTotalPrice = productToUpdate.total_price;

        const price = isVariationProduct && productVariation?.price
          ? Number(productVariation.price)
          : productToUpdate.product_price;

        // Update product quantity and total price
        productToUpdate.quantity = newQuantity;
        productToUpdate.total_price = price * newQuantity;

        // Adjust the total amount
        state.totalAmount += productToUpdate.total_price - oldTotalPrice;

        // Persist the updated cart in localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      }
    },


    removeFromCartForGuestCustomer(state, action) {
      const itemToRemove = state.cartItems.find(
        (item) => item.product_id === action.payload
      );

      if (itemToRemove) {
        state.totalAmount -= itemToRemove.total_price;
        state.cartItems = state.cartItems.filter(
          (item) => item.product_id !== action.payload
        );
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));

      if (state.cartItems.length === 0) {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('totalAmount');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(syncCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const sessionId = action.payload.response;
        if (sessionId) {
          localStorage.setItem('session_id', sessionId);
        }
      })
      .addCase(syncCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { storeInCart, updateGuestCart, removeFromCartForGuestCustomer } = cartSlice.actions;
export default cartSlice.reducer;
