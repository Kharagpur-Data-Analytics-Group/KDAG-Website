import React from "react";

const LoginPrompt = ({ open, onClose, message }) => {
  if (!open) return null;

  const defaultMessage = "Sign-in/Login to our for the full experience of our website";

  return (
    <div className={`fixed top-0 bottom-0 left-0 right-0 bg-[rgba(10,0,0,0.7)] z-9999 flex items-start justify-center transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"} `} 
    onClick={onClose}>
      <div className={`!mt-40 bg-[#120007] border-[2px] border-[#ff4040] rounded-[18px] shadow-[0_8px_32px_#ff1a1a44] !p-[2.2rem_2.5rem_1.5rem_2.5rem] min-w-85 max-w-[90vw] !text-white flex flex-col items-center transition-[all_0.35s_cubic-bezier(0.4,0,0.2,1)] ${open ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"} max-md:min-w-[96vw] max-md:max-w-[99vw] max-md:p-[1.2rem_0.7rem_1rem_0.7rem] max-md:!mt-15 `}
      onClick={e => e.stopPropagation()}>
        <div className="text-[1.18rem] font-bold !text-[#ff4040] !mb-[1.8rem] text-center text-shadow-[0_2px_10px_#ff1a1a55] max-md:text-[1rem] max-md:!mb-[1.2rem]">
          {message || defaultMessage}
        </div>
        <button
          className="!py-[0.8rem] !px-6 !rounded-[30px] text-[1rem] cursor-pointer bg-[rgb(195,65,65)] !text-white font-bold border-[3px] border-[rgb(112,43,43)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-105 hover:bg-[rgb(180,55,55)] hover:shadow-[0_0_10px_rgba(195,65,65,1)] max-md:text-[1rem] max-md:!py-[0.6rem] max-md:!px-[1.2rem]"
          onClick={() => (window.location.href = "/auth")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPrompt;