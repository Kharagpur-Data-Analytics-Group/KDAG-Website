import React from "react";
import Particless from "../Common/Particles/Particless";
import Footer from "../Common/Footer/Footer";
import "./ManageTeam2.css";

const ManageTeam2 = () => {
  return (
    <div className="mt-wrapper">
      <Particless />

      <div className="page-center">
        <div className="info-box">
          <h2>
            All the finalised teams are reflected on Unstop and the team shown
            on Unstop is final.
          </h2>

          <a
            href="https://unstop.com/hackathons/kharagpur-data-science-hackathon-2026-iit-kharagpur-1614844"
            target="_blank"
            rel="noopener noreferrer"
            className="unstop-btn red"
          >
            Visit Unstop
          </a>

          <p className="sub-note">
            Login to Unstop with the same Gmail ID used for registration.
          </p>
        </div>
      </div>

      
    </div>
  );
};

export default ManageTeam2;
