import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import "./DiscussionComment.css";
import DiscussionComment2 from "./DiscussionComment2";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import icon_commented from "./asset_comment.png";
import profileImage from "./profile.jpeg";
import icon_heart from "./asset_heart.png";
import { jwtDecode } from "jwt-decode";

const DiscussionComment = ({ post_id, level, reply }) => {
	const [showReplies, setShowReplies] = useState(false);
	const [userId, setUserId] = useState("empty");

	const [authorId, setAuthorId] = useState(reply.author_id);
	const [authorName, setAuthorName] = useState("");
	const token = localStorage.getItem("access_token");
	const [jsonData, setJsonData] = useState([]);
	const [showDelete, setShowDelete] = useState(false);
	const nextLevelReplies = reply.replies.length;

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				// const response = await fetch(`${process.env.REACT_APP_FETCH_URL}/user/profile/${user_id}`, {
				const response = await fetch(
					`http://127.0.0.1:8080/user/profile/${authorId}`,
					{
						method: "GET",
					}
				);
				if (!response.ok) {
					const jsonData = await response.json();
					// toast.error(jsonData.message);
					console.log(jsonData);
				} else {
					const jsonData = await response.json();
					console.log("User Info fetched successfully:", jsonData.message);
					setAuthorName(jsonData.username);
					console.log("sdfadsfa", jsonData);
				}
			} catch (error) {
				console.error("Error fetching User Info:", error);
				// toast.error("Error fetching posts. Please try again later.");
			}
		};

		fetchUserInfo();
	}, [jsonData]);

	useEffect(() => {
		if (userId === reply.author_id) {
			setShowDelete(true);
		} else {
			setShowDelete(false);
		}
	}, [reply.author_id]);

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

	useEffect(() => {
		const fetchReplies = async () => {
			try {
				// const response = await fetch(`${process.env.REACT_APP_FETCH_URL}/get_posts`, {
				const formData = {
					level: level,
				};
				const response = await fetch(
					`http://127.0.0.1:8080/reply/get_replies/${post_id}`,
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
					// toast.error(jsonData.message);
					console.log(jsonData);
				} else {
					const jsonData = await response.json();
					console.log("replies fetched successfully:", jsonData.message);
					setJsonData(jsonData);
				}
			} catch (error) {
				console.error("Error fetching replies:", error);
				// toast.error("Error fetching posts. Please try again later.");
			}
		};

		fetchReplies();
	}, []);

	const toggleReplies = () => {
		setShowReplies(!showReplies);
	};

	const next_replies = jsonData.replies
		? jsonData.replies.map((reply, index) => (
				<Fade bottom key={index + 1}>
					{/* <> */}
					<DiscussionComment2
						post_id={post_id}
						level={`${level}/${index + 1}`}
						reply={reply}
					/>
					{/* {console.log("ajdshfakjsdf", reply)} */}
					{/* </> */}
				</Fade>
		  ))
		: [];

	return (
		<div className="discussion-comment-container">
			<div className="discussion-comment">
				{/* <div className="discussion-comment-image-container">
					<img src={profileImage} />
				</div> */}
				<div className="discussion-comment-description">
					<div className="discussion-comment-description-details">
						{reply.message}
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
					</div>
					<div className="discussion-comment-bottom">
						<div className="discussion-comment-posted-by">{authorName}</div>

						<div className="discussion-comment-last-comment-date">
							posted on <span>22 Dec 2023</span>
						</div>
						<div className="discussion-comment-actions-commented">
							<button onClick={toggleReplies}>
								<img src={icon_commented} />
								{nextLevelReplies}
							</button>
						</div>
						<div className="header-discussion-card-actions-delete">
							{token && (
								<button>
									<Link to="/create_comment">Comment</Link>
								</button>
							)}
						</div>
						{showDelete && (
							<div className="header-discussion-card-actions-delete">
								<button>Delete post</button>
							</div>
						)}
						{/* <div className="discussion-comment-actions">
							<div className="discussion-comment-actions-liked">
								<img src={icon_heart} />
								53
							</div>
						</div> */}
					</div>
				</div>
			</div>
			{showReplies && next_replies}
		</div>
	);
};

export default DiscussionComment;
