import React, { useState, useContext } from "react";
import Fade from "../Common/Motion/Fade.jsx"
import { useHistory } from "react-router-dom";
import Particless from "../Common/Particles/Particless";
import google_logo from "../../assets/pics/google_logo.png";
import { AuthContext } from "../../context/AuthContext";

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
		history.push("/ml_sheet");
	}

	if (isLoggedIn) {
		history.push("/ml_sheet");
	}

	// ✅ FIXED: All three now use import.meta.env
	const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
	const apiUrl = import.meta.env.VITE_API_URL;
	const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

	function handleGoogleAuth() {
		const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&access_type=offline&scope=email%20profile%20openid&prompt=consent`;
		window.location.href = googleAuthUrl;
	}

	const signUpPanelStyle = isSignUpActive
		? {
				left: 0,
				width: "50%",
				opacity: 1,
				zIndex: 5,
				transform: "translateX(100%)",
				animation: "move 0.6s",
			}
		: {
				left: 0,
				width: "50%",
				opacity: 0,
				zIndex: 1,
			};

	const signInPanelStyle = isSignUpActive
		? {
				left: 0,
				width: "50%",
				opacity: 0,
				zIndex: 2,
				transform: "translateX(100%)",
			}
		: {
				left: 0,
				width: "50%",
				opacity: 1,
				zIndex: 2,
			};

	const toggleContainerStyle = isSignUpActive
		? {
				position: "absolute",
				top: 0,
				left: "50%",
				width: "50%",
				height: "100%",
				overflow: "hidden",
				transition: "all 0.6s ease-in-out",
				borderRadius: "0 60px 60px 0",
				transform: "translateX(-100%)",
				zIndex: 1000,
			}
		: {
				position: "absolute",
				top: 0,
				left: "50%",
				width: "50%",
				height: "100%",
				overflow: "hidden",
				transition: "all 0.6s ease-in-out",
				borderRadius: "60px 0 0 60px",
				zIndex: 1000,
			};

	const toggleStyle = isSignUpActive
		? {
				height: "100%",
				background: "linear-gradient(to right, #ad2d2d, #b16508)",
				color: "#fff",
				position: "relative",
				left: "-100%",
				width: "200%",
				transform: "translateX(50%)",
				transition: "all 0.6s ease-in-out",
			}
		: {
				height: "100%",
				background: "linear-gradient(to right, #ad2d2d, #b16508)",
				color: "#fff",
				position: "relative",
				left: "-100%",
				width: "200%",
				transform: "translateX(0)",
				transition: "all 0.6s ease-in-out",
			};

	const toggleLeftStyle = isSignUpActive
		? { transform: "translateX(0)" }
		: { transform: "translateX(-200%)" };

	const toggleRightStyle = isSignUpActive
		? { right: 0, transform: "translateX(200%)" }
		: { right: 0, transform: "translateX(0)" };

	const rootStyle = {
		paddingTop: "160px",
		paddingBottom: "120px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};

	const cardStyle = {
		backgroundColor: "rgba(255, 255, 255, 0.05)",
		backdropFilter: "blur(12px)",
		borderRadius: "15px",
		boxShadow: "0 5px 15px rgba(0, 0, 0, 0.35)",
		position: "relative",
		overflow: "hidden",
		width: "768px",
		maxWidth: "100%",
		minHeight: "520px",
		padding: "20px",
		backdropFilter: "blur(12px)",
		fontFamily: '"Montserrat", sans-serif',
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	};

	const messageStyle = {
		border: "red solid 2px",
		color: "rgb(255, 161, 161)",
		padding: "10px",
		position: "absolute",
		top: "105px",
		fontSize: "18px",
		fontWeight: 700,
		zIndex: 9999999,
		borderRadius: "25px",
		background: "rgba(255, 0, 0, 0.096)",
		backdropFilter: "blur(5px)",
	};

	const googleButtonStyle = {
		height: "40px",
		background: "white",
		borderRadius: "500px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "0 10px",
		transition: "all 0.3s",
		cursor: "pointer",
	};

	const hiddenButtonStyle = {
		backgroundColor: "transparent",
		border: "1px solid #fff",
		borderRadius: "500px",
		color: "#fff",
	};

	return (
		<>
			<Fade left>
				{!isLoggedIn && (
					<div className="auth-outer-container" style={rootStyle}>
						{showUsermessage && (
							<div className="user_message" style={messageStyle}>{userMessage}</div>
						)}

						<div className={`auth-container ${isSignUpActive ? "active" : ""}`} style={cardStyle}>
							<div className="form-container sign-up" style={signUpPanelStyle}>
								<form onSubmit={submitRegister} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "0 40px", height: "100%" }}>
									<>
										<h1 style={{ color: "rgb(255, 255, 255)", fontSize: "25px", fontWeight: 900 }}>Create Account</h1>
										<button type="button" className="GoogleSignup" onClick={handleGoogleAuth} style={googleButtonStyle}>
											<img src={google_logo} alt="google_logo" style={{ height: "30px", marginRight: "10px" }} />
											<p style={{ textTransform: "none", color: "black", fontWeight: 600, fontSize: "16px", margin: "0" }}>Register</p>
										</button>
									</>
								</form>
							</div>
							<div className="form-container sign-in" style={signInPanelStyle}>
								<form onSubmit={submitLogin} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "0 40px", height: "100%" }}>
									<h1 style={{ color: "rgb(255, 255, 255)", fontSize: "25px", fontWeight: 900 }}>Login with Google</h1>
									<>
										<button type="button" className="GoogleSignup" onClick={handleGoogleAuth} style={googleButtonStyle}>
											<img src={google_logo} alt="google_logo" style={{ height: "30px", marginRight: "10px" }} />
											<p style={{ textTransform: "none", color: "black", fontWeight: 600, fontSize: "16px", margin: "0" }}>Sign In</p>
										</button>
									</>
								</form>
							</div>
							<div className="toggle-container" style={toggleContainerStyle}>
								<div className={`toggle ${isSignUpActive ? "active" : ""}`} style={toggleStyle}>
									<div className="toggle-panel toggle-left" style={{ ...toggleLeftStyle, position: "absolute", width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "0 30px", textAlign: "center", top: 0, transition: "all 0.6s ease-in-out" }}>
										<h1 style={{ fontSize: "25px", fontWeight: 900 }}>Welcome Back!</h1>
										<p style={{ fontSize: "14px", lineHeight: "20px", letterSpacing: "0.3px", margin: "20px 0", fontFamily: '"Montserrat", sans-serif' }}>
											Sign in to unlock access to your account and explore all
											the features our website has to offer.
										</p>
										<button
											className="hidden"
											onClick={toggleForm}
											style={hiddenButtonStyle}
										>
											Sign In
										</button>
									</div>
									<div className="toggle-panel toggle-right" style={{ ...toggleRightStyle, position: "absolute", width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "0 30px", textAlign: "center", top: 0, transition: "all 0.6s ease-in-out" }}>
										<h1 style={{ fontSize: "25px", fontWeight: 900 }}>Hello, Friend!</h1>
										<p style={{ fontSize: "14px", lineHeight: "20px", letterSpacing: "0.3px", margin: "20px 0" }}>
											It looks like you haven't registered yet. Register now to
											unlock access to all of the site's features.
										</p>
										<button
											className="hidden"
											onClick={toggleForm}
											style={hiddenButtonStyle}
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