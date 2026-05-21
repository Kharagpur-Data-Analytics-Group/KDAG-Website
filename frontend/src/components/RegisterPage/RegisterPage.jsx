import React, { useEffect, useState, useContext } from "react";
import Fade from "../Common/Motion/Fade.js"
import Particless from "../Common/Particles/Particless";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleSubmit } from "./useFormStates";
import useFormStates from "./useFormStates";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import RegisterFormCard from "./RegisterFormCard.js";
import Star from "./Star.js";
import { AuthContext } from "../../context/AuthContext";
import LoginPrompt from "../Resources_New/LoginPrompt";
import "../Resources_New/LoginPrompt.css";
import { Copy, Check } from "lucide-react";
import whatsapp from "./../../assets/kdsh2025_whatsapp.png";
import discord from "./../../assets/kdsh2025_discord.png";
import banner from "./../../assets/banner.png";
import bannerSmall from "./../../assets/kdshbanner_small.png";

const RegisterPage = () => {
	const particless = React.useMemo(() => <Particless />, []);
	const { isLoggedIn } = useContext(AuthContext);
	const { userInfo } = useContext(AuthContext);
	const [successPage, setSuccessPage] = useState(false);
	const history = useHistory();
	const [showHowTo, setShowHowTo] = useState(true);
	const [registrationMode, setRegistrationMode] = useState(null);
	const [teamCode, setTeamCode] = useState("");
	const [teamCodeDisplay, setTeamCodeDisplay] = useState("");
	const [showLoginPrompt, setShowLoginPrompt] = useState(false);
	const [hasTeam, setHasTeam] = useState(false);
	const [checkingTeam, setCheckingTeam] = useState(false);
	const [copiedTeamCode, setCopiedTeamCode] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);


	const handleShowHowTo = () => {
		setShowHowTo(!showHowTo);
	};

	useEffect(() => {
		if (successPage) {
			history.push("/register-success");
		}
	}, [successPage, history]);

	useEffect(() => {
		if (isLoggedIn) {
			checkUserTeam();
		}
	}, [isLoggedIn]);

	const checkUserTeam = async () => {
		setCheckingTeam(true);
		try {
			const token = localStorage.getItem("access_token");
			if (!token) {
				setCheckingTeam(false);
				return;
			}

			const res = await fetch(
				`${process.env.REACT_APP_FETCH_URL}/kdsh/get_user_teams`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			const data = await res.json();
			if (res.ok && data.teams && data.teams.length > 0) {
				setHasTeam(true);
			}
		} catch (error) {
			console.error("Error checking team status:", error);
		} finally {
			setCheckingTeam(false);
		}
	};

	const handleTeamLeaderRegister = (e) => {
		e.preventDefault();

		if (isSubmitting) return;

		if (!isLoggedIn) {
			setShowLoginPrompt(true);
			return false;
		}

		if (!handleSubmit(firstname1, mobile1, college1, YOS1, GitHubID1)) {
			return false;
		}

		if (!team || team.trim() === "") {
			toast.error("Please enter a team name", {
				position: "top-center",
				draggable: true,
				theme: "dark",
			});
			return false;
		}

		setIsSubmitting(true);

		const formData = {
			isTeamLeader: true,
			firstname: firstname1,
			lastname: lastname1,
			gender: gender1,
			mail: mail1,
			mobile: mobile1,
			college: college1,
			degree: degree1,
			YOS: Number(YOS1),
			GitHubID: GitHubID1,
			teamName: team,
		};

		const registerPromise = fetch(
			`${process.env.REACT_APP_FETCH_URL}/kdsh/check_register`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			}
		)
			.then(async (response) => {
				const data = await response.json();
				if (!response.ok) {
					// Handle error responses
					throw new Error(data.error || `Server error: ${response.status}`);
				}
				return data;
			})
			.then((data) => {
				if (data.teamCode && data.message) {
					setTeamCodeDisplay(data.teamCode);
					toast.success(data.message, {
						theme: "dark",
						autoClose: 10000,
					});
				}
				checkUserTeam();
				setIsSubmitting(false);
			})
			.catch((error) => {
				console.error("Error during registration:", error);
				const errorMessage = error.message || "Registration failed, please try again later.";
				toast.error(errorMessage, {
					position: "top-center",
					draggable: true,
					autoClose: 15000,
				});
				setIsSubmitting(false);
			});

		toast.promise(
			registerPromise,
			{
				pending:
					"Creating your team...This may take several minutes, Please stay with us!!!",
				error: "Registration failed. Please try again later.",
			},
			{
				position: "top-center",
				autoClose: 8000,
			}
		);
	};

	const handleJoinTeam = async (e) => {
		e.preventDefault();

		if (isSubmitting) return;
		setIsSubmitting(true);

		try {
			if (!teamCode || teamCode.trim() === "") {
			toast.error("Please enter a team code", {
				position: "top-center",
				draggable: true,
				theme: "dark",
			});
			return;
			}

			if (!handleSubmit(firstname1, mobile1, college1, YOS1, GitHubID1)) {
			return;
			}

			const formData = {
			firstname: firstname1,
			lastname: lastname1,
			gender: gender1,
			mail: mail1,
			mobile: mobile1,
			college: college1,
			degree: degree1,
			YOS: Number(YOS1),
			GitHubID: GitHubID1,
			teamCode: teamCode.trim().toUpperCase(),
			};

			const response = await fetch(
			`${process.env.REACT_APP_FETCH_URL}/kdsh/join_team`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			}
			);

			const data = await response.json();

			if (!response.ok) {
			throw new Error(data.error || "Failed to join team");
			}

			toast.success(data.message || "Joined team successfully", { theme: "dark" });
			setSuccessPage(true);

		} catch (error) {
			console.error("Join error:", error);
			toast.error(error.message || "Failed to join team", {
			position: "top-center",
			autoClose: 15000,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const {
		firstname1,
		setFirstname1,

		lastname1,
		setLastname1,

		gender1,
		setGender1,

		mail1,
		setMail1,

		mobile1,
		setMobile1,

		college1,
		setCollege1,

		degree1,
		setDegree1,

		YOS1,
		setYOS1,

		GitHubID1,
		setGitHubID1
	} = useFormStates();

	useEffect(() => {
		setMail1(userInfo?.email);
	}, [userInfo, mail1]);

	const [team, setTeam] = useState("");

	const handleTeamName = (e) => {
		const value = e.target.value;

		if (value.length > 35) {
			toast.error("Please choose a name not more than 35 characters", {
				position: "top-center",
				draggable: true,
				theme: "dark",
			});
			return;
		}

		const validNameRegex = /^[a-zA-Z0-9\s]*$/;
		if (!validNameRegex.test(value)) {
			toast.error("Team name can only contain letters, numbers and spaces", {
				position: "top-center",
				draggable: true,
				theme: "dark",
			});
			return;
		}

		setTeam(value);
	};


	const handleTeamCodeChange = (e) => {
		const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
		setTeamCode(value);
	};

	const handleKdshClick = (e) => {
		history.push("/");
	};

	const copyTeamCodeToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(teamCodeDisplay);
			setCopiedTeamCode(true);
			toast.success("Team code copied to clipboard!", {
				position: "top-center",
				autoClose: 2000,
			});
			setTimeout(() => setCopiedTeamCode(false), 2000);
		} catch (error) {
			toast.error("Failed to copy code");
			console.error("Copy error:", error);
		}
	};

	const handleBackToSelection = () => {
		setRegistrationMode(null);
		setTeamCodeDisplay("");
		setTeam("");
		setTeamCode("");
	};

	return (
		<>
			<div className="relative w-full overflow-hidden flex flex-col items-center justify-start min-h-screen">
				<Fade top>
					<div className="relative w-full flex flex-col items-center justify-start pt-[140px] md:pt-[100px] sm:pt-[80px] z-10 px-4">
						<div className="absolute inset-0 bg-[url('../../assets/KDSH2025_cover.png')] bg-cover bg-center bg-no-repeat -z-10"></div>
						<div className="text-[clamp(48px,6vw,72px)] font-black tracking-tighter text-white mb-8 text-center drop-shadow-2xl">KDSH 2026</div>
						<div className="w-full max-w-[900px] mb-8">
							<picture>
								<source media="(max-width: 767px)" srcSet={bannerSmall} />
								<img src={banner} alt="KDSH Banner" className="w-full h-auto rounded-xl shadow-lg" />
							</picture>
						</div>

						<div className="max-w-[900px] w-full mx-auto p-6 md:p-10 mb-4 text-base md:text-lg leading-relaxed font-medium text-white text-justify bg-white/10 backdrop-blur-md rounded-[20px] border border-white/20">
							<p>
								The 6th Edition of the{" "}
								<strong>Kharagpur Data Science Hackathon</strong> (KDSH) is here
								to redefine excellence in data science. Dive into machine
								learning, solve real-world challenges, and showcase your
								innovative solutions. Connect with industry leaders, sharpen
								your skills, and become a trailblazer in the field.
							</p>

							<p className="mt-4">
								For more details about KDSH 2026, visit our {" "}
								<a
									className="text-[#FFD700] font-bold hover:underline"
									href="https://unstop.com/p/kharagpur-data-science-hackathon-2026-iit-kharagpur-1614844"
									target="_blank"
									rel="noreferrer noopener"
								>
									Unstop Page
								</a>.
							</p> 

							<p className="mt-4">
								To participate, please fill in your details in the form provided
								below.
							</p>

							<p
								className="mt-8 pt-8 border-t-2 border-white text-[#FFD700] font-bold"
							>
								Before registering, kindly ensure all your team members have
								starred the following GitHub repositories:
							</p>

							<ul className="mt-6 flex gap-4 justify-evenly flex-wrap list-none p-0">
								<li className="relative px-12 py-3 rounded-xl font-bold text-base text-white cursor-pointer bg-white/10 border border-white/30 hover:scale-105 hover:border-white/60 transition-all overflow-hidden group">
									<a
										className="relative z-10"
										href="https://github.com/pathwaycom/pathway"
										target="_blank"
										rel="noreferrer noopener"
									>
										Pathway
									</a>
								</li>
								<li className="relative px-12 py-3 rounded-xl font-bold text-base text-white cursor-pointer bg-white/10 border border-white/30 hover:scale-105 hover:border-white/60 transition-all overflow-hidden group">
									<a
										className="relative z-10"
										href="https://github.com/pathwaycom/llm-app"
										target="_blank"
										rel="noreferrer noopener"
									>
										LLM App
									</a>
								</li>
							</ul>
						</div>
					</div>
				</Fade>
				<Star />
				<Fade left>
					<div className="border-2 border-white/5 border-t-[5px] border-t-[#1c1cf0] rounded-2xl bg-[#151515] max-w-[900px] w-[90%] md:w-4/5 p-6 mb-[300px] mt-[100px] md:mt-[150px] relative z-20 mx-auto">
						{registrationMode && (
							<button
								className="absolute top-4 left-4 z-10 bg-white/10 border border-white/30 rounded-full w-10 h-10 flex items-center justify-center text-white text-xl font-semibold cursor-pointer hover:bg-white/20 hover:border-white/50 transition-all hover:-translate-x-px active:-translate-x-1"
								type="button"
								onClick={handleBackToSelection}
								aria-label="Back to selection"
							>
								←
							</button>
						)}
						{checkingTeam ? (
							<div className="p-10 text-center">
								<h2 className="text-2xl text-white">Checking team status...</h2>
							</div>
						) : !registrationMode ? (
							hasTeam ? (
								<div className="text-center p-10 py-10">
									<h2 className="mb-5 text-white text-2xl font-bold">You are already part of a team!</h2>
									<p className="mb-8 text-gray-300">
										Visit the Manage Team dashboard to view your team details or make changes.
									</p>
									<button
										className="bg-transparent border-none flex justify-center items-center w-full max-w-[300px] mx-auto group cursor-pointer"
										type="button"
										onClick={() => history.push("/manage-team")}
									>
										<p className="text-center bg-gradient-to-r from-[#1c1cf0] via-[#3572c3] to-[#1c1cf0] bg-[length:300%_100%] w-full text-white p-3 rounded-full transition-all duration-300 group-hover:bg-[position:100%_0] group-hover:scale-105 m-0 font-semibold">Manage Team</p>
									</button>
									<div className="mt-6 text-sm text-gray-300 bg-white/5 p-4 rounded-lg border border-white/10">
										<strong className="text-white">Important:</strong> After all Members have joined, Team Leader must finalize the team on the&nbsp;
										<span className="text-[#1c1cf0] cursor-pointer hover:underline font-semibold" onClick={() => history.push("/manage-team")}>
											Manage Team
										</span>{" "}
										page. Your team will only appear on Unstop after finalization.
									</div>
								</div>

							) : (
								<div>
									<h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 drop-shadow-[0_0_10px_#1c1cf0]">
										Registrations have moved to unstop.
									</h1>
									<div className="flex gap-5 items-center justify-center flex-wrap">
										<a
											className="bg-transparent border-none flex justify-center items-center w-full max-w-[300px] group cursor-pointer no-underline"
											type="button"
											href="https://unstop.com/hackathons/kharagpur-data-science-hackathon-2026-iit-kharagpur-1614844"
											target="_blank"
											rel="noopener noreferrer"
										>
											<p className="text-center bg-gradient-to-r from-[#1c1cf0] via-[#3572c3] to-[#1c1cf0] bg-[length:300%_100%] w-full text-white p-3 rounded-full transition-all duration-300 group-hover:bg-[position:100%_0] group-hover:scale-105 m-0 font-semibold">Register on unstop</p>
										</a>
									</div>
								</div>
							)
						) : registrationMode === "leader" ? (
							<form onSubmit={handleTeamLeaderRegister}>
								<div className="flex flex-col justify-center items-center">
									<h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 drop-shadow-[0_0_10px_#1c1cf0]">
										Register as Team Leader
									</h1>
									{teamCodeDisplay ? (
										<div className="bg-[#00ff111a] border-2 border-[#00ff11] rounded-xl p-5 mb-8 text-center w-full">
											<h2 className="text-[#00ff11] mb-2 font-bold text-xl">
												Team Created Successfully!
											</h2>
											<p className="text-white mb-4">
												Your Team Code:
											</p>
											<div className="flex flex-col items-center justify-center mb-4">
												<div className="text-[32px] font-bold text-[#00ff11] tracking-[5px] mb-4 mt-2 font-mono">
													{teamCodeDisplay}
												</div>
												<button
													type="button"
													onClick={copyTeamCodeToClipboard}
													className="bg-[#00ff1133] border border-[#00ff11] rounded-lg px-4 py-2 cursor-pointer flex items-center gap-2 text-[#00ff11] text-sm font-semibold transition-all hover:bg-[#00ff114d]"
												>
													{copiedTeamCode ? (
														<>
															<Check size={16} />
															<span>Copied</span>
														</>
													) : (
														<>
															<Copy size={16} />
															<span>Copy</span>
														</>
													)}
												</button>
											</div>
											<p className="text-white text-sm mb-4">
												Share this code with your teammates so they can join your team.
											</p>
											<p className="text-white text-base mb-4">
												Join the WhatsApp Group and Discord Channel for regular updates!
											</p>
											<div className="flex justify-center gap-5 mt-4">
												<a
													href="https://chat.whatsapp.com/LguOtn8Dwyh19sajyCKNoQ"
													target="_blank"
													rel="noreferrer noopener"
													className="transition-transform hover:scale-110"
												>
													<img src={whatsapp} alt="whatsapp" className="h-[50px] cursor-pointer" />
												</a>
												<a
													href="https://discord.gg/fBfvXCTQF"
													target="_blank"
													rel="noreferrer noopener"
													className="transition-transform hover:scale-110"
												>
													<img src={discord} alt="discord" className="h-[50px] cursor-pointer" />
												</a>
											</div>
											<div className="mt-5 text-sm text-gray-300 bg-black/20 p-4 rounded-lg border border-white/10 text-left">
												<strong className="text-white">Important Next Step:</strong> After all Members have joined your team, you MUST finalize your team on the{" "}
												<span className="text-[#1c1cf0] cursor-pointer hover:underline font-semibold" onClick={() => history.push("/manage-team")}>
													Manage Team
												</span>{" "}
												to complete your registration. Your team will only appear on Unstop after finalization.
											</div>
										</div>
									) : (
										<div className="w-full">
											<div className="flex items-center text-white font-semibold relative mb-8 text-lg pl-0 md:pl-[90px]">
												<div className="hidden md:block w-32">Team Name</div>
												<div className="w-[10px] hidden md:block"></div>
												<input
													className="bg-transparent border-b border-white/20 text-white p-2 focus:outline-none focus:border-[#1c1cf0] transition-colors w-full max-w-[300px]"
													type="text"
													name="name"
													placeholder="Team Name"
													required
													onChange={handleTeamName}
													value={team}
												/>
											</div>

											<div className="text-white font-semibold relative mb-2 text-lg pl-0 md:pl-[90px]">
												Team Leader Details
											</div>
											<RegisterFormCard
												firstname={firstname1}
												setFirstname={setFirstname1}
												lastname={lastname1}
												setLastname={setLastname1}
												gender={gender1}
												setGender={setGender1}
												mail={mail1}
												setMail={setMail1}
												mobile={mobile1}
												setMobile={setMobile1}
												college={college1}
												setCollege={setCollege1}
												degree={degree1}
												setDegree={setDegree1}
												YOS={YOS1}
												setYOS={setYOS1}
												GitHubID={GitHubID1}
												setGitHubID={setGitHubID1}
												disabled={true}
											/>
											<div className="w-full flex justify-center mt-6">
												<button className="bg-transparent border-none flex justify-center items-center w-full max-w-[300px] group cursor-pointer" type="submit" disabled={isSubmitting}>
													<p className="text-center bg-gradient-to-r from-[#1c1cf0] via-[#3572c3] to-[#1c1cf0] bg-[length:300%_100%] w-full text-white p-3 rounded-full transition-all duration-300 group-hover:bg-[position:100%_0] group-hover:scale-105 m-0 font-semibold">{isSubmitting ? "Creating..." : "Create Team"}</p>
												</button>
											</div>
										</div>
									)}
								</div>
							</form>
						) : (
							<form onSubmit={handleJoinTeam}>
								<div className="flex flex-col items-center">
									<h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 drop-shadow-[0_0_10px_#1c1cf0]">
										Join a Team
									</h1>
									<div className="flex items-center text-white font-semibold relative mb-8 text-lg pl-0 md:pl-[90px] w-full">
										<div className="hidden md:block w-32">Team Code</div>
										<div className="w-[10px] hidden md:block"></div>
										<input
											className="bg-transparent border-b border-white/20 text-white p-2 focus:outline-none focus:border-[#1c1cf0] transition-colors uppercase tracking-[2px] font-mono w-full max-w-[300px]"
											type="text"
											name="teamCode"
											placeholder="Enter Team Code"
											required
											onChange={handleTeamCodeChange}
											value={teamCode}
											maxLength={8}
										/>
									</div>

									<div className="text-white font-semibold relative mb-2 text-lg pl-0 md:pl-[90px] w-full">
										Your Details
									</div>
									<RegisterFormCard
										firstname={firstname1}
										setFirstname={setFirstname1}
										lastname={lastname1}
										setLastname={setLastname1}
										gender={gender1}
										setGender={setGender1}
										mail={mail1}
										setMail={setMail1}
										mobile={mobile1}
										setMobile={setMobile1}
										college={college1}
										setCollege={setCollege1}
										degree={degree1}
										setDegree={setDegree1}
										YOS={YOS1}
										setYOS={setYOS1}
										GitHubID={GitHubID1}
										setGitHubID={setGitHubID1}
										disabled={true}
									/>
									<div className="w-full flex justify-center mt-6">
										<button className="bg-transparent border-none flex justify-center items-center w-full max-w-[300px] group cursor-pointer" type="submit" disabled={isSubmitting}>
											<p className="text-center bg-gradient-to-r from-[#1c1cf0] via-[#3572c3] to-[#1c1cf0] bg-[length:300%_100%] w-full text-white p-3 rounded-full transition-all duration-300 group-hover:bg-[position:100%_0] group-hover:scale-105 m-0 font-semibold">{isSubmitting ? "Joining..." : "Join Team"}</p>
										</button>
								</div>
								</div>
							</form>
						)}
					</div>
				</Fade>
			</div>
			{particless}
			<LoginPrompt
				open={showLoginPrompt}
				onClose={() => setShowLoginPrompt(false)}
				message="Login to our website to register"
			/>
		</>
	);
};

export default RegisterPage;
