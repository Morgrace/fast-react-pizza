import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createOrder } from "../../services/apiRestaurant";
import { getCart, getTotalPrice } from "../cart/cartSelectors";
import { fetchAddress } from "../user/userSlice";
import {
  getUserAddress,
  getUserErrorMsg,
  getUserStatus,
} from "../user/userSelectors";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const formErrors = useActionData();
  const isSubmitting = navigation.state === "submitting";

  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const totalPriceToPay = withPriority
    ? totalPrice * (20 / 100) + totalPrice
    : totalPrice;

  const username = useSelector((state) => state.user.username);
  const userAddress = useSelector(getUserAddress);
  const userStatus = useSelector(getUserStatus);
  const userErrorMsg = useSelector(getUserErrorMsg);

  const isLoading = userStatus === "loading";
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="p-8 sm:p-16 md:p-20">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form className="flex flex-col gap-4" method="POST">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            defaultValue={username}
            type="text"
            name="customer"
            required
          />
        </div>

        <div
          className={`${formErrors?.phone ? "sm:items-baseline" : "sm:items-center"} flex flex-col gap-2.5 sm:flex-row`}
        >
          <label className="sm:basis-40">Phone number</label>
          <div className="sm:grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="my-2 rounded-md bg-red-200 px-4 py-2 text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <label
            className={`${userErrorMsg ? "self-baseline" : ""} sm:basis-40`}
          >
            Address
          </label>
          <div className="relative sm:grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={userAddress}
              required
            />
            {userErrorMsg && (
              <p className="my-2 rounded-md bg-red-200 px-4 py-2 text-red-700">
                please ensure you fill out this field!
              </p>
            )}
            {!userAddress && !userErrorMsg && (
              <button
                disabled={isLoading || isSubmitting}
                className="btn absolute top-[0.2rem] right-0.5 z-10 sm:top-[1px]"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get location
              </button>
            )}
          </div>
        </div>

        <div className="my-4 flex items-center gap-4">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-semibold" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button disabled={isSubmitting || isLoading} className="btn">
            {isSubmitting
              ? "Placing order . . ."
              : `Order now ${formatCurrency(totalPriceToPay)}`}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  // basically a recipe for getting data;
  //uses the formData method to the get data from the form
  const formData = await request.formData();
  // converts the data gotten from the formData to an actual object
  const data = Object.fromEntries(formData);

  const orderData = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  //error handling
  const errors = {};
  if (!isValidPhone(orderData.phone))
    errors.phone = "input correct phone number";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(orderData);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
  // return null;
}
export default CreateOrder;
