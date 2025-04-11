import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FindOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`order/${query}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="focus:ring-opacity-50 w-46 rounded-full bg-yellow-100 px-4 py-1 text-sm transition-all duration-300 placeholder:text-stone-400 focus:w-52 focus:ring focus:ring-yellow-500 focus:outline-none sm:w-72 sm:py-2 sm:focus:w-82"
        type="text"
        placeholder="search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default FindOrder;
