import React, { useEffect, useState, useContext } from "react";
import Fade from "../Common/Motion/Fade.jsx"
import Particless from "../Common/Particles/Particless";
import DiscussionCard from "./DiscussionCard";
import icon_add from "./asset_addition_symbol.png";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ForumPage = () => {
	const particless = React.useMemo(() => <Particless />, []);
	const { isLoggedIn, setIsLoggedIn, checkAuthStatus } = useContext(AuthContext);
	const apiUrl2 = import.meta.env.VITE_FETCH_URL;
	const dummyPosts = [
		{
			author_name: "John Developer",
			message: "How do I implement authentication in React?",
			image: null,
			replies: 3,
			author_id: "user_001",
			date: "2025-06-20",
			post_id: "post_001"
		},
		{
			author_name: "Sarah Designer",
			message: "Best practices for Tailwind CSS component design",
			image: null,
			replies: 5,
			author_id: "user_002",
			date: "2025-06-21",
			post_id: "post_002"
		},
		{
			author_name: "Mike Backend",
			message: "MongoDB aggregation pipeline tips and tricks",
			image: null,
			replies: 2,
			author_id: "user_003",
			date: "2025-06-22",
			post_id: "post_003"
		},
		{
			author_name: "Emma Frontend",
			message: "React hooks vs class components - which to use?",
			image: null,
			replies: 7,
			author_id: "user_004",
			date: "2025-06-23",
			post_id: "post_004"
		},
		{
			author_name: "Alex FullStack",
			message: "Optimizing API response times with caching strategies",
			image: null,
			replies: 4,
			author_id: "user_005",
			date: "2025-06-24",
			post_id: "post_005"
		}
	];

	const [posts, setPosts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredPosts, setFilteredPosts] = useState([]);

	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		checkAuthStatus();
	}, []);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch(
					`${apiUrl2}/get_posts`,
					{
						method: "GET",
					}
				);
				if (!response.ok) {
					const jsonData = await response.json();
					console.log(jsonData.message);
					setPosts(dummyPosts);
					setFilteredPosts(dummyPosts);
				} else {
					const jsonData = await response.json();
					setPosts(jsonData.posts);
					setFilteredPosts(jsonData.posts);
				}
			} catch (error) {
				console.error("Error fetching posts:", error);
				console.log(import.meta.env);
				console.log("Using dummy posts as fallback");
				setPosts(dummyPosts);
				setFilteredPosts(dummyPosts);
			}
		};

		fetchPosts();
	}, []);

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
		const filtered = posts.filter(
			(post) =>
				post.author_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
				post.message.toLowerCase().includes(e.target.value.toLowerCase())
		);
		setFilteredPosts(filtered);
	};

	return (
		<>
			<Fade left>
				<div className={`bg-cover !p-[30px] !pt-[10rem] shadow-[0_2px_10px_rgba(0,0,0,0.25)] opacity-0 transition-opacity duration-[1000ms] ${isVisible ? "opacity-100" : ""}`}>
					<div className="[font-family:Poppins,sans-serif] text-center font-[800] text-[4rem] text-white">
						DISCUSSION FORUM
					</div>
					<div className="[font-family:Poppins,sans-serif] text-[1.2rem] text-center text-[#ddd] w-1/2 min-w-[30rem] mx-auto">
						Please follow the{" "}
						<a href="/community-guidelines" className="inline-block cursor-pointer group [text-decoration:underline!important]">
							<span className="group-hover:!text-[#ff8800] transition-all duration-300">Community Guidelines.</span>
							<div className="h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></div>
						</a>
					</div>
				</div>
			</Fade>
			<div className="w-full">
				<div className="w-full">
					<div className="!mx-[50px] !my-[10px] !mb-[50px] flex items-center justify-between rounded-[50px] border !border-white/20 !p-[10px] max-[600px]:mx-[16px] max-[600px]:flex-col max-[600px]:gap-4">
						<div className="flex justify-center">
							<div className="group flex flex-row items-center rounded-[50px] transition-all duration-[800ms]">
								<button className="inline-flex cursor-none appearance-none items-center justify-center overflow-hidden !rounded-[60px] border-0 bg-[linear-gradient(to_right,#ff8800,#ffdaaa,#30dd8a,#269660)] bg-[length:300%_100%] !px-[20px] !py-[10px] font-semibold italic transition-all duration-300 hover:bg-[position:100%_0] hover:[text-shadow:0_0_10px_white] max-[600px]:h-10 max-[600px]:w-10 max-[600px]:!rounded-full max-[600px]:p-0">
									<Link to="/create_discussion" className="flex h-full w-full cursor-none items-center justify-center">
										<img src={icon_add} alt="New Discussion Icon" className="mr-[20px] h-[20px] max-[600px]:m-0 max-[600px]:h-[20px] max-[600px]:w-[20px]" />
										&nbsp;&nbsp;<span className="max-[600px]:hidden text-black group-hover:text-white">New Discussion</span>
									</Link>
								</button>
							</div>
						</div>

						<div className="flex items-center">
							<input
								type="text"
								placeholder="Search"
								value={searchQuery}
								onChange={handleSearch}
								className="mr-[-15px] w-[240px] translate-x-[25px] !rounded-[50px] rounded-r-none border-0 bg-[#1f1f1f] px-[15px] py-[10px] text-white outline-none placeholder:text-[#999] max-[600px]:w-[200px] max-[600px]:text-[13px] max-[450px]:w-[125px]"
							/>
							<button className="group relative inline-flex h-10 !cursor-none appearance-none items-center justify-center overflow-hidden !rounded-[50px] border !border-[#E69C00] bg-black px-4 py-2 font-bold text-white transition-all duration-300 max-[600px]:text-[12px]">
								<span className="absolute inset-0 bg-[linear-gradient(to_right,black,black,#ff8800,#ffdaaa)] bg-[length:300%_100%] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-[position:100%_0]"></span>
								<span className="relative z-10 transition-all duration-300 group-hover:[text-shadow:0_0_10px_white] group-hover:text-black">
									Search
								</span>
							</button>
						</div>
					</div>
					{filteredPosts.map((post) => (
						<Fade bottom key={post.post_id}>
							<DiscussionCard post={post} numReplies={post.replies} />
						</Fade>
					))}
					<div className="h-[80px]"></div>
				</div>
			</div>
			{particless}
		</>
	);
};

export default ForumPage;