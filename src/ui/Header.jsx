import { Link } from "react-router-dom";
import FindOrder from "../features/order/FindOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <div className="flex flex-col gap-y-2 border-b border-stone-200 bg-yellow-400 p-4 uppercase sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <Link className="tracking-widest" to="/">
        Fast React Pizza Co.
      </Link>
      <FindOrder />
      <Username />
    </div>
  );
}

export default Header;
