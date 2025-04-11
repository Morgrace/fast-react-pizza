import { createSelector } from "reselect";

const cartSelector = (state) => state.cart.cart;
export const getCart = createSelector([cartSelector], (cart) => cart);

export const getTotalQuantity = createSelector([getCart], (cart) => {
  if (!cart.length) return 0;
  return cart.reduce((sum, item) => sum + item.quantity, 0);
});
export const getTotalPrice = createSelector([getCart], (cart) => {
  if (!cart.length) return 0;
  return cart.reduce((sum, item) => sum + item.totalPrice, 0);
});
export const getCurrentPizzaQty = (id) =>
  createSelector(
    [getCart],
    (cart) => cart.find((item) => item.pizzaId === id)?.quantity ?? 0,
  );
