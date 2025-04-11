import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "./cartSelectors";
import EmptyCart from "./EmptyCart";
import { clearCart } from "./cartSlice";

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />;
  function handleClearCart() {
    dispatch(clearCart());
  }
  return (
    <div className="px-4 py-2">
      <Link className="link mb-8 inline-block" to="/menu">
        &larr; Back to menu
      </Link>

      <h2 className="text-2xl font-semibold">Your cart, {username}</h2>
      <ul className="my-8 divide-y divide-stone-300 border-b border-stone-300">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="space-x-4">
        <Link className="btn" to="/order/new">
          Order pizzas
        </Link>
        <button onClick={handleClearCart} className="btn--transparent">
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
