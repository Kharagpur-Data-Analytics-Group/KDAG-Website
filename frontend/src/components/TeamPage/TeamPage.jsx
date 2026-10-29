import React from "react";
import TeamCard from "./TeamCard.jsx";
import TeamCardSM from "./TeamCardSM.jsx";
import TeamPageHeading from "./TeamPageHeading.jsx";
import members from "./MembersStatic";
import advisors from "./AdvisorsStatic";
import seniorAdvisors from "./Senior-AdvisorsStatic";
import Header from "./Header.jsx";
import Fade from "../Common/Motion/Fade.jsx";
import Particless from "../Common/Particles/Particless";

const TeamPage = () => {
  return (
    <>
      <style>{teamPageStyles}</style>
      <Header />
      <a href="/alumni">
        <button
          className="fixed bottom-5 right-5 bg-transparent text-lg font-medium text-white transition-all duration-200"
          style={{
            zIndex: 100,
            backdropFilter: "blur(3px)",
            borderRadius: "100px",
            border: "solid red 2px",
            padding: "8px 20px",
            textShadow: "0 0 10px black",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 10px rgb(255, 0, 0)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          ALUMNI
        </button>
      </a>
      <Fade left>
        <TeamPageHeading text="Executive Heads" />
      </Fade>
      <div className="team-page-list flex flex-wrap justify-center mx-auto">
        {members?.map((member) => {
          return <TeamCard key={member.id} member={member} />;
        })}
      </div>

      <Fade left>
        <TeamPageHeading text="Advisors" />
      </Fade>
      <div className="team-page-list flex flex-wrap justify-center mx-auto">
        {advisors?.map((member) => {
          return <TeamCardSM key={member.id} member={member} />;
        })}
      </div>

      <Fade left>
        <TeamPageHeading text="Senior Advisors" />
      </Fade>
      <div className="team-page-list flex flex-wrap justify-center mx-auto">
        {seniorAdvisors?.map((member) => {
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

// Kept as real CSS: the exact width (90%) and max-width (60rem) don't map to
// any standard Tailwind token (closest fraction/scale values aren't exact
// matches), and the responsive breakpoint in the original CSS is 1000px,
// which doesn't line up with Tailwind's default 1024px (lg:) breakpoint.
// Using a manual @media query here preserves the original breakpoint exactly.
const teamPageStyles = `
  .team-page-list {
    width: 90%;
    max-width: 60rem;
  }

  @media screen and (max-width: 1000px) {
    .team-page-list {
      width: 100%;
      height: auto;
    }
  }
`;

export default TeamPage;
