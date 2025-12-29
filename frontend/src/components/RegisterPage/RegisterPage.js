import React, { useEffect, useState, useContext } from "react";
import Fade from "../Common/Motion/Fade.js"
import Particless from "../Common/Particles/Particless";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleSubmit } from "./useFormStates";
import useFormStates from "./useFormStates";
import "./RegisterPage.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import RegisterFormCard from "./RegisterFormCard.js";
import kdsh_2025 from "./../../assets/kdsh2025_logo.png";
import show_icon from "./../../assets/show_icon.png";
import repo1 from "./../../assets/llm_repo.png";
import repo2 from "./../../assets/pathway_repo.png";
import starred from "./../../assets/starred_repo.png";
import profile_icon from "./../../assets/profile_icon.png";
import profile_menu from "./../../assets/profile_menu.png";
import Star from "./Star.js";
import { AuthContext } from "../../context/AuthContext";
import LoginPrompt from "../Resources_New/LoginPrompt";
import "../Resources_New/LoginPrompt.css";
import { Copy, Check } from "lucide-react";
import whatsapp from "./../../assets/kdsh2025_whatsapp.png";
import discord from "./../../assets/kdsh2025_discord.png";
import banner from "./../../assets/banner.png";

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
			})
			.catch((error) => {
				console.error("Error during registration:", error);
				const errorMessage = error.message || "Registration failed, please try again later.";
				toast.error(errorMessage, {
					position: "top-center",
					draggable: true,
					autoClose: 15000,
				});
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

	const handleJoinTeam = (e) => {
		e.preventDefault();

		if (!teamCode || teamCode.trim() === "") {
			toast.error("Please enter a team code", {
				position: "top-center",
				draggable: true,
				theme: "dark",
			});
			return false;
		}

		if (!handleSubmit(firstname1, mobile1, college1, YOS1, GitHubID1)) {
			return false;
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

		const joinPromise = fetch(
			`${process.env.REACT_APP_FETCH_URL}/kdsh/join_team`,
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
					throw new Error(data.error || `Server error: ${response.status}`);
				}
				return data;
			})
			.then((data) => {
				if (data.message) {
					setSuccessPage(true);
					toast.success(data.message, {
						theme: "dark",
					});
				}
			})
			.catch((error) => {
				console.error("Error during joining team:", error);
				const errorMessage = error.message || "Failed to join team, please try again later.";
				toast.error(errorMessage, {
					position: "top-center",
					draggable: true,
					autoClose: 15000,
				});
			});

		toast.promise(
			joinPromise,
			{
				pending:
					"Joining team...This may take several minutes, Please stay with us!!!",
				error: "Failed to join team. Please try again LATER!!",
			},
			{
				position: "top-center",
				autoClose: 8000,
			}
		);
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

		// Always allow typing / deleting
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
			<div className="register-container">
				<Fade top>
					<div className="register-header">
						<div className="spacer layer1"></div>
						<div className="register-kdsh">KDSH 2026</div>
						<div className="kdsh_banner">
							<img src={banner} alt="KDSH Banner" />
						</div>
						<div className="register-kdsh-desc">
							<p>
								The 6th Edition of the{" "}
								<strong>Kharagpur Data Science Hackathon</strong> (KDSH) is here
								to redefine excellence in data science. Dive into machine
								learning, solve real-world challenges, and showcase your
								innovative solutions. Connect with industry leaders, sharpen
								your skills, and become a trailblazer in the field.
							</p>

							{/* <p>
								Why participate? <br/>
								<strong>Prizes Worth ₹4,00,000. </strong><br/>
								<ul>
									<li><strong>Winner:</strong> ₹2,00,000</li>
									<li><strong>Runner-up:</strong> ₹1,25,000</li>
									<li><strong>Second Runner-up:</strong> ₹75,000</li>
								</ul>
								Backed by industry leaders including Pathway (Title Sponser) and TrueFoundry (Tech Platform Sponser) <br/>
								Exposure through national media partners and India's largest techno-management fest.
							</p> */}

							{/* <p>
								<strong>Registration deadline: 2nd January 2026 11:59 PM</strong> <br/>
							</p> */}

							<p>
								For more details about KDSH 2026, visit our {" "}
								<a
									className="kdsh-unstop-link"
									href="https://unstop.com/p/kharagpur-data-science-hackathon-2026-iit-kharagpur-1614844"
									target="_blank"
									rel="noreferrer noopener"
								>
									Unstop Page
								</a>.
							</p> 

							<p>
								To participate, please fill in your details in the form provided
								below.
							</p>

							<p
								style={{
									color: "#FFD700",
									borderTop: "solid 2px white",
									paddingTop: "45px",
								}}
							>
								<strong>
									Before registering, kindly ensure all your team members have
									starred the following GitHub repositories:
								</strong>
							</p>

							<ul>
								<li>
									<a
										className="kdsh-link"
										href="https://github.com/pathwaycom/pathway"
										target="_blank"
										rel="noreferrer noopener"
										style={{ cursor: "pointer" }}
									>
										Pathway
									</a>
								</li>
								<li>
									<a
										className="kdsh-link"
										href="https://github.com/pathwaycom/llm-app"
										target="_blank"
										rel="noreferrer noopener"
										style={{ cursor: "pointer" }}
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
					<div className="register-form">
						{registrationMode && (
							<button
								className="register-back-button"
								type="button"
								onClick={handleBackToSelection}
								aria-label="Back to selection"
							>
								←
							</button>
						)}
						{checkingTeam ? (
							<div style={{ padding: "40px", textAlign: "center" }}>
								<h2>Checking team status...</h2>
							</div>
						) : !registrationMode ? (
							hasTeam ? (
								<div style={{ textAlign: "center", padding: "40px 20px" }}>
									<h2 style={{ marginBottom: "20px", color: "#fff" }}>You are already part of a team!</h2>
									<p style={{ marginBottom: "30px", color: "#ccc" }}>
										Visit the Manage Team dashboard to view your team details or make changes.
									</p>
									<button
										className="register-form-submit"
										type="button"
										onClick={() => history.push("/manage-team")}
										style={{ minWidth: "", margin: "0 auto" }}
									>
										<p>Manage Team</p>
									</button>
									<div className="important-note2">
										<strong>Important:</strong> After all Members have joined, Team Leader must finalize the team on the&nbsp;
										<span className="important-note2-link" onClick={() => history.push("/manage-team")}>
											Manage Team
										</span>{" "}
										page. Your team will only appear on Unstop after finalization.
									</div>
								</div>

							) : (
								<div>
									<h1
										style={{
											textShadow: "0 0 5px #1c1cf0, 0 0 10px #1c1cf0",
											marginBottom: "25px",
											textAlign: "center",
										}}
									>
										Choose Registration Type
									</h1>
									<div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
										<button
											className="register-form-submit"
											type="button"
											onClick={() => {
												if (!isLoggedIn) {
													setShowLoginPrompt(true);
													return;
												}
												setRegistrationMode("leader");
											}}
											style={{ minWidth: "300px" }}
										>
											<p>Register as Team Leader</p>
										</button>
										<button
											className="register-form-submit"
											type="button"
											onClick={() => {
												if (!isLoggedIn) {
													setShowLoginPrompt(true);
													return;
												}
												setRegistrationMode("member");
											}}
											style={{ minWidth: "300px" }}
										>
											<p>Join a Team with Team Code</p>
										</button>
									</div>
									<div className="important-note2">
										<strong>Important:</strong> After all Team Members have joined, Team Leader must review and confirm your team details on the&nbsp;
										<span className="important-note2-link" onClick={() => history.push("/manage-team")}>
											Manage Team
										</span>{" "}
										page to complete your registration. Your team will only appear on Unstop after finalization.
									</div>
								</div>
							)
						) : registrationMode === "leader" ? (
							<form onSubmit={handleTeamLeaderRegister}>
								<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
									<h1
										style={{
											textShadow: "0 0 5px #1c1cf0, 0 0 10px #1c1cf0",
											marginBottom: "25px",
										}}
									>
										Register as Team Leader
									</h1>
									<br />
									{teamCodeDisplay ? (
										<div style={{
											background: "rgba(0, 255, 17, 0.1)",
											border: "2px solid #00ff11",
											borderRadius: "10px",
											padding: "20px",
											marginBottom: "30px",
											textAlign: "center",
											width: "100%",
										}}>
											<h2 style={{ color: "#00ff11", marginBottom: "10px" }}>
												Team Created Successfully!
											</h2>
											<p style={{ color: "white", marginBottom: "15px" }}>
												Your Team Code:
											</p>
											<div className="team-code-display">
												<div style={{
													fontSize: "32px",
													fontWeight: "bold",
													color: "#00ff11",
													letterSpacing: "5px",
													marginBottom: "15px",
													fontFamily: "monospace",
												}}>
													{teamCodeDisplay}
												</div>
												<button
													type="button"
													onClick={copyTeamCodeToClipboard}
													style={{
														background: "rgba(0, 255, 17, 0.2)",
														border: "1px solid #00ff11",
														borderRadius: "8px",
														padding: "8px 16px",
														cursor: "pointer",
														display: "flex",
														alignItems: "center",
														gap: "8px",
														color: "#00ff11",
														fontSize: "14px",
														fontWeight: "600",
														transition: "all 0.3s ease",
													}}
													onMouseEnter={(e) => {
														e.target.style.background = "rgba(0, 255, 17, 0.3)";
													}}
													onMouseLeave={(e) => {
														e.target.style.background = "rgba(0, 255, 17, 0.2)";
													}}
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
											<p style={{ color: "white", fontSize: "14px" }}>

												Share this code with your teammates so they can join your team.
											</p>
											<p style={{ color: "white", fontSize: "16px", marginBottom: "15px" }}>
												Join the WhatsApp Group and Discord Channel for regular updates!
											</p>
											<div style={{
												display: "flex",
												justifyContent: "center",
												gap: "20px",
												marginTop: "15px",
											}}>
												<a
													href="https://chat.whatsapp.com/BXA1gpP1GVm5vazs0WBHFA"
													target="_blank"
													rel="noreferrer noopener"
													style={{
														transition: "transform 0.3s ease",
													}}
													onMouseEnter={(e) => {
														e.target.style.transform = "scale(1.1)";
													}}
													onMouseLeave={(e) => {
														e.target.style.transform = "scale(1)";
													}}
												>
													<img src={whatsapp} alt="whatsapp" style={{ height: "50px", cursor: "pointer" }} />
												</a>
												<a
													href="https://discord.gg/fBfvXCTQF"
													target="_blank"
													rel="noreferrer noopener"
													style={{
														transition: "transform 0.3s ease",
													}}
													onMouseEnter={(e) => {
														e.target.style.transform = "scale(1.1)";
													}}
													onMouseLeave={(e) => {
														e.target.style.transform = "scale(1)";
													}}
												>
													<img src={discord} alt="discord" style={{ height: "50px", cursor: "pointer" }} />
												</a>
											</div>
											<div className="important-note2" style={{ marginTop: "20px" }}>
												<strong>Important Next Step:</strong> After all Members have joined your team, you MUST finalize your team on the{" "}
												<span className="important-note2-link" onClick={() => history.push("/manage-team")}>
													Manage Team
												</span>{" "}
												to complete your registration. Your team will only appear on Unstop after finalization.
											</div>
										</div>
									) : (
										<div>
											<div className="register-form-details-special">
												<div id="header">Team Name</div>
												<div style={{ width: "10px" }}></div>
												<input
													type="text"
													name="name"
													placeholder="Team Name"
													required
													onChange={handleTeamName}
													value={team}
												/>
											</div>

											<div className="register-form-details">
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
											<div style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
												<button className="register-form-submit" type="submit">
													<p>Create Team</p>
												</button>
											</div>
										</div>
									)}
								</div>
							</form>
						) : (
							<form onSubmit={handleJoinTeam}>
								<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
									<h1
										style={{
											textShadow: "0 0 5px #1c1cf0, 0 0 10px #1c1cf0",
											marginBottom: "25px",
										}}
									>
										Join a Team
									</h1>
									<br />
									<div className="register-form-details-special">
										<div id="header">Team Code</div>
										<div style={{ width: "10px" }}></div>
										<input
											type="text"
											name="teamCode"
											placeholder="Enter Team Code"
											required
											onChange={handleTeamCodeChange}
											value={teamCode}
											maxLength={8}
											style={{ textTransform: "uppercase", letterSpacing: "2px", fontFamily: "monospace" }}
										/>
									</div>

									<div className="register-form-details">
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
									<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
										<button className="register-form-submit" type="submit">
											<p>Join Team</p>
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