import React from "react";
import Fade from "../Common/Motion/Fade.js"
import "./TeamCardSM.css";
import "./TeamCard.css";

const TeamCardSM = ({ member }) => {
	return (
		// <div class="member-card-wrapper-SM">
		// 	<Fade bottom>
		// 		<div className="member-card-SM">
		// 			<div class="member-card-section-0-SM">
		// 				<div class="member-profile-image-SM">
		// 					<img src={member?.image} alt="Images" />
		// 				</div>
		// 			</div>
		// 			<div class="member-card-section-1-SM">
		// 				<div class="member-name-SM">
		// 					<p>{member?.name || "Name of Member"}</p>
		// 				</div>
		// 				{/* <div class="member-email-SM">
		//          <p>{member?.email || "email id"}</p>
		//        </div> */}
		// 			</div>

		// 			<div class="member-profile-follow-SM">
		// 				<div class="member-social-icon-SM">
		// 					{/* <div class="member-social-icon-icon-SM">
		//              <a href={member?.facebook || "#"}><i class="fab fa-facebook"></i></a>
		//            </div> */}
		// 					{/* <div class="member-social-icon-icon">
		//              <a href={member?.twitter || "#"}><i class="fab fa-twitter"></i></a>
		//            </div> */}
		// 					<div class="member-social-icon-icon-SM">
		// 						{member.linkedin ? (
		// 							<a
		// 								href={member?.linkedin || "#"}
		// 								target="_blank"
		// 								rel="noreferrer noopener"
		// 							>
		// 								<i class="fab fa-linkedin"></i>
		// 							</a>
		// 						) : (
		// 							<a
		// 								href={member?.website || "#"}
		// 								target="_blank"
		// 								rel="noreferrer noopener"
		// 							>
		// 								<i class="fas fa-globe"></i>
		// 							</a>
		// 						)}
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</Fade>
		// </div>
		<div class="member-card-wrapper-head">
			<Fade bottom>
				<div className="member-card-head">
					<div class="member-profile-image-head">
						<img src={member?.image} alt="Image" />
					</div>
					<div class="member-name-head">
						<p>{member?.name || "Name of Member"}</p>
					</div>
					{/* <div class="member-email">
           <p>{member?.email || "email id"}</p>
         </div> */}
					<div class="member-profile-follow">
						<div class="member-follow-text">
							<span>Follow on</span>
						</div>
						<div class="member-social-icon">
							<div class="member-social-icon-icon">
								<a
									href={member?.facebook || "#"}
									target="_blank"
									rel="noreferrer noopener"
								>
									<i class="fab fa-facebook"></i>
								</a>
							</div>
							{/* <div class="member-social-icon-icon">
               <a href={member?.twitter || "#"}><i class="fab fa-twitter"></i></a>
             </div> */}
							<div class="member-social-icon-icon">
								<a
									href={member?.linkedin || "#"}
									target="_blank"
									rel="noreferrer noopener"
								>
									<i class="fab fa-linkedin"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</Fade>
		</div>
	);
};

export default TeamCardSM;
