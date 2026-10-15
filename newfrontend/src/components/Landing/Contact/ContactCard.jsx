import React from "react";

import profile from "./../../../assets/svgs/profile.svg";
// import dummyImg from "./../../../assets/pics/naruto.jpg";

const ContactCard = ({ name }) => {
  return (
    <div className="bg-white !rounded-[3rem] !w-[21rem] !p-4 !m-8">
      <div className="text-[#172755] text-[2rem] !m-4 font-bold">{name}</div>
      <div className="relative !w-[150px] !h-[150px] overflow-hidden rounded-full !my-4 mx-auto">
        <p>
          <img src={profile} alt="PROFILE PIC" width={150} className="!w-[150px] h-auto"/>
        </p>
      </div>
      <div className="!px-20 !py-4 rounded-[100px] bg-[#dc2626] !my-4 mx-auto inline-block text-[1.1rem] text-white">
        <div className="contacts-card-button contacts-card-whatsapp-button">
          Whatsapp
        </div>
      </div>
      <div className="!px-20 !py-4 rounded-[100px] bg-[#dc2626] !my-4 mx-auto inline-block text-[1.1rem] text-white">
        <div className="contacts-card-button contacts-card-mail-button">
          E-Mail
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
