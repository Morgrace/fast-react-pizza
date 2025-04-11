import { createSelector } from "reselect";
const userAddressSelector = (state) => state.user.address;
const userPositionSelector = (state) => state.user.position;
const userStatusSelector = (state) => state.user.status;
const userErrorMsgSelector = (state) => state.user.error;

export const getUserAddress = createSelector(
  [userAddressSelector],
  (address) => address,
);
export const getUserStatus = createSelector(
  [userStatusSelector],
  (status) => status,
);
export const getUserErrorMsg = createSelector(
  [userErrorMsgSelector],
  (error) => error,
);
