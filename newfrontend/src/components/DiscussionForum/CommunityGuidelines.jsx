import React from "react";
import styled from "styled-components";
import Particless from "../Common/Particles/Particless";

const CommunityGuidelinesContainer = styled.div`
	padding: 25px;
	padding-top: 100px;
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h1 {
		font-weight: 800;
		font-size: 50px;
		// font-style: italic;
		margin-bottom: 50px;
	}

	@media (max-width: 650px) {
		padding: 15px;
		padding-top: 100px;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		h1 {
			font-weight: 800;
			font-size: 40px;
			margin-bottom: 35px;
		}
	}
`;

const CommunityGuidelinesContent = styled.div`
	font-size: 18px;
	color: rgba(255, 255, 255, 0.675);
	background-color: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(5px);
	border: solid rgba(255, 255, 255, 0.115) 2px;
	padding: 50px;
	text-align: justify;
	border-radius: 20px;
	width: 80%;

	@media (max-width: 650px) {
		font-size: 16px;
		padding: 30px;
		border-radius: 10px;
		width: 95%;
	}
`;

const CommunityGuidelines = () => {
	const particless = React.useMemo(() => <Particless />, []);
	return (
		<CommunityGuidelinesContainer>
			<h1>Community <span className="text-red-600">Guidelines</span></h1>
			<CommunityGuidelinesContent>
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
			</CommunityGuidelinesContent>
			{particless}
		</CommunityGuidelinesContainer>
	);
};

export default CommunityGuidelines;
