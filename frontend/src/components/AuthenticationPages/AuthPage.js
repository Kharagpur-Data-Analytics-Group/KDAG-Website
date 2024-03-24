import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
import Particless from "../Common/Particles/Particless";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AuthPage.css";

const AuthPage = (props) => {
	const { showLogout, setShowLogout } = props;
	const history = useHistory();
	const [isSignUpActive, setIsSignUpActive] = useState(false);
	const [rDirect, setRDirect] = useState(false);

	const [register_firstName, setRegister_firstName] = useState("");
	const [register_lastName, setRegister_lastName] = useState("");
	const [register_userName, setRegister_userName] = useState("");
	const [register_college, setRegister_college] = useState("");
	const [register_email, setRegister_email] = useState("");
	const [register_password, setRegister_password] = useState("");
	const [register_retypePassword, setRegister_retypePassword] = useState("");
	const [register_phone, setRegister_phone] = useState("");

	const [login_username, setLogin_username] = useState("");
	const [login_password, setLogin_password] = useState("");

	const toggleForm = () => {
		setIsSignUpActive((prev) => !prev);
	};

	// await fetch(`${process.env.REACT_APP_FETCH_URL}/user/signup`, {

	const submitRegister = async (e) => {
		e.preventDefault();

		if (register_retypePassword !== register_password) {
			console.log("The passwords you have typed do not match");
			return;
		}

		const user_data = {
			f_name: register_firstName,
			l_name: register_lastName,
			username: register_userName,
			college: register_college,
			phone: register_phone,
			email: register_email,
			password: register_password,
		};

		const response = await fetch("http://127.0.0.1:8080/user/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...user_data,
			}),
		});
		try {
			if (response.ok) {
				const content = await response.json();
				console.log("Registration successful");
				setIsSignUpActive(!isSignUpActive);
			} else {
				const jsonData = await response.json();
				toast.error(jsonData.message);
				console.log(jsonData.message);
			}
		} catch (error) {
			console.error("Error occurred during registration:", error);
			toast.error("An error occurred during registration.");
		}
	};

	const submitLogin = async (e) => {
		e.preventDefault();
		const user_data = {
			username: login_username,
			password: login_password,
		};
		console.log(process.env.REACT_APP_FETCH_URL);

		// await fetch(`${process.env.REACT_APP_FETCH_URL}/user/login`, {
		await fetch(`http://127.0.0.1:8080/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...user_data,
			}),
		}).then(async (res) => {
			let jsonData = await res.json();
			if (!res.ok) {
				toast.error(jsonData.message);
				console.log(jsonData);
			}
			//   setLoading(false);
			else {
				console.log("login successful");
				localStorage.setItem("access_token", jsonData.access_token);
				setRDirect(true);
				setShowLogout(true);
			}
		});
	};

	if (rDirect) {
		history.push("/forum");
	}

	if (showLogout) {
		history.push("/forum");
	}

	return (
		<>
			<Fade left>
				{!showLogout && (
					<div className="auth-outer-container">
						<div className={`auth-container ${isSignUpActive ? "active" : ""}`}>
							<div className="form-container sign-up">
								<form onSubmit={submitRegister}>
									<h1>Create Account</h1>
									<input
										type="text"
										placeholder="First Name"
										required
										onChange={(e) => setRegister_firstName(e.target.value)}
									/>
									<input
										type="text"
										placeholder="Last Name"
										onChange={(e) => setRegister_lastName(e.target.value)}
									/>
									<input
										type="text"
										placeholder="Username"
										required
										onChange={(e) => setRegister_userName(e.target.value)}
									/>
									<input
										type="text"
										placeholder="College"
										required
										onChange={(e) => setRegister_college(e.target.value)}
									/>
									<input
										type="tel"
										placeholder="Phone"
										required
										onChange={(e) => setRegister_phone(e.target.value)}
									/>
									<input
										type="email"
										placeholder="Email"
										required
										onChange={(e) => setRegister_email(e.target.value)}
									/>
									<input
										type="password"
										placeholder="Password"
										required
										onChange={(e) => setRegister_password(e.target.value)}
									/>
									<input
										type="password"
										placeholder="Retype Password"
										required
										onChange={(e) => setRegister_retypePassword(e.target.value)}
									/>
									<button type="submit">Sign Up</button>
								</form>
							</div>
							<div className="form-container sign-in">
								<form onSubmit={submitLogin}>
									<h1>Sign In</h1>
									<input
										type="text"
										placeholder="Username"
										required
										onChange={(e) => setLogin_username(e.target.value)}
									/>
									<input
										type="password"
										placeholder="Password"
										required
										onChange={(e) => setLogin_password(e.target.value)}
									/>
									<button type="submit">Sign In</button>
								</form>
							</div>
							<div className="toggle-container">
								<div className={`toggle ${isSignUpActive ? "active" : ""}`}>
									<div className="toggle-panel toggle-left">
										<h1>Welcome Back!</h1>
										<p>
											Sign in to unlock access to your account and explore all
											the features our website has to offer.
										</p>
										<button className="hidden" onClick={toggleForm}>
											Sign In
										</button>
									</div>
									<div className="toggle-panel toggle-right">
										<h1>Hello, Friend!</h1>
										<p>
											It looks like you haven't registered yet. Register now to
											unlock access to all of the site's features.
										</p>
										<button className="hidden" onClick={toggleForm}>
											Sign Up
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<ToastContainer />
			</Fade>
			<Particless />
		</>
	);
};

export default AuthPage;
