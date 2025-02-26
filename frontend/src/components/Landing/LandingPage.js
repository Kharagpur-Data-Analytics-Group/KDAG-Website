import React from "react";
import EventCount from "./countdown/count";
import "./LandingPage.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SponsorSlider.css";
import {
	faCalendarDays,
	faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
// import Poster from "../../assets/pics/events/KDAG ML Digest.jpg";
import KDSH5thEdition from "../../assets/pics/events/KDSH 5TH edition.jpg";

//Components
import Content from "./Content/Content.js";
import Fade from "react-reveal/Fade";
import Particless from "../Common/Particles/Particless";
import video1 from "./Video/final.mp4";
import certificate from "../../assets/KDSH2022Certificates/Akash Kundu.png";
import Header from "./Header/Header";
import associate_sponsor from "./../../assets/kdsh2025_associate_sponsor.jpg";
import kdsh2025_logo from '../../assets/kdsh2025_logo.png';  // Adjust path as needed


const LandingPage = () => {
	const eligibleCandidates = [
		["Aman Sharma", "amankumarsharma4084@gmail.com"],
		["Kushaz Sehgal", "kushaz.sehgal@gmail.com"],
		["Jeevesh Mahajan", "jeevesh28mahajan@gmail.com"],
		["Ater Murtem", "murtematu@gmail.com"],
		["Balaji Udayagiri", "balajiatvizag@gmail.com"],
		["Nancy Meshram", "nancymeshram02@gmail.com"],
		["Apoorv Bansal", "bansalapoorv2015@gmail.com"],
		["Krishna Yadav", "kyadav932000@gmail.com"],
		["Pooja Sharma", "poojasharma201902@gmail.com"],
		["Sanjeevani Ratna Tiwari", "iam.sanjeevanitiwari@gmail.com"],
		["Rounak Saha", "rounaksaha12@gmail.com"],
		["Sharannya Ghosh", "sharannyaghosh31@gmail.com"],
		["Souvik Rana", "ranasouvik07@gmail.com"],
		["Swarup Padhi", "swarupksms@gmail.com"],
		["Shivam Raj", "shivsrj2580@gmail.com"],
		["Rushil Venkateswar", "rushilv14@gmail.com"],
		["Subhajyoti Halder", "subhajyotihalder72@gmail.com"],
		["Anubhab Tripathi", "tripathianubhab@gmail.com"],
		["Akash Kundu", "akashkundu2xx4@gmail.com"],
		["Aayush Jitendra Kumar", "jitendra.kumar.epf@gmail.com"],
		["Shaswat Sheshank", "sheshank.shaswat1111@gmail.com"],
		["Avinash Kumar", "avinashjnvr@gmail.com"],
		["Sandeep Mishra", "sandeepmishraismyname@gmail.com"],
	];

	// useEffect(() => {
	// 	const form = document.getElementById("form");
	// 	const submitButton = document.getElementById("btn-12-submit");
	// 	let scriptURL =
	// 		"https://script.google.com/macros/s/AKfycbymnbrSfFeJPVH1DYX8AlQdWfUbd3Qb8SvpD-C8pkvCHdKEGNhcVSVLrwYY6zzk4O-gwA/exec";

	// 	form.addEventListener("submit", (e) => {
	// 		submitButton.disabled = true;
	// 		e.preventDefault();
	// 		let requestBody = new FormData(form);
	// 		let name = document.getElementById("query-box-name").value;
	// 		let email = document.getElementById("query-box-email").value;
	// 		let query = document.getElementById("query-box-query").value;

	// 		fetch(scriptURL, { method: "POST", body: requestBody })
	// 			.then((response) => {
	// 				alert("Thank you for submitting!! Your query has been recorded");
	// 				submitButton.disabled = false;
	// 			})
	// 			.catch((error) => {
	// 				submitButton.disabled = false;
	// 			});
	// 	});
	// }, []);

	// useEffect(() => {
	// 	const form = document.querySelector("#form");

	// 	// Cleanup event listener when component is unmounted
	// 	return () => {
	// 		form.removeEventListener("submit", null);
	// 	};
	// }, []);

	// function importAll(r) {
	//   let images = {};
	//   r.keys().map((item) => {
	//     images[item.replace("./", "")] = r(item);
	//   });
	//   return images;
	// }

	// const images = importAll(
	//   require.context("../../assets/KDSH2022Certificates", false, /.png/)
	// );
	// const downloadCertificate = () => {
	//   // let names = Object.keys(images);
	//   let name = document.getElementById("name").value;
	//   let email = document.getElementById("email").value;
	//   if(name == "" || email == "") {
	//     alert("Please enter the name and email address to download certificate!");
	//     return;
	//   }
	//   let flag = 0;
	//   const a = document.createElement("a");
	//   document.body.appendChild(a);

	//   eligibleCandidates.map((name_cand) => {
	//     if (
	//       name.toLowerCase() == name_cand[0].toLowerCase() &&
	//       email === name_cand[1]
	//     ) {
	//       a.href = images[name_cand[0] + ".png"].default;
	//       a.download = "Certificate.png";
	//       a.click();
	//       flag = 1;
	//     }
	//   });
	//   if(flag == 0){
	//     alert("Invalid credentials!");
	//   }
	//   console.log(flag);
	//   document.body.removeChild(a);
	// };

	// useEffect(() => {
	//   var modal = document.getElementById("modal-box");

	//   document
	//     .getElementById("modal-close")
	//     .addEventListener("click", function (e) {
	//       modal.style.display = "none";
	//     });

	//   const form = document.getElementById("form");
	//   const submitButton = document.getElementById("submitbtn");
	//   let scriptURL = "";

	//   form.addEventListener("submit", (e) => {
	//     submitButton.disabled = true;
	//     e.preventDefault();
	//     let requestBody = new FormData(form);
	//     let name = document.getElementById("name").value;
	//     let email = document.getElementById("email").value;
	//     eligibleCandidates.map((name_cand) => {
	//       if (
	//         name.toLowerCase() == name_cand[0].toLowerCase() &&
	//         email === name_cand[1]
	//       ) {
	//         scriptURL =
	//           "https://script.google.com/macros/s/AKfycbz07q9MBjKxVwS1Yrv3X0whxB0MuSWEpCYeMc6kGx09hQOcXbJDctfCLa8xgnRnb0y7/exec";
	//       }
	//     });
	//     if (scriptURL == "") {
	//       alert("Please check in your credentials again!!");
	//       submitButton.disabled = false;
	//       return;
	//     }
	//     fetch(scriptURL, { method: "POST", body: requestBody })
	//       .then((response) => {
	//         alert(
	//           "Thank you for submitting!! We will look into it soon"
	//         );
	//         submitButton.disabled = false;
	//         modal.style.display = "none";
	//       })
	//       .catch((error) => {
	//         alert("Sorry an error has occured!!");
	//         submitButton.disabled = false;
	//       });
	//   });
	// }, []);

	const handleTitleClick = () => {
		window.open("https://pathway.com/", "_blank", "noopener,noreferrer");
	};
	const handleYouthInc = () => {
		window.open("https://youthincmag.com/", "_blank", "noopener,noreferrer");
	};
	const handleDazeInfo = () => {
		window.open("https://dazeinfo.com/", "_blank", "noopener,noreferrer");
	};
	const handleTheAca = () => {
		window.open(
			"https://theacademicinsights.com/",
			"_blank",
			"noopener,noreferrer"
		);
	};
	const handleStock = () => {
		window.open("https://stockedge.com/", "_blank", "noopener,noreferrer");
	};

	return (
		<>
			{/* <div id="modal-click" className="modal-background">
        <br />
      </div>
      <div id="modal-box" class="modal-box">
        <label for="modal-click" id="modal-close" class="fas fa-times"></label>

        <div class="modal-content">
          <h1 class="modal-heading">KDSH Certificate Retrieval</h1>
          <form id="form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="John Smith"
                required
                name="Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Your email"
                required
                name="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Any Problems in downloading the certificate?
              </label>
              <textarea
                className="form-control"
                id="textarea"
                rows="1"
                placeholder="Type here"
                name="Problems"
                required
              />
            </div>
            <div className="form-group" id="buttons">
              <button type="submit" className="btn btn-danger" id="submitbtn">
                Submit for issues
              </button>
            </div>
          </form>
          <button
            className="btn btn-warning"
            id="download"
            onClick={downloadCertificate}
          >
            Download the certificate
          </button>
        </div>
      </div> */}

			{/* Header Section */}

			<section className="banner" color="white">
				{/* <Header />
        <a
          href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-2022-indian-institute-of-technology-iit-kharagpur-542463"
          target="_blank"
          className="banner-video"
        >
          <video
            src={video1}
            height="600"
            width="auto"
            autoplay="true"
            muted
            loop
          ></video>
  </a> */}

				{/* banner main starts */}
				<div className="banner-main">
					<div className="banner-image-div"></div>
					{/* <div className="banner-heading-flex-container">
						<div className="banner-heading-flex">
							<div className="banner-heading">
								<h3 style={{ fontSize: "35px", fontWeight: "600" }}>
									Kharagpur Data Science Hackathon 2025
								</h3>
							</div>
						</div>
					</div> */}

					<div className="temp-banner-heading-flex-container">
						<img src={kdsh2025_logo} alt="" />
					</div>

					<div className="banner-content-flex">
						<img
							className="banner-poster"
							src={KDSH5thEdition}
							alt="Poster"
							// height={250}
						/>
						<div className="banner-content">
							{/* <p>
								This competition combines innovation, technology, and data
								science to challenge the brightest minds at IIT Kharagpur.
								Participants will showcase their innovative ideas and harness
								the power of Data Analytics to solve real world problems faced
								by people in the IIT Kharagpur campus. Whether focusing on
								enhancing Hall Management or academic-related matters, your data
								driven solutions can elevate everyone's life on campus. This event
                is generously sponsored by our esteemed alumnus, <a href="https://sibasmarak.github.io/" id="alumni-link" target="_blank">
                Siba Smarak Panigrahi</a> , currently pursuing an M.Sc. at McGill University 
                and Mila, Canada.
							</p> */}
							<p>
								"Without data, you're just another person with an opinion." - W.
								Edwards Deming <br />
								The 5th Edition of the{" "}
								<strong>Kharagpur Data Science Hackathon</strong> (KDSH) is here
								to push boundaries and redefine excellence in data science.
								Prepare to immerse yourself in cutting-edge machine learning,
								tackle real-world data challenges, and showcase your innovative
								solutions. Gain exclusive opportunities to connect with industry
								leaders, sharpen your expertise, and emerge as a trailblazer in
								the world of data science. This is more than a competition; it's
								a platform to push your limits, ignite your passion for data,
								and create meaningful change.
							</p>
						</div>
					</div>
					{/* banner main ends */}

					{/* banner info starts */}
					{/* <div className="banner-info-flex">
						<div className="banner-info">
							{/* <FontAwesomeIcon icon={faCalendarDays} className="icon" shake />
							<p id="banner-info">Coming Soon</p> */}
							{/* /* <FontAwesomeIcon icon={faLocationDot} className="icon" flip />
							<p id="banner-info">Online</p>
						</div>
					</div> */  }
					{/* banner info ends */}
					{/* banner button starts */}
					{/* <div className="banner-button-flex">
                            <a href="/register-kdsh">  <div className="banner-button">
                        	<button class="btn-12" style={{ cursor: "pointer" }}> <span>Register Now</span>
                        </button>
    				</div>
  							</a>
  							<a href="/register-kdsh">  <button id="banner-button-media" class="btn-12">
      							<span>Register Now</span>
    					</button>
  							</a>
					</div> */}
				</div>
				{/* banner button ends */}

				{/* <div className="kdsh2025_header">
					Introducing Sponsors for KDSH 2025
				</div>

				<div className="kdsh2025_sponsors">
					<img src={associate_sponsor} alt="associate_sponsor" />
				</div> */}

				{/* <div className="kdsh2025-sponsor-slider">
					<ul>
						<li>
							<img src={associate_sponsor} alt="associate_sponsor" />
						</li>
						<li>
							<img src={associate_sponsor} alt="associate_sponsor" />
						</li>
						<li>
							<img src={associate_sponsor} alt="associate_sponsor" />
						</li>
						<li>
							<img src={associate_sponsor} alt="associate_sponsor" />
						</li>
						<li>
							<img src={associate_sponsor} alt="associate_sponsor" />
						</li>
						<li>
							<img src={associate_sponsor} alt="associate_sponsor" />
						</li>
					</ul>

					<ul aria-hidden="true">
						<li>
							<img src={associate_sponsor} alt="associate_sponsor" />
						</li>
						<li>
							<img src={associate_sponsor} alt="associate_sponsor" />
						</li>
						<li>
							<img src={associate_sponsor} alt="associate_sponsor" />
						</li>
						<li>
							<img src={associate_sponsor} alt="associate_sponsor" />
						</li>
						<li>
							<img src={associate_sponsor} alt="associate_sponsor" />
						</li>
						<li>
							<img src={associate_sponsor} alt="associate_sponsor" />
						</li>
					</ul>
				</div> */}

				<div className="banner-countdown">
					<div className="banner-count-flex">
						<EventCount />
					</div>
				</div>

				{/* banner queries starts */}
				{/* <div className="banner-queries">
					<div className="query-heading-flex">
						<div className="query-heading">
							<h2 style={{ fontSize: "20px", fontWeight: "700" }}>
								Ask Your Queries!
							</h2>
						</div>
					</div>
					<div className="query-person-details-flex">
						<form id="form">
							<h5 id="query-name">Name</h5>
							<input type="text" id="query-box-name" name="Name" required />

							<h5 id="query-email">Email</h5>
							<input type="text" id="query-box-email" name="Email" required />

							<h5 id="query">Query</h5>
							<input type="text" id="query-box-query" name="Query" required />
							<div className="query-submit-button-flex">
								<div className="query-submit-button">
									<button
										class="btn-12"
										type="submit"
										id="btn-12-submit"
										style={{ cursor: "none" }}
									>
										<span>Submit</span>
									</button>
								</div>
							</div>
						</form>
					</div> */}
				{/* <div className="query-box-flex">
						<input type="text" id="query-box-name" />
						<input type="text" id="query-box-email" />
						<input type="text" id="query-box-query" />
					</div> 
					 <div className="query-submit-button-flex">
						<div className="query-submit-button">
							<button
								class="btn-12"
								type="submit"
								id="btn-12-submit"
								onClick={handleSubmit}
							>
								<span>Submit</span>
							</button>
						</div>
					</div> */}
				{/* </div> */}
				{/* -------------------------------------------------------------banner queries ends */}

				{/* <link rel="stylesheet" href="dd" >Register Now</link> */}
			</section>

			{/* content section  */}
			<section className="section-contents">
				{/* <Fade bottom>
        <div className="Hackathon-button">
          <div className="Hackathon-button-button"><a href="http://tinyurl.com/kdshreg" target="_blank" rel="noreferrer noopener">Register for Kharagpur Data Science Hackathon</a></div>
        </div>
        </Fade> */}

				<div className="about-kdag-wrapper">
					<div className="about-kdag">
						{/* <Fade left> */}
						{/* <div className="about-kdag-image">
          <img src={logo} alt="LOGO" />
        </div> */}
						{/* </Fade> */}

						<Fade right>
							<div className="about-kdag-text">
								<h1 className="heading-about-kdag">About Us</h1>
								<hr className="rule-about-kdag" />
								<i>
									"KDAG is aimed at bringing Data Analytics and Machine Learning
									enthusiasts together under the umbrella of a single society,
									and provide ample opportunities & resources that are required
									to build a successful career in this emerging domain."
								</i>
							</div>
						</Fade>
					</div>
				</div>
				<Content />
			</section>

			{/* Contact Section */}
			{/*<section className="section-contacts">
        <Contact />
      </section>*/}

			<Particless />
		</>
	);
};

export default LandingPage;
