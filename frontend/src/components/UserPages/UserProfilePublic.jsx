import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Particless from "../Common/Particles/Particless";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import username from "../../assets/pics/username.png";
import name from "../../assets/pics/name.png";
import email from "../../assets/pics/email.png";
import college from "../../assets/pics/college.png";
import username2 from "../../assets/pics/username2.png";
import { AuthContext } from "../../context/AuthContext";
import name2 from "../../assets/pics/name2.png";
import email2 from "../../assets/pics/email2.png";
import college2 from "../../assets/pics/college2.png";
import user_profile from "../../assets/pics/user_profile.png";
import Fade from "../Common/Motion/Fade.js"

const UserProfilePublic = () => {
	const { user_id } = useParams();
	const [userData, setUserData] = useState([]);
	const { isLoggedIn } = useContext(AuthContext); 

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_FETCH_URL}/user/profile/${user_id}`,
					{
						method: "GET",
					}
				);
				if (!response.ok) {
					const jsonData = await response.json();
					console.log(jsonData);
				} else {
					const jsonData = await response.json();
					console.log("User Info fetched successfully:", jsonData.message);
					setUserData(jsonData);
				}
			} catch (error) {
				console.error("Error fetching User Info:", error);
			}
		};

		fetchUserInfo();
	}, [user_id]);
	
	const history = useHistory();
	useEffect(() => {
		if (!isLoggedIn) {
			history.push("/auth");
		}
	}, [isLoggedIn, history]);
	
	const [activeContent, setActiveContent] = useState("content3");

	const handleMouseOver = (contentId) => {
		setActiveContent(contentId);
	};

	return (
		<>
			{isLoggedIn && (
				<div className="flex items-center justify-center min-h-[105vh] pt-[75px]">
					<Fade left>
						<div className="relative w-[320px] h-[400px] md:w-[500px] md:h-[500px] border-0 md:border-2 border-white rounded-[15px] md:rounded-full backdrop-blur-[10px] mt-10 md:mt-0 flex flex-col md:block">
							<div className="relative md:absolute md:left-[-50%] w-full h-[120px] md:h-full flex justify-center items-center z-10 mt-10 md:mt-0 gap-2 md:gap-0">
								
								{/* Icon 1 */}
								<div
									className={`md:absolute w-12 h-12 md:w-[120px] md:h-[120px] rounded-full transition-all duration-500 overflow-hidden flex items-center justify-center backdrop-blur-md cursor-pointer z-50
										${activeContent === "content1" ? "bg-white shadow-[inset_0_0_3px_#fff,0_0_6px_#fff,0_0_16px_aqua]" : "bg-[#ff9626]"}
										md:origin-[308px]`}
									style={{ transform: window.innerWidth > 768 ? "rotate(72deg)" : "none" }}
									onMouseOver={() => handleMouseOver("content1")}
								>
									<img src={username2} className="w-3/5 h-3/5 object-cover transition-all duration-200" style={{ transform: window.innerWidth > 768 ? "rotate(-72deg)" : "none" }} alt="username" />
								</div>
								
								{/* Icon 2 */}
								<div
									className={`md:absolute w-12 h-12 md:w-[120px] md:h-[120px] rounded-full transition-all duration-500 overflow-hidden flex items-center justify-center backdrop-blur-md cursor-pointer z-50
										${activeContent === "content2" ? "bg-white shadow-[inset_0_0_3px_#fff,0_0_6px_#fff,0_0_16px_aqua]" : "bg-[#ff9626]"}
										md:origin-[308px]`}
									style={{ transform: window.innerWidth > 768 ? "rotate(144deg)" : "none" }}
									onMouseOver={() => handleMouseOver("content2")}
								>
									<img src={name2} className="w-3/5 h-3/5 object-cover transition-all duration-200" style={{ transform: window.innerWidth > 768 ? "rotate(-144deg)" : "none" }} alt="name" />
								</div>
								
								{/* Icon 3 (Main) */}
								<div
									className={`md:absolute w-12 h-12 md:w-[120px] md:h-[120px] rounded-full transition-all duration-500 overflow-hidden flex items-center justify-center backdrop-blur-md cursor-pointer z-50
										${activeContent === "content3" ? "bg-white shadow-[inset_0_0_3px_#fff,0_0_6px_#fff,0_0_16px_aqua]" : "bg-[#ff9626]"}
										md:origin-[308px]`}
									style={{ transform: window.innerWidth > 768 ? "rotate(360deg)" : "none" }}
									onMouseOver={() => handleMouseOver("content3")}
								>
									<img src={user_profile} className="w-3/5 h-3/5 object-cover transition-all duration-200" style={{ transform: window.innerWidth > 768 ? "rotate(-360deg)" : "none" }} alt="profile" />
								</div>
								
								{/* Icon 4 */}
								<div
									className={`md:absolute w-12 h-12 md:w-[120px] md:h-[120px] rounded-full transition-all duration-500 overflow-hidden flex items-center justify-center backdrop-blur-md cursor-pointer z-50
										${activeContent === "content4" ? "bg-white shadow-[inset_0_0_3px_#fff,0_0_6px_#fff,0_0_16px_aqua]" : "bg-[#ff9626]"}
										md:origin-[308px]`}
									style={{ transform: window.innerWidth > 768 ? "rotate(288deg)" : "none" }}
									onMouseOver={() => handleMouseOver("content4")}
								>
									<img src={college2} className="w-3/5 h-3/5 object-cover transition-all duration-200" style={{ transform: window.innerWidth > 768 ? "rotate(-288deg)" : "none" }} alt="college" />
								</div>
								
								{/* Icon 5 */}
								<div
									className={`md:absolute w-12 h-12 md:w-[120px] md:h-[120px] rounded-full transition-all duration-500 overflow-hidden flex items-center justify-center backdrop-blur-md cursor-pointer z-50
										${activeContent === "content5" ? "bg-white shadow-[inset_0_0_3px_#fff,0_0_6px_#fff,0_0_16px_aqua]" : "bg-[#ff9626]"}
										md:origin-[308px]`}
									style={{ transform: window.innerWidth > 768 ? "rotate(216deg)" : "none" }}
									onMouseOver={() => handleMouseOver("content5")}
								>
									<img src={email2} className="w-3/5 h-3/5 object-cover transition-all duration-200" style={{ transform: window.innerWidth > 768 ? "rotate(-216deg)" : "none" }} alt="email" />
								</div>
							</div>

							<div className="relative md:absolute md:inset-0 h-full w-full overflow-hidden flex items-center justify-center mt-10 md:mt-0">
								{/* Animated rings for desktop */}
								<div className="hidden md:block absolute inset-[70px] border-4 border-transparent border-l-white border-r-[#ff9626] rounded-full animate-[spin_5s_linear_infinite] z-[1] pointer-events-none"></div>
								<div className="hidden md:block absolute inset-[120px] border-4 border-transparent border-l-white border-r-[#ff9626] rounded-full animate-[spin_2.5s_linear_infinite_reverse] z-[1] pointer-events-none"></div>

								{/* Content Box 3 */}
								<div className={`absolute flex items-center justify-center rounded-full md:w-1/2 md:h-1/2 w-4/5 h-[80%] bg-white/5 backdrop-blur-sm transition-all duration-500
									${activeContent === "content3" ? "scale-100 opacity-100 delay-500 z-20" : "scale-0 opacity-0 z-0"}`}
								>
									<div className="relative flex items-center justify-center flex-col gap-[15px]">
										<div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-[10px] overflow-hidden">
											<img src={user_profile} className="absolute inset-0 w-full h-full object-cover" alt="profile" />
										</div>
										<div className="flex justify-center items-center flex-col text-center">
											<h2 className="relative text-[16px] md:text-[18px] font-semibold text-cyan-400 leading-none">
												Welcome to the <strong>KDAG</strong> <br />
											</h2>
										</div>
									</div>
								</div>

								{/* Content Box 1 */}
								<div className={`absolute flex items-center justify-center rounded-full md:w-1/2 md:h-1/2 w-4/5 h-[80%] bg-white/5 backdrop-blur-sm transition-all duration-500
									${activeContent === "content1" ? "scale-100 opacity-100 delay-500 z-20" : "scale-0 opacity-0 z-0"}`}
								>
									<div className="relative flex items-center justify-center flex-col gap-[15px]">
										<div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-[10px] overflow-hidden">
											<img src={username} className="absolute inset-0 w-full h-full object-cover" alt="username" />
										</div>
										<div className="flex justify-center items-center flex-col text-center">
											<h2 className="relative text-[16px] md:text-[18px] font-semibold text-cyan-400 leading-none mt-2">
												{userData.username} <br />
												<span className="text-[0.65em] text-white font-medium tracking-[0.1em] drop-shadow-md mt-1 block">Username</span>
											</h2>
										</div>
									</div>
								</div>

								{/* Content Box 2 */}
								<div className={`absolute flex items-center justify-center rounded-full md:w-1/2 md:h-1/2 w-4/5 h-[80%] bg-white/5 backdrop-blur-sm transition-all duration-500
									${activeContent === "content2" ? "scale-100 opacity-100 delay-500 z-20" : "scale-0 opacity-0 z-0"}`}
								>
									<div className="relative flex items-center justify-center flex-col gap-[15px]">
										<div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-[10px] overflow-hidden">
											<img src={name} className="absolute inset-0 w-full h-full object-cover" alt="name" />
										</div>
										<div className="flex justify-center items-center flex-col text-center">
											<h2 className="relative text-[16px] md:text-[18px] font-semibold text-cyan-400 leading-none mt-2">
												{userData.f_name} {userData.l_name} <br />
												<span className="text-[0.65em] text-white font-medium tracking-[0.1em] drop-shadow-md mt-1 block">Name</span>
											</h2>
										</div>
									</div>
								</div>

								{/* Content Box 4 */}
								<div className={`absolute flex items-center justify-center rounded-full md:w-1/2 md:h-1/2 w-4/5 h-[80%] bg-white/5 backdrop-blur-sm transition-all duration-500
									${activeContent === "content4" ? "scale-100 opacity-100 delay-500 z-20" : "scale-0 opacity-0 z-0"}`}
								>
									<div className="relative flex items-center justify-center flex-col gap-[15px]">
										<div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-[10px] overflow-hidden">
											<img src={college} className="absolute inset-0 w-full h-full object-cover" alt="college" />
										</div>
										<div className="flex justify-center items-center flex-col text-center">
											<h2 className="relative text-[16px] md:text-[18px] font-semibold text-cyan-400 leading-none mt-2">
												{userData.college} <br />
												<span className="text-[0.65em] text-white font-medium tracking-[0.1em] drop-shadow-md mt-1 block">College</span>
											</h2>
										</div>
									</div>
								</div>

								{/* Content Box 5 */}
								<div className={`absolute flex items-center justify-center rounded-full md:w-1/2 md:h-1/2 w-4/5 h-[80%] bg-white/5 backdrop-blur-sm transition-all duration-500
									${activeContent === "content5" ? "scale-100 opacity-100 delay-500 z-20" : "scale-0 opacity-0 z-0"}`}
								>
									<div className="relative flex items-center justify-center flex-col gap-[15px]">
										<div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-[10px] overflow-hidden">
											<img src={email} className="absolute inset-0 w-full h-full object-cover" alt="email" />
										</div>
										<div className="flex justify-center items-center flex-col text-center">
											<h2 className="relative text-[16px] md:text-[18px] font-semibold text-cyan-400 leading-none mt-2 break-all px-4">
												{userData.email} <br />
												<span className="text-[0.65em] text-white font-medium tracking-[0.1em] drop-shadow-md mt-1 block">Email</span>
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
