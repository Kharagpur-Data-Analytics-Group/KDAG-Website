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

const RegisterPage = () => {
	const particless = React.useMemo(() => <Particless />, []);
	const { isLoggedIn } = useContext(AuthContext);
	const [successPage, setSuccessPage] = useState(false);
	const history = useHistory();
	const [showHowTo, setShowHowTo] = useState(true);
	const [registrationMode, setRegistrationMode] = useState(null); 
	const [teamCode, setTeamCode] = useState("");
	const [teamCodeDisplay, setTeamCodeDisplay] = useState(""); 
	const [showLoginPrompt, setShowLoginPrompt] = useState(false);
	const [hasTeam, setHasTeam] = useState(false);
	const [checkingTeam, setCheckingTeam] = useState(false);

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
			// `${process.env.REACT_APP_FETCH_URL}/kdsh/check_register`,
			'http://localhost:5001/kdsh/check_register',
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
			})
			.catch((error) => {
				console.error("Error during registration:", error);
				const errorMessage = error.message || "😔 Registration failed, please try again later.";
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
					"⏳ Creating your team...This may take several minutes, Please stay with us!!!",
				error: "😔 Registration failed. Please try again LATER!!",
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
			// `${process.env.REACT_APP_FETCH_URL}/kdsh/join_team`,
			'http://localhost:5001/kdsh/join_team',
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
				const errorMessage = error.message || "😔 Failed to join team, please try again later.";
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
		firstname2,
		setFirstname2,
		firstname3,
		setFirstname3,
		firstname4,
		setFirstname4,
		firstname5,
		setFirstname5,

		lastname1,
		setLastname1,
		lastname2,
		setLastname2,
		lastname3,
		setLastname3,
		lastname4,
		setLastname4,
		lastname5,
		setLastname5,

		gender1,
		setGender1,
		gender2,
		setGender2,
		gender3,
		setGender3,
		gender4,
		setGender4,
		gender5,
		setGender5,

		mail1,
		setMail1,
		mail2,
		setMail2,
		mail3,
		setMail3,
		mail4,
		setMail4,
		mail5,
		setMail5,

		mobile1,
		setMobile1,
		mobile2,
		setMobile2,
		mobile3,
		setMobile3,
		mobile4,
		setMobile4,
		mobile5,
		setMobile5,

		college1,
		setCollege1,
		college2,
		setCollege2,
		college3,
		setCollege3,
		college4,
		setCollege4,
		college5,
		setCollege5,

		degree1,
		setDegree1,
		degree2,
		setDegree2,
		degree3,
		setDegree3,
		degree4,
		setDegree4,
		degree5,
		setDegree5,

		YOS1,
		setYOS1,
		YOS2,
		setYOS2,
		YOS3,
		setYOS3,
		YOS4,
		setYOS4,
		YOS5,
		setYOS5,

		GitHubID1,
		setGitHubID1,
		GitHubID2,
		setGitHubID2,
		GitHubID3,
		setGitHubID3,
		GitHubID4,
		setGitHubID4,
		GitHubID5,
		setGitHubID5,
	} = useFormStates();

	const [team, setTeam] = useState("");

	const handleTeamName = (e) => {
		const value = e.target.value;
		const trimmed = value.trim();
		if (trimmed === "") {
			toast.error("Please enter a valid name", {
				position: "top-center",
				draggable: true,
				theme: "dark",
			});
			return;
		}
		if (value.length > 35) {
			toast.error("Please Choose a name not more than 35 characters", {
				position: "top-center",
				draggable: true,
				theme: "dark",
			});
			return;
		}
		const validNameRegex = /^[a-zA-Z\s]*$/;
		if (!validNameRegex.test(trimmed)) {
			toast.error("Team name can only contain letters and spaces", {
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

	return (
		<>
			<div className="register-container">
				<Fade top>
					<div className="register-header">
						<div className="spacer layer1"></div>
						<div className="register-kdsh">KDSH 2026</div>
						<div className="register-kdsh-desc">
							<p>
								The 6th Edition of the{" "}
								<strong>Kharagpur Data Science Hackathon</strong> (KDSH) is here
								to redefine excellence in data science. Dive into machine
								learning, solve real-world challenges, and showcase your
								innovative solutions. Connect with industry leaders, sharpen
								your skills, and become a trailblazer in the field.
							</p>

							<p>
								To participate, please fill in your details in the form provided
								below.
							</p>

							<p
								style={{
									color: "#00ff11",
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
										style={{ minWidth: "300px", margin: "0 auto" }}
									>
										<p>Manage Team</p>
									</button>
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
											onClick={() => setRegistrationMode("member")}
											style={{ minWidth: "300px" }}
										>
											<p>Join a Team with Team Code</p>
										</button>
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
											<p style={{ color: "white", fontSize: "14px" }}>
												Share this code with your teammates so they can join your team.
											</p>
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
											/>
											<div style={{width: "100%", display: 'flex', justifyContent: 'center'}}>
												<button className="register-form-submit" type="submit">
													<p>Create Team</p>
												</button>
											</div>
										</div>
									)}
									<button
										className="register-form-submit"
										type="button"
										onClick={() => {
											setRegistrationMode(null);
											setTeamCodeDisplay("");
											setTeam("");
										}}
										style={{ minWidth: "300px", maxWidth: "400px" }}
									>
										<p>Back to Selection</p>
									</button>
								</div>
							</form>
						) : (
							<form onSubmit={handleJoinTeam}>
								<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
									/>
									<div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
										<button className="register-form-submit" type="submit">
										<p>Join Team</p>
									</button>
									</div>
									<button
										className="register-form-submit"
										type="button"
										onClick={() => {
											setRegistrationMode(null);
											setTeamCode("");
										}}
										style={{minWidth: "300px", maxWidth: '400px' }}
									>
										<p>Back to Selection</p>
									</button>
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
				message="Login to our website to register as a team leader"
			/>
		</>
	);
};

export default RegisterPage;
