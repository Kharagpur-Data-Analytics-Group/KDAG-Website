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
import Fade from "react-reveal/Fade";
import "./UserProfileSelf.css";

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
				<div className="outer_profile_self_container">
					<div className="edit_profile_button">
						<Link to={`/edit_profile/${user_id}`}>
							<img src={edit_icon_img} />
						</Link>
					</div>
					<Fade left>
						<div className="profile_self_container">
							<div className="profile_self_icon">
								<div
									className={`profile_self_img_box ${
										activeContent === "content1" && "profile_self_active"
									}`}
									style={{ "--i": "1" }}
									onMouseOver={() => handleMouseOver("content1")}
								>
									<img src={username2_img} />
								</div>
								<div
									className={`profile_self_img_box ${
										activeContent === "content2" && "profile_self_active"
									}`}
									style={{ "--i": "2" }}
									onMouseOver={() => handleMouseOver("content2")}
								>
									<img src={name2_img} />
								</div>
								<div
									className={`profile_self_img_box ${
										activeContent === "content6" && "profile_self_active"
									}`}
									style={{ "--i": "6" }}
									onMouseOver={() => handleMouseOver("content6")}
								>
									<img src={user_profile_img} />
								</div>
								<div
									className={`profile_self_img_box ${
										activeContent === "content4" && "profile_self_active"
									}`}
									style={{ "--i": "4" }}
									onMouseOver={() => handleMouseOver("content4")}
								>
									<img src={college2_img} />
								</div>
								<div
									className={`profile_self_img_box ${
										activeContent === "content5" && "profile_self_active"
									}`}
									style={{ "--i": "5" }}
									onMouseOver={() => handleMouseOver("content5")}
								>
									<img src={email2_img} />
								</div>
								<div
									className={`profile_self_img_box ${
										activeContent === "content3" && "profile_self_active"
									}`}
									style={{ "--i": "3" }}
									onMouseOver={() => handleMouseOver("content3")}
								>
									<img src={phone2_img} />
								</div>
								{/* <div
									className={`profile_self_img_box ${
										activeContent === "content7" && "profile_self_active"
									}`}
									style={{ "--i": "7" }}
									onMouseOver={() => handleMouseOver("content7")}
								>
									<img src={password2_img} />
								</div> */}
							</div>

							<div className="profile_self_content">
								<div
									className={`profile_self_content_box ${
										activeContent === "content6" && "profile_self_active"
									}`}
									id="content6"
								>
									<div className="profile_self_card">
										<div className="profile_self_img_box">
											<img src={user_profile_img} />
										</div>
										<div className="profile_self_text_box">
											<h2>
												Welcome to <strong>KDAG</strong> <br />
												<span></span>
											</h2>
										</div>
									</div>
								</div>
								<div
									className={`profile_self_content_box ${
										activeContent === "content1" && "profile_self_active"
									}`}
									id="content1"
								>
									<div className="profile_self_card">
										<div className="profile_self_img_box">
											<img src={username_img} />
										</div>
										<div className="profile_self_text_box">
											<h2>
												{userData.username} <br />
												<span>Username</span>
											</h2>
										</div>
									</div>
								</div>

								<div
									className={`profile_self_content_box ${
										activeContent === "content2" && "profile_self_active"
									}`}
									id="content2"
								>
									<div className="profile_self_card">
										<div className="profile_self_img_box">
											<img src={name_img} />
										</div>
										<div className="profile_self_text_box">
											<h2>
												{userData.f_name} {userData.l_name} <br />
												<span>Name</span>
											</h2>
										</div>
									</div>
								</div>

								<div
									className={`profile_self_content_box ${
										activeContent === "content4" && "profile_self_active"
									}`}
									id="content4"
								>
									<div className="profile_self_card">
										<div className="profile_self_img_box">
											<img src={college_img} />
										</div>
										<div className="profile_self_text_box">
											<h2>
												{userData.college} <br />
												<span>College</span>
											</h2>
										</div>
									</div>
								</div>

								<div
									className={`profile_self_content_box ${
										activeContent === "content5" && "profile_self_active"
									}`}
									id="content5"
								>
									<div className="profile_self_card">
										<div className="profile_self_img_box">
											<img src={email_img} />
										</div>
										<div className="profile_self_text_box">
											<h2>
												{userData.email} <br />
												<span>Email</span>
											</h2>
										</div>
									</div>
								</div>

								<div
									className={`profile_self_content_box ${
										activeContent === "content3" && "profile_self_active"
									}`}
									id="content3"
								>
									<div className="profile_self_card">
										<div className="profile_self_img_box">
											<img src={phone_img} />
										</div>
										<div className="profile_self_text_box">
											<h2>
												{userData.phone} <br />
												<span>Phone</span>
											</h2>
										</div>
									</div>
								</div>
								<div
									className={`profile_self_content_box ${
										activeContent === "content7" && "profile_self_active"
									}`}
									id="content7"
								>
									{/* <div className="profile_self_card">
										<div className="profile_self_img_box">
											<img src={password_img} />
										</div>
										<div className="profile_self_text_box">
											<h2 className="profile_self_password_view">
												{toggle ? "userData.password" : password_hashed}
												<button onClick={password_toggle}>
													{toggle ? (
														<img src={password_hidden_img} />
													) : (
														<img src={password_show_img} />
													)}
												</button>
												<br />
												<span>Password</span>
											</h2>
										</div>
									</div> */}
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
