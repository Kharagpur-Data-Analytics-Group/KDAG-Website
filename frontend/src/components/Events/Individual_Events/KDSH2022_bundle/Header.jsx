import React from "react";
import KDSH2022 from "../../../../assets/pics/events/KDSH2022_Latest.png";
const Header = () => {
  return <><style>{"@keyframes animate {\n  0% {\n      transform: translate(-25%, -75%) rotate(0);\n  }\n  100% {\n      transform: translate(-25%, -75%) rotate(360deg);\n  }\n}"}</style>
      <div className="resources-list-header [height:30rem]! [padding-top:10rem]! [background-size:cover]! [box-shadow:0px_2px_10px_rgba(0,_0,_0,_0.25)]! [opacity:0]! [transition:opacity_1s]! [&.show]:[opacity:1]!">
        <div className="resources-list-header-title [font-family:Poppins,_sans-serif]! [font-size:4rem]! [font-weight:700]! [text-align:center]! [color:#ffffff]!">Kharagpur <span className="bolding [background-color:rgb(160,_1,_1)]!"> Data Science</span> Hackathon 2022</div>
      </div>
      <section className="banner-KDSH [position:relative]! [display:flex]! [flex-direction:row]! [margin-top:-150px]! [height:500px]! [background-color:rgba(0,_0,_0,_0.7)]! [justify-content:center]! [margin-bottom:20px]! max-[480.01px]:[position:relative]! max-[480.01px]:[display:flex]! max-[480.01px]:[flex-direction:column]! max-[480.01px]:[height:300px]! max-[480.01px]:[background-color:rgba(0,_0,_0,_0.7)]! max-[480.01px]:[justify-content:center]! max-[480.01px]:[margin-top:0px]!">
        <a href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-2022-indian-institute-of-technology-iit-kharagpur-542463" target="_blank" className="banner-img [padding-right:100px]! max-[480.01px]:[&_img]:[height:300px]! max-[480.01px]:[&_img]:[width:400px]!">
          <img src={KDSH2022} height="450" width="700"></img>
        </a>
        <div className="banner-button [position:relative]! [overflow:hidden]! [z-index:10]! [top:25%]! [border-radius:10px]! [height:70px]! max-[480.01px]:[left:20%]!">
          <a href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-2022-indian-institute-of-technology-iit-kharagpur-542463" target="_blank" className="register [font:700_30px_consolas]! [color:#fff]! [text-decoration:none]! [text-transform:uppercase]! [padding:20px_60px]! [position:relative]! [transition:0.2s]! [transform:scale(2)]! [border-radius:10px]! [width:auto]! [height:auto]! [top:10px]! [&_span]:[position:relative]! [&_span]:[z-index:0]! [&_span]:[color:#fff]! [&_span]:[top:10px]! [&:hover]:[box-shadow:0_0_5px_#ff7272,_inset_0_0_5px_#ff7272]! [&:hover]:[transition-delay:0.2s]! max-[480.01px]:[&_a]:[font:700_20px_consolas]! max-[480.01px]:[&_a]:[padding:20px_60px]!">
              <span>Register</span>
              <div className="liquid [.register_&]:[position:absolute]! [.register_&]:[top:-80px]! [.register_&]:[left:0]! [.register_&]:[width:100%]! [.register_&]:[height:250px]! [.register_&]:[background:#ff7272]! [.register_&]:[box-shadow:inset_0_0_50px_rgba(0,_0,_0,_0.7)]! [.register_&]:[z-index:-20]! [.register_&]:[transition:0.6s]! [.register_&]:[border-radius:10px]! [.register_&::after]:[position:absolute]! [.register_&::after]:[content:'']! [.register_&::after]:[width:200%]! [.register_&::after]:[height:200%]! [.register_&::after]:[top:0]! [.register_&::after]:[left:0]! [.register_&::after]:[transform:translate(-25%,_-75%)]! [.register_&::before]:[position:absolute]! [.register_&::before]:[content:'']! [.register_&::before]:[width:200%]! [.register_&::before]:[height:200%]! [.register_&::before]:[top:0]! [.register_&::before]:[left:0]! [.register_&::before]:[transform:translate(-25%,_-75%)]! [.register_&::after]:[border-radius:45%]! [.register_&::after]:[background:rgba(0,_0,_0,_1)]! [.register_&::after]:[box-shadow:0_0_10px_5px_#ff7272,_inset_0_0_5px_#ff7272]! [.register_&::after]:[animation:animate_5s_linear_infinite]! [.register_&::after]:[opacity:0.8]! [.register_&::before]:[border-radius:40%]! [.register_&::before]:[box-shadow:0_0_10px_rgba(26,_26,_26,_0.5),_inset_0_0_5px_rgba(26,_26,_26,_0.5)]! [.register_&::before]:[background:rgba(26,_26,_26,_0.5)]! [.register_&::before]:[animation:animate_7s_linear_infinite]! [.register:hover_&]:[top:-140px]!"></div>
          </a>
        </div>
      </section>
    </>;
};
export default Header;
