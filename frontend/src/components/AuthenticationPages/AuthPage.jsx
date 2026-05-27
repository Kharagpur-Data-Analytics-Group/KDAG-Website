import React, { useState, useContext } from "react";
import Fade from "../Common/Motion/Fade.js";
import { useHistory } from "react-router-dom";
import Particless from "../Common/Particles/Particless.js";
import google_logo from "../../assets/pics/google_logo.png";
import { AuthContext } from "../../context/AuthContext.js";

const AuthPage = () => {
  const particless = React.useMemo(() => <Particless />, []);
  const { isLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [showUsermessage, setShowUsermessage] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  // ENV VARIABLES
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;


  // AUTO HIDE MESSAGE
  if (showUsermessage) {
    setTimeout(() => {
      setShowUsermessage(false);
    }, 2500);
  }

  // TOGGLE LOGIN / SIGNUP
  const toggleForm = () => {
    setIsSignUpActive((prev) => !prev);
  };

  // EMPTY SUBMIT FUNCTIONS
  const submitRegister = (e) => {
    e.preventDefault();
  };

  const submitLogin = (e) => {
    e.preventDefault();
  };

  // REDIRECT IF LOGGED IN
  if (isLoggedIn) {
    history.push("/ml_sheet");
  }

  // GOOGLE AUTH FUNCTION
  function handleGoogleAuth() {
    if (!GOOGLE_CLIENT_ID || !REDIRECT_URI) {
      setUserMessage("Environment variables missing!");
      setShowUsermessage(true);
      return;
    }

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&access_type=offline&scope=email%20profile%20openid&prompt=consent`;

    window.location.href = googleAuthUrl;
  }

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap");

        .auth-outer-container {
          padding-top: 160px;
          padding-bottom: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user_message {
          border: red solid 2px;
          color: rgb(255, 161, 161);
          padding: 10px;
          position: absolute;
          top: 105px;
          font-size: 18px;
          font-weight: 700;
          z-index: 9999999;
          border-radius: 25px;
          background: rgba(255, 0, 0, 0.096);
          backdrop-filter: blur(5px);
        }

        .auth-container * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Montserrat", sans-serif;
        }

        .auth-container {
          background-color: rgba(255, 255, 255, 0.04);
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
          position: relative;
          overflow: hidden;
          width: 768px;
          max-width: 100%;
          min-height: 520px;
          padding: 20px;
          backdrop-filter: blur(12px);
        }

        .auth-container p {
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.3px;
          margin: 20px 0;
        }

        .auth-container button {
          background-color: #512da8;
          color: #fff;
          font-size: 12px;
          padding: 10px 45px;
          border: 1px solid transparent;
          border-radius: 8px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-top: 10px;
          cursor: pointer;
        }

        .auth-container button.hidden {
          background-color: transparent;
          border-color: #fff;
          border-radius: 500px;
        }

        .auth-container form {
          background-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
          height: 100%;
        }

        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
        }

        .form-container h1 {
          color: white;
          font-size: 25px;
          font-weight: 900;
        }

        .GoogleSignup {
          height: 40px;
          background: white !important;
          border-radius: 500px !important;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 10px !important;
          transition: all 0.3s;
        }

        .GoogleSignup img {
          height: 30px;
          margin-right: 10px;
        }

        .GoogleSignup p {
          color: black;
          font-weight: 600;
          font-size: 16px;
          text-transform: none;
        }

        .sign-in {
          left: 0;
          width: 50%;
          opacity: 1;
          z-index: 2;
        }

        .auth-container.active .sign-in {
          transform: translateX(100%);
          opacity: 0;
        }

        .sign-up {
          left: 0;
          width: 50%;
          opacity: 0;
          z-index: 1;
        }

        .auth-container.active .sign-up {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          animation: move 0.6s;
        }

        @keyframes move {
          0%, 49.99% {
            opacity: 0;
            z-index: 1;
          }

          50%, 100% {
            opacity: 1;
            z-index: 5;
          }
        }

        .toggle-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: all 0.6s ease-in-out;
          border-radius: 60px 0 0 60px;
          z-index: 1000;
        }

        .auth-container.active .toggle-container {
          transform: translateX(-100%);
          border-radius: 0 60px 60px 0;
        }

        .toggle {
          height: 100%;
          background: linear-gradient(to right, #ad2d2d, #b16508);
          color: #fff;
          position: relative;
          left: -100%;
          width: 200%;
          transform: translateX(0);
          transition: all 0.6s ease-in-out;
        }

        .auth-container.active .toggle {
          transform: translateX(50%);
        }

        .toggle-panel {
          position: absolute;
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 30px;
          text-align: center;
          top: 0;
        }

        .toggle-left {
          transform: translateX(-200%);
        }

        .auth-container.active .toggle-left {
          transform: translateX(0);
        }

        .toggle-right {
          right: 0;
        }

        .auth-container.active .toggle-right {
          transform: translateX(200%);
        }
      `}</style>

      <Fade left>
        {!isLoggedIn && (
          <div className="auth-outer-container">
            {showUsermessage && (
              <div className="user_message">{userMessage}</div>
            )}

            <div
              className={`auth-container ${
                isSignUpActive ? "active" : ""
              }`}
            >
              {/* SIGN UP */}
              <div className="form-container sign-up">
                <form onSubmit={submitRegister}>
                  <h1>Create Account</h1>

                  <button
                    type="button"
                    className="GoogleSignup"
                    onClick={handleGoogleAuth}
                  >
                    <img src={google_logo} alt="google_logo" />
                    <p>Register</p>
                  </button>
                </form>
              </div>

              {/* SIGN IN */}
              <div className="form-container sign-in">
                <form onSubmit={submitLogin}>
                  <h1>Login with Google</h1>

                  <button
                    type="button"
                    className="GoogleSignup"
                    onClick={handleGoogleAuth}
                  >
                    <img src={google_logo} alt="google_logo" />
                    <p>Sign In</p>
                  </button>
                </form>
              </div>

              {/* TOGGLE */}
              <div className="toggle-container">
                <div className="toggle">
                  <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>

                    <p>
                      Sign in to unlock access to your account.
                    </p>

                    <button
                      type="button"
                      className="hidden"
                      onClick={toggleForm}
                    >
                      Sign In
                    </button>
                  </div>

                  <div className="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>

                    <p>
                      Register now to unlock all features.
                    </p>

                    <button
                      type="button"
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