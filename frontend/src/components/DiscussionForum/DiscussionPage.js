import React from "react";
import "./DiscussionPage.css";
import HeaderDiscussion from "./HeaderDiscussion";
import Fade from "react-reveal/Fade";
import Particless from "../Common/Particles/Particless";
import DiscussionComment from "./DiscussionComment";

import "./DiscussionComment.css";
import profileImage from "./profile.jpeg";
import icon_heart from "./asset_heart.png";

const DiscussionPage = () => {
	return (
		<>
			<Fade left>
				<HeaderDiscussion />
			</Fade>
			<Particless />
		</>
	);
};

export default DiscussionPage;
