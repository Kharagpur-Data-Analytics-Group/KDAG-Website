import React from "react";
import Fade from "../../Common/Motion/Fade.jsx"
// import dataAnalysis from "./../../../assets/pics/dataanlysis_nyc.png";

const ResourcesCard = ({ resource }) => {
  return (
    <div class="w-1/4 min-w-[20rem] m-8 flex max-[800px]:min-w-[27rem]">
<Fade bottom>
    <div className="w-full flex flex-col justify-between p-6 transition-all duration-[400ms] ease rounded-[15px] backdrop-blur-[10px] bg-[rgba(255,255,255,0.042)] hover:bg-[rgba(104,58,58,0.15)] hover:shadow-[0_0_25px_rgba(250,57,70,1)] hover:-translate-y-[5px]  [&_a]:no-underline [&_a]:block !p-[18px]">
      <div className="flex gap-3">
      <div className="w-[15%]">
        <div className="!w-[40px] !h-auto [&_svg]:w-full">
        <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="24.5938" width="7.25" height="15.4062" fill="#F53D3D"/>
        <rect x="21.0625" y="18.25" width="7.25" height="21.75" fill="#F53D3D"/>
        <rect x="30.125" y="11" width="7.25" height="29" fill="#F53D3D"/>
        <circle cx="25.5" cy="25.5" r="24.5" stroke="#F53D3D" stroke-width="2"/>
        </svg>
        </div>
      </div>
      <div className="ml-[1rem]">
        <div className="relative inline-block text-[1.8rem] font-extrabold font-black tracking-[1px] text-[#fb8787] transition-all duration-500 ease"
        style={{fontFamily : 'Segoe UI'}}>
          {resource.name}
        </div>
        <div className="text-[#bfbfbf] !mb-[1.7rem] transition-all duration-[800ms]"
        style={{fontFamily : 'Segoe UI'}}>
          {resource.subtitle}</div>
        
      </div>
      </div>
      <div className="text-[#bfbfbf] inline-block relative transition-all duration-[400ms] !pb-[0.6rem]"
      style={{fontFamily : 'Segoe UI'}}>
        {resource.description}</div>
      <div className="flex justify-center">
        <a href={resource.link} target="_blank" rel="noreferrer noopener" className="w-[100%] !flex justify-center ![&:nth-child(3)]:mt-auto ![&:nth-child(3)]:self-baseline ![&:nth-child(3)]:w-full">
          <div className="!mt-4 text-white !px-5 !py-[10px] w-[70%] text-center whitespace-nowrap rounded-[25px] bg-[linear-gradient(90deg,#9a2323b9,#a14a55,#9a2323b9)] bg-[length:200%_auto] shadow-[1px_1px_10px_1px_rgba(0,0,0,0.5)] font-semibold transition-[background-position,transform] duration-[600ms,200ms] ease cursor-pointer hover:bg-[position:right_center] !hover:scale-[1.03] max-[800px]:!w-full max-[800px]:!p-[5px]">
            View Resource
          </div>
        </a>
      </div>
    
    </div>

</Fade>
    </div>
  );
};

export default ResourcesCard;
