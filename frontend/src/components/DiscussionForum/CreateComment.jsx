import Particless from "../Common/Particles/Particless";
import Fade from "../Common/Motion/Fade.js"
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { jwtDecode } from "jwt-decode";

const CreateComment = () => {
	const particless = React.useMemo(() => <Particless />, []);
	const { isLoggedIn } = useContext(AuthContext); 
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
	}, [currLevel]);

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
	}, [isLoggedIn, history]);

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
				<div className="h-screen flex items-center justify-center relative overflow-hidden">
					<div className="absolute w-[600px] h-[600px] border-4 border-dotted border-[#8bdaff] rounded-full top-[110px] -z-10"></div>
					<Fade right>
						<div className="mt-[100px] bg-white/5 rounded-[15px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden w-full max-w-[500px] h-[520px] p-[25px] backdrop-blur-[12px] flex items-center md:block mx-4">
							<form onSubmit={handleSubmit} className="bg-transparent px-4 md:px-10 h-full w-full flex flex-col items-center md:items-stretch">
								<h1 className="text-white text-[25px] font-black w-full text-center md:text-left mb-4">Post Comment</h1>
								<textarea
									type="text"
									placeholder="Type your message here"
									required
									onChange={(e) => setCommentMessage(e.target.value)}
									className="bg-white/5 border-none rounded-[25px] my-1.5 py-2.5 px-[15px] text-[14px] font-semibold w-full min-h-[250px] max-h-[250px] resize-none outline-none text-white transition-all duration-500 focus:shadow-[0_0_5px_rgba(255,255,255,0.76)]"
								/>
								<button type="submit" className="text-white text-[15px] py-2 px-11 border border-transparent rounded-full font-semibold tracking-wide mt-[25px] cursor-pointer bg-gradient-to-r from-[#4e3eff] via-[#40dfe4] via-[#30dd8a] to-[#269660] bg-[length:300%_100%] transition-all duration-300 w-full hover:bg-[position:100%_0] hover:drop-shadow-[0_0_10px_white]">Comment</button>
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
