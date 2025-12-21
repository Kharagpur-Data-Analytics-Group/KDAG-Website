import Particless from "../Common/Particles/Particless";
import Fade from "../Common/Motion/Fade.js"
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { jwtDecode } from "jwt-decode";

import "./CreateDiscussion.css";

const CreateComment = () => {
	const particless = React.useMemo(() => <Particless />, []);
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); 
	const currentDate = new Date();
	const day = currentDate.getDate();
	const month = currentDate.getMonth() + 1;
	const year = currentDate.getFullYear();
	const formattedDate = `${day.toString().padStart(2, "0")}-${month
		.toString()
		.padStart(2, "0")}-${year.toString().slice(-2)}`;

	const { post_id } = useParams();
	let { currLevel } = useParams();
	currLevel = decodeURIComponent(currLevel);
	const history = useHistory();
	const [commentMessage, setCommentMessage] = useState("");
	const token = localStorage.getItem("access_token");
	const [rdirect, setRdirect] = useState(false);
	const [level, setLevel] = useState(currLevel);
	// console.log(currLevel);
	const [authorId, setAuthorId] = useState("");

	useEffect(() => {
		if (currLevel === "none") {
			setLevel("");
		}
	}, []);

	useEffect(() => {
		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				if (decodedToken && decodedToken.sub && decodedToken.sub.user_id) {
					setAuthorId(decodedToken.sub.user_id);
				}
			} catch (error) {
				console.error("Error decoding token:", error);
			}
		}
	}, [token]);

	useEffect(() => {
		if (!isLoggedIn) {
			history.push("/auth");
		}
	}, [isLoggedIn]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = {
				message: commentMessage,
				author_id: authorId,
				level: level,
				date: formattedDate,
			};
			const response = await fetch(
				`${process.env.REACT_APP_FETCH_URL}/reply/create_reply/${post_id}`,
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
				console.log("Error creating comment:", jsonData.message);
			} else {
				const jsonData = await response.json();
				console.log("comment posted successfully:", jsonData.message);
				setRdirect(true);
			}
		} catch (error) {
			console.error("Error posting comment:", error);
		}
	};

	if (rdirect) {
		history.goBack();
	}

	return (
		<div>
			{isLoggedIn && (
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
			{particless}
		</div>
	);
};

export default CreateComment;
