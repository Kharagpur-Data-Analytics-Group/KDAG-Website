import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const checkAuthStatus = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        const response = await fetch(
          `${process.env.REACT_APP_FETCH_URL}/user/auth/google/status`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.loggedIn) {
            setIsLoggedIn(true);
            setUserInfo(data.user);
          } else {
            setIsLoggedIn(false);
            setUserInfo(null);
            console.log(data);
          }
        } else {
          setIsLoggedIn(false);
          setUserInfo(null);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoggedIn(false);
      setUserInfo(null);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/user/auth/google/refresh_google_access_token`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token);
        localStorage.setItem("access_token", data.access_token);
      } else {
        console.log("Failed to refresh access token");
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  };

  const getTokenExpirationTime = (token) => {
    if (!token) return 0;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const tokenExpTime = getTokenExpirationTime(accessToken);
      const currentTime = Date.now();

      if (tokenExpTime - currentTime < 10 * 60 * 1000) {
        refreshAccessToken();
      }
    }, 3000000);

    return () => clearInterval(intervalId);
  }, [accessToken]);


  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userInfo, setIsLoggedIn, checkAuthStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};
