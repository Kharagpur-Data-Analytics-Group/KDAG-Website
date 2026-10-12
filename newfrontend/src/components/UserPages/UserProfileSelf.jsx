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
import Fade from "../Common/Motion/Fade.jsx"

const UserProfileSelf = () => {
	const particless = React.useMemo(() => <Particless />, []);
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); 
	const { user_id } = useParams();
	const [userData, setUserData] = useState([]);
	const token = localStorage.getItem("access_token");
	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_FETCH_URL}/user/profile_self/${user_id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`,
						},
					}
				);
				
				if (!response.ok) {
					const jsonData = await response.json();
				} else {
					const jsonData = await response.json();
					setUserData(jsonData);
				}
			} catch (error) {
				console.error("Error fetching User Info:", error);
			}
		};

		fetchUserInfo();
	}, []);

	const history = useHistory();
	useEffect(() => {
		if (!isLoggedIn) {
			history.push("/auth");
		}
	}, [history , isLoggedIn]);
	const [activeContent, setActiveContent] = useState("content6");
	const [toggle, setToggle] = useState(false);
	const password_hashed = "***************  ";

	const password_toggle = () => {
		setToggle(!toggle);
	};

	const handleMouseOver = (contentId) => {
		setActiveContent(contentId);
	};

	return (
		<>
			{isLoggedIn && (
				<div className="flex items-center justify-center min-h-[105vh] !pt-[75px]">
					<div className="!mt-[120px] !mr-[50px] absolute top-0 right-0 bg-cyan-300 h-[50px] rounded-[60px] !px-[10px] flex items-center justify-center max-[420px]:!mt-[90px] max-[420px]:!mr-[10px] max-[420px]:w-[50px]">
						<Link className="flex items-center !mb-[2px] !ml-[4px]" to={`/edit_profile/${user_id}`}>
							<img className="h-[25px]" src={edit_icon_img} alt=" " /> 
							<span className="max-[768px]:hidden text-black "><b>Edit Profile</b></span>
						</Link>
					</div>
					<Fade left>
						<div className="relative w-[500px] h-[500px] border-2 border-white rounded-full backdrop-blur-[10px] max-[420px]:relative max-[420px]:rounded-none max-[420px]:border-0 max-[420px]:backdrop-blur-[5px]">
							<div className="relative left-[-50%] w-full h-full flex justify-center items-center">
								<div
									className={`absolute w-[120px] h-[120px] bg-[rgb(255,150,38)] rounded-full transition-[0.5s] [transform:rotate(calc(360deg/6*var(--i)))] [transform-origin:308px] z-[100] overflow-hidden flex items-center justify-center backdrop-blur-[7px] max-[420px]:opacity-0 max-[420px]:pointer-events-none ${activeContent === "content1" ? "shadow-[inset_0_0_3px_#ffffff,0_0_6px_#ffffff,0_0_16px_aqua] bg-white" : ""}`}
									style={{ "--i": "1" }}
									onMouseOver={() => handleMouseOver("content1")}
								>
									<img className="absolute w-[60%] h-[60%] object-cover [transform:rotate(calc(-360deg/6*var(--i)))] transition-[0.2s]" src={username2_img} />
								</div>
								<div
									className={`absolute w-[120px] h-[120px] bg-[rgb(255,150,38)] rounded-full transition-[0.5s] [transform:rotate(calc(360deg/6*var(--i)))] [transform-origin:308px] z-[100] overflow-hidden flex items-center justify-center backdrop-blur-[7px] max-[420px]:opacity-0 max-[420px]:pointer-events-none ${activeContent === "content2" ? "shadow-[inset_0_0_3px_#ffffff,0_0_6px_#ffffff,0_0_16px_aqua] bg-white" : ""}`}
									style={{ "--i": "2" }}
									onMouseOver={() => handleMouseOver("content2")}
								>
									<img className="absolute w-[60%] h-[60%] object-cover [transform:rotate(calc(-360deg/6*var(--i)))] transition-[0.2s]" src={name2_img} />
								</div>
								<div
									className={`absolute w-[120px] h-[120px] bg-[rgb(255,150,38)] rounded-full transition-[0.5s] [transform:rotate(calc(360deg/6*var(--i)))] [transform-origin:308px] z-[100] overflow-hidden flex items-center justify-center backdrop-blur-[7px] max-[420px]:opacity-0 max-[420px]:pointer-events-none ${activeContent === "content6" ? "shadow-[inset_0_0_3px_#ffffff,0_0_6px_#ffffff,0_0_16px_aqua] bg-white" : ""}`}
									style={{ "--i": "6" }}
									onMouseOver={() => handleMouseOver("content6")}
								>
									<img className="absolute w-[60%] h-[60%] object-cover [transform:rotate(calc(-360deg/6*var(--i)))] transition-[0.2s]" src={user_profile_img} />
								</div>
								<div
									className={`absolute w-[120px] h-[120px] bg-[rgb(255,150,38)] rounded-full transition-[0.5s] [transform:rotate(calc(360deg/6*var(--i)))] [transform-origin:308px] z-[100] overflow-hidden flex items-center justify-center backdrop-blur-[7px] max-[420px]:opacity-0 max-[420px]:pointer-events-none ${activeContent === "content4" ? "shadow-[inset_0_0_3px_#ffffff,0_0_6px_#ffffff,0_0_16px_aqua] bg-white" : ""}`}
									style={{ "--i": "4" }}
									onMouseOver={() => handleMouseOver("content4")}
								>
									<img className="absolute w-[60%] h-[60%] object-cover [transform:rotate(calc(-360deg/6*var(--i)))] transition-[0.2s]" src={college2_img} />
								</div>
								<div
									className={`absolute w-[120px] h-[120px] bg-[rgb(255,150,38)] rounded-full transition-[0.5s] [transform:rotate(calc(360deg/6*var(--i)))] [transform-origin:308px] z-[100] overflow-hidden flex items-center justify-center backdrop-blur-[7px] max-[420px]:opacity-0 max-[420px]:pointer-events-none ${activeContent === "content5" ? "shadow-[inset_0_0_3px_#ffffff,0_0_6px_#ffffff,0_0_16px_aqua] bg-white" : ""}`}
									style={{ "--i": "5" }}
									onMouseOver={() => handleMouseOver("content5")}
								>
									<img className="absolute w-[60%] h-[60%] object-cover [transform:rotate(calc(-360deg/6*var(--i)))] transition-[0.2s]" src={email2_img} />
								</div>
								<div
									className={`absolute w-[120px] h-[120px] bg-[rgb(255,150,38)] rounded-full transition-[0.5s] [transform:rotate(calc(360deg/6*var(--i)))] [transform-origin:308px] z-[100] overflow-hidden flex items-center justify-center backdrop-blur-[7px] max-[420px]:opacity-0 max-[420px]:pointer-events-none ${activeContent === "content3" ? "shadow-[inset_0_0_3px_#ffffff,0_0_6px_#ffffff,0_0_16px_aqua] bg-white" : ""}`}
									style={{ "--i": "3" }}
									onMouseOver={() => handleMouseOver("content3")}
								>
									<img className="absolute w-[60%] h-[60%] object-cover [transform:rotate(calc(-360deg/6*var(--i)))] transition-[0.2s]" src={phone2_img} />
								</div>
							</div>

							<div className="absolute inset-0 overflow-hidden flex items-center justify-center before:content-[''] before:absolute before:inset-[70px] before:border-4 before:border-transparent before:border-l-2 before:border-l-white before:border-r-2 before:border-r-[rgb(255,150,38)] before:rounded-full before:animate-spin before:[animation-duration:5s] before:z-[1] before:pointer-events-none after:content-[''] after:absolute after:inset-[120px] after:border-4 after:border-transparent after:border-l-2 after:border-l-white after:border-r-2 after:border-r-[rgb(255,150,38)] after:rounded-full after:animate-[spin_2.5s_linear_infinite_reverse] after:z-[1] after:pointer-events-none max-[420px]:top-[-8.5%] max-[420px]:justify-start max-[420px]:flex-col max-[420px]:!overflow-y-scroll max-[420px]:h-[111.5%] max-[420px]:[scrollbar-width:none] max-[420px]:before:border-4 max-[420px]:before:border-transparent max-[420px]:after:border-4 max-[420px]:after:border-transparent">
								<div
									className={`absolute scale-0 transition-[0.5s] opacity-0 flex items-center justify-center rounded-full w-1/2 h-1/2 bg-white/[0.045] backdrop-blur-[1px] max-[420px]:relative max-[420px]:scale-100 max-[420px]:opacity-100 max-[420px]:rounded-[9%] max-[420px]:w-[60%] max-[420px]:backdrop-blur-[10px] max-[420px]:!m-[25px] max-[420px]:!p-[25px] ${activeContent === "content6" ? "scale-100 opacity-100 delay-500" : ""}`}
									id="content6"
								>
									<div className="relative flex items-center justify-center flex-col gap-[15px]">
										<div className="relative w-[150px] h-[150px] rounded-[10px] overflow-hidden">
											<img className="absolute top-0 left-0 w-full h-full object-cover" src={user_profile_img} />
										</div>
										<div className="flex justify-center items-center flex-col">
											<h2 className="relative !text-[18px] font-semibold text-[aqua] leading-[1em] text-center">
												Welcome to <strong>KDAG</strong> <br />
												<span></span>
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
											<img className="absolute top-0 left-0 w-full h-full object-cover" src={username_img} />
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
											<img className="absolute top-0 left-0 w-full h-full object-cover" src={name_img} />
										</div>
										<div className="flex justify-center items-center flex-col">
											<h2 className="relative !text-[18px] font-semibold text-[aqua] leading-[1em] text-center">
												{userData.f_name} {userData.l_name} <br />
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
											<img className="absolute top-0 left-0 w-full h-full object-cover" src={college_img} />
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
											<img className="absolute top-0 left-0 w-full h-full object-cover" src={email_img} />
										</div>
										<div className="flex justify-center items-center flex-col">
											<h2 className="relative !text-[18px] font-semibold text-[aqua] leading-[1em] text-center">
												{userData.email} <br />
												<span className="text-[0.65em] text-white font-medium tracking-[0.1em] [text-shadow:0_0_0_white]">Email</span>
											</h2>
										</div>
									</div>
								</div>

								<div
									className={`absolute scale-0 transition-[0.5s] opacity-0 flex items-center justify-center rounded-full w-1/2 h-1/2 bg-white/[0.045] backdrop-blur-[1px] max-[420px]:relative max-[420px]:scale-100 max-[420px]:opacity-100 max-[420px]:rounded-[9%] max-[420px]:w-[60%] max-[420px]:backdrop-blur-[10px] max-[420px]:!m-[25px] max-[420px]:!p-[25px] ${activeContent === "content3" ? "scale-100 opacity-100 delay-500" : ""}`}
									id="content3"
								>
									<div className="relative flex items-center justify-center flex-col gap-[15px]">
										<div className="relative w-[150px] h-[150px] rounded-[10px] overflow-hidden">
											<img className="absolute top-0 left-0 w-full h-full object-cover" src={phone_img} />
										</div>
										<div className="flex justify-center items-center flex-col">
											<h2 className="relative !text-[18px] font-semibold text-[aqua] leading-[1em] text-center">
												{userData.phone} <br />
												<span className="text-[0.65em] text-white font-medium tracking-[0.1em] [text-shadow:0_0_0_white]">Phone</span>
											</h2>
										</div>
									</div>
								</div>
								<div
									className={`absolute scale-0 transition-[0.5s] opacity-0 flex items-center justify-center rounded-full w-1/2 h-1/2 bg-white/[0.045] backdrop-blur-[1px] max-[420px]:relative max-[420px]:scale-100 max-[420px]:opacity-100 max-[420px]:rounded-[9%] max-[420px]:w-[60%] max-[420px]:backdrop-blur-[10px] max-[420px]:!m-[25px] max-[420px]:!p-[25px] ${activeContent === "content7" ? "scale-100 opacity-100 delay-500" : ""}`}
									id="content7"
								>
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
