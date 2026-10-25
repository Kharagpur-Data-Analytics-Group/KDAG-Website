import React from "react";
import profile from "./../../../assets/svgs/profile.svg";
// import dummyImg from "./../../../assets/pics/naruto.jpg";

const ContactCard = ({
  name
}) => {
  return <div className="contacts-card [background-color:white]! [border-radius:3rem]! [width:21rem]! [padding:1rem]! [margin:2rem]!">
      <div className="contacts-card-name [color:#172755]! [font-size:2rem]! [margin:1rem]! [font-weight:bold]!">{name}</div>
      <div className="contacts-card-photo [position:relative]! [width:150px]! [height:150px]! [overflow:hidden]! [border-radius:50%]! [margin:1rem_auto]! [&_img]:[width:150px]! [&_img]:[height:auto]!">
        <p>
          <img src={profile} alt="PROFILE PIC" width={150} />
        </p>
      </div>
      <div className="contacts-button-container">
        <div className="contacts-card-button [padding:1rem_5rem]! [border-radius:100px]! [background-color:#dc2626]! [margin:1rem_auto]! [display:inline-block]! [font-size:1.1rem]! [color:white]! contacts-card-whatsapp-button">
          Whatsapp
        </div>
      </div>
      <div className="contacts-button-container">
        <div className="contacts-card-button [padding:1rem_5rem]! [border-radius:100px]! [background-color:#dc2626]! [margin:1rem_auto]! [display:inline-block]! [font-size:1.1rem]! [color:white]! contacts-card-mail-button">
          E-Mail
        </div>
      </div>
    </div>;
};
export default ContactCard;
