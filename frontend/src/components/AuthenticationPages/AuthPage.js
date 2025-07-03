import React, { useState, useContext } from "react";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
import Particless from "../Common/Particles/Particless";
import google_logo from "../../assets/pics/google_logo.png";
import { AuthContext } from "../../context/AuthContext";
import "./AuthPage.css";

const AuthPage = () => {
	const particless = React.useMemo(() => <Particless />, []);
	const { isLoggedIn } = useContext(AuthContext);
	const history = useHistory();
	const [isSignUpActive, setIsSignUpActive] = useState(false);
	const [rDirect, setRDirect] = useState(false);
	const [showUsermessage, setShowUsermessage] = useState(false);
	const [userMessage, setUserMessage] = useState("");

	const token = localStorage.getItem("access_token");

	if (showUsermessage) {
		setTimeout(() => {
			setShowUsermessage(false);
		}, 25000);
	}

	const toggleForm = () => {
		setIsSignUpActive((prev) => !prev);
	};

	const submitRegister = async (e) => {
		e.preventDefault();
	};

	const submitLogin = async (e) => {
		e.preventDefault();
	};

	if (rDirect) {
		history.push("/resources_new");
	}

	if (isLoggedIn) {
		history.push("/resources_new");
	}

	const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
	const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

	function handleGoogleAuth() {
		const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&access_type=offline&scope=email%20profile%20openid&prompt=consent`;
		window.location.href = googleAuthUrl;
	}

	return (
		<>
			<Fade left>
				{!isLoggedIn && (
					<div className="auth-outer-container">
						{showUsermessage && (
							<div className={`user_message`}>{userMessage}</div>
						)}

						<div className={`auth-container ${isSignUpActive ? "active" : ""}`}>
							<div className="form-container sign-up">
								<form onSubmit={submitRegister}>
									<>
										<h1>Create Account</h1>
										<button className="GoogleSignup" onClick={handleGoogleAuth}>
											<img src={google_logo} alt="google_logo" />
											<p>Sign Up with Google</p>
										</button>
									</>
								</form>
							</div>
							<div className="form-container sign-in">
								<form onSubmit={submitLogin}>
									<h1>Sign In</h1>
									<>
										<button className="GoogleSignup" onClick={handleGoogleAuth}>
											<img src={google_logo} alt="google_logo" />
											<p>Sign In with Google</p>
										</button>
									</>
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
										<button
											className="hidden"
											onClick={toggleForm}
										>
											Sign In
										</button>
									</div>
									<div className="toggle-panel toggle-right">
										<h1>Hello, Friend!</h1>
										<p>
											It looks like you haven't registered yet. Register now to
											unlock access to all of the site's features.
										</p>
										<button
											className="hidden"
											onClick={toggleForm}
										>
											Sign Up
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</Fade>
			{particless}
		</>
	);
};

export default AuthPage;
