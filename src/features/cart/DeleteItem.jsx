import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import PropTypes from "prop-types";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  function handleDeleteItem() {
    dispatch(deleteItem(pizzaId));
  }
  return (
    <button onClick={handleDeleteItem} className="btn px-4 py-2 text-xs">
      Delete
    </button>
  );
}
DeleteItem.propTypes = {
  pizzaId: PropTypes.string.isRequired,
};
export default DeleteItem;
