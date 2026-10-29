import React, { useContext } from "react";
import Fade from "../../Common/Motion/Fade.jsx";
import { AuthContext } from "../../../context/AuthContext";
import { useHistory } from "react-router-dom";
import logout_icon from "../../../assets/pics/logout.webp";
const Logout = () => {
  const {
    isLoggedIn,
    setIsLoggedIn
  } = useContext(AuthContext);
  const history = useHistory();
  const handle_logout = async () => {
    try {
      localStorage.removeItem("access_token");
      setIsLoggedIn(false);
      history.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const logout_button = (
    <button
      type="button"
      onClick={handle_logout}
      aria-label="Logout"
      title="Logout"
      className="flex! h-12! w-12! cursor-pointer! items-center! justify-center! rounded-full! border-0! bg-[linear-gradient(to_right,#ff8800,#ffdaaa,#30dd8a,#269660)]! bg-size-[300%_100%]! transition-all! duration-300! hover:bg-position-[100%_0]! focus-visible:outline-2! focus-visible:outline-offset-4! focus-visible:outline-white!"
    >
      <img src={logout_icon} alt="" className="h-[25px]! w-[25px]! object-contain!" />
    </button>
  );
  return <Fade left>
      <div className="logout_outer_container_01 [position:fixed]! [bottom:10%]! [right:25px]! [z-index:555555]!">
        {isLoggedIn && logout_button}
      </div>
    </Fade>;
};
export default Logout;
