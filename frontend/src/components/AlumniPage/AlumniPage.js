import React from "react";
import TeamCardAlum from "./TeamCardAlumni";
import AlumniPageHeading from "./AlumniPageHeading";
import members_2016 from "./AlumniStatic2016";
import members_2017 from "./AlumniStatic2017";
import members_2018 from "./AlumniStatic2018";
import members_2019 from "./AlumniStatic2019";
import members_2020 from "./AlumniStatic2020";
import members_2021 from "./AlumniStatic2021";
import members_2022 from "./AlumniStatic2022";
import members_2023 from "./AlumniStatic2023";
import members_2024 from "./AlumniStatic2024";
import members_2025 from "./AlumniStatic2025";
import Header from "./Header";
import Fade from "react-reveal/Fade";
import Particless from "../Common/Particles/Particless";
import "./AlumniPage.css";

const AlumniPage = () => {
	return (
		<>
			<Header />
			<Fade left>
				<AlumniPageHeading text="Graduating Batch Of 2025" />
			</Fade>{" "}
			<div className="alumni-members-list">
				{members_2025?.map((member) => {
					return <TeamCardAlum key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading text="Graduating Batch Of 2024" />
			</Fade>{" "}
			<div className="alumni-members-list">
				{members_2024?.map((member) => {
					return <TeamCardAlum key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading text="Graduating Batch Of 2023" />
			</Fade>{" "}
			<div className="alumni-members-list">
				{members_2023?.map((member) => {
					return <TeamCardAlum key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading text="Graduating Batch Of 2022" />
			</Fade>{" "}
			<div className="alumni-members-list">
				{members_2022?.map((member) => {
					return <TeamCardAlum key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading text="Graduating Batch Of 2021" />
			</Fade>{" "}
			<div className="alumni-members-list">
				{members_2021?.map((member) => {
					return <TeamCardAlum key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading text="Graduating Batch Of 2020" />
			</Fade>{" "}
			<div className="alumni-members-list">
				{members_2020?.map((member) => {
					return <TeamCardAlum key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading text="Graduating Batch Of 2019" />
			</Fade>{" "}
			<div className="alumni-members-list">
				{members_2019?.map((member) => {
					return <TeamCardAlum key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading text="Graduating Batch Of 2018" />
			</Fade>{" "}
			<div className="alumni-members-list">
				{members_2018?.map((member) => {
					return <TeamCardAlum key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading text="Graduating Batch Of 2017" />
			</Fade>{" "}
			<div className="alumni-members-list">
				{members_2017?.map((member) => {
					return <TeamCardAlum key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading text="Graduating Batch Of 2016" />
			</Fade>{" "}
			<div className="alumni-members-list">
				{members_2016?.map((member) => {
					return <TeamCardAlum key={member.id} member={member} />;
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

export default AlumniPage;
