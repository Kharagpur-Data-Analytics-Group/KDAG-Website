import { useEffect } from "react";
import user_icon from "./../../assets/kdsh2025_user.webp";
import mail_icon from "./../../assets/kdsh2025_mail.webp";
import contact_icon from "./../../assets/kdsh2025_contact.webp";
import college_icon from "./../../assets/kdsh2025_college.webp";
import degree_icon from "./../../assets/kdsh2025_degree.webp";
import YOS_icon from "./../../assets/kdsh2025_YOS.webp";
import github_icon from "./../../assets/kdsh2025_github.webp";
import gender_icon from "./../../assets/kdsh2025_gender.webp";

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
        <div className="!mb-[20px] flex justify-center flex-wrap">
            <div className="register-form-icons box-border border-b border-white/20 inline-block !pl-[7px] !mr-[15px] !mb-[15px] focus-within:border-b-[#1c1cf0] focus-within:transition-colors focus-within:duration-250 [&_img]:h-[25px] [&_img]:!mr-[6px] [&_img]:!mb-[2px] [&_input]:!rounded-none [&_input]:!border-0 [&_input:focus]:!shadow-none [&_input:focus]:outline-none">
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
            <div className="register-form-icons box-border border-b border-white/20 inline-block !pl-[7px] !mr-[15px] !mb-[15px] focus-within:border-b-[#1c1cf0] focus-within:transition-colors focus-within:duration-250 [&_img]:h-[25px] [&_img]:!mr-[6px] [&_img]:!mb-[2px] [&_input]:!rounded-none [&_input]:!border-0 [&_input:focus]:!shadow-none [&_input:focus]:outline-none">
                <img src={user_icon} alt="user" />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
            </div>
            <div className="register-form-gender box-border text-white/[0.664] inline-flex items-center justify-center relative -top-[5px] border-b border-white/20 !mr-[15px] !mb-[10px] !mt-[5px] [&_label]:!mr-[6px] [&_label]:!ml-[7px] [&_label]:box-border [&_label]:inline-block [&_label_img]:h-[25px] [&_label_img]:!pt-[2px] [&_select]:!rounded-none [&_select]:!border-0 [&_option]:text-[#333]">
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
            <div className="register-form-icons box-border border-b border-white/20 inline-block !pl-[7px] !mr-[15px] !mb-[15px] focus-within:border-b-[#1c1cf0] focus-within:transition-colors focus-within:duration-250 [&_img]:h-[25px] [&_img]:!mr-[6px] [&_img]:!mb-[2px] [&_input]:!rounded-none [&_input]:!border-0 [&_input:focus]:!shadow-none [&_input:focus]:outline-none">
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
            <div className="register-form-icons box-border border-b border-white/20 inline-block !pl-[7px] !mr-[15px] !mb-[15px] focus-within:border-b-[#1c1cf0] focus-within:transition-colors focus-within:duration-250 [&_img]:h-[25px] [&_img]:!mr-[6px] [&_img]:!mb-[2px] [&_input]:!rounded-none [&_input]:!border-0 [&_input:focus]:!shadow-none [&_input:focus]:outline-none">
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
            <div className="register-form-icons box-border border-b border-white/20 inline-block !pl-[7px] !mr-[15px] !mb-[15px] focus-within:border-b-[#1c1cf0] focus-within:transition-colors focus-within:duration-250 [&_img]:h-[25px] [&_img]:!mr-[6px] [&_img]:!mb-[2px] [&_input]:!rounded-none [&_input]:!border-0 [&_input:focus]:!shadow-none [&_input:focus]:outline-none">
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
            <div className="register-form-icons box-border border-b border-white/20 inline-block !pl-[7px] !mr-[15px] !mb-[15px] focus-within:border-b-[#1c1cf0] focus-within:transition-colors focus-within:duration-250 [&_img]:h-[25px] [&_img]:!mr-[6px] [&_img]:!mb-[2px] [&_input]:!rounded-none [&_input]:!border-0 [&_input:focus]:!shadow-none [&_input:focus]:outline-none">
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
            <div className="register-form-icons box-border border-b border-white/20 inline-block !pl-[7px] !mr-[15px] !mb-[15px] focus-within:border-b-[#1c1cf0] focus-within:transition-colors focus-within:duration-250 [&_img]:h-[25px] [&_img]:!mr-[6px] [&_img]:!mb-[2px] [&_input]:!rounded-none [&_input]:!border-0 [&_input:focus]:!shadow-none [&_input:focus]:outline-none">
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
            <div className="register-form-icons box-border border-b border-white/20 inline-block !pl-[7px] !mr-[15px] !mb-[15px] focus-within:border-b-[#1c1cf0] focus-within:transition-colors focus-within:duration-250 [&_img]:h-[25px] [&_img]:!mr-[6px] [&_img]:!mb-[2px] [&_input]:!rounded-none [&_input]:!border-0 [&_input:focus]:!shadow-none [&_input:focus]:outline-none">
                <img src={github_icon} alt="user" />
                <input
                    type="text"
                    name="githubid"
                    placeholder="Github Username (optional)"
                    value={GitHubID}
                    onChange={(e) => setGitHubID(e.target.value)}
                />
            </div>
        </div>
    )
}

export default RegisterFormCard;