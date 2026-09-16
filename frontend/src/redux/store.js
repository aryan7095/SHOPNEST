import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Configures the Redux store, combining all reducers under their respective state keys.
// Currently only manages cart state (accessible as state.cart in useSelector calls)
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
