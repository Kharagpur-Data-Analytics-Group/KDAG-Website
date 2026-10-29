import React from "react";
import HeaderDiscussion from "./HeaderDiscussion";
import Fade from "../Common/Motion/Fade.jsx";
import Particless from "../Common/Particles/Particless";
const DiscussionPage = () => {
  return <>
      <Fade left>
        <HeaderDiscussion />
      </Fade>
      <Particless />
    </>;
};
export default DiscussionPage;
