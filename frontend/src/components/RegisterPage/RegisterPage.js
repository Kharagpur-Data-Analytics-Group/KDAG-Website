import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import Particless from "../Common/Particles/Particless";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleSubmit } from "./useFormStates";
import useFormStates from "./useFormStates";
import "./RegisterPage.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import user_icon from "./../../assets/kdsh2025_user.png";
import mail_icon from "./../../assets/kdsh2025_mail.png";
import contact_icon from "./../../assets/kdsh2025_contact.png";
import college_icon from "./../../assets/kdsh2025_college.png";
import degree_icon from "./../../assets/kdsh2025_degree.png";
import YOS_icon from "./../../assets/kdsh2025_YOS.png";
import github_icon from "./../../assets/kdsh2025_github.png";
import gender_icon from "./../../assets/kdsh2025_gender.png";

const RegisterPage = () => {
	const particless = React.useMemo(() => <Particless />, []);
	const [successPage, setSuccessPage] = useState(false);
	const history = useHistory();

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
			{
				firstname: firstname5,
				mobile: mobile5,
				college: college5,
				YOS: YOS5,
				GitHubID: GitHubID5,
			},
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
				{
					isTeamLeader: false,
					firstname: firstname5,
					lastname: lastname5,
					gender: gender5,
					mail: mail5,
					mobile: mobile5,
					college: college5,
					degree: degree5,
					YOS: Number(YOS5),
					GitHubID: GitHubID5,
					teamName: team,
					numMembers: Number(numMembers),
				},
			];
			const finalData = formData.slice(0, numMembers);

			if (numMembers > 4 || numMembers < 1) {
				toast.error(
					"Please note a minimum of 1 and a maximum of 4 members are allowed per team."
				);
				return false;
			}

			const registerPromise = fetch(
				`${process.env.REACT_APP_FETCH_URL}/kdsh2025/check_register`,
				// `http://localhost:5000/kdsh2025/check_register`,
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
							theme: "dark",
							autoClose: 10000,
						});
					}
				})
				.catch((error) => {
					console.error("Error during registration:", error);
					toast.error("Registration failed, please try again later.");
				});
			toast.promise(
				registerPromise,
				{
					pending:
						"Registering your team...This may take a few minutes, Please stay with us!!!",
					error: "Registration failed. Please try again.",
				},
				{
					position: "top-center",
					autoClose: 6000,
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

	const [numMembers, setNumMembers] = useState(2);
	const [team, setTeam] = useState("");

	const handleNumMembers = (e) => {
		const value = e.target.value;
		if (value > 4) {
			toast.error("There can be a maximum of 4 participants in a team!", {
				position: "top-center",
				draggable: true,
				theme: "dark",
			});
		} else if (value < 1) {
			toast.error("There have to be a minimum of 1 member in a team!", {
				position: "top-center",
				draggable: true,
				theme: "dark",
			});
		} else if (value <= 4) {
			setNumMembers(Number(value));
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

	return (
		<>
			<div className="register-container">
				<Fade top>
					<div className="register-header">
						<div className="spacer layer1"></div>
						<div className="register-kdsh">
							<img src={require("../../assets/pics/KDSH LOGO.png")} alt="KDSH 2025 Logo" />
						</div>
						<div className="register-kdsh-desc">
							<p>
								The 5th Edition of the{" "}
								<strong>Kharagpur Data Science Hackathon</strong> (KDSH) is here
								to redefine excellence in data science. Dive into machine
								learning, solve real-world challenges, and showcase your
								innovative solutions. Connect with industry leaders, sharpen
								your skills, and become a trailblazer in the field.
							</p>

							<p>
								To participate, please fill in your details in the form below.
							</p>

							<p>
								Before registering, kindly ensure all your team members have
								starred the following GitHub repositories:
							</p>

							<ul>
								<li>
									<a
										className="kdsh-link"
										href="https://github.com/pathwaycom/pathway"
										target="_blank"
										rel="noreferrer noopener"
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
									>
										👉 LLM App
									</a>
								</li>
							</ul>
						</div>
					</div>
				</Fade>
				<Fade left>
					<div className="register-form">
						<form onSubmit={handleRegister}>
							<div>
								<h1
									style={{
										fontStyle: "italic",
										textShadow: "0 0 50px #1c1cf0, 0 0 100px red",
										marginBottom: "25px",
									}}
								>
									REGISTER
								</h1>
								<br />
								<input
									style={{ marginRight: "15px", marginBottom: "15px" }}
									type="text"
									name="name"
									placeholder="Team Name"
									required
									onChange={handleTeamName}
								/>
								<input
									style={{ marginBottom: "15px" }}
									type="number"
									name="numMembers"
									placeholder="Number of members"
									onChange={handleNumMembers}
									required
								/>
								<div className="register-form-details">
									Details of Member 1 : Team Leader
								</div>
								{/* 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 */}
								<>
									<div className="register-form-icons">
										<img src={user_icon} alt="user" />
										<input
											type="text"
											name="firstname"
											placeholder="First Name"
											required
											value={firstname1}
											onChange={(e) => setFirstname1(e.target.value)}
										/>
									</div>
									<div className="register-form-icons">
										<img src={user_icon} alt="user" />
										<input
											type="text"
											name="lastname"
											placeholder="Last Name"
											value={lastname1}
											onChange={(e) => setLastname1(e.target.value)}
										/>
									</div>
									<div className="register-form-gender">
										<label htmlFor="gender">
											<img src={gender_icon} alt="gender" />
										</label>
										<select
											id="gender"
											name="gender"
											value={gender1}
											onChange={(e) => setGender1(e.target.value)}
										>
											<option value="male">Male</option>
											<option value="female">Female</option>
											<option value="other">Other</option>
										</select>
									</div>
									<div className="register-form-icons">
										<img src={mail_icon} alt="user" />
										<input
											type="email"
											name="email"
											placeholder="Email Id"
											required
											value={mail1}
											onChange={(e) => setMail1(e.target.value)}
										/>
									</div>
									<div className="register-form-icons">
										<img src={contact_icon} alt="user" />
										<input
											type="number"
											name="phone"
											placeholder="Contact Number"
											required
											value={mobile1}
											onChange={(e) => setMobile1(e.target.value)}
										/>
									</div>
									<div className="register-form-icons">
										<img src={college_icon} alt="user" />
										<input
											type="text"
											name="college"
											placeholder="College Name"
											required
											value={college1}
											onChange={(e) => setCollege1(e.target.value)}
										/>
									</div>
									<div className="register-form-icons">
										<img src={degree_icon} alt="user" />
										<input
											type="text"
											name="degree"
											placeholder="Degree"
											required
											value={degree1}
											onChange={(e) => setDegree1(e.target.value)}
										/>
									</div>
									<div className="register-form-icons">
										<img src={YOS_icon} alt="user" />
										<input
											type="number"
											name="year"
											placeholder="Year of Study - 1/2/3..."
											required
											value={YOS1}
											onChange={(e) => setYOS1(e.target.value)}
										/>
									</div>
									<div className="register-form-icons">
										<img src={github_icon} alt="user" />
										<input
											type="text"
											name="githubid"
											placeholder="Github Username"
											required
											value={GitHubID1}
											onChange={(e) => setGitHubID1(e.target.value)}
										/>
									</div>
								</>
								<div className="register-form-details">Details of Member 2</div>
								{/* 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222 */}
								<>
									<div className="register-form-icons">
										<img src={user_icon} alt="user" />
										<input
											type="text"
											name="firstname"
											placeholder="First Name"
											required
											value={firstname2}
											onChange={(e) => setFirstname2(e.target.value)}
										/>
									</div>
									<div className="register-form-icons">
										<img src={user_icon} alt="user" />
										<input
											type="text"
											name="lastname"
											placeholder="Last Name"
											value={lastname2}
											onChange={(e) => setLastname2(e.target.value)}
										/>
									</div>
									<div className="register-form-gender">
										<label htmlFor="gender">
											<img src={gender_icon} alt="gender" />
										</label>
										<select
											id="gender"
											name="gender"
											value={gender2}
											onChange={(e) => setGender2(e.target.value)}
										>
											<option value="male">Male</option>
											<option value="female">Female</option>
											<option value="other">Other</option>
										</select>
									</div>
									<div className="register-form-icons">
										<img src={mail_icon} alt="user" />
										<input
											type="email"
											name="email"
											placeholder="Email Id"
											required
											value={mail2}
											onChange={(e) => setMail2(e.target.value)}
										/>
									</div>
									<div className="register-form-icons">
										<img src={contact_icon} alt="user" />
										<input
											type="number"
											name="phone"
											placeholder="Contact Number"
											required
											value={mobile2}
											onChange={(e) => setMobile2(e.target.value)}
										/>
									</div>
									<div className="register-form-icons">
										<img src={college_icon} alt="user" />
										<input
											type="text"
											name="college"
											placeholder="College Name"
											required
											value={college2}
											onChange={(e) => setCollege2(e.target.value)}
										/>
									</div>
									<div className="register-form-icons">
										<img src={degree_icon} alt="user" />
										<input
											type="text"
											name="degree"
											placeholder="Degree"
											required
											value={degree2}
											onChange={(e) => setDegree2(e.target.value)}
										/>
									</div>
									<div className="register-form-icons">
										<img src={YOS_icon} alt="user" />
										<input
											type="number"
											name="year"
											placeholder="Year of Study - 1/2/3..."
											required
											value={YOS2}
											onChange={(e) => setYOS2(e.target.value)}
										/>
									</div>
									<div className="register-form-icons">
										<img src={github_icon} alt="user" />
										<input
											type="text"
											name="githubid"
											placeholder="Github Username"
											required
											value={GitHubID2}
											onChange={(e) => setGitHubID2(e.target.value)}
										/>
									</div>
								</>
								{/* 333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333 */}
								{numMembers >= 3 && (
									<>
										<div className="register-form-details">
											Details of Member 3
										</div>

										<>
											<div className="register-form-icons">
												<img src={user_icon} alt="user" />
												<input
													type="text"
													name="firstname"
													placeholder="First Name"
													required
													value={firstname3}
													onChange={(e) => setFirstname3(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={user_icon} alt="user" />
												<input
													type="text"
													name="lastname"
													placeholder="Last Name"
													value={lastname3}
													onChange={(e) => setLastname3(e.target.value)}
												/>
											</div>
											<div className="register-form-gender">
												<label htmlFor="gender">
													<img src={gender_icon} alt="gender" />
												</label>
												<select
													id="gender"
													name="gender"
													value={gender3}
													onChange={(e) => setGender3(e.target.value)}
												>
													<option value="male">Male</option>
													<option value="female">Female</option>
													<option value="other">Other</option>
												</select>
											</div>
											<div className="register-form-icons">
												<img src={mail_icon} alt="user" />
												<input
													type="email"
													name="email"
													placeholder="Email Id"
													required
													value={mail3}
													onChange={(e) => setMail3(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={contact_icon} alt="user" />
												<input
													type="number"
													name="phone"
													placeholder="Contact Number"
													required
													value={mobile3}
													onChange={(e) => setMobile3(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={college_icon} alt="user" />
												<input
													type="text"
													name="college"
													placeholder="College Name"
													required
													value={college3}
													onChange={(e) => setCollege3(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={degree_icon} alt="user" />
												<input
													type="text"
													name="degree"
													placeholder="Degree"
													required
													value={degree3}
													onChange={(e) => setDegree3(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={YOS_icon} alt="user" />
												<input
													type="number"
													name="year"
													placeholder="Year of Study - 1/2/3..."
													required
													value={YOS3}
													onChange={(e) => setYOS3(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={github_icon} alt="user" />
												<input
													type="text"
													name="githubid"
													placeholder="Github Username"
													required
													value={GitHubID3}
													onChange={(e) => setGitHubID3(e.target.value)}
												/>
											</div>
										</>
									</>
								)}
								{/* 444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444 */}
								{numMembers >= 4 && (
									<>
										<div className="register-form-details">
											Details of Member 4
										</div>

										<>
											<div className="register-form-icons">
												<img src={user_icon} alt="user" />
												<input
													type="text"
													name="firstname"
													placeholder="First Name"
													required
													value={firstname4}
													onChange={(e) => setFirstname4(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={user_icon} alt="user" />
												<input
													type="text"
													name="lastname"
													placeholder="Last Name"
													value={lastname4}
													onChange={(e) => setLastname4(e.target.value)}
												/>
											</div>
											<div className="register-form-gender">
												<label htmlFor="gender">
													<img src={gender_icon} alt="gender" />
												</label>
												<select
													id="gender"
													name="gender"
													value={gender4}
													onChange={(e) => setGender4(e.target.value)}
												>
													<option value="male">Male</option>
													<option value="female">Female</option>
													<option value="other">Other</option>
												</select>
											</div>
											<div className="register-form-icons">
												<img src={mail_icon} alt="user" />
												<input
													type="email"
													name="email"
													placeholder="Email Id"
													required
													value={mail4}
													onChange={(e) => setMail4(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={contact_icon} alt="user" />
												<input
													type="number"
													name="phone"
													placeholder="Contact Number"
													required
													value={mobile4}
													onChange={(e) => setMobile4(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={college_icon} alt="user" />
												<input
													type="text"
													name="college"
													placeholder="College Name"
													required
													value={college4}
													onChange={(e) => setCollege4(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={degree_icon} alt="user" />
												<input
													type="text"
													name="degree"
													placeholder="Degree"
													required
													value={degree4}
													onChange={(e) => setDegree4(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={YOS_icon} alt="user" />
												<input
													type="number"
													name="year"
													placeholder="Year of Study - 1/2/3..."
													required
													value={YOS4}
													onChange={(e) => setYOS4(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={github_icon} alt="user" />
												<input
													type="text"
													name="githubid"
													placeholder="Github Username"
													required
													value={GitHubID4}
													onChange={(e) => setGitHubID4(e.target.value)}
												/>
											</div>
										</>
									</>
								)}
								{/* 555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555 */}
								{/* {numMembers === 5 && (
									<>
										<div className="register-form-details">
											Details of Member 5
										</div>

										<>
											<div className="register-form-icons">
												<img src={user_icon} alt="user" />
												<input
													type="text"
													name="firstname"
													placeholder="First Name"
													required
													value={firstname5}
													onChange={(e) => setFirstname5(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={user_icon} alt="user" />
												<input
													type="text"
													name="lastname"
													placeholder="Last Name"
													value={lastname5}
													onChange={(e) => setLastname5(e.target.value)}
												/>
											</div>
											<div className="register-form-gender">
												<label htmlFor="gender">
													<img src={gender_icon} alt="gender" />
												</label>
												<select
													id="gender"
													name="gender"
													value={gender5}
													onChange={(e) => setGender5(e.target.value)}
												>
													<option value="male">Male</option>
													<option value="female">Female</option>
													<option value="other">Other</option>
												</select>
											</div>
											<div className="register-form-icons">
												<img src={mail_icon} alt="user" />
												<input
													type="email"
													name="email"
													placeholder="Email Id"
													required
													value={mail5}
													onChange={(e) => setMail5(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={contact_icon} alt="user" />
												<input
													type="number"
													name="phone"
													placeholder="Contact Number"
													required
													value={mobile5}
													onChange={(e) => setMobile5(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={college_icon} alt="user" />
												<input
													type="text"
													name="college"
													placeholder="College Name"
													required
													value={college5}
													onChange={(e) => setCollege5(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={degree_icon} alt="user" />
												<input
													type="text"
													name="degree"
													placeholder="Degree"
													required
													value={degree5}
													onChange={(e) => setDegree5(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={YOS_icon} alt="user" />
												<input
													type="number"
													name="year"
													placeholder="Year of Study - 1/2/3..."
													required
													value={YOS5}
													onChange={(e) => setYOS5(e.target.value)}
												/>
											</div>
											<div className="register-form-icons">
												<img src={github_icon} alt="user" />
												<input
													type="text"
													name="githubid"
													placeholder="Github Username"
													required
													value={GitHubID5}
													onChange={(e) => setGitHubID5(e.target.value)}
												/>
											</div>
										</>
									</>
								)} */}
								<button className="register-form-submit" type="submit">
									<p>Register</p>
								</button>
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
