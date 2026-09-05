import React from "react";
import Fade from "../Common/Motion/Fade.js"
import Particless from "../Common/Particles/Particless";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterPage.css";
import "./Success.css";
import whatsapp from "./../../assets/kdsh2025_whatsapp.png";
import discord from "./../../assets/kdsh2025_discord.png";
import instagram from "./../../assets/kdsh2025_instagram.png";
import facebook from "./../../assets/kdsh2025_facebook.png";
import medium from "./../../assets/kdsh2025_medium.png";
import linkedin from "./../../assets/kdsh2025_linkedin.png";
import kdsh_2025 from "./../../assets/kdsh2025_logo.png";

const Success = () => {
	const particless = React.useMemo(() => <Particless />, []);

	return (
		<>
			<div className="success-container">
				<div className="register-header">
					<div className="spacer layer1"></div>
					<Fade top>
						<div className="success-register-kdsh">
							<img src={kdsh_2025} alt="KDSH2025" />
						</div>
					</Fade>
					<Fade top>
						<div className="success-register-kdsh-desc">
							<p>
								Congratulations on successfully registering for{" "}
								<strong>Kharagpur Data Science Hackathon 2026</strong>. 
								For
								timelines and other details related to the Hackathon Visit {" "}
								<a
									className="kdsh-unstop-link"
									href="https://unstop.com/p/kharagpur-data-science-hackathon-2026-iit-kharagpur-1614844"
									target="_blank"
									rel="noreferrer noopener"
								>
									Unstop Page
								</a>.{" "}
							</p>
							<p>
								Join the Whatsapp Group and Discord Channel for regular updates!
							</p>
							<p>
								<a
									href="https://chat.whatsapp.com/LguOtn8Dwyh19sajyCKNoQ"
									target="_blank"
									rel="noreferrer noopener"
								>
									<img src={whatsapp} alt="whatsapp" />
								</a>

								<a
									href="https://discord.gg/fBfvXCTQF"
									target="_blank"
									rel="noreferrer noopener"
								>
									<img src={discord} alt="discord" />
								</a>
							</p>

							<div className="important-note2" style={{ marginTop: "30px" }}>
								<strong>Important for Team Leaders:</strong> After all Members have joined your team, you MUST finalize your team on the{" "}
								<a href="/manage-team" style={{ color: "#60a5fa", textDecoration: "underline" }}>
									Manage Team page
								</a>{" "}
								to complete your registration. Your team will only appear on Unstop after finalization.
							</div>

						{/* <p>Follow us on the following Platforms to stay updated</p>

						<ul className="kdsh2025_success">
							<li>
								<a
									className="kdsh-link"
									href="https://www.instagram.com/kdag.iitkgp/"
									target="_blank"
									rel="noreferrer noopener"
								>
									<img src={instagram} alt="instagram" />
								</a>
							</li>
							<li>
								<a
									className="kdsh-link"
									href="https://www.facebook.com/kgpdag/"
									target="_blank"
									rel="noreferrer noopener"
								>
									<img src={facebook} alt="facebook" />
								</a>
							</li>
							<li>
								<a
									className="kdsh-link"
									href="https://in.linkedin.com/company/kdag"
									target="_blank"
									rel="noreferrer noopener"
								>
									<img src={linkedin} alt="linkedin" />
								</a>
							</li>
							<li>
								<a
									className="kdsh-link"
									href="https://kdagiit.medium.com/"
									target="_blank"
									rel="noreferrer noopener"
								>
									<img src={medium} alt="medium" />
								</a>
							</li>
						</ul> */}
					</div>
					</Fade>
				</div>
			</div>
			{particless}
		</>
	);
};

export default Success;
