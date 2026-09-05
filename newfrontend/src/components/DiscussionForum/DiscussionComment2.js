import React, { useState, useEffect } from "react";
import Fade from "../Common/Motion/Fade.js"
import "./DiscussionComment.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DiscussionComment from "./DiscussionComment";
import icon_commented from "./asset_comment.png";
import { useHistory } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import upvote_img from "./../../assets/pics/upvote.png";
import downvote_img from "./../../assets/pics/downvote.png";
import already_upvoted_img from "./../../assets/pics/already_upvoted.png";
import already_downvoted_img from "./../../assets/pics/already_downvoted.png";

const DiscussionComment2 = ({ post_id, level, reply }) => {
	const [showReplies, setShowReplies] = useState(false);
	const [replies, setReplies] = useState([]);
	const [deleted, setDeleted] = useState(false);
	const [authorId, setAuthorId] = useState(reply.author_id);
	const [authorName, setAuthorName] = useState("");
	const [date, setDate] = useState("");
	const history = useHistory();
	const [userId, setUserId] = useState("empty");
	const token = localStorage.getItem("access_token");
	const [isAdmin, setIsAdmin] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [jsonData, setJsonData] = useState([]);
	const nextLevelReplies = reply.replies.length;

	const [upvotes, setUpvotes] = useState(0);
	const [downvotes, setDownvotes] = useState(0);
	const [isUpvoted, setIsUpvoted] = useState(false);
	const [isDownvoted, setIsDownvoted] = useState(false);

	useEffect(() => {
		setUpvotes(reply["upvotes"]);
		setDownvotes(reply["downvotes"]);
		if (token === null) {
			setIsUpvoted(false);
			setIsDownvoted(false);
			return;
		}
		if (reply.voters.includes(userId) && upvotes !== 0) {
			setIsUpvoted(true);
			setIsDownvoted(false);
		} else if (reply.voters_downvoted.includes(userId) && downvotes !== 0) {
			setIsUpvoted(false);
			setIsDownvoted(true);
		} else {
			setIsUpvoted(false);
			setIsDownvoted(false);
		}
	}, [reply, userId, token]);

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_FETCH_URL}/user/profile/${authorId}`,
					{
						method: "GET",
					}
				);
				if (!response.ok) {
					const jsonData = await response.json();
					console.log(jsonData.message);
				} else {
					const jsonData = await response.json();
					setAuthorName(jsonData.username);
					setDate(jsonData.date);
				}
			} catch (error) {
				console.error("Error fetching User Info:", error);
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
	}, [reply.author_id, userId]);

	useEffect(() => {
		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				if (decodedToken && decodedToken.sub && decodedToken.sub.user_id) {
					setUserId(decodedToken.sub.user_id);
					setIsAdmin(decodedToken.sub.is_admin);
				}
			} catch (error) {
				console.error("Error decoding token:", error);
			}
		}
	}, [token]);

	useEffect(() => {
		const fetchReplies = async () => {
			try {
				const formData = {
					level: level,
				};
				const response = await fetch(
					`${process.env.REACT_APP_FETCH_URL}/reply/get_replies/${post_id}`,
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
					console.log(jsonData.message);
				} else {
					const jsonData = await response.json();
					setJsonData(jsonData);
				}
			} catch (error) {
				console.error("Error fetching replies:", error);
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
					<DiscussionComment
						post_id={post_id}
						level={`${level}/${index + 1}`}
						reply={reply}
					/>
				</Fade>
		  ))
		: [];

	const handleDelete = async () => {
		try {
			const formData = {
				level: level,
			};
			const response = await fetch(
				`${process.env.REACT_APP_FETCH_URL}/reply/delete_reply/${post_id}`,
				{
					method: "DELETE",
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
				console.log("Error", jsonData);
			} else {
				const jsonData = await response.json();
				console.log("reply deleted successfully", jsonData.message);
				setDeleted(true);
			}
		} catch (error) {
			console.error("Error deleting replies", error);
		}
	};

	useEffect(() => {
		if (deleted) {
			history.push("/forum");
		}
	}, [deleted]);

	const userProfileLink =
		userId === reply.author_id
			? `/user_profile_self/${reply.author_id}`
			: `/user_profile_public/${reply.author_id}`;

	const handleUpVote = async () => {
		try {
			if (!token) {
				throw new Error("User is not authenticated.");
			}

			const formData = {
				level: level,
			};

			const response = await fetch(
				`${process.env.REACT_APP_FETCH_URL}/reply/upvote/${post_id}`,
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
				throw new Error("Failed to upvote the post");
			}

			const result = await response.json();

			setUpvotes(result.newUpvoteCount);
			setDownvotes(result.newDownvoteCount);
			if (result?.new_voters?.includes(userId)) {
				setIsUpvoted(true);
				setIsDownvoted(false);
			} else if (result?.new_voters_downvoted?.includes(userId)) {
				setIsDownvoted(true);
				setIsUpvoted(false);
			} else {
				setIsDownvoted(false);
				setIsUpvoted(false);
			}
		} catch (error) {
			console.error("Error during upvote:", error.message);
		}
	};

	const handleDownVote = async () => {
		try {
			if (!token) {
				throw new Error("User is not authenticated.");
			}

			const formData = {
				level: level,
			};

			const response = await fetch(
				`${process.env.REACT_APP_FETCH_URL}/reply/downvote/${post_id}`,
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
				throw new Error("Failed to downvote the post");
			}

			const result = await response.json();

			setUpvotes(result.newUpvoteCount);
			setDownvotes(result.newDownvoteCount);
			if (result?.new_voters?.includes(userId)) {
				setIsUpvoted(true);
				setIsDownvoted(false);
			} else if (result?.new_voters_downvoted?.includes(userId)) {
				setIsDownvoted(true);
				setIsUpvoted(false);
			} else {
				setIsDownvoted(false);
				setIsUpvoted(false);
			}
		} catch (error) {
			console.error("Error during downvote:", error.message);
		}
	};

	return (
		<div className="discussion-comment-container">
			<div className="discussion-comment">
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
						<div className="discussion-comment-posted-by">
							<div>
								<Link to={userProfileLink} style={{ cursor: "none" }}>
									{authorName}
								</Link>
							</div>
						</div>

						<div className="discussion-comment-last-comment-date">
							<div>
								<span>{reply.date}</span>
							</div>
						</div>
						<div className="discussion-comment-actions-commented">
							<button onClick={toggleReplies} style={{ cursor: "none" }}>
								<img src={icon_commented} />
								{nextLevelReplies}
							</button>
						</div>
						<div className="header-discussion-card-actions-delete">
							{token && (
								<button style={{ cursor: "none" }}>
									<Link
										style={{ cursor: "none" }}
										to={`/create_comment/${post_id}/${encodeURIComponent(
											level
										)}`}
									>
										Comment
									</Link>
								</button>
							)}
						</div>
						{(showDelete || isAdmin) && (
							<div className="header-discussion-card-actions-delete">
								<button onClick={handleDelete} style={{ cursor: "none" }}>
									Delete
								</button>
							</div>
						)}
					</div>
				</div>
				<div className="discussion-votes-replies">
					<div className="discussion-votes-upvotes">
						<button onClick={handleUpVote}>
							<img
								src={isUpvoted ? already_upvoted_img : upvote_img}
								alt="upvote_img"
							/>
						</button>
						<span>{upvotes}</span>
					</div>
					<div className="discussion-votes-downvotes">
						<button onClick={handleDownVote}>
							<img
								src={isDownvoted ? already_downvoted_img : downvote_img}
								alt="upvote_img"
							/>
						</button>
						<span>{downvotes}</span>
					</div>
				</div>
			</div>
			{showReplies && next_replies}
		</div>
	);
};

export default DiscussionComment2;
