import React, { useEffect, useState, useContext } from "react";
import Fade from "../Common/Motion/Fade.js";
import Particless from "../Common/Particles/Particless";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleSubmit } from "./useFormStates";
import useFormStates from "./useFormStates";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import RegisterFormCard from "./RegisterFormCard.js";
import kdsh_2025 from "./../../assets/kdsh2025_logo.png";
import show_icon from "./../../assets/show_icon.png";
import repo1 from "./../../assets/llm_repo.png";
import repo2 from "./../../assets/pathway_repo.png";
import starred from "./../../assets/starred_repo.png";
import profile_icon from "./../../assets/profile_icon.png";
import profile_menu from "./../../assets/profile_menu.png";
import Star from "./Star.jsx";
import { AuthContext } from "../../context/AuthContext";
import LoginPrompt from "../Resources_New/LoginPrompt";
import "../Resources_New/LoginPrompt.css";
import { Copy, Check } from "lucide-react";
import whatsapp from "./../../assets/kdsh2025_whatsapp.png";
import discord from "./../../assets/kdsh2025_discord.png";
import banner from "./../../assets/banner.png";
import bannerSmall from "./../../assets/kdshbanner_small.png";

const registerPageCss = `
.register-back-button {
	position: absolute;
	top: 18px;
	left: 18px;
	z-index: 10;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 50%;
	padding: 10px 10px;
	color: #ffffff;
	font-size: 20px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 40px;
	height: 40px;
}

.register-back-button:hover {
	background: rgba(255, 255, 255, 0.2);
	border-color: rgba(255, 255, 255, 0.5);
	transform: translateX(-1px);
}

.register-back-button:active {
	transform: translateX(-5px);
}

@media (max-width: 700px) {
	.register-back-button {
		top: 14px;
		left: 14px;
		padding: 6px 10px;
		font-size: 16px;
		min-width: 32px;
		height: 32px;
	}
}

@media (max-width: 480px) {
	.register-form {
		width: 92%;
		padding: 22px 18px 26px;
	}

	.register-back-button {
		top: 12px;
		left: 12px;
		padding: 5px 9px;
		font-size: 15px;
		min-width: 30px;
		height: 30px;
	}

	.register-form h1 {
		text-align: center;
		padding-left: 6px;
		padding-right: 6px;
	}
}

.register-container .register-header {
	position: relative;
	min-height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding-top: 140px;
	box-sizing: border-box;
	overflow: hidden;
}

.register-container .register-header .layer1 {
	position: absolute;
	inset: 0;
	background-image: url("./../../assets/KDSH2025_cover.png");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	z-index: -1;
}

.register-container .register-header::after {
	content: "";
	position: absolute;
	inset: 0;
	z-index: -1;
}

.register-container .register-header .register-kdsh {
	font-size: clamp(48px, 6vw, 72px);
	font-weight: 900;
	letter-spacing: -0.03em;
	color: #ffffff;
	margin-bottom: 30px;
	text-align: center;
	text-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
}

.register-container .register-header .register-kdsh-desc {
	max-width: 900px;
	margin: 0 auto;
	padding: 40px;
	padding-top: 20px;
	margin-bottom: 1rem;
	font-size: 18px;
	line-height: 1.7;
	font-weight: 500;
	color: #ffffff;
	text-align: justify;

	background: rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(25px);
	-webkit-backdrop-filter: blur(12px);

	border-radius: 20px;
	border: 1px solid rgba(255, 255, 255, 0.18);

	/*box-shadow:
		0 30px 60px rgba(0, 0, 0, 0.35),
		inset 0 0 0 1px rgba(255, 255, 255, 0.05);*/
}

.register-container .register-header .register-kdsh-desc ul {
	margin-top: 30px;
	padding: 0;
	list-style: none;
	display: flex;
	gap: 20px;
	justify-content: space-evenly;
	flex-wrap: wrap;
}

.register-container .register-header .register-kdsh-desc ul li {
	position: relative;
	padding: 12px 56px;
	border-radius: 12px;
	font-weight: 700;
	font-size: 16px;
	color: #ffffff;
	cursor: pointer;

	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.3);

	transition: all 0.25s ease;
	overflow: hidden;
}

.register-container .register-header .register-kdsh-desc ul li {
	transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.register-container .register-header .register-kdsh-desc ul li:hover {
	transform: scale(1.03);
	/*box-shadow: 0 5px 5px rgba(0, 255, 255, 0.35);*/
	border-color: rgba(255, 255, 255, 0.6);
}


.register-container .register-header .register-kdsh-desc ul li::before {
	content: "";
	position: absolute;
	top: 0;
	left: -100%;
	width: 60%;
	height: 100%;
	background: linear-gradient(
		120deg,
		transparent,
		rgba(255, 255, 255, 0.35),
		transparent
	);
	animation: shimmer 2.5s infinite;
}

.kdsh-unstop-link {
	color: #FFD700 !important;
	font-weight: bolder;
}

.kdsh-unstop-link:hover {
	color: #FFD700 !important;
	text-decoration: underline !important;
}

@keyframes shimmer {
	0% {
		left: -100%;
	}
	100% {
		left: 200%;
	}
}

@media (max-width: 900px) {
	.register-container .register-header {
		padding-top: 100px;
	}

	.register-container .register-header .register-kdsh-desc {
		margin: 0 20px;
		padding: 28px;
		font-size: 16px;
	}

	.register-container .register-header .register-kdsh-desc ul {
		justify-content: center;
	}
}

@media (max-width: 600px) {
	.register-container .register-header {
		padding-top: 80px;
	}
}

.register-form {
	border: solid rgba(255, 255, 255, 0.05) 2px;
	border-top: 5px solid #1c1cf0;
	border-radius: 1.2rem;
	/*backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);*/
	background: rgb(21, 21, 21);
	max-width: 900px;
	padding: 25px;
	width: 80%;
	/* left: 10%; */
	margin-bottom: 300px;
	margin-top: 150px;
	position: relative;
}

.register-form-icons {
	box-sizing: border-box;
	border-bottom: 1px rgba(255, 255, 255, 0.2) solid;
	display: inline-block;
	padding-left: 7px;
	margin-right: 15px;
	margin-bottom: 15px;
}

.register-form-icons img {
	height: 25px;
	margin-right: 6px;
	margin-bottom: 2px;
}

.register-form-icons:focus-within {
	border-bottom: 1px #1c1cf0 solid;
	transition: border-bottom-color 0.25s ease;
}

.register-form-icons input:focus {
  	box-shadow: none;
	outline: none;
}

.register-form input {
	border-radius: 0px;
	border: 0px;
}

.register-form-gender {
	box-sizing: border-box;
	color: rgba(255, 255, 255, 0.664);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	align-items: center;
	position: relative;
	top: -5px;
	border-bottom: 1px rgba(255, 255, 255, 0.2) solid;
	margin-right: 15px;
	margin-bottom: 10px;
	margin-top: 5px;
}
.register-form-gender label {
	margin-right: 6px;
	margin-left: 7px;
	box-sizing: border-box;
	display: inline-block;
}

.register-form-gender label img {
	height: 25px;
	padding-top: 2px;
}

.register-form-gender select {
	border-radius: 0px;
	border: 0px;
}
.register-form-gender select option {
	color: #333;
}

.register-form-details {
	color: white;
	font-weight: 600;
	position: relative;
	margin-bottom: 10px;
	font-size: 18px;
	padding-left: 90px;
}

.register-form-details-special {
	color: white;
	display: flex;
	align-items: center;
	font-weight: 600;
	position: relative;
	margin-bottom: 30px;
	font-size: 18px;
	padding-left: 90px;
}

.register-form-details-special input {	
	border-bottom: 1px rgba(255, 255, 255, 0.2) solid;
}

.register-form-details-special input:focus {
  	box-shadow: none;
	outline: none;
	border-bottom: 1px #1c1cf0 solid;
	transition: border-bottom-color 0.25s ease;
}


.register-form-submit {
	background: transparent;
	min-width: 300px;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	/* padding-left: 90px; */
}


input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

input[type="number"] {
	appearance: textfield;
	-moz-appearance: textfield;
}


.register-form-submit p {
	text-align: center;
	background-image: linear-gradient(
		to right,
		#1c1cf0,
		#3572c3,
		#3572c3,
		#1c1cf0
	);
	padding: 10px;
	background-size: 300% 100%;
	width: 100%;
	color: white;
	/*box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.5);*/
	border-radius: 30px;
	border: none;
	transition: 0.3s;
}

.register-form-submit p:hover {
	background-position: 100% 0;
	transform: scale(1.05);
}

@media (max-width: 1300px) {
	.kdsh2025_star_outer {
		top: 100px;
		margin: 0px 100px;
	}
}

@media (max-width: 1285px) {
	.register-container .register-header .register-kdsh {
		top: 115px;
		left: 34%;
		padding: 5px 25px;
	}

	.register-container .register-header .register-kdsh-desc {
		padding: 20px;
		font-weight: 600;
		top: 265px;
		margin: 0 100px;
	}

	.kdsh2025_star_outer {
		top: 85px;
		margin: 0px 100px;
	}
}

@media (max-width: 1155px) {
	.kdsh2025_star_outer {
		top: 110px;
		margin: 0px 100px;
	}
}

@media (max-width: 1110px) {
	.kdsh2025_star_outer {
		top: 100px;
		margin: 0px 100px;
	}
	.register-form {
		margin-top: 250px;
	}
}

@media (max-width: 1060px) {
	.register-container .register-header .register-kdsh {
		top: 100px;
		left: 32%;
		font-size: 45px;
		padding: 5px 25px;
	}

	.register-container .register-header .register-kdsh-desc {
		padding: 20px;
		font-weight: 600;
		top: 240px;
		margin: 0 100px;
	}

	.register-form {
		margin-top: 250px;
	}
}

@media (max-width: 940px) {
	.kdsh2025_star_outer {
		top: 100px;
		margin: 0px 100px;
	}
	.kdsh2025_star_content {
		padding: 20px;
	}

	.kdsh2025_star_content .step_one,
	.kdsh2025_star_content .step_two {
		font-size: 16px;
	}
	.register-form {
		margin-top: 200px;
	}
}

@media (max-width: 880px) {
	.register-container .register-header .register-kdsh {
		top: 90px;
		left: 26%;
		font-size: 45px;
		padding: 5px 25px;
	}

	.register-container .register-header .register-kdsh-desc {
		padding: 20px;
		font-weight: 600;
		top: 240px;
		margin: 0 90px;
	}
	.register-form {
		margin-top: 200px;
	}
}

@media (max-width: 790px) {
	.register-form-details-special #header {
		display: none;
	}
	.kdsh2025_star_outer {
		top: 100px;
		margin: 0px 100px;
	}
	.register-form {
		margin-top: 200px;
	}
}

@media (max-width: 750px) {
	.register-container .register-header .register-kdsh {
		top: 95px;
		left: 24%;
		font-size: 45px;
		padding: 5px 25px;
	}

	.register-container .register-header .register-kdsh-desc {
		padding: 20px;
		font-weight: 600;
		top: 250px;
		margin: 0 90px;
	}
	.register-form {
		margin-top: 200px;
	}
	/* />>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
	/*.kdsh2025_star_content .step_one,
	.kdsh2025_star_content .step_two {
		overflow-x: scroll;
		scrollbar-width: 5px;
	}
	.kdsh2025_star_content .step_one img,
	.kdsh2025_star_content .step_two img {
		min-width: 900px;
		margin-bottom: 10px;
		border: solid white 1px;
	}*/
}

@media (max-width: 700px) {
	.register-form-details {
		padding-left: 60px;
	}
	.register-form-details-special {
		padding-left: 70px;
	}
	.register-form-submit {
		min-width: 350px;
	}
	.register-container .register-header .register-kdsh {
		top: 95px;
		left: 22%;
		font-size: 45px;
		padding: 5px 25px;
	}

	.register-container .register-header .register-kdsh-desc {
		padding: 20px;
		font-weight: 600;
		top: 250px;
		margin: 0 50px;
		font-size: 18px;
	}
	.kdsh2025_star_outer {
		top: 100px;
		margin: 0px 50px;
	}
}

@media (max-width: 685px) {
	.kdsh2025_star_header span {
		font-size: 20px;
	}
}

@media (max-width: 645px) {
	.kdsh2025_star_outer {
		top: 100px;
		margin: 0px 50px;
	}
	.register-form {
		margin-top: 200px;
	}
}

@media (max-width: 575px) {
	.register-form-details-special {
		padding-left: 40px;
	}
	.register-form-details {
		padding-left: 30px;
	}
	.register-form-submit {
		min-width: 320px;
	}
	.register-container .register-header .register-kdsh {
		top: 85px;
		left: 14%;
		font-size: 45px;
		padding: 5px 25px;
	}
	
	.register-container .register-header .register-kdsh-desc {
		padding: 20px;
		font-weight: 600;
		top: 220px;
		margin: 0 40px;
		font-size: 16px;
	}
	.kdsh2025_star_outer {
		margin: 0px 35px;
	}
}

@media (max-width: 515px) {
	.register-form-details-special {
		padding-left: 30px;
	}
	.register-form-details {
		padding-left: 20px;
	}
	.register-form-submit {
		min-width: 280px;
	}
	.register-form-gender select {
		width: 265px;
	}
	
	.register-form input {
		width: 265px;
	}
}

@media (max-width: 500px) {
	.register-container .register-header .register-kdsh {
		top: 85px;
		left: 12%;
		font-size: 45px;
		padding: 5px 25px;
	}
	
	.register-container .register-header .register-kdsh-desc {
		padding: 20px;
		font-weight: 600;
		top: 200px;
		margin: 0 40px;
		font-size: 16px;
	}
	
	.register-container .register-header .register-kdsh img {
		height: 100px;
	}
}

@media (max-width: 480px) {
	.register-form-details-special {
		padding-left: 30px;
	}
	.register-form-details {
		padding-left: 10px;
	}
	.register-form-submit {
		min-width: 100%;
	}
	.register-form input {
		width: 240px;
	}
	.register-form-gender select {
		width: 240px;
	}
}

@media (max-width: 460px) {
	.register-form-details {
		padding-left: 20px;
	}
	.register-container .register-header .register-kdsh {
		top: 80px;
		left: 10%;
		font-size: 35px;
		padding: 5px 25px;
	}

	.register-container .register-header .register-kdsh-desc {
		padding: 20px;
		font-weight: 600;
		top: 200px;
		margin: 0 30px;
		font-size: 16px;
	}

	.register-form input {
		height: 40px;
	}

	.register-form-submit {
		min-width: 100%;
	}
}

@media (max-width: 450px) {
	.register-form input {
		width: 210px;
	}
	.register-form-gender select {
		width: 210px;
	}
}

@media (max-width: 435px) {
	.kdsh2025_star_outer {
		top: 100px;
		margin: 0px 35px;
	}
	.register-form {
		margin-top: 200px;
	}
}
@media (max-width: 400px) {
	.register-form-details-special {
		padding-left: 10px;
	}
	.register-form-details {
		padding-left: 5px;
	}
	.register-form-submit {
		min-width: 100%;
	}
	.register-form input {
		width: 200px;
	}
	.register-form-gender select {
		width: 202px;
	}
	.kdsh2025_star_outer {
		margin: 0px 25px;
	}
}

@media (max-width: 395px) {
	.register-container .register-header .register-kdsh {
		top: 80px;
		left: 4%;
		font-size: 35px;
		padding: 5px 25px;
	}

	.register-container .register-header .register-kdsh-desc {
		padding: 20px;
		font-weight: 600;
		top: 200px;
		margin: 0 20px;
		font-size: 16px;
	}
	.register-form {
		margin-top: 200px;
	}
}

@media (max-width: 386px) {
	.register-form input {
		width: 190px;
	}
	.register-form-gender select {
		width: 192px;
	}
}

@media (max-width: 375px) {
	.register-form input {
		width: 180px;
	}
	.register-form-gender select {
		width: 182px;
	}
	.register-form-details-special {
		padding-left: 15px;
	}
	.register-form-submit {
		min-width: 100%;
	}
}

@media (max-width: 360px) {
	.register-form input {
		width: 170px;
	}
	.register-form-gender select {
		width: 172px;
	}
}

@media (max-width: 350px) {
	.register-form input {
		width: 160px;
	}
	.register-form-gender select {
		width: 162px;
	}
}

@media (max-width: 340px) {
	.register-form input {
		width: 150px;
	}
	.register-form-gender select {
		width: 152px;
	}
}

@media (max-width: 325px) {
	.register-form input {
		width: 130px;
	}
	.register-form-gender select {
		width: 132px;
	}
	.register-form-submit {
		min-width: 100%;
	}
}

.important-note2 {
  margin-top: 24px;
  padding: 14px 18px;
  text-align: center;
  line-height: 1.55;
  color: #e6ecff;
  font-size: 20px;
  border-radius: 12px;
  border: 1px solid rgba(120, 160, 255, 0.25);
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
}

.important-note2 strong {
  color: #8fb3ff;
  font-weight: 800;
  font-size: 17px;
}

.important-note2-link {
  color: #8fb3ff;
  cursor: pointer;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.25s ease, text-shadow 0.25s ease;
}


/* ---------- Responsive ---------- */

@media (max-width: 820px) {
  .important-note2 {
    font-size: 14px;
    padding: 12px 14px;
    max-width: 92%;
  }
}

@media (max-width: 520px) {
  .important-note2 {
    font-size: 13.5px;
    line-height: 1.45;
    padding: 10px 12px;
    border-radius: 10px;
  }

  .important-note2-link {
    display: inline-block; 
  }
}
`;

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
				`${import.meta.env.VITE_FETCH_URL}/kdsh/get_user_teams`,
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
			`${import.meta.env.VITE_FETCH_URL}/kdsh/check_register`,
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
			`${import.meta.env.VITE_FETCH_URL}/kdsh/join_team`,
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
			<style>{registerPageCss}</style>
			<div className="register-container">
				<Fade top>
					<div className="register-header">
						<div className="spacer layer1"></div>
						<div className="register-kdsh">KDSH 2026</div>
						<div className="max-w-[900px] mx-auto mb-12 p-0 max-md:px-4">
							<picture>
								
								<source
								media="(max-width: 767px)"
								srcSet={bannerSmall}
								/>

								<img
								src={banner}
								alt="KDSH Banner"
								className="block w-full h-auto rounded-[20px]"
								style={{ width: "100%", height: "auto" }}
								/>
							</picture>
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
								Backed by industry leaders including Pathway (Title Sponser) and TrueFoundry (Tech Platform Sponser) <br />
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
										Registrations have moved to unstop.
									</h1>
									<div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
										<a
											className="register-form-submit"
											type="button"
											href="https://unstop.com/hackathons/kharagpur-data-science-hackathon-2026-iit-kharagpur-1614844"
											target="_blank"
											rel="noopener noreferrer"
											style={{ minWidth: "300px" }}
										>
											<p>Register on unstop</p>
										</a>
										{/*<button
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
										</button>*/}
									</div>
									{/*<div className="important-note2">
										<strong>Important:</strong> After all Team Members have joined, Team Leader must review and confirm your team details on the&nbsp;
										<span className="important-note2-link" onClick={() => history.push("/manage-team")}>
											Manage Team
										</span>{" "}
										page to complete your registration. Your team will only appear on Unstop after finalization.
									</div>*/}
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
											<div className="flex items-center justify-center gap-[15px] mb-[15px] max-md:flex-col">
												<div style={{
													fontSize: "32px",
													fontWeight: "bold",
													color: "#00ff11",
													letterSpacing: "5px",
													marginBottom: "10px",
													marginTop: "10px",
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
													href="https://chat.whatsapp.com/LguOtn8Dwyh19sajyCKNoQ"
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
												<button className="register-form-submit" type="submit" disabled={isSubmitting}>
													<p>{isSubmitting ? "Creating..." : "Create Team"}</p>
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
										<button className="register-form-submit" type="submit" disabled={isSubmitting}>
											<p>{isSubmitting ? "Joining..." : "Join Team"}</p>
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
