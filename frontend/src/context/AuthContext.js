import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);

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
            // Clear token if backend says not logged in
            localStorage.removeItem("access_token");
          }
        } else {
          setIsLoggedIn(false);
          setUserInfo(null);
          // Clear invalid token
          localStorage.removeItem("access_token");
        }
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoggedIn(false);
      setUserInfo(null);
    }
  };


  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userInfo, setIsLoggedIn, checkAuthStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};
