import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { getTotalPrice } from "./cartSelectors";
import { getTotalQuantity } from "./cartSelectors";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalPrice = useSelector(getTotalPrice);
  const totalQty = useSelector(getTotalQuantity);
  if (!totalPrice || !totalQty) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm text-stone-300 uppercase sm:p-6 md:text-base">
      <p className="space-x-4 sm:space-x-6">
        <span>{totalQty} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link className="text-stone-200" to="/cart">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
