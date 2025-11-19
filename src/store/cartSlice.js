import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [] // {id, title, price, thumbnail, quantity}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1
        });
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    increaseQuantity(state, action) {
      const id = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (existing) existing.quantity += 1;
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotalQuantity = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export default cartSlice.reducer;
