import Particless from "../Common/Particles/Particless";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import profile_pic from '../../assets/svgs/profile_pic.svg';

const EditProfile = () => {
  const particless = React.useMemo(() => <Particless />, []);
  const { user_id } = useParams();
  const token = localStorage.getItem("access_token");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_FETCH_URL}/user/profile_self/${user_id}`,
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
          console.log(jsonData);
        } else {
          const jsonData = await response.json();
          console.log("User Info fetched successfully:", jsonData.message);
          setFirstName(jsonData.f_name);
          setCollege(jsonData.college);
          setEmail(jsonData.email);
          setLastName(jsonData.l_name);
          setPhone(jsonData.phone);
          setUsername(jsonData.username);
        }
      } catch (error) {
        console.error("Error fetching User Info:", error);
      }
    };

    fetchUserInfo();
  }, [user_id, token]);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/auth");
    }
  }, [isLoggedIn, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      username: username,
      f_name: firstName,
      l_name: lastName,
      email: email,
      college: college,
      phone: phone,
    };

    const currentToken = localStorage.getItem("access_token");
    await fetch(
      `${process.env.REACT_APP_FETCH_URL}/user/edit_profile/${user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({
          ...newData,
        }),
      }
    ).then(async (res) => {
      let jsonData = await res.json();
      if (!res.ok) {
        setErrorMessage(jsonData.message);
        console.log(jsonData.message);
      } else {
        console.log("Profile edited sucessfully");
        history.push(`/user_profile_self/${user_id}`);
      }
    });
  };

  return (
    <div>
      {isLoggedIn && (
        <div className="w-full relative z-10">
          <div className="pt-[100px] md:pt-[70px] min-h-screen flex flex-col md:flex-row items-center justify-center p-4">
            
            <div className="md:h-[90vh] md:w-[25%] lg:w-[20%] w-full max-w-[400px] bg-gradient-to-r from-[#4a0000] to-[#ff4d4d] rounded-t-2xl md:rounded-l-[15px] md:rounded-tr-none text-white p-6 md:p-10 text-3xl md:text-[40px] font-black flex flex-row md:flex-col justify-start md:justify-center items-center gap-4 md:gap-8 shadow-2xl z-20 relative">
              <div className="w-16 md:w-1/2 flex justify-center items-center">
                <img
                  src={profile_pic}
                  alt="Edit Profile Icon"
                  className="w-full max-h-[80px] object-contain"
                />
              </div>
              <p className="text-xl md:text-3xl text-left md:text-center leading-snug m-0">
                Edit Your Profile
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-[400px] md:max-w-none md:w-[35%] lg:w-[30%] p-8 bg-gradient-to-r from-[#ff4d4d1d] to-[#4a000045] rounded-b-2xl md:rounded-br-[15px] md:rounded-tr-[200px] md:rounded-bl-none backdrop-blur-[10px] flex flex-col items-center md:items-start justify-center gap-4 shadow-2xl relative border border-white/10 md:h-[90vh]">
              
              <div className="text-red-500 font-semibold mb-2 w-full text-center md:text-left">{errorMessage}</div>
              
              <div className="w-full">
                <label className="text-[#ff4d4d] text-[15px] m-0 font-black block mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full md:w-[85%] text-white text-[15px] border-none bg-white/10 p-2.5 rounded-lg md:rounded-none md:border-b-transparent focus:ring-0 focus:outline-none focus:border-b focus:border-[#ff4d4d] transition-all"
                />
              </div>

              <div className="w-full">
                <label className="text-[#ff4d4d] text-[15px] m-0 font-black block mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full md:w-[85%] text-white text-[15px] border-none bg-white/10 p-2.5 rounded-lg md:rounded-none md:border-b-transparent focus:ring-0 focus:outline-none focus:border-b focus:border-[#ff4d4d] transition-all"
                />
              </div>

              <div className="w-full">
                <label className="text-[#ff4d4d] text-[15px] m-0 font-black block mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full md:w-[85%] text-white text-[15px] border-none bg-white/10 p-2.5 rounded-lg md:rounded-none md:border-b-transparent focus:ring-0 focus:outline-none focus:border-b focus:border-[#ff4d4d] transition-all"
                />
              </div>

              <div className="w-full">
                <label className="text-[#ff4d4d] text-[15px] m-0 font-black block mb-1">College</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full md:w-[85%] text-white text-[15px] border-none bg-white/10 p-2.5 rounded-lg md:rounded-none md:border-b-transparent focus:ring-0 focus:outline-none focus:border-b focus:border-[#ff4d4d] transition-all"
                />
              </div>

              <div className="w-full opacity-70">
                <label className="text-[#ff4d4d] text-[15px] m-0 font-black block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full md:w-[85%] text-white text-[15px] border-none bg-white/10 p-2.5 rounded-lg md:rounded-none cursor-not-allowed"
                />
              </div>

              <div className="w-full">
                <label className="text-[#ff4d4d] text-[15px] m-0 font-black block mb-1">Phone number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full md:w-[85%] text-white text-[15px] border-none bg-white/10 p-2.5 rounded-lg md:rounded-none md:border-b-transparent focus:ring-0 focus:outline-none focus:border-b focus:border-[#ff4d4d] transition-all"
                />
              </div>

              <input 
                type="submit" 
                value="Update" 
                className="w-full md:w-[85%] mt-6 md:mt-4 py-3 px-5 rounded-full font-semibold italic border-none bg-gradient-to-r from-[#b00000] via-[#ff4d4d] via-[#ffaaaa] to-[#ff0000] bg-[length:300%_100%] text-white cursor-pointer transition-all duration-300 hover:bg-[position:100%_0] hover:drop-shadow-[0_0_10px_white]"
              />
            </form>

          </div>
        </div>
      )}
      {particless}
    </div>
  );
};

export default EditProfile;
