import React, { useState, useEffect, useContext } from "react";
import Fade from "../../Common/Motion/Fade.jsx";
import { AuthContext } from "../../../context/AuthContext";
import { useHistory } from "react-router-dom";
import logout_icon from "../../../assets/pics/logout.png";
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
  const logout_button = <div className="logout_container_01 [transition:0.5s_all]! [&_button]:[border-radius:60px]! [&_button]:[cursor:auto]! [&_button]:[padding:10px_12px]! [&_button]:[font-weight:600]! [&_button]:[font-style:bold]! [&_button]:[border:none]! [&_button]:[background-image:linear-gradient(_to_right,_#ff8800,_#ffdaaa,_#30dd8a,_#269660_)]! [&_button]:[background-size:300%_100%]! [&_button]:[transition:all_0.3s]! [&_button:hover]:[background-position:100%_0]! [&_button:hover]:[text-shadow:0_0_10px_white]! [&_button_img]:[height:25px]! max-[768.01px]:[&_button_span]:[display:none]!">
      <button onClick={handle_logout} style={{
      cursor: "auto"
    }}>
        <img src={logout_icon} alt="img" />
        <span>Logout</span>
      </button>
    </div>;
  return <Fade left>
      <div className="logout_outer_container_01 [position:fixed]! [bottom:10%]! [right:25px]! [z-index:555555]!">
        {isLoggedIn && logout_button}
      </div>
    </Fade>;
};
export default Logout;
