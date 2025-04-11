import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="px-6 py-4">
      <Link className="link" to="/menu">
        &larr; Back to menu
      </Link>

      <p className="mt-6 font-medium">
        Your cart is empty. Start adding some pizzas 🍕
      </p>
    </div>
  );
}

export default EmptyCart;
