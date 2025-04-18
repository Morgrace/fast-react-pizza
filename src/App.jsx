import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { action as updateOrderPriorityAction } from "./features/order/UpdateOrderPriority";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/menu",
          element: <Menu />,
          loader: menuLoader,
          errorElement: <Error />,
        },
        {
          path: "/order/new",
          element: <CreateOrder />,
          action: createOrderAction,
        },
        {
          path: "/order/:orderId",
          element: <Order />,
          loader: orderLoader,
          action: updateOrderPriorityAction,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
