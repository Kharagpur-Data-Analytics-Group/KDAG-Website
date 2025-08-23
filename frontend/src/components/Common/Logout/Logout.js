import React, { useState, useEffect, useContext } from "react";
import Fade from "react-reveal/Fade";
import { AuthContext } from "../../../context/AuthContext";
import logout_icon from "../../../assets/pics/logout.png";
import "./Logout.css";

const Logout = () => {
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

	const handle_logout = async () => {
		try {
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
			setIsLoggedIn(false);
		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	const logout_button = (
		<div className="logout_container_01">
			<button onClick={handle_logout} style={{ cursor: "auto" }}>
				<img src={logout_icon} alt="img" /> 
				<span>Logout</span>
			</button>
		</div>
	);

	return (
		<Fade left>
			<div className="logout_outer_container_01">
				{isLoggedIn && logout_button}
			</div>
		</Fade>
	);
};

export default Logout;
