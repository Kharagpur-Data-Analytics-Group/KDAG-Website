import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./DiscussionCard.css";
import profileImage from "./profile.jpeg";
import icon_viewed from "./asset_viewed.png";
import icon_commented from "./asset_comment.png";
import DiscussionComment from "./DiscussionComment";
import { jwtDecode } from "jwt-decode";

const HeaderDiscussion = () => {
	const { post_id, numReplies } = useParams();
	const [post, setPost] = useState([]);
	const history = useHistory();
	const [deleted, setDeleted] = useState(false);
	const [jsonData, setJsonData] = useState([]);
	const [userId, setUserId] = useState("empty");
	const token = localStorage.getItem("access_token");
	const [showDelete, setShowDelete] = useState(false);
	useEffect(() => {
		if (userId === post.author_id) {
			setShowDelete(true);
		} else {
			setShowDelete(false);
		}
	}, [post.author_id]);

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

	const userProfileLink =
		userId === post.author_id
			? `/user_profile_self/${post.author_id}`
			: `/user_profile_public/${post.author_id}`;

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				// const response = await fetch(`${process.env.REACT_APP_FETCH_URL}/get_posts`, {
				const response = await fetch(
					`http://127.0.0.1:8080/get_post/${post_id}`,
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
					console.log("Post fetched successfully:", jsonData.message);
					setPost(jsonData.post);
					setJsonData(jsonData);
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
			console.log(post_id, "////////////", userId);
			// const response = await fetch(`${process.env.REACT_APP_FETCH_URL}/get_posts`, {
			const response = await fetch(
				`http://127.0.0.1:8080/delete_post/${post_id}/${userId}`,
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
				// toast.error(jsonData.message);
				console.log("Error", jsonData);
			} else {
				const jsonData = await response.json();
				console.log("Post fetched successfully:", jsonData.message);
				setDeleted(true);
			}
		} catch (error) {
			console.error("Error fetching posts:", error);
			// toast.error("Error fetching posts. Please try again later.");
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
					<div className="header-discussion-card-posted-by">
						<Link to={userProfileLink}>{post.author_name}</Link>
					</div>
					<div className="header-discussion-card-last-comment-date">
						posted <span>13:35 22 Dec 2023</span>
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
							<button onClick={toggleReplies}>
								<img src={icon_commented} />
								{numReplies}
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
								<button onClick={handleDelete}>Delete post</button>
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
