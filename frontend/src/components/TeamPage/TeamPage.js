import React from "react"
import TeamCard from "./TeamCard"
import TeamCardSM from "./TeamCardSM";
import TeamPageHeading from "./TeamPageHeading";
import members from "./MembersStatic"
// import seniormembers from "./SeniorMembersStatic";
import advisors from "./AdvisorsStatic";
import alumni from "./AlumniStatic";
import Header from "./Header";
import Fade from "react-reveal/Fade";
import Particless from '../Common/Particles/Particless'
// import bullet from "../../assets/svgs/TeamBullet.svg";
import "./TeamPage.css"

const TeamPage = () => {
  return (
    <>
      <Header />
      <Fade left>
        <TeamPageHeading text="Heads" />
      </Fade>
      <div className="members-head-list">

        {members?.map((member) => {
          return <TeamCard key={member.id} member={member} />;
        })
        }
      </div>

      <Fade left>
        <TeamPageHeading text="Advisors" />
      </Fade>
      <div className="members-head-list">

        {advisors?.map((member) => {
          return <TeamCardSM key={member.id} member={member} />;
        })
        }
      </div>

      <br /><br /><br /><br /><br /><br /><br />

      {/* <Fade left>
        <TeamPageHeading text="Senior Members" />
        </Fade> 
        <div className="members-head-list ">   
            
        {seniormembers?.map((member) => {
            return <TeamCardSM key={member.id} member = {member} />;
          }) 
        }

        <Fade left>
        <TeamPageHeading text="Alumni" />
      </Fade>
      <div className="members-head-list">

        {alumni?.map((member) => {
          return <TeamCardSM key={member.id} member={member} />;
        })
        }
      </div>
        </div>  */}

{/* <Fade left>
        <TeamPageHeading text="Senior Members" />
      </Fade>
      <div className="members-head-list">

        {SeniorMembers?.map((member) => {
          return <TeamCardSM key={member.id} member={member} />;
        })
        }
      </div> */}

      <Fade left>
        <TeamPageHeading text="Alumni" />
      </Fade>
      <div className="members-head-list">

        {alumni?.map((member) => {
          return <TeamCardSM key={member.id} member={member} />;
        })
        }
      </div>
      <Particless />
    </>
  )
}

export default TeamPage;
/*members-head-list-bottom  , I removed this from ,senior members, <div className="members-head-list members-head-list-bottom"> */