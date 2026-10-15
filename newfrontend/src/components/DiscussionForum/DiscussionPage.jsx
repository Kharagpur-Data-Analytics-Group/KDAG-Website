import Particless from "../Common/Particles/Particless";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Fade from "../Common/Motion/Fade.jsx";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import profileImage from "./profile.jpeg";
import icon_viewed from "./asset_viewed.png";
import icon_commented from "./asset_comment.png";
import DiscussionComment from "./DiscussionComment";
import upvote_img from "./../../assets/pics/upvote.png";
import downvote_img from "./../../assets/pics/downvote.png";
import already_upvoted_img from "./../../assets/pics/already_upvoted.png";
import already_downvoted_img from "./../../assets/pics/already_downvoted.png";

import { jwtDecode } from "jwt-decode";


const DiscussionPage = () => {
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
	const apiUrl = import.meta.env.VITE_FETCH_URL;

	const dummyPost = {
		author_name: "Kdag Bot",
		message: "This is a fallback post because the server is unreachable.",
		image: null,
		replies: [
			{
				message: "Fallback comment 1: thanks for the info!",
				author_id: "dummy_c1",
				date: new Date().toISOString().split("T")[0],
				replies: [],
				upvotes: 1,
				downvotes: 0,
				voters: [],
				voters_downvoted: [],
				post_id: "dummy_c1",
			},
			{
				message: "Fallback comment 2: interesting perspective.",
				author_id: "dummy_c2",
				date: new Date().toISOString().split("T")[0],
				replies: [],
				upvotes: 2,
				downvotes: 0,
				voters: [],
				voters_downvoted: [],
				post_id: "dummy_c2",
			},
			{
				message: "Fallback comment 3: here's a quick tip.",
				author_id: "dummy_c3",
				date: new Date().toISOString().split("T")[0],
				replies: [],
				upvotes: 0,
				downvotes: 0,
				voters: [],
				voters_downvoted: [],
				post_id: "dummy_c3",
			},
		],
		author_id: "dummy_user",
		date: new Date().toISOString().split("T")[0],
		post_id: "dummy_post",
		upvotes: 0,
		downvotes: 0,
		voters: [],
		voters_downvoted: [],
	};
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
	}, [post.author_id, userId]);

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
					`${apiUrl}/get_post/${post_id}`,
					{
						method: "GET",
					}
				);
				if (!response.ok) {
					const jsonData = await response.json().catch(() => null);
					console.log("Error fetching post, using dummy fallback:", jsonData);
					setPost(dummyPost);
					setJsonData({ post: dummyPost });
					setUpvotes(dummyPost.upvotes || 0);
					setDownvotes(dummyPost.downvotes || 0);
				} else {
					const jsonData = await response.json();
					setPost(jsonData.post);
					setJsonData(jsonData);
					setUpvotes(jsonData.post.upvotes);
					setDownvotes(jsonData.post.downvotes);
				}
			} catch (error) {
				console.error("Error fetching posts:", error);
				console.log("Using dummy post as fallback");
				setPost(dummyPost);
				setJsonData({ post: dummyPost });
				setUpvotes(dummyPost.upvotes || 0);
				setDownvotes(dummyPost.downvotes || 0);
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
				`${apiUrl}/delete_post/${post_id}/${userId}`,
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
				await response.json();
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
				`${apiUrl}/upvote/${post_id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				try {
					const jsonErr = await response.json().catch(() => null);
					console.log("Server error upvoting, applying local fallback:", jsonErr);
				} catch (_) {}
				// local fallback: update counts locally
				localVoteFallback("up");
				return;
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
			// network/server error -> apply local fallback so UI remains responsive
			localVoteFallback("up");
		}
	};

	const handleDownVote = async () => {
		try {
			if (!token) {
				throw new Error("User is not authenticated.");
			}

			const response = await fetch(
				`${apiUrl}/downvote/${post_id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				try {
					const jsonErr = await response.json().catch(() => null);
					console.log("Server error downvoting, applying local fallback:", jsonErr);
				} catch (_) {}
				localVoteFallback("down");
				return;
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
			localVoteFallback("down");
		}
	};

	// Local fallback vote updater used when server is unreachable
	const localVoteFallback = (type) => {
		if (type === "up") {
			if (isUpvoted) {
				setUpvotes((s) => Math.max(0, s - 1));
				setIsUpvoted(false);
			} else {
				setUpvotes((s) => s + 1);
				setIsUpvoted(true);
				if (isDownvoted) {
					setDownvotes((s) => Math.max(0, s - 1));
					setIsDownvoted(false);
				}
			}
		} else if (type === "down") {
			if (isDownvoted) {
				setDownvotes((s) => Math.max(0, s - 1));
				setIsDownvoted(false);
			} else {
				setDownvotes((s) => s + 1);
				setIsDownvoted(true);
				if (isUpvoted) {
					setUpvotes((s) => Math.max(0, s - 1));
					setIsUpvoted(false);
				}
			}
		}
	};

	useEffect(() => {
		if (deleted) {
			history.push("/forum");
		}
	}, [deleted, history]);

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
		<>
			<Fade left>
				<div className="flex flex-col items-center justify-center mt-0 !mb-[20px] !pt-[115px] h-auto w-[82%] max-[500px]:pt-[95px] max-[500px]:w-full">
					<div className="relative left-[12%] flex h-auto w-3/4 flex-row rounded-[20px] p-[5px] transition-all duration-500 max-[500px]:left-0 max-[500px]:w-[95%] max-[500px]:rounded-[10px]">
						<div className="w-full rounded-[15px] bg-[rgba(255,255,255,0.05)] px-[20px] py-[12px] italic backdrop-blur-[8px] transition-all duration-500 max-[500px]:rounded-[15px]">
							<div className="flex h-auto items-center justify-center overflow-hidden rounded-t-[15px] border-b border-white pb-[15px] bg-[position:top] max-[500px]:h-[200px] max-[500px]:rounded-t-[8px]">
								<img
									src="https://img.freepik.com/free-photo/cyberpunk-urban-scenery_23-2150712464.jpg"
									alt="img"
									className="h-full max-[500px]:h-auto max-[500px]:w-full max-[500px]:rounded-[5px]"
								/>
							</div>

							<div className="flex items-center justify-between max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-2">
								<div className="flex flex-col">
									<div className="relative top-0 mb-1 flex text-[18px] font-semibold text-cyan-400 transition-all duration-300 hover:text-[18px] hover:shadow-[0_0_15px_cyan] max-[500px]:text-[12px]" style={{ cursor: "none" }}>
										<Link to={userProfileLink}>{post.author_name}</Link>
									</div>
									<div className="relative top-[-10px] text-[12px] text-[rgb(126,126,126)] max-[500px]:top-0">
										posted on <span className="text-[13px] font-semibold text-[rgb(255,150,38)]">{post.date}</span>
									</div>
								</div>
								<div className="flex text-white">
									<div className="mr-[15px] flex items-center justify-center">
										<button onClick={handleUpVote} className="flex items-center justify-center !rounded-[100px] bg-transparent !p-[5px] transition-all duration-300 hover:shadow-[0_0_10px_#ff9626]" style={{ cursor: "none" }}>
											<img src={isUpvoted ? already_upvoted_img : upvote_img} alt="upvote_img" className="h-[25px]" />
										</button>
										<span>{upvotes}</span>
									</div>&nbsp;&nbsp;
									<div className="mr-[15px] flex items-center justify-center">
										<button onClick={handleDownVote} className="flex items-center justify-center !rounded-[100px] bg-transparent !p-[5px] transition-all duration-300 hover:shadow-[0_0_10px_#ff9626]" style={{ cursor: "none" }}>
											<img src={isDownvoted ? already_downvoted_img : downvote_img} alt="upvote_img" className="h-[25px]" />
										</button>
										<span>{downvotes}</span>
									</div>
								</div>
							</div>

							<div className="mt-[15px] min-h-[110px] w-full rounded-[6px] bg-[rgba(255,255,255,0.06)] p-[8px] text-[16px] italic text-[rgb(197,197,197)] whitespace-pre-wrap transition-all duration-500 max-[500px]:mt-[10px] max-[500px]:p-[8px]">
								{post.message}
							</div>
							<div className="mt-[15px] flex justify-between rounded-[6px] italic text-[rgb(197,197,197)] transition-all duration-500 max-[500px]:flex-wrap max-[500px]:gap-2">
								<div className="mr-[25px]">
									<button onClick={toggleReplies} className="flex items-center justify-center !rounded-[50px] border-none bg-transparent !p-[6px] transition-all duration-300 hover:shadow-[0px_0px_3px_rgb(255,150,38)]" style={{ cursor: "none" }}>
										<img src={icon_commented} alt="commented" className="relative top-[-2px] mr-[2px] h-[20px] [filter:invert(78%)_sepia(22%)_saturate(6951%)_hue-rotate(339deg)_brightness(100%)_contrast(103%)]" />
										{numReplies}
									</button>
								</div>
								<div>
									{token && (
										<button className="rounded-[35px] border-none bg-transparent p-[4px] text-[14px] font-bold italic text-[rgb(255,150,38)] transition-all duration-300 hover:bg-[rgb(255,150,38)] hover:text-black" style={{ cursor: "none" }}>
											<Link style={{ cursor: "none" }} to={`/create_comment/${post_id}/${currLevel}`}>
												Comment
											</Link>
										</button>
									)}
								</div>
								{(showDelete || isAdmin) && (
									<div>
										<button onClick={handleDelete} className="rounded-[35px] border-none bg-transparent p-[4px] text-[14px] font-bold italic text-[rgb(255,150,38)] transition-all duration-300 hover:bg-[rgb(255,150,38)] hover:text-black" style={{ cursor: "none" }}>
											Delete post
										</button>
									</div>
								)}
							</div>
						</div>
					</div>

					{showReplies && replies}
				</div>
			</Fade>
			<Particless />
		</>
	);
};

export default DiscussionPage;