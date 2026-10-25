import React from "react";

//Components used
import ContactCard from "./ContactCard.jsx";

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
      <div className="absolute w-[200%] !h-[20rem] z-[1] bg-[#172755] top-[-100px] -translate-x-1/4 -rotate-6 border-t-[1rem] border-t-[#dc2626] border-solid"></div>

      <div className="relative z-[15] text-center">
        <div className="text-[2.5rem] font-bold text-white !mb-4">Contact Us</div>
        <div className="!w-[50rem] m-auto text-[#8794ba] text-[1.2rem] font-[Merriweather,'Times_New_Roman',serif]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
          dignissimos. Ratione consequatur dolor nesciunt fugit ipsam,
          temporibus autem sequi repellendus?
        </div>

        <div className="flex w-4/5 justify-center my-12 mx-auto flex-wrap">
          {dummy.map((data) => {
            return <ContactCard key={data.id} name={data.name} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Contact;
