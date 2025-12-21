import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Fade from "../Common/Motion/Fade.js"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./DiscussionCard.css";
import profileImage from "./profile.jpeg";
import icon_viewed from "./asset_viewed.png";
import icon_commented from "./asset_comment.png";
import DiscussionComment from "./DiscussionComment";

import upvote_img from "./../../assets/pics/upvote.png";
import downvote_img from "./../../assets/pics/downvote.png";
import already_upvoted_img from "./../../assets/pics/already_upvoted.png";
import already_downvoted_img from "./../../assets/pics/already_downvoted.png";

import { jwtDecode } from "jwt-decode";

const HeaderDiscussion = () => {
	const { post_id, numReplies } = useParams();
	const [post, setPost] = useState([]);
	const history = useHistory();
	const [deleted, setDeleted] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [jsonData, setJsonData] = useState([]);
	const [userId, setUserId] = useState("empty");
	const token = localStorage.getItem("access_token");
	const [showDelete, setShowDelete] = useState(false);
	const [currLevel, setCurrLevel] = useState("none");

	const [upvotes, setUpvotes] = useState(0);
	const [downvotes, setDownvotes] = useState(0);
	const [isUpvoted, setIsUpvoted] = useState(false);
	const [isDownvoted, setIsDownvoted] = useState(false);

	useEffect(() => {
		if (userId === post.author_id) {
			setShowDelete(true);
		} else {
			setShowDelete(false);
		}
	}, [post.author_id]);

	useEffect(() => {
		if (post?.voters?.includes(userId)) {
			setIsUpvoted(true);
		} else {
			setIsUpvoted(false);
		}

		if (post?.voters_downvoted?.includes(userId)) {
			setIsDownvoted(true);
		} else {
			setIsDownvoted(false);
		}
	}, [post, userId]);

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

	const userProfileLink =
		userId === post.author_id
			? `/user_profile_self/${post.author_id}`
			: `/user_profile_public/${post.author_id}`;

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_FETCH_URL}/get_post/${post_id}`,
					{
						method: "GET",
					}
				);
				if (!response.ok) {
					const jsonData = await response.json();
					// toast.error(jsonData.message);
					console.log("Error", jsonData);
				} else {
					const jsonData = await response.json();
					setPost(jsonData.post);
					setJsonData(jsonData);
					setUpvotes(jsonData.post.upvotes);
					setDownvotes(jsonData.post.downvotes);
				}
			} catch (error) {
				console.error("Error fetching posts:", error);
				// toast.error("Error fetching posts. Please try again later.");
			}
		};

		fetchPosts();
	}, [post_id]);

	const [showReplies, setShowReplies] = useState(false);

	const toggleReplies = () => {
		setShowReplies(!showReplies);
	};

	const handleDelete = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_FETCH_URL}/delete_post/${post_id}/${userId}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				} 
			);
			if (!response.ok) {
				const jsonData = await response.json();
				console.log("Error", jsonData);
			} else {
				const jsonData = await response.json();
				setDeleted(true);
			}
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	};

	const handleUpVote = async () => {
		try {
			if (!token) {
				throw new Error("User is not authenticated.");
			}

			const response = await fetch(
				`${process.env.REACT_APP_FETCH_URL}/upvote/${post_id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
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

			const response = await fetch(
				`${process.env.REACT_APP_FETCH_URL}/downvote/${post_id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
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

	useEffect(() => {
		if (deleted) {
			history.push("/forum");
		}
	}, [deleted]);

	const replies = jsonData.post
		? jsonData.post.replies.map((reply, index) => (
				<Fade bottom key={index + 1}>
					<DiscussionComment
						post_id={post_id}
						level={(index + 1).toString()}
						reply={reply}
					/>
				</Fade>
		  ))
		: [];

	return (
		<div className="header-discussion-card-container">
			<div className="header-discussion-card">
				{/* <div className="header-discussion-card-image-container">
					<img src={profileImage} />
				</div> */}
				<div className="header-discussion-card-description">
					<div className="header-discussion-card-description-poster">
						<img
							src="https://img.freepik.com/free-photo/cyberpunk-urban-scenery_23-2150712464.jpg"
							alt="img"
						/>
					</div>

					{/* <div className="header-discussion-card-description-heading">
						Description Title Description Title Description Title
					</div> */}
					<div className="header-discussion-card-voter-box">
						<div className="header-discussion-card-initial-details">
							<div
								className="header-discussion-card-posted-by"
								style={{ cursor: "none" }}
							>
								<Link to={userProfileLink}>{post.author_name}</Link>
							</div>
							<div
								className="header-discussion-card-last-comment-date"
								style={{ cursor: "none" }}
							>
								posted on <span>{post.date}</span>
							</div>
						</div>
						<div className="discussion-votes">
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

					<div className="header-discussion-card-description-details">
						{post.message}
					</div>
					<div className="header-discussion-card-actions">
						{/* <div className="header-discussion-card-actions-viewed">
							<img src={icon_viewed} />
							53
						</div> */}
						<div className="header-discussion-card-actions-commented">
							<button onClick={toggleReplies} style={{ cursor: "none" }}>
								<img src={icon_commented} />
								{numReplies}
							</button>
						</div>
						<div className="header-discussion-card-actions-delete">
							{token && (
								<button style={{ cursor: "none" }}>
									<Link
										style={{ cursor: "none" }}
										to={`/create_comment/${post_id}/${currLevel}`}
									>
										Comment
									</Link>
								</button>
							)}
						</div>
						{(showDelete || isAdmin) && (
							<div className="header-discussion-card-actions-delete">
								<button onClick={handleDelete} style={{ cursor: "none" }}>
									Delete post
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{showReplies && replies}
		</div>
	);
};

export default HeaderDiscussion;
