import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    selectedItem: {
      productId: null,
      name: null,
      image: null,
      price: null,
      inventory: null,
    },
  },
};

export const itemSlice = createSlice({
  name: "item",

  initialState,
  reducers: {
    // Update the information of the selected item
    selectItem: (state, action) => {
      state.value.selectedItem = {
        ...state.value.selectedItem,
        productId: action.payload.id,
        name: action.payload.name,
        image: action.payload.image,
        price: action.payload.price,
        inventory: action.payload.inventory,
      };
    },
    // Empty the reducer
    releaseItem: (state) => {
      state.value.selectedItem = {
        productId: null,
        name: null,
        image: null,
        price: null,
        inventory: null,
      };
    },
  },
});

export const { selectItem, releaseItem } = itemSlice.actions;
export default itemSlice.reducer;
