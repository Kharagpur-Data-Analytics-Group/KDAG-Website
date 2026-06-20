import React from "react";
import "./ContactCard.css";

import profile from "./../../../assets/svgs/profile.svg";
// import dummyImg from "./../../../assets/pics/naruto.jpg";

const ContactCard = ({ name }) => {
  return (
    <div className="contacts-card">
      <div className="contacts-card-name">{name}</div>
      <div className="contacts-card-photo">
        <p>
          <img src={profile} alt="PROFILE PIC" width={150} />
        </p>
      </div>
      <div className="contacts-button-container">
        <div className="contacts-card-button contacts-card-whatsapp-button">
          Whatsapp
        </div>
      </div>
      <div className="contacts-button-container">
        <div className="contacts-card-button contacts-card-mail-button">
          E-Mail
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
