import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import authApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import productApi from './features/product/productApi';
import reviewApi from './features/review/reviewApi';

export default configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productApi.reducerPath]: productApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware, reviewApi.middleware),
});