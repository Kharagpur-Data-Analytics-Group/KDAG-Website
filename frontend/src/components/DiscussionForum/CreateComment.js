import Particless from "../Common/Particles/Particless";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./CreateDiscussion.css";

const CreateComment = (props) => {
	const { showLogout } = props;
	const history = useHistory();
	const [commentMessage, setCommentMessage] = useState("");

	useEffect(() => {
		if (!showLogout) {
			history.push("/auth");
		}
	}, [showLogout]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = {
				message: commentMessage,
			};

			const response = await fetch(
				`http://127.0.0.1:8080/reply//create_reply/<string:pid>`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...formData,
					}),
				}
			);

			if (!response.ok) {
				const jsonData = await response.json();
				console.log("Error creating comment:", jsonData.message);
			} else {
				const jsonData = await response.json();
				console.log("comment posted successfully:", jsonData.message);
			}
		} catch (error) {
			console.error("Error posting comment:", error);
		}
	};

	return (
		<div>
			{showLogout && (
				<div className="create-discussion-container">
					<div className="discussion-circle"></div>
					<Fade right>
						<div className="create-discussion-form-container">
							<form onSubmit={handleSubmit}>
								<h1>Post Comment</h1>
								{/* <input type="text" placeholder="Title" required /> */}
								<textarea
									type="text"
									placeholder="Type your message here"
									required
									onChange={(e) => setCommentMessage(e.target.value)}
								/>
								<button type="submit">Comment</button>
							</form>
						</div>
					</Fade>
				</div>
			)}
			<Particless />
		</div>
	);
};

export default CreateComment;
