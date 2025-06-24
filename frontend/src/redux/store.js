import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import authApi from './auth/authApi'
import authReducer from './auth/authSlice'

export default configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});