import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    customer_email: null,
    customer_name: null,
    total_price: 0,
    items: [],
  },
};

export const cartSlice = createSlice({
  name: "cart",

  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { productId, quantity, price, name } = action.payload;

      // Check product already in the cart
      const existingProductIndex = state.value.items.findIndex(
        (item) => item.productId === productId
      );

      if (existingProductIndex !== -1) {
        // Update the quantity if already in the cart
        state.value.items[existingProductIndex].quantity += quantity;
      } else {
        // Add product if not in the cart
        state.value.items.push({ productId, quantity, price, name });
      }

      // Update total_price based on the added product
      state.value.total_price += quantity * price;
    },
    removeProduct: (state, action) => {
      const { productId } = action.payload;

      // Find the index of the product in the items array
      const productIndex = state.value.items.findIndex(
        (item) => item.productId === productId
      );

      if (productIndex !== -1) {
        // If the product is found, update total_price and remove the product from the items array
        const { quantity, price } = state.value.items[productIndex];
        state.value.total_price -= quantity * price;
        state.value.items.splice(productIndex, 1);
      }
    },
    setCustomerInfo: (state, action) => {
      const { customer_email, customer_name } = action.payload;
      state.value.customer_email = customer_email;
      state.value.customer_name = customer_name;
    },
    emptyCart: (state) => {
      // Reset the cart to its initial state
      state.value = {
        customer_email: null,
        customer_name: null,
        total_price: 0,
        items: [],
      };
    },
  },
});

export const { addProduct, removeProduct, setCustomerInfo, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
