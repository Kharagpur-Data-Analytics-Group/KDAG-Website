import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Particless from "../Common/Particles/Particless";
import username_img from "../../assets/pics/username.png";
import { AuthContext } from "../../context/AuthContext";
import name_img from "../../assets/pics/name.png";
import email_img from "../../assets/pics/email.png";
import college_img from "../../assets/pics/college.png";
import phone_img from "../../assets/pics/phone.png";
import username2_img from "../../assets/pics/username2.png";
import phone2_img from "../../assets/pics/phone2.png";
import name2_img from "../../assets/pics/name2.png";
import email2_img from "../../assets/pics/email2.png";
import college2_img from "../../assets/pics/college2.png";
import user_profile_img from "../../assets/pics/user_profile.png";
import edit_icon_img from "../../assets/pics/edit.png";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Fade from "../Common/Motion/Fade.js"

const UserProfileSelf = () => {
	const particless = React.useMemo(() => <Particless />, []);
	const { isLoggedIn } = useContext(AuthContext); 
	const { user_id } = useParams();
	const [userData, setUserData] = useState([]);
	const token = localStorage.getItem("access_token");
	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_FETCH_URL}/user/profile_self/${user_id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`,
						},
					}
				);
				
				if (!response.ok) {
					// const jsonData = await response.json();
				} else {
					const jsonData = await response.json();
					setUserData(jsonData);
				}
			} catch (error) {
				console.error("Error fetching User Info:", error);
			}
		};

		fetchUserInfo();
	}, [user_id, token]);

	const history = useHistory();
	useEffect(() => {
		if (!isLoggedIn) {
			history.push("/auth");
		}
	}, [history, isLoggedIn]);
	
	const [activeContent, setActiveContent] = useState("content6");

	const handleMouseOver = (contentId) => {
		setActiveContent(contentId);
	};

	return (
		<>
			{isLoggedIn && (
				<div className="flex items-center justify-center min-h-[105vh] pt-[75px]">
					<div className="absolute top-[100px] left-1/2 md:left-auto md:right-8 -translate-x-1/2 md:translate-x-0 z-50">
						<Link to={`/edit_profile/${user_id}`} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 transition-all shadow-lg text-white no-underline">
							<img src={edit_icon_img} alt="Edit" className="w-5 h-5 invert" /> 
							<span className="font-bold">Edit Profile</span>
						</Link>
					</div>
					<Fade left>
						<div className="relative w-[320px] h-[400px] md:w-[500px] md:h-[500px] border-0 md:border-2 border-white rounded-[15px] md:rounded-full backdrop-blur-[10px] mt-10 md:mt-0 flex flex-col md:block">
							<div className="relative md:absolute md:left-[-50%] w-full h-[120px] md:h-full flex justify-center items-center z-10 mt-10 md:mt-0 gap-2 md:gap-0">
								
								{/* Icon 1 */}
								<div
									className={`md:absolute w-12 h-12 md:w-[120px] md:h-[120px] rounded-full transition-all duration-500 overflow-hidden flex items-center justify-center backdrop-blur-md cursor-pointer z-50
										${activeContent === "content1" ? "bg-white shadow-[inset_0_0_3px_#fff,0_0_6px_#fff,0_0_16px_aqua]" : "bg-[#ff9626]"}
										md:origin-[308px]`}
									style={{ transform: window.innerWidth > 768 ? "rotate(60deg)" : "none" }}
									onMouseOver={() => handleMouseOver("content1")}
								>
									<img src={username2_img} className="w-3/5 h-3/5 object-cover transition-all duration-200" style={{ transform: window.innerWidth > 768 ? "rotate(-60deg)" : "none" }} alt="username" />
								</div>
								
								{/* Icon 2 */}
								<div
									className={`md:absolute w-12 h-12 md:w-[120px] md:h-[120px] rounded-full transition-all duration-500 overflow-hidden flex items-center justify-center backdrop-blur-md cursor-pointer z-50
										${activeContent === "content2" ? "bg-white shadow-[inset_0_0_3px_#fff,0_0_6px_#fff,0_0_16px_aqua]" : "bg-[#ff9626]"}
										md:origin-[308px]`}
									style={{ transform: window.innerWidth > 768 ? "rotate(120deg)" : "none" }}
									onMouseOver={() => handleMouseOver("content2")}
								>
									<img src={name2_img} className="w-3/5 h-3/5 object-cover transition-all duration-200" style={{ transform: window.innerWidth > 768 ? "rotate(-120deg)" : "none" }} alt="name" />
								</div>
								
								{/* Icon 6 (Main) */}
								<div
									className={`md:absolute w-12 h-12 md:w-[120px] md:h-[120px] rounded-full transition-all duration-500 overflow-hidden flex items-center justify-center backdrop-blur-md cursor-pointer z-50
										${activeContent === "content6" ? "bg-white shadow-[inset_0_0_3px_#fff,0_0_6px_#fff,0_0_16px_aqua]" : "bg-[#ff9626]"}
										md:origin-[308px]`}
									style={{ transform: window.innerWidth > 768 ? "rotate(360deg)" : "none" }}
									onMouseOver={() => handleMouseOver("content6")}
								>
									<img src={user_profile_img} className="w-3/5 h-3/5 object-cover transition-all duration-200" style={{ transform: window.innerWidth > 768 ? "rotate(-360deg)" : "none" }} alt="profile" />
								</div>
								
								{/* Icon 4 */}
								<div
									className={`md:absolute w-12 h-12 md:w-[120px] md:h-[120px] rounded-full transition-all duration-500 overflow-hidden flex items-center justify-center backdrop-blur-md cursor-pointer z-50
										${activeContent === "content4" ? "bg-white shadow-[inset_0_0_3px_#fff,0_0_6px_#fff,0_0_16px_aqua]" : "bg-[#ff9626]"}
										md:origin-[308px]`}
									style={{ transform: window.innerWidth > 768 ? "rotate(240deg)" : "none" }}
									onMouseOver={() => handleMouseOver("content4")}
								>
									<img src={college2_img} className="w-3/5 h-3/5 object-cover transition-all duration-200" style={{ transform: window.innerWidth > 768 ? "rotate(-240deg)" : "none" }} alt="college" />
								</div>
								
								{/* Icon 5 */}
								<div
									className={`md:absolute w-12 h-12 md:w-[120px] md:h-[120px] rounded-full transition-all duration-500 overflow-hidden flex items-center justify-center backdrop-blur-md cursor-pointer z-50
										${activeContent === "content5" ? "bg-white shadow-[inset_0_0_3px_#fff,0_0_6px_#fff,0_0_16px_aqua]" : "bg-[#ff9626]"}
										md:origin-[308px]`}
									style={{ transform: window.innerWidth > 768 ? "rotate(300deg)" : "none" }}
									onMouseOver={() => handleMouseOver("content5")}
								>
									<img src={email2_img} className="w-3/5 h-3/5 object-cover transition-all duration-200" style={{ transform: window.innerWidth > 768 ? "rotate(-300deg)" : "none" }} alt="email" />
								</div>
								
								{/* Icon 3 */}
								<div
									className={`md:absolute w-12 h-12 md:w-[120px] md:h-[120px] rounded-full transition-all duration-500 overflow-hidden flex items-center justify-center backdrop-blur-md cursor-pointer z-50
										${activeContent === "content3" ? "bg-white shadow-[inset_0_0_3px_#fff,0_0_6px_#fff,0_0_16px_aqua]" : "bg-[#ff9626]"}
										md:origin-[308px]`}
									style={{ transform: window.innerWidth > 768 ? "rotate(180deg)" : "none" }}
									onMouseOver={() => handleMouseOver("content3")}
								>
									<img src={phone2_img} className="w-3/5 h-3/5 object-cover transition-all duration-200" style={{ transform: window.innerWidth > 768 ? "rotate(-180deg)" : "none" }} alt="phone" />
								</div>
							</div>

							<div className="relative md:absolute md:inset-0 h-full w-full overflow-hidden flex items-center justify-center mt-10 md:mt-0">
								{/* Animated rings for desktop */}
								<div className="hidden md:block absolute inset-[70px] border-4 border-transparent border-l-white border-r-[#ff9626] rounded-full animate-[spin_5s_linear_infinite] z-[1] pointer-events-none"></div>
								<div className="hidden md:block absolute inset-[120px] border-4 border-transparent border-l-white border-r-[#ff9626] rounded-full animate-[spin_2.5s_linear_infinite_reverse] z-[1] pointer-events-none"></div>

								{/* Content Box 6 */}
								<div className={`absolute flex items-center justify-center rounded-full md:w-1/2 md:h-1/2 w-4/5 h-[80%] bg-white/5 backdrop-blur-sm transition-all duration-500
									${activeContent === "content6" ? "scale-100 opacity-100 delay-500 z-20" : "scale-0 opacity-0 z-0"}`}
								>
									<div className="relative flex items-center justify-center flex-col gap-[15px]">
										<div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-[10px] overflow-hidden">
											<img src={user_profile_img} className="absolute inset-0 w-full h-full object-cover" alt="profile" />
										</div>
										<div className="flex justify-center items-center flex-col text-center">
											<h2 className="relative text-[16px] md:text-[18px] font-semibold text-cyan-400 leading-none">
												Welcome to <strong>KDAG</strong> <br />
												<span className="text-[0.65em] text-white font-medium tracking-[0.1em] drop-shadow-md"></span>
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
											<img src={username_img} className="absolute inset-0 w-full h-full object-cover" alt="username" />
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
											<img src={name_img} className="absolute inset-0 w-full h-full object-cover" alt="name" />
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
											<img src={college_img} className="absolute inset-0 w-full h-full object-cover" alt="college" />
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
											<img src={email_img} className="absolute inset-0 w-full h-full object-cover" alt="email" />
										</div>
										<div className="flex justify-center items-center flex-col text-center">
											<h2 className="relative text-[16px] md:text-[18px] font-semibold text-cyan-400 leading-none mt-2 break-all px-4">
												{userData.email} <br />
												<span className="text-[0.65em] text-white font-medium tracking-[0.1em] drop-shadow-md mt-1 block">Email</span>
											</h2>
										</div>
									</div>
								</div>

								{/* Content Box 3 */}
								<div className={`absolute flex items-center justify-center rounded-full md:w-1/2 md:h-1/2 w-4/5 h-[80%] bg-white/5 backdrop-blur-sm transition-all duration-500
									${activeContent === "content3" ? "scale-100 opacity-100 delay-500 z-20" : "scale-0 opacity-0 z-0"}`}
								>
									<div className="relative flex items-center justify-center flex-col gap-[15px]">
										<div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-[10px] overflow-hidden">
											<img src={phone_img} className="absolute inset-0 w-full h-full object-cover" alt="phone" />
										</div>
										<div className="flex justify-center items-center flex-col text-center">
											<h2 className="relative text-[16px] md:text-[18px] font-semibold text-cyan-400 leading-none mt-2">
												{userData.phone} <br />
												<span className="text-[0.65em] text-white font-medium tracking-[0.1em] drop-shadow-md mt-1 block">Phone</span>
											</h2>
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</Fade>
					{particless}
				</div>
			)}
		</>
	);
};

export default UserProfileSelf;
