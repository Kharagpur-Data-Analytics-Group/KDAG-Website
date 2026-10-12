import Particless from "../Common/Particles/Particless";
import Fade from "../Common/Motion/Fade.jsx";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const CreateDiscussion = () => {
	const particless = React.useMemo(() => <Particless />, []);
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
	const currentDate = new Date();
	const day = currentDate.getDate();
	const month = currentDate.getMonth() + 1;
	const year = currentDate.getFullYear();
	const formattedDate = `${day.toString().padStart(2, "0")}-${month
		.toString()
		.padStart(2, "0")}-${year.toString().slice(-2)}`;
	const apiUrl = import.meta.env.VITE_FETCH_URL;
	const [rDirect, setRDirect] = useState(false);
	const [userId, setUserId] = useState("empty");
	const token = localStorage.getItem("access_token");

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

	const history = useHistory();
	const [discussionContent, setDiscussionContent] = useState("");

	useEffect(() => {
		if (!isLoggedIn) {
			history.push("/auth");
		}
	}, [isLoggedIn]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = {
				message: discussionContent,
				date: formattedDate,
			};

			const response = await fetch(
				`${apiUrl}/create_post/${userId}`,
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
				console.log("Error creating discussion(response):", jsonData.message);
			} else {
				const jsonData = await response.json();
				setRDirect(true);
			}
		} catch (error) {
			console.error("Error creating discussion(catch):", error);
		}
	};

	if (rDirect) {
		history.push("/forum");
	}

	return (
		<div>
			{isLoggedIn && (
				<div className="block">
					<div className="h-screen flex items-center justify-center -translate-y-2">
						<div className="absolute animate-[spin_15s_linear_infinite] bg-[linear-gradient(90deg,#ff0000,#000000,#000000,#ff0000)] w-[605px] h-[605px] rounded-[50%] top-[115px] max-sm:hidden"></div>
						<Fade right>
							<div className="!pt-[100px] !mt-[124px] max-[420px]:!pt-[50px] max-[420px]:!mt-[62px] !bg-black/70 rounded-full max-sm:rounded-[15px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden w-[588px] h-[588px] !px-[60px] max-[420px]:!px-[20px] bg-transparent backdrop-blur-[12px] max-[420px]:w-[330px] max-[420px]:flex max-[420px]:!mb-[200px] max-[420px]:items-center">
								<form
									onSubmit={handleSubmit}
									className="bg-transparent !px-[40px] h-full"
								>
									<h1 className="text-white w-full !text-[30px] !font-bold !mb-[15px]">Create Discussion</h1>
									<textarea
										autoFocus
										type="text"
										placeholder="Discussion content"
										required
										value={discussionContent}
										onChange={(e) => setDiscussionContent(e.target.value)}
										className="bg-[rgba(255,255,255,0.04)] border-none rounded-[25px] !my-[6px] !px-[15px] !py-[10px] !text-[18px] max-[420px]:!text-[16px] font-[600] w-full h-[240px] !resize-none outline-none text-white transition-all duration-500 focus:shadow-[0_0_5px_rgba(255,255,255,0.76)]"
									/>
									<button
										type="submit"
										className="text-white text-[15px] !py-[7px] !px-[45px] !rounded-[500px] font-[600] tracking-[0.5px] !mt-[25px] !cursor-none bg-[linear-gradient(to_right,#4e3eff,#40dfe4,#30dd8a,#269660)] bg-[length:300%_100%] transition-all duration-300 w-full hover:bg-[position:100%_0] hover:!text-black hover:[text-shadow:0_0_10px_white]"
									>
										Post
									</button>
								</form>
							</div>
						</Fade>
					</div>
					<div className="h-[80px]"></div>
				</div>
			)}
			{particless}
		</div>
	);
};

export default CreateDiscussion;