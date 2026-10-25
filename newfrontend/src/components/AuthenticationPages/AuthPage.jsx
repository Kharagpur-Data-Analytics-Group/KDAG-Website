import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from "../../config/api.js";
import React, { useState, useContext } from "react";
import Fade from "../Common/Motion/Fade.jsx";
import { useHistory } from "react-router-dom";
import Particless from "../Common/Particles/Particless";
import google_logo from "../../assets/pics/google_logo.png";
import { AuthContext } from "../../context/AuthContext";
const AuthPage = () => {
  const particless = React.useMemo(() => <Particless />, []);
  const {
    isLoggedIn
  } = useContext(AuthContext);
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
    setIsSignUpActive(prev => !prev);
  };
  const submitRegister = async e => {
    e.preventDefault();
  };
  const submitLogin = async e => {
    e.preventDefault();
  };
  if (rDirect) {
    history.push("/register-hackathon");
  }
  if (isLoggedIn) {
    history.push("/register-hackathon");
  }
  function handleGoogleAuth(event) {
    event.preventDefault();
    if (!GOOGLE_CLIENT_ID) {
      setUserMessage("Google sign-in is not configured. Please contact the site administrator.");
      setShowUsermessage(true);
      return;
    }
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&response_type=code&access_type=offline&scope=email%20profile%20openid&prompt=consent`;
    window.location.href = googleAuthUrl;
  }
  return <><style>{"@import url(\"https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap\")\n@keyframes move {\n\t0%,\n\t49.99% {\n\t\topacity: 0;\n\t\tz-index: 1;\n\t}\n\t50%,\n\t100% {\n\t\topacity: 1;\n\t\tz-index: 5;\n\t}\n}"}</style>
      <Fade left>
        {!isLoggedIn && <div className="auth-outer-container [padding-top:160px]! [padding-bottom:120px]! [display:flex]! [align-items:center]! [justify-content:center]! max-[420.01px]:[padding-top:100px]! max-[420.01px]:[padding-bottom:80px]!">
            {showUsermessage && <div className={`user_message [border:red_solid_2px]! [color:rgb(255,_161,_161)]! [padding:10px]! [position:absolute]! [top:105px]! [font-size:18px]! [font-weight:700]! [z-index:9999999]! [border-radius:25px]! [background:rgba(255,_0,_0,_0.096)]! [backdrop-filter:blur(5px)]! max-[420.01px]:[padding:8px]! max-[420.01px]:[top:95px]! max-[420.01px]:[font-size:15px]! max-[420.01px]:[border-radius:25px]! max-[420.01px]:[background:rgba(255,_0,_0,_0.2)]! max-[420.01px]:[backdrop-filter:blur(10px)]! `}>{userMessage}</div>}

            <div className={`auth-container [&_*]:[margin:0]! [&_*]:[padding:0]! [&_*]:[box-sizing:border-box]! [&_*]:[font-family:'Montserrat',_sans-serif]! [background-color:rgba(255,_255,_255,_0.04)]! [border-radius:15px]! [box-shadow:0_5px_15px_rgba(0,_0,_0,_0.35)]! [position:relative]! [overflow:hidden]! [width:768px]! [max-width:100%]! [min-height:520px]! [padding:20px]! [backdrop-filter:blur(12px)]! [&_p]:[font-size:14px]! [&_p]:[line-height:20px]! [&_p]:[letter-spacing:0.3px]! [&_p]:[margin:20px_0]! [&_a]:[color:#333]! [&_a]:[font-size:13px]! [&_a]:[text-decoration:none]! [&_a]:[margin:15px_0_10px]! [&_button]:[background-color:#512da8]! [&_button]:[color:#fff]! [&_button]:[font-size:12px]! [&_button]:[padding:10px_45px]! [&_button]:[border:1px_solid_transparent]! [&_button]:[border-radius:8px]! [&_button]:[font-weight:600]! [&_button]:[letter-spacing:0.5px]! [&_button]:[text-transform:uppercase]! [&_button]:[margin-top:10px]! [&_button[type='submit']]:[color:#ffffff]! [&_button[type='submit']]:[font-size:15px]! [&_button[type='submit']]:[padding:7px_45px]! [&_button[type='submit']]:[border:1px_solid_transparent]! [&_button[type='submit']]:[border-radius:500px]! [&_button[type='submit']]:[font-weight:600]! [&_button[type='submit']]:[letter-spacing:0.5px]! [&_button[type='submit']]:[margin-top:10px]! [&_button[type='submit']]:[background-image:linear-gradient(_to_right,_#4e3eff,_#40dfe4,_#30dd8a,_#269660_)]! [&_button[type='submit']]:[background-size:300%_100%]! [&_button[type='submit']]:[transition:all_0.3s]! [&_button[type='submit']]:[width:300px]! [&_button[type='submit']:hover]:[background-position:100%_0]! [&_button[type='submit']:hover]:[text-shadow:0_0_10px_white]! [&_form]:[background-color:rgba(255,_255,_255,_0)]! [&_form]:[display:flex]! [&_form]:[align-items:center]! [&_form]:[justify-content:center]! [&_form]:[flex-direction:column]! [&_form]:[padding:0_40px]! [&_form]:[height:100%]! [&_input]:[background-color:rgb(255,_255,_255,_0.04)]! [&_input]:[border:none]! [&_input]:[border-radius:500px]! [&_input]:[margin:6px_0]! [&_input]:[padding:10px_15px]! [&_input]:[font-size:14px]! [&_input]:[font-weight:600]! [&_input]:[width:100%]! [&_input]:[outline:none]! [&_input]:[color:rgb(255,_255,_255)]! max-[790.01px]:[border-radius:12px]! max-[790.01px]:[width:600px]! max-[790.01px]:[max-width:100%]! max-[790.01px]:[min-height:500px]! max-[790.01px]:[padding:20px]! max-[420.01px]:[border-radius:12px]! max-[420.01px]:[width:350px]! max-[420.01px]:[max-width:100%]! max-[420.01px]:[min-height:450px]! max-[420.01px]:[padding:20px]! max-[420.01px]:[&_input]:[margin:6px_0]! max-[420.01px]:[&_button]:[padding:8px_45px]! max-[420.01px]:[&_button]:[text-wrap:nowrap]! max-[420.01px]:[&_button[type='submit']]:[color:#000000]! max-[420.01px]:[&_button[type='submit']]:[font-size:14px]! max-[420.01px]:[&_button[type='submit']]:[padding:5px_20px]! max-[420.01px]:[&_button[type='submit']]:[font-weight:600]! max-[420.01px]:[&_button[type='submit']]:[font-style:normal]! max-[420.01px]:[&_button[type='submit']]:[width:160px]! max-[420.01px]:[&_form]:[padding:0_10px]! max-[420.01px]:[&_input]:[font-size:12px]! max-[420.01px]:[&_input]:[font-weight:600]! ${isSignUpActive ? "active" : ""} `}>
              <div className="form-container [position:absolute]! [top:0]! [height:100%]! [transition:all_0.6s_ease-in-out]! [&_h1]:[color:rgb(255,_255,_255)]! [&_h1]:[font-size:25px]! [&_h1]:[font-weight:900]! [&_input::placeholder]:[color:rgb(255,_255,_255)]! [&_input::placeholder]:[font-weight:400]! [&_input]:[height:40px]! [&_input[type='email']:focus]:[box-shadow:0_0_5px_rgba(255,_255,_255,_0.76)]! [&_input[type='tel']:focus]:[box-shadow:0_0_5px_rgba(255,_255,_255,_0.76)]! [&_input[type='text']:focus]:[box-shadow:0_0_5px_rgba(255,_255,_255,_0.76)]! [&_input[type='password']:focus]:[box-shadow:0_0_5px_rgba(255,_255,_255,_0.76)]! [&_input[type='number']::-webkit-inner-spin-button]:[-webkit-appearance:none]! [&_input[type='number']::-webkit-inner-spin-button]:[margin:0]! [&_input[type='number']::-webkit-outer-spin-button]:[-webkit-appearance:none]! [&_input[type='number']::-webkit-outer-spin-button]:[margin:0]! [&_input[type='number']]:[-moz-appearance:textfield]! max-[420.01px]:[&_input]:[height:28px]! max-[420.01px]:[&_form_h1]:[font-size:20px]! sign-up [left:0]! [width:50%]! [opacity:0]! [z-index:1]! [.auth-container.active_&]:[transform:translateX(100%)]! [.auth-container.active_&]:[opacity:1]! [.auth-container.active_&]:[z-index:5]! [.auth-container.active_&]:[animation:move_0.6s]!">
                <form onSubmit={submitRegister}>
                  <>
                    <h1>Create Account</h1>
                    <button className="GoogleSignup [.form-container_form_&]:[height:40px]! [.form-container_form_&]:[background:white]! [.form-container_form_&]:[border-radius:500px]! [.form-container_form_&]:[display:flex]! [.form-container_form_&]:[justify-content:center]! [.form-container_form_&]:[align-items:center]! [.form-container_form_&]:[padding:0_10px]! [.form-container_form_&]:[transition:all_0.3s]! [.form-container_form_&:hover]:[box-shadow:5px_5px_10px_rgba(255,_255,_255,_0.2)]! [.form-container_form_&_p]:[text-transform:none]! [.form-container_form_&_p]:[color:black]! [.form-container_form_&_p]:[font-weight:600]! [.form-container_form_&_p]:[font-size:16px]! [.form-container_form_&_img]:[height:30px]! [.form-container_form_&_img]:[margin-right:10px]!" onClick={handleGoogleAuth}>
                      <img src={google_logo} alt="google_logo" />
                      <p>Register</p>
                    </button>
                  </>
                </form>
              </div>
              <div className="form-container [position:absolute]! [top:0]! [height:100%]! [transition:all_0.6s_ease-in-out]! [&_h1]:[color:rgb(255,_255,_255)]! [&_h1]:[font-size:25px]! [&_h1]:[font-weight:900]! [&_input::placeholder]:[color:rgb(255,_255,_255)]! [&_input::placeholder]:[font-weight:400]! [&_input]:[height:40px]! [&_input[type='email']:focus]:[box-shadow:0_0_5px_rgba(255,_255,_255,_0.76)]! [&_input[type='tel']:focus]:[box-shadow:0_0_5px_rgba(255,_255,_255,_0.76)]! [&_input[type='text']:focus]:[box-shadow:0_0_5px_rgba(255,_255,_255,_0.76)]! [&_input[type='password']:focus]:[box-shadow:0_0_5px_rgba(255,_255,_255,_0.76)]! [&_input[type='number']::-webkit-inner-spin-button]:[-webkit-appearance:none]! [&_input[type='number']::-webkit-inner-spin-button]:[margin:0]! [&_input[type='number']::-webkit-outer-spin-button]:[-webkit-appearance:none]! [&_input[type='number']::-webkit-outer-spin-button]:[margin:0]! [&_input[type='number']]:[-moz-appearance:textfield]! max-[420.01px]:[&_input]:[height:28px]! max-[420.01px]:[&_form_h1]:[font-size:20px]! sign-in [left:0]! [width:50%]! [opacity:1]! [z-index:2]! [.auth-container.active_&]:[transform:translateX(100%)]! [.auth-container.active_&]:[opacity:0]!">
                <form onSubmit={submitLogin}>
                  <h1>Login with Google</h1>
                  <>
                    <button className="GoogleSignup [.form-container_form_&]:[height:40px]! [.form-container_form_&]:[background:white]! [.form-container_form_&]:[border-radius:500px]! [.form-container_form_&]:[display:flex]! [.form-container_form_&]:[justify-content:center]! [.form-container_form_&]:[align-items:center]! [.form-container_form_&]:[padding:0_10px]! [.form-container_form_&]:[transition:all_0.3s]! [.form-container_form_&:hover]:[box-shadow:5px_5px_10px_rgba(255,_255,_255,_0.2)]! [.form-container_form_&_p]:[text-transform:none]! [.form-container_form_&_p]:[color:black]! [.form-container_form_&_p]:[font-weight:600]! [.form-container_form_&_p]:[font-size:16px]! [.form-container_form_&_img]:[height:30px]! [.form-container_form_&_img]:[margin-right:10px]!" onClick={handleGoogleAuth}>
                      <img src={google_logo} alt="google_logo" />
                      <p>Sign In</p>
                    </button>
                  </>
                </form>
              </div>
              <div className="toggle-container [position:absolute]! [top:0]! [left:50%]! [width:50%]! [height:100%]! [overflow:hidden]! [transition:all_0.6s_ease-in-out]! [border-radius:60px_0_0_60px]! [z-index:1000]! [.auth-container.active_&]:[transform:translateX(-100%)]! [.auth-container.active_&]:[border-radius:0_60px_60px_0]! max-[420.01px]:[transition:all_0.6s_ease-in-out]! max-[420.01px]:[border-radius:20px_0_0_20px]! max-[420.01px]:[.auth-container.active_&]:[border-radius:0_20px_20px_0]!">
                <div className={`toggle [height:100%]! [background:linear-gradient(to_right,_#ad2d2d,_#b16508)]! [color:#fff]! [position:relative]! [left:-100%]! [width:200%]! [transform:translateX(0)]! [transition:all_0.6s_ease-in-out]! [.auth-container.active_&]:[transform:translateX(50%)]! ${isSignUpActive ? "active" : ""} `}>
                  <div className="toggle-panel [position:absolute]! [width:50%]! [height:100%]! [display:flex]! [align-items:center]! [justify-content:center]! [flex-direction:column]! [padding:0_30px]! [text-align:center]! [top:0]! [transform:translateX(0)]! [transition:all_0.6s_ease-in-out]! [&_h1]:[font-size:25px]! [&_h1]:[font-weight:900]! max-[420.01px]:[&_h1]:[font-size:20px]! max-[420.01px]:[&_h1]:[font-weight:900]! toggle-left [transform:translateX(-200%)]! [.auth-container.active_&]:[transform:translateX(0)]!">
                    <h1>Welcome Back!</h1>
                    <p>
                      Sign in to unlock access to your account and explore all
                      the features our website has to offer.
                    </p>
                    <button className="hidden [.auth-container_button&]:[background-color:transparent]! [.auth-container_button&]:[border-color:#fff]! [.auth-container_button&]:[border-radius:500px]! [.auth-container_button:hover&]:[border-color:transparent]! [.auth-container_button:hover&]:[box-shadow:2px_2px_5px_rgba(0,_0,_0,_0.686)]!" onClick={toggleForm}>
                      Sign In
                    </button>
                  </div>
                  <div className="toggle-panel [position:absolute]! [width:50%]! [height:100%]! [display:flex]! [align-items:center]! [justify-content:center]! [flex-direction:column]! [padding:0_30px]! [text-align:center]! [top:0]! [transform:translateX(0)]! [transition:all_0.6s_ease-in-out]! [&_h1]:[font-size:25px]! [&_h1]:[font-weight:900]! max-[420.01px]:[&_h1]:[font-size:20px]! max-[420.01px]:[&_h1]:[font-weight:900]! toggle-right [right:0]! [transform:translateX(0)]! [.auth-container.active_&]:[transform:translateX(200%)]!">
                    <h1>Hello, Friend!</h1>
                    <p>
                      It looks like you haven't registered yet. Register now to
                      unlock access to all of the site's features.
                    </p>
                    <button className="hidden [.auth-container_button&]:[background-color:transparent]! [.auth-container_button&]:[border-color:#fff]! [.auth-container_button&]:[border-radius:500px]! [.auth-container_button:hover&]:[border-color:transparent]! [.auth-container_button:hover&]:[box-shadow:2px_2px_5px_rgba(0,_0,_0,_0.686)]!" onClick={toggleForm}>
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </Fade>
      {particless}
    </>;
};
export default AuthPage;
