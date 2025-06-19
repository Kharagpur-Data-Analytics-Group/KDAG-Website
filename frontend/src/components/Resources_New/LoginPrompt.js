import React from "react";
import "./LoginPrompt.css";

const LoginPrompt = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="login-prompt-backdrop" onClick={onClose}>
      <div className="login-prompt-box" onClick={e => e.stopPropagation()}>
        <div className="login-prompt-text">
          Sign-in/Login to our for the full experience of our website
        </div>
        <button
          className="login-prompt-btn"
          onClick={() => (window.location.href = "/auth")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPrompt;