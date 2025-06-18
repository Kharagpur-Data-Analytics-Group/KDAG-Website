// RevisionIcon.js
import React, { useState } from "react";
import "./RevisionIcon.css"; // Import your CSS for styling

const Star = () => {
  const [filled, setFilled] = useState(false);

  return (
    <span
      onClick={() => setFilled(f => !f)}
      style={{
        cursor: "pointer",
        color: filled ? "yellow" : "transparent",
        WebkitTextStroke: "1px gray",
        fontSize: "30px",
        userSelect: "none",
        textAlign: "center",
      }}
      role="img"
      aria-label={filled ? "filled star" : "hollow star"}
    >
      ★
    </span>
  );
};

export default Star;
