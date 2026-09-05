import React from "react";
import Fade from "../Common/Motion/Fade.js";
import "./TeamCard.css";

const TeamCard = ({ member }) => {
	return (
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
							<span>Follow</span>
						</div>
						<div class="member-social-icon">
							<div class="member-social-icon-icon">
								{member?.facebook && (
									<a
										href={member?.facebook || "#"}
										target="_blank"
										rel="noreferrer noopener"
									>
										<i class="fab fa-facebook"></i>
									</a>
								)}
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
							<div class="member-social-icon-icon">
								{member?.instagram && (
									<a
										href={member.instagram}
										target="_blank"
										rel="noreferrer noopener"
									>
										<i className="fab fa-instagram"></i>
									</a>
								)}
							</div>
							<div class="member-social-icon-icon">
								{member?.email && (
									<a href={`mailto:${member.email}`}>
										<i className="fas fa-envelope"></i>
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			</Fade>
		</div>
	);
};

export default TeamCard;
