import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { addItem } from "../cart/cartSlice";
import UpdateCartQty from "../cart/UpdateCartQty";
import { getCurrentPizzaQty } from "../cart/cartSelectors";
import DeleteItem from "../cart/DeleteItem";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const memoizedSelector = useMemo(() => getCurrentPizzaQty(id), [id]);

  const currentPizzaQty = useSelector(memoizedSelector);

  const isInCart = currentPizzaQty > 0;

  const dispatch = useDispatch();

  function handleAddItem() {
    const item = {
      pizzaId: id,
      name,
      unitPrice,
      ingredients,
      soldOut,
      quantity: 1,
    };
    dispatch(addItem(item));
  }
  return (
    <li
      className={`flex items-center gap-4 p-2 ${soldOut ? "opacity-80 grayscale" : ""}`}
    >
      <img className="h-24 rounded-xs" src={imageUrl} alt={name} />
      <div className="xs:text-sm flex grow flex-col gap-1 py-1 text-xs">
        <p className="xs:text-base text-sm font-medium">{name}</p>
        <p className="capitalize italic">{ingredients.join(", ")}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-1 font-medium">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-stone-500 uppercase">Sold out</p>
          )}
          {!soldOut && !isInCart && (
            <div className="flex gap-2">
              {/* <UpdateCartQty /> */}
              <button
                onClick={handleAddItem}
                className="btn xs:py-2 xs:px-4 px-2 py-1 text-xs"
              >
                Add to Cart
              </button>
            </div>
          )}
          {isInCart && (
            <div className="space-x-2">
              <UpdateCartQty pizzaId={id} quantity={currentPizzaQty} />
              <DeleteItem pizzaId={id} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
