import { createSlice } from '@reduxjs/toolkit';

// Initialize cart state from localStorage (if present), so a page refresh
// doesn't lose the user's cart contents
const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

// Redux slice managing the shopping cart: items, quantities, and persistence to localStorage
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Adds a new item to the cart, or replaces the existing entry for that product
    // if it's already present (used both for adding and for updating quantity —
    // see Cart.jsx's handleUpdateQty, which re-dispatches this with an updated qty)
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.productId === item.productId);
      if (existItem) {
        // Replace the existing item entirely with the new payload (e.g. updated qty)
        state.cartItems = state.cartItems.map((x) =>
          x.productId === existItem.productId ? item : x
        );
      } else {
        // New product — add it to the cart
        state.cartItems.push(item);
      }
      // Persist the updated cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    // Removes an item from the cart entirely by its productId
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.productId !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    // Empties the cart completely (e.g. after a successful order) and clears localStorage
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
