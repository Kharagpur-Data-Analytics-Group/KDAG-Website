import Particless from "../Common/Particles/Particless";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import profile_pic from '../../assets/svgs/profile_pic.svg';

const EditProfile = () => {
  const particless = React.useMemo(() => <Particless />, []);
  const apiUrl = import.meta.env.VITE_FETCH_URL;
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
          `${apiUrl}/user/profile_self/${user_id}`,
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
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/auth");
    }
  }, [isLoggedIn]);

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

    const token = localStorage.getItem("access_token");
    await fetch(
      `${apiUrl}/user/edit_profile/${user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        <div>
          <div className="!pt-[100px] h-screen flex items-center justify-center max-[900px]:flex-col max-[900px]:items-center max-[900px]:justify-center max-[900px]:h-auto max-[900px]:!gap-[30px] max-[900px]:!p-[40px_10px] max-[420px]:!pt-[70px] max-[420px]:flex-col max-[420px]:items-center max-[420px]:justify-center max-[420px]:h-auto max-[420px]:!gap-5">
            <div className="h-[95%] w-1/5 bg-[linear-gradient(to_right,#4a0000,#ff4d4d)] rounded-tl-[15px] rounded-bl-[15px] text-[aliceblue] !p-[10px_50px] text-[40px] font-black flex flex-col justify-center items-center !gap-8 max-[900px]:w-[90%] max-[900px]:rounded-[15px] max-[900px]:text-[28px] max-[900px]:flex-row max-[900px]:justify-start max-[900px]:items-center max-[900px]:!gap-6 max-[900px]:!p-[20px_25px] max-[420px]:w-[90%] max-[420px]:!p-5 max-[420px]:text-2xl max-[420px]:font-black max-[420px]:flex max-[420px]:flex-row max-[420px]:justify-start max-[420px]:items-center max-[420px]:rounded-[15px] max-[420px]:!gap-4">
              <div className="w-1/2 h-1/5 flex justify-center max-[900px]:w-1/5 max-[900px]:h-auto max-[900px]:flex max-[900px]:justify-center max-[900px]:items-center max-[420px]:w-1/5 max-[420px]:h-auto max-[420px]:flex max-[420px]:justify-center max-[420px]:items-center">
                <img
                  className="max-[900px]:w-full max-[900px]:max-h-20 max-[900px]:object-contain max-[420px]:w-full max-[420px]:max-h-[60px] max-[420px]:object-contain"
                  src={profile_pic}
                  alt="Edit Profile Icon"
                />
              </div>
              <p className="leading-[44px] text-center max-[900px]:static max-[900px]:text-2xl max-[900px]:leading-[30px] max-[900px]:text-left max-[900px]:!m-0 max-[420px]:text-lg max-[420px]:leading-6 max-[420px]:text-left max-[420px]:static max-[420px]:!m-0 max-[420px]:w-full max-[420px]:text-[aliceblue]">
                Edit Your Profile
              </p>
            </div>
            <form className="flex flex-col justify-center w-[30%] !p-[25px] h-[95%] bg-[linear-gradient(to_right,#ff4d4d1d,#4a000045)] rounded-br-[15px] rounded-tr-[200px] backdrop-blur-[10px] max-[900px]:w-[90%] max-[900px]:!p-[25px_20px] max-[900px]:rounded-tr-[15px] max-[900px]:rounded-bl-[15px] max-[900px]:flex max-[900px]:flex-col max-[900px]:items-center max-[900px]:!gap-5 max-[900px]:h-auto max-[420px]:w-[90%] max-[420px]:!p-5 max-[420px]:rounded-[15px] max-[420px]:flex max-[420px]:flex-col max-[420px]:items-center max-[420px]:!gap-5" onSubmit={handleSubmit}>
              <div className="err text-red-600">{errorMessage}</div>
              <div className="max-[900px]:w-full max-[420px]:w-full">
                <label className="text-[#ff4d4d] text-[15px] !m-0 font-black max-[900px]:w-full max-[900px]:text-[15px] max-[900px]:font-black max-[900px]:text-left max-[420px]:w-full max-[420px]:text-[15px] max-[420px]:font-black max-[420px]:text-left max-[420px]:!mt-2.5">Username</label>
                <br />
                <input
                  className="text-[aliceblue] text-[15px] border-1 w-3/4 !mt-[-2px] !mb-[15px] bg-white/[0.08] focus:shadow-[0_0_0_white] focus:border-b focus:border-b-[#ff4d4d] max-[900px]:w-full max-[900px]:!p-2.5 max-[900px]:text-base max-[900px]:rounded-lg max-[900px]:!mb-2.5 max-[420px]:w-full max-[420px]:!p-2.5 max-[420px]:text-sm max-[420px]:rounded-lg max-[420px]:!mb-2.5"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="max-[900px]:w-full max-[420px]:w-full">
                <label className="text-[#ff4d4d] text-[15px] !m-0 font-black max-[900px]:w-full max-[900px]:text-[15px] max-[900px]:font-black max-[900px]:text-left max-[420px]:w-full max-[420px]:text-[15px] max-[420px]:font-black max-[420px]:text-left max-[420px]:!mt-2.5">First Name</label>
                <br />
                <input
                  className="text-[aliceblue] text-[15px] border-1 w-3/4 !mt-[-2px] !mb-[15px] bg-white/[0.08] focus:shadow-[0_0_0_white] focus:border-b focus:border-b-[#ff4d4d] max-[900px]:w-full max-[900px]:!p-2.5 max-[900px]:text-base max-[900px]:rounded-lg max-[900px]:!mb-2.5 max-[420px]:w-full max-[420px]:!p-2.5 max-[420px]:text-sm max-[420px]:rounded-lg max-[420px]:!mb-2.5"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="max-[900px]:w-full max-[420px]:w-full">
                <label className="text-[#ff4d4d] text-[15px] !m-0 font-black max-[900px]:w-full max-[900px]:text-[15px] max-[900px]:font-black max-[900px]:text-left max-[420px]:w-full max-[420px]:text-[15px] max-[420px]:font-black max-[420px]:text-left max-[420px]:!mt-2.5">Last Name</label>
                <br />
                <input
                  className="text-[aliceblue] text-[15px] border-1 w-3/4 !mt-[-2px] !mb-[15px] bg-white/[0.08] focus:shadow-[0_0_0_white] focus:border-b focus:border-b-[#ff4d4d] max-[900px]:w-full max-[900px]:!p-2.5 max-[900px]:text-base max-[900px]:rounded-lg max-[900px]:!mb-2.5 max-[420px]:w-full max-[420px]:!p-2.5 max-[420px]:text-sm max-[420px]:rounded-lg max-[420px]:!mb-2.5"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="max-[900px]:w-full max-[420px]:w-full">
                <label className="text-[#ff4d4d] text-[15px] !m-0 font-black max-[900px]:w-full max-[900px]:text-[15px] max-[900px]:font-black max-[900px]:text-left max-[420px]:w-full max-[420px]:text-[15px] max-[420px]:font-black max-[420px]:text-left max-[420px]:!mt-2.5">College</label>
                <br />
                <input
                  className="text-[aliceblue] text-[15px] border-1 w-3/4 !mt-[-2px] !mb-[15px] bg-white/[0.08] focus:shadow-[0_0_0_white] focus:border-b focus:border-b-[#ff4d4d] max-[900px]:w-full max-[900px]:!p-2.5 max-[900px]:text-base max-[900px]:rounded-lg max-[900px]:!mb-2.5 max-[420px]:w-full max-[420px]:!p-2.5 max-[420px]:text-sm max-[420px]:rounded-lg max-[420px]:!mb-2.5"
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                />
              </div>

              <div className="max-[900px]:w-full max-[420px]:w-full">
                <label className="text-[#ff4d4d] text-[15px] !m-0 font-black max-[900px]:w-full max-[900px]:text-[15px] max-[900px]:font-black max-[900px]:text-left max-[420px]:w-full max-[420px]:text-[15px] max-[420px]:font-black max-[420px]:text-left max-[420px]:!mt-2.5">Email</label>
                <br />
                <input
                  className="text-[aliceblue] text-[15px] border-1 w-3/4 !mt-[-2px] !mb-[15px] bg-white/[0.08] focus:shadow-[0_0_0_white] focus:border-b focus:border-b-[#ff4d4d] max-[900px]:w-full max-[900px]:!p-2.5 max-[900px]:text-base max-[900px]:rounded-lg max-[900px]:!mb-2.5 max-[420px]:w-full max-[420px]:!p-2.5 max-[420px]:text-sm max-[420px]:rounded-lg max-[420px]:!mb-2.5"
                  type="email"
                  value={email}
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="max-[900px]:w-full max-[420px]:w-full">
                <label className="text-[#ff4d4d] text-[15px] !m-0 font-black max-[900px]:w-full max-[900px]:text-[15px] max-[900px]:font-black max-[900px]:text-left max-[420px]:w-full max-[420px]:text-[15px] max-[420px]:font-black max-[420px]:text-left max-[420px]:!mt-2.5">Phone number</label>
                <br />
                <input
                  className="text-[aliceblue] text-[15px] border-1 w-3/4 !mt-[-2px] !mb-[15px] bg-white/[0.08] focus:shadow-[0_0_0_white] focus:border-b focus:border-b-[#ff4d4d] max-[900px]:w-full max-[900px]:!p-2.5 max-[900px]:text-base max-[900px]:rounded-lg max-[900px]:!mb-2.5 max-[420px]:w-full max-[420px]:!p-2.5 max-[420px]:text-sm max-[420px]:rounded-lg max-[420px]:!mb-2.5"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <input className="!p-[10px_20px] rounded-[60px] font-semibold italic border-0 bg-[linear-gradient(to_right,#b00000,#ff4d4d,#ffaaaa,#ff0000)] [background-size:300%_100%] transition-all duration-300 !mt-[5px] hover:[background-position:100%_0] hover:[text-shadow:0_0_10px_white] max-[900px]:w-full max-[900px]:!p-3 max-[900px]:!mt-5 max-[420px]:w-full max-[420px]:!p-3 max-[420px]:!mt-2.5 max-[420px]:rounded-[60px] max-[420px]:font-semibold max-[420px]:italic" type="submit" value="Update" />
            </form>
          </div>
        </div>
      )}
      {particless}
    </div>
  );
};

export default EditProfile;
