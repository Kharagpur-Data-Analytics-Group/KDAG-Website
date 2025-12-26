import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterPage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const checkName = (name) => {
	if (name.trim() === "") {
		toast.error(`Name cannot be empty or contain only spaces : ${name}`, {
			position: "top-center",
			draggable: true,
			theme: "dark",
		});
		return null;
	}
	const validNameRegex = /^[A-Za-z\s]+$/;
	if (!validNameRegex.test(name)) {
		toast.error("Name can only contain letters and spaces.", {
			position: "top-center",
			draggable: true,
			theme: "dark",
		});

		return null;
	}
	const lowercaseName = name.toLowerCase();
	return lowercaseName;
};

export const checkMobile = (mobile) => {
	const mobileRegex = /^\d{10}$/;
	if (!mobileRegex.test(mobile)) {
		toast.error("Mobile number must be exactly 10 digits.", {
			position: "top-center",
			draggable: true,
			theme: "dark",
		});
		return null;
	}
	return mobile;
};

export const checkCollege = (college) => {
	if (college.trim() === "") {
		toast.error("College name cannot be empty.", {
			position: "top-center",
			draggable: true,
			theme: "dark",
		});
		return null;
	}

	const validCollegeRegex = /^[A-Za-z\s]+$/;
	if (!validCollegeRegex.test(college)) {
		toast.error("College name can only contain letters and spaces.", {
			position: "top-center",
			draggable: true,
			theme: "dark",
		});
		return null;
	}
	return college;
};

export const checkYOS = (yos) => {
	const yosNum = parseInt(yos, 10);

	if (isNaN(yosNum)) {
		toast.error("Year of Study must be a number.", {
			position: "top-center",
			draggable: true,
			theme: "dark",
		});
		return null;
	}

	if (yosNum < 1 || yosNum > 5) {
		toast.error("Year of Study must be between 1 and 5.", {
			position: "top-center",
			draggable: true,
			theme: "dark",
		});
		return null;
	}

	return yosNum;
};

const validateUsername = (username) => {
	const regex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
	return regex.test(username);
};

export const checkGitHubID = (githubID) => {
	if (githubID.trim() === "") {
		toast.error("GitHub Username cannot be empty.", {
			position: "top-center",
			draggable: true,
			theme: "dark",
		});
		return null;
	}

	const cleanedGithubID = githubID.replace(/\s+/g, "");

	if (validateUsername(cleanedGithubID)) {
		return cleanedGithubID;
	} else {
		toast.error("Please ensure all GitHub Usernames are Valid.", {
			position: "top-center",
			draggable: true,
			theme: "dark",
		});
		return null;
	}
};

export const handleSubmit = (name, mobile, college, YOS, GitHubID) => {
	const validName = checkName(name);
	if (validName === null) return false;

	const validMobile = checkMobile(mobile);
	if (validMobile === null) return false;

	const validCollege = checkCollege(college);
	if (validCollege === null) return false;

	const validYOS = checkYOS(YOS);
	if (validYOS === null) return false;

	const validGitHubID = checkGitHubID(GitHubID);
	if (validGitHubID === null) return false;

	return true;
};

const useFormStates = () => {
	const [firstname1, setFirstname1] = useState("");
	const [firstname2, setFirstname2] = useState("");
	const [firstname3, setFirstname3] = useState("");
	const [firstname4, setFirstname4] = useState("");
	const [firstname5, setFirstname5] = useState("");

	const [lastname1, setLastname1] = useState("");
	const [lastname2, setLastname2] = useState("");
	const [lastname3, setLastname3] = useState("");
	const [lastname4, setLastname4] = useState("");
	const [lastname5, setLastname5] = useState("");

	const [gender1, setGender1] = useState("male");
	const [gender2, setGender2] = useState("male");
	const [gender3, setGender3] = useState("male");
	const [gender4, setGender4] = useState("male");
	const [gender5, setGender5] = useState("male");

	const [mail1, setMail1] = useState("");
	const [mail2, setMail2] = useState("");
	const [mail3, setMail3] = useState("");
	const [mail4, setMail4] = useState("");
	const [mail5, setMail5] = useState("");

	const [mobile1, setMobile1] = useState();
	const [mobile2, setMobile2] = useState();
	const [mobile3, setMobile3] = useState();
	const [mobile4, setMobile4] = useState();
	const [mobile5, setMobile5] = useState();

	const [college1, setCollege1] = useState("");
	const [college2, setCollege2] = useState("");
	const [college3, setCollege3] = useState("");
	const [college4, setCollege4] = useState("");
	const [college5, setCollege5] = useState("");

	const [degree1, setDegree1] = useState("");
	const [degree2, setDegree2] = useState("");
	const [degree3, setDegree3] = useState("");
	const [degree4, setDegree4] = useState("");
	const [degree5, setDegree5] = useState("");

	const [YOS1, setYOS1] = useState();
	const [YOS2, setYOS2] = useState();
	const [YOS3, setYOS3] = useState();
	const [YOS4, setYOS4] = useState();
	const [YOS5, setYOS5] = useState();

	const [GitHubID1, setGitHubID1] = useState("");
	const [GitHubID2, setGitHubID2] = useState("");
	const [GitHubID3, setGitHubID3] = useState("");
	const [GitHubID4, setGitHubID4] = useState("");
	const [GitHubID5, setGitHubID5] = useState("");
	 useEffect(() => {
		const user_info = JSON.parse(
		  localStorage.getItem("register_user_info") || "{}"
		);
	
		if (user_info) {
		  setMail1(user_info.email || "");
		}
	  }, [location]);

	return {
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
	};
};

export default useFormStates;
