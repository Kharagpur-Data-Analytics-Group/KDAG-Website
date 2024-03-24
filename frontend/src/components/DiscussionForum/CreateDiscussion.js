import Particless from "../Common/Particles/Particless";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


import "./CreateDiscussion.css";

const CreateDiscussion = (props) => {
	const [rDirect, setRDirect] = useState(false);
	const [userId, setUserId] = useState("empty");
	const token = localStorage.getItem("access_token");

	useEffect(() => {
		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				if (decodedToken && decodedToken.sub && decodedToken.sub.user_id) {
					setUserId(decodedToken.sub.user_id);
				}
			} catch (error) {
				console.error("Error decoding token:", error);
			}
		}
	}, [token]);

	const { showLogout } = props;
	const history = useHistory();
	const [discussionContent, setDiscussionContent] = useState("");

	useEffect(() => {
		if (!showLogout) {
			history.push("/auth");
		}
	}, [showLogout]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			
			console.log(process.env.REACT_APP_FETCH_URL);
			const formData = {
				message: discussionContent,
			};

			const response = await fetch(
				// `${process.env.REACT_APP_FETCH_URL}/create_post/${userId}`,
				`http://127.0.0.1:8080/create_post/${userId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						...formData,
					}),
				}
			);

			if (!response.ok) {
				const jsonData = await response.json();
				console.log("Error creating discussion(response):", jsonData.message);
			} else {
				const jsonData = await response.json();
				console.log("Discussion created successfully:", jsonData.message);
				setRDirect(true);
			}
		} catch (error) {
			console.error("Error creating discussion(catch):", error);
		}
	};

	if (rDirect) {
		history.push("/forum");
	}

	return (
		<div>
			{showLogout && (
				<div className="create-discussion-container">
					<div className="discussion-circle"></div>
					<Fade right>
						<div className="create-discussion-form-container">
							<form onSubmit={handleSubmit}>
								<h1>Create Discussion</h1>
								{/* <input type="text" placeholder="Title" required /> */}
								<textarea
									type="text"
									placeholder="Discussion content"
									required
									value={discussionContent}
									onChange={(e) => setDiscussionContent(e.target.value)}
								/>
								<button type="submit">Post</button>
							</form>
						</div>
					</Fade>
				</div>
			)}
			<Particless />
		</div>
	);
};

export default CreateDiscussion;
