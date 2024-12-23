import React from "react";
import Fade from "react-reveal/Fade";
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
				<Fade top>
					<div className="register-header">
						<div className="spacer layer1"></div>
						<div className="success-register-kdsh">
							<img src={kdsh_2025} alt="KDSH2025" style={{ height: "90px" }} />
						</div>
						<div className="success-register-kdsh-desc">
							<p>
								Congratulations on successfully registering for{" "}
								<strong>Kharagpur Data Science Hackathon 2025</strong>. For
								timelines and other details related to the Hackathon Visit
								Unstop.{" "}
							</p>
							<p>
								Join the Whatsapp Group and Discord Channel for regular updates!
							</p>
							<p>
								<a
									href="https://chat.whatsapp.com/KtYlMh9h1Sw7QxLVRWvpSj"
									target="_blank"
									rel="noreferrer noopener"
								>
									<img src={whatsapp} alt="whatsapp" />
								</a>

								<a
									href="https://discord.com/invite/S8rpuCTk"
									target="_blank"
									rel="noreferrer noopener"
								>
									<img src={discord} alt="discord" />
								</a>
							</p>

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
					</div>
				</Fade>
			</div>
			{particless}
		</>
	);
};

export default Success;
