import React from "react";
import Fade from "../Common/Motion/Fade.js"
import Particless from "../Common/Particles/Particless";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterPage.css";
import "./Success.css";
import banner_logo from "./../../assets/DataForge_big.png";

const Success = () => {
	const particless = React.useMemo(() => <Particless />, []);

	return (
		<>
			<div className="success-container">
				<div className="register-header">
					<div className="spacer layer1"></div>
					<Fade top>
						<div className="success-register-kdsh">
							<img src={banner_logo} alt="KDSH2025" />
						</div>
					</Fade>
					<Fade top>
						<div className="success-register-kdsh-desc">
							<p>
								Congratulations on successfully registering for{" "}
								<strong>DataForge 2026</strong>.
								For
								timelines and other details related to the Hackathon Visit {" "}
								<a
									className="kdsh-unstop-link"
									href="https://unstop.com/p/dataforge-2026-iit-kharagpur-1739346"
									target="_blank"
									rel="noreferrer noopener"
								>
									Unstop Page
								</a>.{" "}
							</p>
							<p>
								Join the{" "}
								<a
									className="kdsh-unstop-link"
									href="https://chat.whatsapp.com/HOcAy0mnwcRJ7qPlRmPDuK?s=cl&p=i&mlu=4&amv=0"
									target="_blank"
									rel="noreferrer noopener"
								>
									Whatsapp Group
								</a>
								{" "}for regular updates!
							</p>

							<div className="important-note2" style={{ marginTop: "30px" }}>
								<strong>Important for Team Leaders:</strong> After all Members have joined your team, you MUST finalize your team on the{" "}
								<a
									href="/manage-team"
									className="important-note2-link"
									style={{ color: "#8fb3ff", textDecoration: "underline", textUnderlineOffset: "3px" }}
								>
									Manage Team page
								</a>{" "}
								to complete your registration. Your team will only appear on Unstop after finalization.
							</div>
						</div>
					</Fade>
				</div>
			</div>
			{particless}
		</>
	);
};

export default Success;
