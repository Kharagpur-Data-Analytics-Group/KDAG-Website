import Particless from "../Common/Particles/Particless";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import password_show_img from "../../assets/pics/password_show.png";
import password_hidden_img from "../../assets/pics/password_hidden.png";
import "./EditProfile.css";

const EditProfile = (props) => {
	const { user_id } = useParams();
	const [userData, setUserData] = useState({});
	const token = localStorage.getItem("access_token");
	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				// const response = await fetch(`${process.env.REACT_APP_FETCH_URL}/user/profile/${user_id}`, {
				const response = await fetch(
					`http://127.0.0.1:8080/user/profile_self/${user_id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (!response.ok) {
					const jsonData = await response.json();
					// toast.error(jsonData.message);
					console.log(jsonData);
				} else {
					const jsonData = await response.json();
					console.log("User Info fetched successfully:", jsonData.message);
					setUserData(jsonData);
				}
			} catch (error) {
				console.error("Error fetching User Info:", error);
				// toast.error("Error fetching posts. Please try again later.");
			}
		};

		fetchUserInfo();
	}, []);

	const { showLogout } = props;
	const history = useHistory();
	const [toggle, setToggle] = useState(false);
	const password_hashed = "***************  ";
	const [username, setUsername] = useState(userData.username);
	const [firstName, setFirstName] = useState(userData.f_name);
	const [lastName, setLastName] = useState(userData.l_name);
	const [college, setCollege] = useState(userData.college);
	const [email, setEmail] = useState(userData.email);
	const [phone, setPhone] = useState(userData.phone);

	// const password_toggle = () => {
	// 	setToggle(!toggle);
	// };

	useEffect(() => {
		if (!showLogout) {
			history.push("/auth");
		}
	}, [showLogout]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newData = {
			username : "Aakarsh123",
			f_name : "Aakarsh",
			l_name : "Raaj",
			email : "aakarsh@mail.com",
			college : "IIT KGP",
			phone : "99999999999",

		};

		// await fetch(`${process.env.REACT_APP_FETCH_URL}/user/login`, {
		const token = localStorage.getItem("access_token");
		await fetch(`http://127.0.0.1:8080/user/edit_profile/${user_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				...newData,
			}),
		}).then(async (res) => {
			let jsonData = await res.json();
			if (!res.ok) {
				// toast.error(jsonData.message);
				console.log(jsonData.message);
			}
			else {
				console.log("Profile edited sucessfully");
				history.push(`/user_profile_self/${user_id}`);
			}
		});
	};

	return (
		<div>
			{showLogout && (
				<div className="edit_profile_outer_container">
					<div className="edit_profile_container">
						<div className="edit_profile_heading">
							<p>
								E<br />D<br />I<br />T<br />
								<br />Y<br />O<br />U<br />R<br />
								<br />P<br />R<br />O<br />F<br />I<br />L<br />E
							</p>
						</div>
						<form onSubmit={handleSubmit}>
							<div className="edit_profile_username">
								<label>Username</label>
								<br />
								<input
									type="text"
									value={userData.username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className="edit_profile_firstname">
								<label>First Name</label>
								<br />
								<input
									type="text"
									value={userData.f_name}	
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>

							<div className="edit_profile_lastname">
								<label>Last Name</label>
								<br />
								<input
									type="text"
									value={userData.l_name}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>

							<div className="edit_profile_college">
								<label>College</label>
								<br />
								<input
									type="text"
									value={userData.college}
									onChange={(e) => setCollege(e.target.value)}
								/>
							</div>

							<div className="edit_profile_email">
								<label>Email</label>
								<br />
								<input
									type="email"
									value={userData.email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div className="edit_profile_phone">
								<label>Phone number</label>
								<br />
								<input
									type="tel"
									value={userData.phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>

							{/* <div className="edit_profile_password">
								<label>Password</label>
								<br />
								<input
									type="password"
									value={userData.password}
									onChange={(e) => setCurrPassword(e.target.value)}
								/>
								<button onClick={password_toggle}>
									{toggle ? (
										<img src={password_hidden_img} />
									) : (
										<img src={password_show_img} />
									)}
								</button>
							</div> */}
							<input type="submit" value="Update" />
						</form>
					</div>
				</div>
			)}
			<Particless />
		</div>
	);
};

export default EditProfile;
