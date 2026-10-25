import React, { useState, useEffect, useContext } from "react";
import Fade from "../../Common/Motion/Fade.jsx"
import { AuthContext } from "../../../context/AuthContext";
import { useHistory } from "react-router-dom";
import logout_icon from "../../../assets/pics/logout.png";

const Logout = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    const handle_logout = async () => {
        try {
            localStorage.removeItem("access_token");
            setIsLoggedIn(false);
            history.push("/");
            window.location.reload();
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const logout_button = (
        <div className="transition-all duration-500">
            <button 
            onClick={handle_logout} 
            style={{ cursor: "auto" }}
            className="!rounded-[60px] cursor-auto px-3 !py-[10px] font-semibold border-none bg-[linear-gradient(to_right,#ff8800,#ffdaaa,#30dd8a,#269660)] bg-[length:300%_100%] transition-all duration-300 hover:bg-[position:100%_0] hover:[text-shadow:0_0_10px_white] flex gap ">
                <img src={logout_icon} alt="img" className="h-[25px]" /> 
                <span className="max-md:hidden text-black">Logout</span>
            </button>
        </div>
    );

    return (
        <Fade left>
            <div className="fixed bottom-[10%] right-[25px] z-[555555]">
                {isLoggedIn && logout_button}
            </div>
        </Fade>
    );
};

export default Logout;
