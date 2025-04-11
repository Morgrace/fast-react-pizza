import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrderPriority() {
  const fetcher = useFetcher();
  console.log(fetcher);
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <button disabled={fetcher.state === "submitting"} className="btn">
        make priority
      </button>
    </fetcher.Form>
  );
}
//eslint-disable-next-line
export async function action({ request, params }) {
  const setPriority = {
    priority: true,
  };
  await updateOrder(params.orderId, setPriority);
  return null;
}
export default UpdateOrderPriority;
