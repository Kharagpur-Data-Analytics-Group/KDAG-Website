import React, { useEffect, useState } from "react";
import Fade from "../Common/Motion/Fade.jsx";
import Particless from "../Common/Particles/Particless";
const CommunityGuidelines = () => {
  const particless = React.useMemo(() => <Particless />, []);
  return <div className="community-guidelines-container [padding:25px]! [padding-top:100px]! [color:white]! [display:flex]! [flex-direction:column]! [justify-content:center]! [align-items:center]! [&_h1]:[font-weight:800]! [&_h1]:[font-size:50px]! [&_h1]:[font-style:italic]! [&_h1]:[margin-bottom:50px]! max-[650.01px]:[&_h1]:[font-weight:800]! max-[650.01px]:[&_h1]:[font-size:40px]! max-[650.01px]:[&_h1]:[margin-bottom:35px]! max-[650.01px]:[padding:15px]! max-[650.01px]:[padding-top:100px]! max-[650.01px]:[color:white]! max-[650.01px]:[display:flex]! max-[650.01px]:[flex-direction:column]! max-[650.01px]:[justify-content:center]! max-[650.01px]:[align-items:center]!">
      <h1>Community Guidelines</h1>
      <div className="community-guidelines [font-size:18px]! [color:rgba(255,_255,_255,_0.675)]! [background-color:rgba(255,_255,_255,_0.05)]! [backdrop-filter:blur(5px)]! [border:solid_rgba(255,_255,_255,_0.115)_2px]! [padding:50px]! [text-align:justify]! [border-radius:20px]! [width:80%]! max-[650.01px]:[font-size:16px]! max-[650.01px]:[padding:30px]! max-[650.01px]:[border-radius:10px]! max-[650.01px]:[width:95%]!">
        <p>
          Welcome to our Kharagpur Data Analytics Group discussion forum! To
          maintain a respectful and productive environment, please follow these
          guidelines:
        </p>
        <br />

        <ul>
          <li>
            <strong>Stay on Topic</strong> <br />
            Ensure your posts are related to AI, machine learning, deep
            learning, or related fields.
          </li>
          <br />
          <li>
            <strong>Respect Others</strong> <br />
            Be courteous and avoid personal attacks. Criticize ideas, not
            individuals.
          </li>
          <br />
          <li>
            <strong>No Harassment</strong> <br />
            Any form of discrimination, harassment, sexism, racism or hate
            speech will not be tolerated.
          </li>
          <br />
          <li>
            <strong>Quality Contributions</strong> <br />
            Share meaningful insights, questions, and resources. Avoid spam or
            off-topic posts.
          </li>
          <br />
          <li>
            <strong>Cite Sources</strong> <br />
            Always give credit for external resources, research papers, or code
            snippets you reference.
          </li>
          <br />
          <li>
            <strong>Constructive Feedback</strong> <br />
            Provide helpful feedback or corrections, and avoid dismissive
            comments.
          </li>
          <br />
          <li>
            <strong>No Plagiarism</strong> <br />
            Original thoughts and properly attributed content only. Please do
            not copy or repost others’ work without permission.
          </li>
          <br />
          <li>
            <strong>No Self-Promotion</strong> <br />
            Limit self-promotion or advertising. Contributions should focus on
            helping the community, not personal gain.
          </li>
          <br />
          <li>
            <strong>Content Policy</strong> <br />
            Posting Obscene Content is strictly Prohibited. This includes text or links featuring nudity,
            sex, hard violence, or other graphically disturbing content.
          </li>
          <br />
          <li>
            <strong>Moderation Compliance</strong> <br />
            Respect decisions made by moderators and avoid reposting deleted
            content. If you see something against the rules or something that
            makes you feel unsafe, let us know at iitkgpkdag@gmail.com. We want
            this forum to be a welcoming place.
          </li>
          <br />
        </ul>
        <br />

        <p>
          We’re here to foster learning and collaboration—thank you for helping
          us maintain a positive community!
        </p>
      </div>
      {particless}
    </div>;
};
export default CommunityGuidelines;
