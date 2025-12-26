import React from "react";
import "./LoginPrompt.css";

const LoginPrompt = ({ open, onClose, message }) => {
  if (!open) return null;

  const defaultMessage = "Sign-in/Login to our for the full experience of our website";

  return (
    <div className="login-prompt-backdrop" onClick={onClose}>
      <div className="login-prompt-box" onClick={e => e.stopPropagation()}>
        <div className="login-prompt-text">
          {message || defaultMessage}
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