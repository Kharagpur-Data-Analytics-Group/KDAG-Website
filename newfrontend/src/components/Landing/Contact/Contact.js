import React from "react";
import "./Contact.css";

//Components used
import ContactCard from "./ContactCard.js";

// Temp Sample Data
const dummy = [
  {
    id: 1,
    name: "Ritik",
  },
  {
    id: 2,
    name: "Duhita",
  },
  {
    id: 3,
    name: "Shivam",
  },
  {
    id: 4,
    name: "Soham",
  },
  {
    id: 5,
    name: "Yash",
  },
];

const Contact = () => {
  return (
    <>
      <div className="stripe-alt"></div>

      <div className="contacts-container">
        <div className="contacts-heading">Contact Us</div>
        <div className="contacts-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
          dignissimos. Ratione consequatur dolor nesciunt fugit ipsam,
          temporibus autem sequi repellendus?
        </div>

        <div className="contacts-cards">
          {dummy.map((data) => {
            return <ContactCard key={data.id} name={data.name} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Contact;
