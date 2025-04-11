import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { decreaseQty, increaseQty } from "./cartSlice";

function UpdateCartQty({ pizzaId, quantity }) {
  const dispatch = useDispatch();
  function handleIncQty() {
    dispatch(increaseQty(pizzaId));
  }
  function handleDecQty() {
    dispatch(decreaseQty(pizzaId));
  }
  return (
    <>
      <button onClick={handleDecQty} className="btn px-2.5 py-1">
        -
      </button>
      <span>{quantity}</span>
      <button onClick={handleIncQty} className="btn px-2.5 py-1">
        +
      </button>
    </>
  );
}
UpdateCartQty.propTypes = {
  pizzaId: PropTypes.string,
  quantity: PropTypes.number,
};
export default UpdateCartQty;
