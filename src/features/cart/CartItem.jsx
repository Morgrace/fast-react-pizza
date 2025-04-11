import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateCartQty from "./UpdateCartQty";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="flex flex-wrap items-center justify-between gap-4 py-4">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center gap-2 sm:gap-4">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
        <UpdateCartQty pizzaId={pizzaId} quantity={quantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
