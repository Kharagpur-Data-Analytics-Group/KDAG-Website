import React from "react";
import Particless from "../Common/Particles/Particless";
import Footer from "../Common/Footer/Footer";

const ManageTeam2 = () => {
  return (
    <div className="mt-wrapper min-h-screen flex flex-col" style={{ marginTop: "40px" }}>
      <style>{mtStyles}</style>
      <Particless />

      <div className="page-center flex-1 flex flex-col justify-center items-center">
        <div
          className="info-box mx-auto text-center"
          style={{
            maxWidth: "850px",
            padding: "60px 40px",
            borderRadius: "22px",
            background: "rgba(15, 0, 0, 0.9)",
            border: "1px solid rgba(255, 55, 55, 0.35)",
            boxShadow: "0 0 70px rgba(255, 0, 0, 0.25)",
          }}
        >
          

        <h2
            className="font-bold text-white"
            style={{ fontSize: "28px", marginBottom: "28px", lineHeight: 1.45 }}
        >
            All the finalised teams are reflected on Unstop and the team shown
            on Unstop is final.
        </h2>


          <a
            href="https://unstop.com/hackathons/kharagpur-data-science-hackathon-2026-iit-kharagpur-1614844"
            target="_blank"
            rel="noopener noreferrer"
            className="unstop-btn red inline-flex items-center justify-center font-bold no-underline cursor-pointer"
            style={{
              padding: "14px 28px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #ff3b3b, #cc0000)",
              color: "white",
              fontSize: "16px",
            }}
          >
            Visit Unstop
          </a>

          <p
            className="opacity-90"
            style={{ marginTop: "18px", fontSize: "14px", color: "#fca5a5" }}
          >
            Login to Unstop with the same Gmail ID used for registration.
          </p>
        </div>
      </div>
    </div>
  );
};

// Kept as CSS: hover/active states that transition a gradient background plus
// a transform/box-shadow together, and the footer auto-margin selector that
// targets children by tag/class — neither is reasonably expressible as a
// Tailwind utility class or a static inline style.
const mtStyles = `
  .unstop-btn.red {
    transition: all 0.25s ease;
  }

  .unstop-btn.red:hover {
    background: linear-gradient(135deg, #ff4b4b, #e10000);
    transform: scale(1.02);
  }

  .unstop-btn.red:active {
    transform: translateY(0px);
    box-shadow: 0 10px 24px rgba(255, 0, 0, 0.45);
  }

  .mt-wrapper > footer,
  .mt-wrapper > .footer,
  .mt-wrapper > .Footer {
    margin-top: auto;
  }
`;

export default ManageTeam2;
