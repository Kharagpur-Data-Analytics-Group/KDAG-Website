import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthStatus = () => {
	console.log("Auth Status component called");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const history = useHistory();

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_FETCH_URL}/user/auth/google/status`,
					{
						method: "GET",
						credentials: "include",
					}
				);

				if (response.ok) {
					const data = await response.json();
					if (data.loggedIn) {
						console.log("User is signed in", data.user);
						setIsLoggedIn(true);
						setUserInfo(data.user);
					} else {
						console.log("User is not signed in", data);
						setIsLoggedIn(false);
						setUserInfo(null);
					}
				} else {
					console.error("Failed to fetch auth status");
					setIsLoggedIn(false);
					setUserInfo(null);
				}
			} catch (error) {
				console.error("An error occurred:", error);
				setIsLoggedIn(false);
				setUserInfo(null);
			}
		};

		checkAuthStatus();
	}, []);
	// return { isLoggedIn: true };
	return { isLoggedIn };
};

export default AuthStatus;
