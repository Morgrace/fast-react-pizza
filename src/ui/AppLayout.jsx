import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";
import { Suspense } from "react";
function AppLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading";

  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <main className="overflow-scroll">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
