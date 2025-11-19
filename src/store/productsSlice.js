import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    searchTerm: '',
    selectedCategory: 'all' // 'all', 'cosmetics', 'furniture', 'vegetables'
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    }
  }
});

export const { setSearchTerm, setSelectedCategory } = productsSlice.actions;

export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectSelectedCategory = (state) => state.products.selectedCategory;

export default productsSlice.reducer;
