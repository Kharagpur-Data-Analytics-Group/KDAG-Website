import { API_BASE_URL } from "../../config/api.js";
import React, { useState, useEffect } from "react";
import Fade from "../Common/Motion/Fade.jsx"
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
	const apiUrl = API_BASE_URL;
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
					`${apiUrl}/user/profile/${authorId}`,
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
					`${apiUrl}/reply/get_replies/${post_id}`,
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
				`${apiUrl}/reply/delete_reply/${post_id}`,
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
				`${apiUrl}/reply/upvote/${post_id}`,
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
				`${apiUrl}/reply/downvote/${post_id}`,
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
		<div className="!mt-3 !flex !w-full !flex-col !flex-grow !pl-[25%] max-[650px]:!pl-[5%] max-[650px]:!pr-[3%]">
			<div className="!flex !min-h-[125px] !w-full !flex-col !flex-grow items-center justify-between !rounded-[10px] !bg-[rgba(255,255,255,0.05)] !p-2 !pb-0 !transition-all !duration-500 !backdrop-blur-[3px] max-[650px]:!min-h-[100px]">
				<div className="!min-h-[100px] !w-full !rounded-[6px] !bg-[rgba(255,255,255,0.06)] !p-2 !pb-[2px] italic !transition-all !duration-500 !backdrop-blur-[8px] max-[650px]:!min-h-[100px] max-[650px]:!p-[10px]">
					<div className="!min-h-[55px] whitespace-pre-wrap text-[15px] text-[#898989] text-justify">
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
					<div className="relative !flex items-center justify-between">
						<div className="!flex text-cyan-400 !transition-all !duration-300 hover:text-[18px] hover:[text-shadow:0px_0px_15px_cyan] max-[650px]:text-xs">
							<div>
								<Link to={userProfileLink} style={{ cursor: "none" }}>
									{authorName}
								</Link>
							</div>
						</div>

						<div className="text-[13px] text-[#727272]">
							<div>
								<span className="font-semibold text-[#ff9626]">{reply.date}</span>
							</div>
						</div>
						<div className="!mr-[25px]">
							<button onClick={toggleReplies} style={{ cursor: "none" }} className="!flex justify-center items-center !bg-transparent !border-0 text-[#c5c5c5] !rounded-[50px] !p-[5px] !transition-all !duration-300 hover:!shadow-[0_0_3px_#ff9626]">
								<img src={icon_commented} className="!h-5 !relative !top-[3px] !mr-[5px] filter-[invert(78%)_sepia(22%)_saturate(6951%)_hue-rotate(339deg)_brightness(100%)_contrast(103%)]" />
								{nextLevelReplies}
							</button>
						</div>
						<div>
							{token && (
								<button className="!bg-transparent text-[#ff9626] !border-0 text-sm font-bold italic !transition-all !duration-300 !rounded-[35px] !p-1 hover:!bg-[#ff9626] hover:!text-black" style={{ cursor: "none" }}>
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
							<div>
								<button onClick={handleDelete} className="!bg-transparent text-[#ff9626] !border-0 text-sm font-bold italic !transition-all !duration-300 !rounded-[35px] !p-1 hover:!bg-[#ff9626] hover:!text-black" style={{ cursor: "none" }}>
									Delete
								</button>
							</div>
						)}
					</div>
				</div>
				<div className="!flex self-start text-white">
					<div className="!flex items-center justify-center !mr-[15px]">
						<button onClick={handleUpVote} className="!flex items-center justify-center !bg-transparent !border-0 !p-[5px] !rounded-full !transition-all !duration-300 hover:!shadow-[0_0_10px_#ff9626]">
							<img
								src={isUpvoted ? already_upvoted_img : upvote_img}
								alt="upvote_img"
								className="!h-[25px] cursor-none"
							/>
						</button>
						<span>{upvotes}</span>
					</div>
					<div className="!flex items-center justify-center !mr-[15px]">
						<button onClick={handleDownVote} className="!flex items-center justify-center !bg-transparent !border-0 !p-[5px] !rounded-full !transition-all !duration-300 hover:!shadow-[0_0_10px_#ff9626]">
							<img
								src={isDownvoted ? already_downvoted_img : downvote_img}
								alt="downvote_img"
								className="!h-[25px] cursor-none"
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
