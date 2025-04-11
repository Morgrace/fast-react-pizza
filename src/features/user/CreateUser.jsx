import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "./userSlice";
import { Link, useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const user = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateUsername(username));
    setUsername("");
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      {!user ? (
        <>
          <p>👋 Welcome! Please start by telling us your name:</p>

          <input
            type="text"
            placeholder="Your full name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="my-6 w-72 bg-stone-100 px-3 py-1 focus:ring focus:ring-yellow-400 focus:outline-none"
          />
        </>
      ) : (
        <Link to="/menu" className="btn md:px-6 md:py-3">
          Continue ordering
        </Link>
      )}

      {username !== "" && (
        <div>
          <button className="btn md:px-6 md:py-3">Start ordering</button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
