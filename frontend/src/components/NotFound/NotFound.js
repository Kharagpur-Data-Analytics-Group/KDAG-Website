import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Common/Navbar/Navbar";
import Particless from "../Common/Particles/Particless";
import "./NotFound.css";

const NotFound = () => {
  const particles = useMemo(() => <Particless />, []);

  return (
    <>
      <Navbar />
      <div className="not-found-page">
        <div className="not-found-container">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-text">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="not-found-button">
            Go to Homepage
          </Link>
        </div>
      </div>
      {particles}
    </>
  );
};

export default NotFound;
