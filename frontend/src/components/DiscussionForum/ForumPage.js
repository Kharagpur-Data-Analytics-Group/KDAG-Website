import React, { useEffect, useState } from "react";
import Header from "./Header";
import Fade from "react-reveal/Fade";
import Particless from "../Common/Particles/Particless";
import DiscussionCard from "./DiscussionCard";
import icon_add from "./asset_addition_symbol.png";
import { Link } from "react-router-dom";

const ForumPage = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				// const response = await fetch(`${process.env.REACT_APP_FETCH_URL}/get_posts`, {
				const response = await fetch(`http://127.0.0.1:8080/get_posts`, {
					method: "GET",
				});
				if (!response.ok) {
					const jsonData = await response.json();
					// toast.error(jsonData.message);
					console.log(jsonData.message);
				} else {
					const jsonData = await response.json();
					console.log("Posts fetched successfully:", jsonData.message);
					setPosts(jsonData.posts);
				}
			} catch (error) {
				console.error("Error fetching posts:", error);
				// toast.error("Error fetching posts. Please try again later.");
			}
		};

		fetchPosts();
	}, []);

	return (
		<>
			<Fade left>
				<Header />
			</Fade>
			<div className="forum-section">
				<div className="discussion-cards">
					<div className="discussion-card-create-new">
						<div className="discussion-card-button-container">
							<button>
								<Link to="/create_discussion">
									<img src={icon_add} />
									New Discussion
								</Link>
							</button>
						</div>
					</div>
					{posts.map((post) => (
						<Fade bottom key={post.post_id}>
							<DiscussionCard post={post} numReplies={post.replies} />
						</Fade>
					))}
				</div>
			</div>
			<Particless />
		</>
	);
};

export default ForumPage;
