import React from "react";
import Fade from "../../Common/Motion/Fade.jsx";
// import dataAnalysis from "./../../../assets/pics/dataanlysis_nyc.png";

const ResourcesCard = ({
  resource
}) => {
  return <div className="resources-list-card-wrapper [width:25%]! [min-width:20rem]! [margin:2rem]! [display:flex]! max-[800.01px]:[min-width:27rem]!">
<Fade bottom>
    <div className="resources-list-card [width:100%]! [display:flex]! [flex-direction:column]! [padding:1.5rem]! [transition:all_0.4s_ease]! [border-radius:15px]! [backdrop-filter:blur(10px)]! [background:rgba(255,_255,_255,_0.042)]! [&:hover]:[background-color:rgba(104,_58,_58,_0.15)]! [&:hover]:[box-shadow:0_0_25px_rgba(250,_57,_70,_1)]! [&:hover]:[transform:translateY(-5px)]! [&_a]:[text-decoration:none]! [&_a]:[display:block]!">
      <div className="resources-list-card-contain [display:flex]!">
      <div className="resources-list-card-left [y_&]:[width:15%]!">
        <div className="resources-list-card-icon [width:2.5rem]! [&_svg]:[width:100%]!">
        <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="24.5938" width="7.25" height="15.4062" fill="#F53D3D" />
        <rect x="21.0625" y="18.25" width="7.25" height="21.75" fill="#F53D3D" />
        <rect x="30.125" y="11" width="7.25" height="29" fill="#F53D3D" />
        <circle cx="25.5" cy="25.5" r="24.5" stroke="#F53D3D" strokeWidth="2" />
        </svg>
        </div>
      </div>
      <div className="resources-list-card-right [margin-left:1rem]!">
        <div className="resources-list-card-title [position:relative]! [display:inline-block]! [font-size:1.8rem]! [font-weight:900]! [letter-spacing:1px]! [color:#fb8787]! [transition:all_0.5s_ease]! [.resources-list-card:hover_&]:[font-size:1.9rem]!">{resource.name}</div>
        <div className="resources-list-card-subtitle [color:#bfbfbf]! [margin-bottom:1.7rem]! [transition:all_0.8s]!">{resource.subtitle}</div>

      </div>
      </div>
      <div className="resources-list-card-description [color:#bfbfbf]! [display:inline-block]! [position:relative]! [transition:all_0.4s]! [padding-bottom:0.6rem]!">{resource.description}</div>
      <div className="resources-list-card-button-outerMost [&:nth-child(3)]:[margin-top:auto]! [&:nth-child(3)]:[align-self:baseline]! [&:nth-child(3)]:[width:100%]! [display:flex]! [justify-content:center]! [&_a]:[width:100%]! [&_a]:[display:flex]! [&_a]:[justify-content:center]!"><a href={resource.link} target="_blank" rel="noreferrer noopener"><div className="resources-list-card-button [margin-top:1rem]! [color:white]! [padding:10px_20px]! [width:70%]! [text-align:center]! [white-space:nowrap]! [border-radius:25px]! [background-image:linear-gradient(_90deg,_#9a2323b9,_#a14a55,_#9a2323b9_)]! [background-size:200%_auto]! [box-shadow:1px_1px_10px_1px_rgba(0,_0,_0,_0.5)]! [font-weight:600]! [transition:background-position_0.6s_ease,_transform_0.2s_ease]! [cursor:pointer]! [&:hover]:[background-position:right_center]! [&:hover]:[transform:scale(1.03)]! max-[800.01px]:[width:100%]! max-[800.01px]:[padding:5px]!">View Resource</div></a></div>

    </div>

</Fade>
    </div>;
};
export default ResourcesCard;
