import React from "react";
import TeamCard from "./TeamCard";
import TeamCardSM from "./TeamCardSM";
import TeamPageHeading from "./TeamPageHeading";
import members from "./MembersStatic";
import advisors from "./AdvisorsStatic";
import Header from "./Header";
import Fade from "react-reveal/Fade";
import Particless from "../Common/Particles/Particless";
import "./TeamPage.css";

const TeamPage = () => {
	return (
		<>
			<Header />
			<a href="/alumni">
				<button className="floating-action-button">ALUMNI</button>
			</a>
			<Fade left>
				<TeamPageHeading text="Heads" />
			</Fade>
			<div className="members-head-list">
				{members?.map((member) => {
					return <TeamCard key={member.id} member={member} />;
				})}
			</div>

			<Fade left>
				<TeamPageHeading text="Advisors" />
			</Fade>
			<div className="members-head-list-SM">
				{advisors?.map((member) => {
					return <TeamCardSM key={member.id} member={member} />;
				})}
			</div>

			<br />
			<br />
			<br />
			<br />

			<Particless />
		</>
	);
};

export default TeamPage;
