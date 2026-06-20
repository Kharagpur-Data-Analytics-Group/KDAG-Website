import { useEffect } from "react";
import user_icon from "./../../assets/kdsh2025_user.png";
import mail_icon from "./../../assets/kdsh2025_mail.png";
import contact_icon from "./../../assets/kdsh2025_contact.png";
import college_icon from "./../../assets/kdsh2025_college.png";
import degree_icon from "./../../assets/kdsh2025_degree.png";
import YOS_icon from "./../../assets/kdsh2025_YOS.png";
import github_icon from "./../../assets/kdsh2025_github.png";
import gender_icon from "./../../assets/kdsh2025_gender.png";

const RegisterFormCard = ({firstname, setFirstname, lastname, setLastname, gender, setGender, mail, setMail, mobile, setMobile, college, setCollege, degree, setDegree, YOS, setYOS, GitHubID, setGitHubID, disabled}) => {
    useEffect(() => {
            const user_info = JSON.parse(
                localStorage.getItem("register_user_info") || "{}"
            );
    
            if (user_info) {
                setMail(user_info.email || "");
            }
        }, []);
    return (
        <div style={{marginBottom: "20px", display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
            <div className="register-form-icons">
                <img src={user_icon} alt="user" />
                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    required
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
            </div>
            <div className="register-form-icons">
                <img src={user_icon} alt="user" />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
            </div>
            <div className="register-form-gender">
                <label htmlFor="gender">
                    <img src={gender_icon} alt="gender" />
                </label>
                <select
                    id="gender"
                    name="gender"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
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
                    value={mail}
                    disabled={disabled}
                    onChange={(e) => setMail(e.target.value)}
                />
            </div>
            <div className="register-form-icons">
                <img src={contact_icon} alt="user" />
                <input
                    type="number"
                    name="phone"
                    placeholder="Contact Number"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />
            </div>
            <div className="register-form-icons">
                <img src={college_icon} alt="user" />
                <input
                    type="text"
                    name="college"
                    placeholder="College Name"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                />
            </div>
            <div className="register-form-icons">
                <img src={degree_icon} alt="user" />
                <input
                    type="text"
                    name="degree"
                    placeholder="Degree"
                    required
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                />
            </div>
            <div className="register-form-icons">
                <img src={YOS_icon} alt="user" />
                <input
                    type="number"
                    name="year"
                    placeholder="Year of Study - 1/2/3..."
                    required
                    value={YOS}
                    onChange={(e) => setYOS(e.target.value)}
                />
            </div>
            <div className="register-form-icons">
                <img src={github_icon} alt="user" />
                <input
                    type="text"
                    name="githubid"
                    placeholder="Github Username"
                    required
                    value={GitHubID}
                    onChange={(e) => setGitHubID(e.target.value)}
                />
            </div>
        </div>
    )
}

export default RegisterFormCard;