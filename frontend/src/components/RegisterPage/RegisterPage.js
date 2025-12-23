import React, { useEffect, useState } from "react";
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

const RegisterPage = () => {
	const particless = React.useMemo(() => <Particless />, []);
	const [successPage, setSuccessPage] = useState(false);
	const history = useHistory();
	const [showHowTo, setShowHowTo] = useState(true);

	const handleShowHowTo = () => {
		setShowHowTo(!showHowTo);
	};

	useEffect(() => {
		if (successPage) {
			history.push("/register-success");
		}
	}, [successPage, history]);

	const handleRegister = (e) => {
		e.preventDefault();

		const checkData = [
			{
				firstname: firstname1,
				mobile: mobile1,
				college: college1,
				YOS: YOS1,
				GitHubID: GitHubID1,
			},
			{
				firstname: firstname2,
				mobile: mobile2,
				college: college2,
				YOS: YOS2,
				GitHubID: GitHubID2,
			},
			{
				firstname: firstname3,
				mobile: mobile3,
				college: college3,
				YOS: YOS3,
				GitHubID: GitHubID3,
			},
			{
				firstname: firstname4,
				mobile: mobile4,
				college: college4,
				YOS: YOS4,
				GitHubID: GitHubID4,
			},
			// ,
			// {
			// 	firstname: firstname5,
			// 	mobile: mobile5,
			// 	college: college5,
			// 	YOS: YOS5,
			// 	GitHubID: GitHubID5,
			// },
		];

		const allSubmitSuccessful = checkData
			.slice(0, numMembers)
			.every((data) =>
				handleSubmit(
					data.firstname,
					data.mobile,
					data.college,
					data.YOS,
					data.GitHubID
				)
			);

		if (allSubmitSuccessful) {
			const formData = [
				{
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
					numMembers: Number(numMembers),
				},
				{
					isTeamLeader: false,
					firstname: firstname2,
					lastname: lastname2,
					gender: gender2,
					mail: mail2,
					mobile: mobile2,
					college: college2,
					degree: degree2,
					YOS: Number(YOS2),
					GitHubID: GitHubID2,
					teamName: team,
					numMembers: Number(numMembers),
				},
				{
					isTeamLeader: false,
					firstname: firstname3,
					lastname: lastname3,
					gender: gender3,
					mail: mail3,
					mobile: mobile3,
					college: college3,
					degree: degree3,
					YOS: Number(YOS3),
					GitHubID: GitHubID3,
					teamName: team,
					numMembers: Number(numMembers),
				},
				{
					isTeamLeader: false,
					firstname: firstname4,
					lastname: lastname4,
					gender: gender4,
					mail: mail4,
					mobile: mobile4,
					college: college4,
					degree: degree4,
					YOS: Number(YOS4),
					GitHubID: GitHubID4,
					teamName: team,
					numMembers: Number(numMembers),
				},
				// ,
				// {
				// 	isTeamLeader: false,
				// 	firstname: firstname5,
				// 	lastname: lastname5,
				// 	gender: gender5,
				// 	mail: mail5,
				// 	mobile: mobile5,
				// 	college: college5,
				// 	degree: degree5,
				// 	YOS: Number(YOS5),
				// 	GitHubID: GitHubID5,
				// 	teamName: team,
				// 	numMembers: Number(numMembers),
				// },
			];
			const finalData = formData.slice(0, numMembers);

			if (numMembers > 4 || numMembers < 1) {
				toast.error(
					"Please note a minimum of 2 and a maximum of 5 members are allowed per team."
				);
				console.log(numMembers);
				return false;
			}

			const registerPromise = fetch(
				`${process.env.REACT_APP_FETCH_URL}/kdsh/check_register`,
				// "http://localhost:5000/kdsh/check_register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(finalData),
				}
			)
				.then((response) => response.json())
				.then((data) => {
					if (
						data.message &&
						data.registration &&
						data.registration === "success"
					) {
						setSuccessPage(true);
						toast.success(data.message, {
							theme: "dark",
						});
					} else if (data.error) {
						toast.error(data.error, {
							position: "top-center",
							draggable: true,
							autoClose: 15000,
						});
					}
				})
				.catch((error) => {
					console.error("Error during registration:", error);
					toast.error("😔 Registration failed, please try again later.", {
						position: "top-center",
						draggable: true,
					});
				});
			toast.promise(
				registerPromise,
				{
					pending:
						"⏳ Registering your team...This may take several minutes, Please stay with us!!!",
					error: "😔 Registration failed. Please try again LATER!!",
				},
				{
					position: "top-center",
					autoClose: 8000,
				}
			);
		} else {
			return false;
		}
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

	const [numMembers, setNumMembers] = useState(1);
	const [team, setTeam] = useState("");

	const handleNumMembers = (e) => {
		const value = e.target.value;
		if (value !== "") {
			if (value > 4) {
				toast.error("There can be a maximum of 4 participants in a team!", {
					position: "top-center",
					draggable: true,
					theme: "dark",
				});
			} else if (value < 2) {
				toast.error("There have to be a minimum of 2 members in a team!", {
					position: "top-center",
					draggable: true,
					theme: "dark",
				});
			} else if (value <= 4) {
				setNumMembers(Number(value));
			}
		}
	};

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
										👉 Pathway
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
										👉 LLM App
									</a>
								</li>
							</ul>
						</div>
					</div>
				</Fade>
				<Star/>
				<Fade left>
					<div className="register-form">
						<form onSubmit={handleRegister}>
							<div>
								<h1
									style={{
										// fontStyle: "italic",
										textShadow: "0 0 5px #1c1cf0, 0 0 10px #1c1cf0",
										marginBottom: "25px",
									}}
								>
									Register
								</h1>
								<br />
								<div className="register-form-details-special">
									<div id="header">Team Name</div>
									<div style={{ width: "10px" }}></div>
									<input
										type="text"
										name="name"
										placeholder="Team Name"
										required
										onChange={handleTeamName}
									/>
								</div>
								
								
								<div className="register-form-details">
									 Member 1 : Team Leader
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
								<div className="register-form-details-special">
									<div id="header">Team Size</div>
									<div style={{ width: "10px" }}></div>
									<input
										type="number"
										name="numMembers"
										placeholder="Number of members"
										onChange={handleNumMembers}
										required
									/>
								</div>
								
								{numMembers >= 2 && (
									<>
										<div className="register-form-details">
											 Member 2
										</div>

										<RegisterFormCard 
											firstname={firstname2}
											setFirstname={setFirstname2}
											lastname={lastname2}
											setLastname={setLastname2}
											gender={gender2}
											setGender={setGender2}
											mail={mail2}
											setMail={setMail2}
											mobile={mobile2}
											setMobile={setMobile2}
											college={college2}
											setCollege={setCollege2}
											degree={degree2}
											setDegree={setDegree2}
											YOS={YOS2}
											setYOS={setYOS2}
											GitHubID={GitHubID2}
											setGitHubID={setGitHubID2}
										/>
									</>
								)}
								
								{numMembers >= 3 && (
									<>
										<div className="register-form-details">
											 Member 3
										</div>

										<RegisterFormCard 
											firstname={firstname3}
											setFirstname={setFirstname3}
											lastname={lastname3}
											setLastname={setLastname3}
											gender={gender3}
											setGender={setGender3}
											mail={mail3}
											setMail={setMail3}
											mobile={mobile3}
											setMobile={setMobile3}
											college={college3}
											setCollege={setCollege3}
											degree={degree3}
											setDegree={setDegree3}
											YOS={YOS3}
											setYOS={setYOS3}
											GitHubID={GitHubID3}
											setGitHubID={setGitHubID3}
										/>
									</>
								)}
								
								{numMembers === 4 && (
									<>
										<div className="register-form-details">
											 Member 4
										</div>

										<RegisterFormCard 
											firstname={firstname4}
											setFirstname={setFirstname4}
											lastname={lastname4}
											setLastname={setLastname4}
											gender={gender4}
											setGender={setGender4}
											mail={mail4}
											setMail={setMail4}
											mobile={mobile4}
											setMobile={setMobile4}
											college={college4}
											setCollege={setCollege4}
											degree={degree4}
											setDegree={setDegree4}
											YOS={YOS4}
											setYOS={setYOS4}
											GitHubID={GitHubID4}
											setGitHubID={setGitHubID4}
										/>
									</>
								)} 
								{numMembers !== 1 && (
									<button className="register-form-submit" type="submit">
										<p>Register</p>
									</button>
								)}
							</div>
						</form>
					</div>
				</Fade>
			</div>
			{particless}
		</>
	);
};

export default RegisterPage;
