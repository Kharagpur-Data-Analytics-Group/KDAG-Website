import React from "react";
//Components used
import ContactCard from "./ContactCard.jsx";

// Temp Sample Data
const dummy = [{
  id: 1,
  name: "Ritik"
}, {
  id: 2,
  name: "Duhita"
}, {
  id: 3,
  name: "Shivam"
}, {
  id: 4,
  name: "Soham"
}, {
  id: 5,
  name: "Yash"
}];
const Contact = () => {
  return <>
      <div className="stripe-alt [position:absolute]! [width:200%]! [height:20rem]! [z-index:1]! [background-color:#172755]! [top:-100px]! [transform:translate(-25%)_rotate(-6deg)]! [border-top:1rem_solid_#dc2626]!"></div>

      <div className="contacts-container [position:relative]! [z-index:15]! [text-align:center]!">
        <div className="contacts-heading [font-size:2.5rem]! [font-weight:bold]! [color:white]! [margin-bottom:1rem]!">Contact Us</div>
        <div className="contacts-text [width:50rem]! [margin:auto]! [color:#8794ba]! [font-size:1.2rem]! [font-family:Merriweather,_'Times_New_Roman',_serif]!">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
          dignissimos. Ratione consequatur dolor nesciunt fugit ipsam,
          temporibus autem sequi repellendus?
        </div>

        <div className="contacts-cards [display:flex]! [width:80%]! [justify-content:center]! [margin:3rem_auto]! [flex-wrap:wrap]!">
          {dummy.map(data => {
          return <ContactCard key={data.id} name={data.name} />;
        })}
        </div>
      </div>
    </>;
};
export default Contact;
