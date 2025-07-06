import React from "react";
import Flex from "react-reveal/Fade";
import "./TeamCardAlumni.css";

const TeamCardAlum = ({ member }) => {
	return (
		<div class="alumni-member-card-wrapper">
			<Flex bottom>
				<div className="alumni-member-card">
					<div class="alumni-member-profile-image">
						<img src={member?.image} alt="John" />
					</div>
					<div class="alumni-member-name">
						<p>{member?.name || "Name of Member"}</p>
					</div>

					<div class="alumni-member-company">
						<p>{member?.workplace || ""}</p>
					</div>

					<div class="alumni-member-profile-follow">
						<div class="alumni-member-follow-text">
							<span>Follow on</span>
						</div>
						<div class="alumni-member-social-icon">
							<div class="alumni-member-social-icon-icon">
								{member?.facebook && (
									<a
										href={member.facebook}
										target="_blank"
										rel="noreferrer noopener"
									>
										<i className="fab fa-facebook"></i>
									</a>
								)}

							</div>

							<div class="alumni-member-social-icon-icon">
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
			</Flex>
		</div>
	);
};

export default TeamCardAlum;
