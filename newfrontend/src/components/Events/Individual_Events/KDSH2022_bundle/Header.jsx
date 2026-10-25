import React from "react";
import KDSH2022 from "../../../../assets/pics/events/KDSH2022_Latest.png"
import "./LiquidAnimation.css"

const Header = () => {
  return (
    <>
      <div className="h-[30rem] !pt-[20rem] bg-cover shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div class="text-white! font-[4rem] font-bold text-center hidden"
        style={{fontFamily : 'Poppins, sans-serif'}}>
          Kharagpur <span className="bg-[#a00101]"> Data Science</span> Hackathon 2022</div>
      </div>
      <section className="relative flex! mt-[-150px]! h-[500px] bg-[rgba(0,0,0,0.7)] justify-center mb-[20px]! max-[480px]:flex-col max-[480px]:h-[300px] max-[480px]:mt-0!">
        <a href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-2022-indian-institute-of-technology-iit-kharagpur-542463" 
        target="_blank" 
        className="!pr-[100px] block">
          <img 
            src={KDSH2022} 
            className="h-[450px]! w-[700px]! max-[480px]:!h-[300px] max-[480px]:!w-[400px]"></img>
        </a>
        <div className="relative overflow-hidden z-10 top-[25%] rounded-[10px] h-[70px] max-[480px]:left-[20%]">
          <a 
            href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-2022-indian-institute-of-technology-iit-kharagpur-542463" 
            target="_blank" 
            id="liquid"
            className="text-[30px] font-bold !text-white no-underline uppercase !py-[20px] max-[480px]:!py-[20px] max-[480px]:!px-[60px] !px-[60px] relative duration-200 scale-[2] rounded-[10px] w-auto h-auto top-[10px]hover:shadow-[0_0_5px_#ff7272,inset_0_0_5px_#ff7272] delay-200"
            style={{fontFamily : 'consolas'}}>
              <span
              className="relative z-0 text-white! top-[10px]">
                Register
              </span>
              <div 
              className="liquid"></div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Header;