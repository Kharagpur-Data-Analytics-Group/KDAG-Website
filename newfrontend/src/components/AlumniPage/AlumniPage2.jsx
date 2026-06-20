import React from "react";
import TeamCardAlumni2 from "./TeamCardAlumni2.jsx";
import AlumniPageHeading2 from "./AlumniPageHeader2";
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
import Header2 from "./Header2";
import Fade from "../Common/Motion/Fade.js"
import Particless from "../Common/Particles/Particless";
import "./AlumniPage.css";

const AlumniPage2 = () => {
	return (
		<>
			
			<Header2/>
			<Fade left>
				<AlumniPageHeading2 text="Graduating Batch Of 2025" />
			</Fade>{" "}
			<div className="flex w-92/100 max-w-248 m-auto flex-wrap justify-center rounded-[30px] overflow-hidden h-204 backdrop-blur-[6px] [&::-webkit-scrollbar]:w-0"
            style={{ paddingTop : '50px', paddingBottom : '65px'}}>
				{members_2025?.map((member) => {
					return <TeamCardAlumni2 key={member.id} member={member} />;
				})}
			</div>

			<Fade left>
				<AlumniPageHeading2 text="Graduating Batch Of 2024" />
			</Fade>{" "}
			<div className="flex w-92/100 max-w-248 m-auto flex-wrap justify-center rounded-[30px] overflow-hidden h-204 backdrop-blur-[6px] [&::-webkit-scrollbar]:w-0"
            style={{ paddingTop : '50px', paddingBottom : '65px'}}>
				{members_2024?.map((member) => {
					return <TeamCardAlumni2 key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading2 text="Graduating Batch Of 2023" />
			</Fade>{" "}
			<div className="flex w-92/100 max-w-248 m-auto flex-wrap justify-center rounded-[30px] overflow-hidden h-204 backdrop-blur-[6px] [&::-webkit-scrollbar]:w-0"
            style={{ paddingTop : '50px', paddingBottom : '65px'}}>
				{members_2023?.map((member) => {
					return <TeamCardAlumni2 key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading2 text="Graduating Batch Of 2022" />
			</Fade>{" "}
			<div className="flex w-92/100 max-w-248 m-auto flex-wrap justify-center rounded-[30px] overflow-hidden h-204 backdrop-blur-[6px] [&::-webkit-scrollbar]:w-0"
            style={{ paddingTop : '50px', paddingBottom : '65px'}}>
				{members_2022?.map((member) => {
					return <TeamCardAlumni2 key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading2 text="Graduating Batch Of 2021" />
			</Fade>{" "}
			<div className="flex w-92/100 max-w-248 m-auto flex-wrap justify-center rounded-[30px] overflow-hidden h-204 backdrop-blur-[6px] [&::-webkit-scrollbar]:w-0"
            style={{ paddingTop : '50px', paddingBottom : '65px'}}>
				{members_2021?.map((member) => {
					return <TeamCardAlumni2 key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading2 text="Graduating Batch Of 2020" />
			</Fade>{" "}
			<div className="flex w-92/100 max-w-248 m-auto flex-wrap justify-center rounded-[30px] overflow-hidden h-204 backdrop-blur-[6px] [&::-webkit-scrollbar]:w-0"
            style={{ paddingTop : '50px', paddingBottom : '65px'}}>
				{members_2020?.map((member) => {
					return <TeamCardAlumni2 key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading2 text="Graduating Batch Of 2019" />
			</Fade>{" "}
			<div className="flex w-92/100 max-w-248 m-auto flex-wrap justify-center rounded-[30px] overflow-hidden h-204 backdrop-blur-[6px] [&::-webkit-scrollbar]:w-0"
            style={{ paddingTop : '50px', paddingBottom : '65px'}}>
				{members_2019?.map((member) => {
					return <TeamCardAlumni2 key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading2 text="Graduating Batch Of 2018" />
			</Fade>{" "}
			<div className="flex w-92/100 max-w-248 m-auto flex-wrap justify-center rounded-[30px] overflow-hidden h-204 backdrop-blur-[6px] [&::-webkit-scrollbar]:w-0"
            style={{ paddingTop : '50px', paddingBottom : '65px'}}>
				{members_2018?.map((member) => {
					return <TeamCardAlumni2 key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading2 text="Graduating Batch Of 2017" />
			</Fade>{" "}
			<div className="flex w-92/100 max-w-248 m-auto flex-wrap justify-center rounded-[30px] overflow-hidden h-204 backdrop-blur-[6px] [&::-webkit-scrollbar]:w-0"
            style={{ paddingTop : '50px', paddingBottom : '65px'}}>
				{members_2017?.map((member) => {
					return <TeamCardAlumni2 key={member.id} member={member} />;
				})}
			</div>
			<Fade left>
				<AlumniPageHeading2 text="Graduating Batch Of 2016" />
			</Fade>{" "}
			<div className="flex w-92/100 max-w-248 m-auto flex-wrap justify-center rounded-[30px] overflow-hidden h-204 backdrop-blur-[6px] [&::-webkit-scrollbar]:w-0"
            style={{ paddingTop : '50px', paddingBottom : '65px'}}>
				{members_2016?.map((member) => {
					return <TeamCardAlumni2 key={member.id} member={member} />;
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

export default AlumniPage2;
