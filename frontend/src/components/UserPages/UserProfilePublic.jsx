import { API_BASE_URL } from "../../config/api.js";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Particless from "../Common/Particles/Particless";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import username from "../../assets/pics/username.webp";
import name from "../../assets/pics/name.webp";
import email from "../../assets/pics/email.webp";
import college from "../../assets/pics/college.webp";
import username2 from "../../assets/pics/username2.webp";
import { AuthContext } from "../../context/AuthContext";
import name2 from "../../assets/pics/name2.webp";
import email2 from "../../assets/pics/email2.webp";
import college2 from "../../assets/pics/college2.webp";
import user_profile from "../../assets/pics/user_profile.webp";
import Fade from "../Common/Motion/Fade.jsx"

const UserProfilePublic = () => {
	const { user_id } = useParams();
	const [userData, setUserData] = useState([]);
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); 

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const response = await fetch(
					`${API_BASE_URL}/user/profile/${user_id}`,
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
					setUserData(jsonData);
				}
			} catch (error) {
				console.error("Error fetching User Info:", error);
				// toast.error("Error fetching posts. Please try again later.");
			}
		};

		fetchUserInfo();
	}, [user_id]);
	
	const history = useHistory();
	useEffect(() => {
		if (!isLoggedIn) {
			history.push("/auth");
		}
	}, [isLoggedIn]);
	const [activeContent, setActiveContent] = useState("content3");

	const handleMouseOver = (contentId) => {
		setActiveContent(contentId);
	};

	return (
		<>
			{isLoggedIn && (
				<div className="flex items-center justify-center min-h-screen !pt-24">
					<Fade left>
						<div className="relative w-[500px] h-[500px] border-2 border-white rounded-full backdrop-blur-[10px] max-[420px]:relative max-[420px]:rounded-none max-[420px]:border-0 max-[420px]:backdrop-blur-[5px]">
							<div className="relative left-[-50%] w-full h-full flex justify-center items-center">
								<div
									className={`absolute w-[120px] h-[120px] bg-[rgb(255,150,38)] rounded-full transition-[0.5s] [transform:rotate(calc(360deg/5*var(--i)))] [transform-origin:308px] z-[100] overflow-hidden flex items-center justify-center backdrop-blur-[7px] max-[420px]:opacity-0 max-[420px]:pointer-events-none ${activeContent === "content1" ? "shadow-[inset_0_0_3px_#ffffff,0_0_4px_#ffffff,0_0_14px_aqua] bg-white" : ""}`}
									style={{ "--i": "1" }}
									onMouseOver={() => handleMouseOver("content1")}
								>
									<img className="absolute w-[60%] h-[60%] object-cover [transform:rotate(calc(-360deg/5*var(--i)))] transition-[0.2s]" src={username2} />
								</div>

								<div
									className={`absolute w-[120px] h-[120px] bg-[rgb(255,150,38)] rounded-full transition-[0.5s] [transform:rotate(calc(360deg/5*var(--i)))] [transform-origin:308px] z-[100] overflow-hidden flex items-center justify-center backdrop-blur-[7px] max-[420px]:opacity-0 max-[420px]:pointer-events-none ${activeContent === "content2" ? "shadow-[inset_0_0_3px_#ffffff,0_0_4px_#ffffff,0_0_14px_aqua] bg-white" : ""}`}
									style={{ "--i": "2" }}
									onMouseOver={() => handleMouseOver("content2")}
								>
									<img className="absolute w-[60%] h-[60%] object-cover [transform:rotate(calc(-360deg/5*var(--i)))] transition-[0.2s]" src={name2} />
								</div>

								<div
									className={`absolute w-[120px] h-[120px] bg-[rgb(255,150,38)] rounded-full transition-[0.5s] [transform:rotate(calc(360deg/5*var(--i)))] [transform-origin:308px] z-[100] overflow-hidden flex items-center justify-center backdrop-blur-[7px] max-[420px]:opacity-0 max-[420px]:pointer-events-none ${activeContent === "content3" ? "shadow-[inset_0_0_3px_#ffffff,0_0_4px_#ffffff,0_0_14px_aqua] bg-white" : ""}`}
									style={{ "--i": "3" }}
									onMouseOver={() => handleMouseOver("content3")}
								>
									<img className="absolute w-[60%] h-[60%] object-cover [transform:rotate(calc(-360deg/5*var(--i)))] transition-[0.2s]" src={user_profile} />
								</div>

								<div
									className={`absolute w-[120px] h-[120px] bg-[rgb(255,150,38)] rounded-full transition-[0.5s] [transform:rotate(calc(360deg/5*var(--i)))] [transform-origin:308px] z-[100] overflow-hidden flex items-center justify-center backdrop-blur-[7px] max-[420px]:opacity-0 max-[420px]:pointer-events-none ${activeContent === "content4" ? "shadow-[inset_0_0_3px_#ffffff,0_0_4px_#ffffff,0_0_14px_aqua] bg-white" : ""}`}
									style={{ "--i": "4" }}
									onMouseOver={() => handleMouseOver("content4")}
								>
									<img className="absolute w-[60%] h-[60%] object-cover [transform:rotate(calc(-360deg/5*var(--i)))] transition-[0.2s]" src={college2} />
								</div>

								<div
									className={`absolute w-[120px] h-[120px] bg-[rgb(255,150,38)] rounded-full transition-[0.5s] [transform:rotate(calc(360deg/5*var(--i)))] [transform-origin:308px] z-[100] overflow-hidden flex items-center justify-center backdrop-blur-[7px] max-[420px]:opacity-0 max-[420px]:pointer-events-none ${activeContent === "content5" ? "shadow-[inset_0_0_3px_#ffffff,0_0_4px_#ffffff,0_0_14px_aqua] bg-white" : ""}`}
									style={{ "--i": "5" }}
									onMouseOver={() => handleMouseOver("content5")}
								>
									<img className="absolute w-[60%] h-[60%] object-cover [transform:rotate(calc(-360deg/5*var(--i)))] transition-[0.2s]" src={email2} />
								</div>
							</div>

							<div className="absolute inset-0 overflow-hidden flex items-center justify-center before:content-[''] before:absolute before:inset-[70px] before:border-4 before:border-transparent before:border-l-2 before:border-l-white before:border-r-2 before:border-r-[rgb(255,150,38)] before:rounded-full before:animate-spin before:[animation-duration:5s] before:z-[1] before:pointer-events-none after:content-[''] after:absolute after:inset-[120px] after:border-4 after:border-transparent after:border-l-2 after:border-l-white after:border-r-2 after:border-r-[rgb(255,150,38)] after:rounded-full after:animate-[spin_2.5s_linear_infinite_reverse] after:z-[1] after:pointer-events-none max-[420px]:top-[-8.5%] max-[420px]:justify-start max-[420px]:flex-col max-[420px]:!overflow-y-scroll max-[420px]:h-[111.5%] max-[420px]:[scrollbar-width:none] max-[420px]:before:border-4 max-[420px]:before:border-transparent max-[420px]:after:border-4 max-[420px]:after:border-transparent">
								<div
									className={`absolute scale-0 transition-[0.5s] opacity-0 flex items-center justify-center rounded-full w-1/2 h-1/2 bg-white/[0.045] backdrop-blur-[1px] max-[420px]:relative max-[420px]:scale-100 max-[420px]:opacity-100 max-[420px]:rounded-[9%] max-[420px]:w-[60%] max-[420px]:backdrop-blur-[10px] max-[420px]:!m-[25px] max-[420px]:!p-[25px] ${activeContent === "content3" ? "scale-100 opacity-100 delay-500" : ""}`}
									id="content3"
								>
									<div className="relative flex items-center justify-center flex-col gap-[15px]">
										<div className="relative w-[150px] h-[150px] rounded-[10px] overflow-hidden">
											<img className="absolute top-0 left-0 w-full h-full object-cover" src={user_profile} />
										</div>
										<div className="flex justify-center items-center flex-col">
											<h2 className="relative !text-[18px] font-semibold text-[aqua] leading-[1em] text-center">
												Welcome to the <strong>KDAG</strong> <br />
											</h2>
										</div>
									</div>
								</div>
								<div
									className={`absolute scale-0 transition-[0.5s] opacity-0 flex items-center justify-center rounded-full w-1/2 h-1/2 bg-white/[0.045] backdrop-blur-[1px] max-[420px]:relative max-[420px]:scale-100 max-[420px]:opacity-100 max-[420px]:rounded-[9%] max-[420px]:w-[60%] max-[420px]:backdrop-blur-[10px] max-[420px]:!m-[25px] max-[420px]:!p-[25px] ${activeContent === "content1" ? "scale-100 opacity-100 delay-500" : ""}`}
									id="content1"
								>
									<div className="relative flex items-center justify-center flex-col gap-[15px]">
										<div className="relative w-[150px] h-[150px] rounded-[10px] overflow-hidden">
											<img className="absolute top-0 left-0 w-full h-full object-cover" src={username} />
										</div>
										<div className="flex justify-center items-center flex-col">
											<h2 className="relative !text-[18px] font-semibold text-[aqua] leading-[1em] text-center">
												{userData.username} <br />
												<span className="text-[0.65em] text-white font-medium tracking-[0.1em] [text-shadow:0_0_0_white]">Username</span>
											</h2>
										</div>
									</div>
								</div>

								<div
									className={`absolute scale-0 transition-[0.5s] opacity-0 flex items-center justify-center rounded-full w-1/2 h-1/2 bg-white/[0.045] backdrop-blur-[1px] max-[420px]:relative max-[420px]:scale-100 max-[420px]:opacity-100 max-[420px]:rounded-[9%] max-[420px]:w-[60%] max-[420px]:backdrop-blur-[10px] max-[420px]:!m-[25px] max-[420px]:!p-[25px] ${activeContent === "content2" ? "scale-100 opacity-100 delay-500" : ""}`}
									id="content2"
								>
									<div className="relative flex items-center justify-center flex-col gap-[15px]">
										<div className="relative w-[150px] h-[150px] rounded-[10px] overflow-hidden">
											<img className="absolute top-0 left-0 w-full h-full object-cover" src={name} />
										</div>
										<div className="flex justify-center items-center flex-col">
											<h2 className="relative !text-[18px] font-semibold text-[aqua] leading-[1em] text-center">
											{userData.f_name}&nbsp;{userData.l_name} <br />
												<span className="text-[0.65em] text-white font-medium tracking-[0.1em] [text-shadow:0_0_0_white]">Name</span>
											</h2>
										</div>
									</div>
								</div>

								<div
									className={`absolute scale-0 transition-[0.5s] opacity-0 flex items-center justify-center rounded-full w-1/2 h-1/2 bg-white/[0.045] backdrop-blur-[1px] max-[420px]:relative max-[420px]:scale-100 max-[420px]:opacity-100 max-[420px]:rounded-[9%] max-[420px]:w-[60%] max-[420px]:backdrop-blur-[10px] max-[420px]:!m-[25px] max-[420px]:!p-[25px] ${activeContent === "content4" ? "scale-100 opacity-100 delay-500" : ""}`}
									id="content4"
								>
									<div className="relative flex items-center justify-center flex-col gap-[15px]">
										<div className="relative w-[150px] h-[150px] rounded-[10px] overflow-hidden">
											<img className="absolute top-0 left-0 w-full h-full object-cover" src={college} />
										</div>
										<div className="flex justify-center items-center flex-col">
											<h2 className="relative !text-[18px] font-semibold text-[aqua] leading-[1em] text-center">
											{userData.college} <br />
												<span className="text-[0.65em] text-white font-medium tracking-[0.1em] [text-shadow:0_0_0_white]">College</span>
											</h2>
										</div>
									</div>
								</div>

								<div
									className={`absolute scale-0 transition-[0.5s] opacity-0 flex items-center justify-center rounded-full w-1/2 h-1/2 bg-white/[0.045] backdrop-blur-[1px] max-[420px]:relative max-[420px]:scale-100 max-[420px]:opacity-100 max-[420px]:rounded-[9%] max-[420px]:w-[60%] max-[420px]:backdrop-blur-[10px] max-[420px]:!m-[25px] max-[420px]:!p-[25px] ${activeContent === "content5" ? "scale-100 opacity-100 delay-500" : ""}`}
									id="content5"
								>
									<div className="relative flex items-center justify-center flex-col gap-[15px]">
										<div className="relative w-[150px] h-[150px] rounded-[10px] overflow-hidden">
											<img className="absolute top-0 left-0 w-full h-full object-cover" src={email} />
										</div>
										<div className="flex justify-center items-center flex-col">
											<h2 className="relative !text-[18px] font-semibold text-[aqua] leading-[1em] text-center">
											{userData.email}  <br />
												<span className="text-[0.65em] text-white font-medium tracking-[0.1em] [text-shadow:0_0_0_white]">Email</span>
											</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Fade>
					<Particless />
				</div>
			)}
		</>
	);
};

export default UserProfilePublic;
