import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const updatedCart = {
        ...action.payload,
        totalPrice: action.payload.unitPrice * action.payload.quantity,
      };
      state.cart.push(updatedCart);
    },
    increaseQty(state, action) {
      const pizzaItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      pizzaItem.quantity++;
      pizzaItem.totalPrice = pizzaItem.quantity * pizzaItem.unitPrice;
    },
    decreaseQty(state, action) {
      const pizzaItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      if (pizzaItem.quantity < 2)
        return cartSlice.caseReducers.deleteItem(state, action);
      pizzaItem.quantity--;
      pizzaItem.totalPrice = pizzaItem.quantity * pizzaItem.unitPrice;
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItem, clearCart, increaseQty, decreaseQty } =
  cartSlice.actions;
export default cartSlice.reducer;
