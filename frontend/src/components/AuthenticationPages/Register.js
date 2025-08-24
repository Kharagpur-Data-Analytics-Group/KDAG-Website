import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Particless from "../Common/Particles/Particless";
import "./AuthPage.css";
import Fade from "react-reveal/Fade";

const Register = () => {
  const location = useLocation();
  const history = useHistory();

  const particless = React.useMemo(() => <Particless />, []);
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [showUsermessage, setShowUsermessage] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [register_firstName, setRegister_firstName] = useState("");
  const [register_lastName, setRegister_lastName] = useState("");
  const [register_userName, setRegister_userName] = useState("");
  const [register_college, setRegister_college] = useState("");
  const [register_phone, setRegister_phone] = useState("");

 
  useEffect(() => {
    const user_info = JSON.parse(
      localStorage.getItem("register_user_info") || "{}"
    );

    // Pre-fill form with Google profile data
    if (user_info) {
      setRegister_firstName(user_info.given_name || "");
      setRegister_lastName(user_info.family_name || "");

      // Extract username from email (part before @)
      const email = user_info.email || "";
      const username = email.split("@")[0] || "";
      setRegister_userName(username);
      setRegister_college(user_info.college || "");
      setRegister_phone(user_info.phone || "");
    }
  }, [location]);

  const submitRegister = async (e) => {
    e.preventDefault();
    if (register_phone.length !== 10 || isNaN(register_phone)) {
      setUserMessage("Please Enter a valid numeric phone number");
      setShowUsermessage(true);
      return;
    }

    const user_data = {
      f_name: register_firstName,
      l_name: register_lastName,
      username: register_userName,
      college: register_college,
      phone: register_phone,
      uid: localStorage.getItem("uid") || "",
    };

    const token = localStorage.getItem("access_token");
    console.log(user_data,token)

    const response = await fetch(
      `${process.env.REACT_APP_FETCH_URL}/user/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...user_data,
        }),
      }
    );

    try {
      if (response.ok) {
        const content = await response.json();
        setUserMessage("Registration successful");
        setShowUsermessage(true);
        setIsSignUpActive(!isSignUpActive);

        localStorage.setItem("just_registered", "true");
        window.location.href = "/ml_sheet";
      } else {
        const jsonData = await response.json();
        setUserMessage(jsonData.message);
        setShowUsermessage(true);
      }
    } catch (error) {
      setUserMessage(error);
      setShowUsermessage(true);
    }
  };

  return (
    <>
      <Fade left>
        <div className="auth-outer-container">
          {showUsermessage && (
            <div className={`user_message`}>{userMessage}</div>
          )}

          <div className="auth-container active ">
            <div className="form-container sign-up">
              <form onSubmit={submitRegister}>
                <>
                  <h1>Create Account</h1>
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={register_firstName}
                    onChange={(e) => setRegister_firstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={register_lastName}
                    onChange={(e) => setRegister_lastName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    disabled
                    value={register_userName}
                    onChange={(e) => setRegister_userName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="College"
                    required
                    value={register_college}
                    onChange={(e) => setRegister_college(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Phone No."
                    required
                    value={register_phone}
                    onChange={(e) => setRegister_phone(e.target.value)}
                  />

                  <button type="submit">Sign Up</button>
                </>
              </form>
            </div>
            <div className="toggle-container">
              <div className="toggle active">
                <div className="toggle-panel toggle-left">
                  <h1>Hi Friend!</h1>
                  <p>
                    If you already have an account Sign in to unlock access to
                    your account and explore all the features our website has to
                    offer.
                  </p>
                  <button className="hidden" style={{ cursor: "none" }}>
                    <a href="/auth">Sign In</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
      {particless}
    </>
  );
};

export default Register;
