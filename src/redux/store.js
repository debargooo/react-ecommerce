import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import bestSellerReducer from './bestSellersSlice';
import searchReducer from './searchProductSlice';  
import productDetailsSlice from './productDetailsSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    best_sellers: bestSellerReducer,
    products: productsReducer,
    search: searchReducer, 
    productDetails: productDetailsSlice,
    cart: cartReducer,
    auth: authReducer
  },
});
