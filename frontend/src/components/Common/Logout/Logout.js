import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
import logout_icon from "../../../assets/pics/logout.png";
import "./Logout.css";

const Logout = (props) => {
	const { showLogout, setShowLogout } = props;
	const authToken = localStorage.getItem("access_token");
	const history = useHistory();

	useEffect(() => {
		if (authToken) {
			console.log("User is authenticated");
			setShowLogout(true);
		} else {
			console.log("User is not authenticated");
			setShowLogout(false);
		}
	}, [showLogout]);

	const handle_logout = () => {
		localStorage.removeItem("access_token");
		console.log("User logged out");
		history.push("/auth");
		setShowLogout(false);
	};

	const logout_button = (
		<div className="logout_container_01">
			<button onClick={handle_logout}>
				<img src={logout_icon} alt="img" />
			</button>
		</div>
	);

	return (
		<Fade left>
			<div className="logout_outer_container_01">
				{showLogout && logout_button}
			</div>
		</Fade>
	);
};

export default Logout;
