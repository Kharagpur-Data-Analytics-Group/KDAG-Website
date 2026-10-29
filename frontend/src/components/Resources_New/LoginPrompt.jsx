import React from "react";
const LoginPrompt = ({
  open,
  onClose,
  message
}) => {
  if (!open) return null;
  const defaultMessage = "Sign-in/Login to our for the full experience of our website";
  return <div className="login-prompt-backdrop [position:fixed]! [top:0]! [left:0]! [right:0]! [bottom:0]! [background:rgba(10,0,0,0.7)]! [z-index:9999]! [display:flex]! [align-items:flex-start]! [justify-content:center]! [animation:fadeIn_0.2s]!" onClick={onClose}><style>{"@keyframes fadeIn {\n  from { opacity: 0; }\n  to   { opacity: 1; }\n}\n@keyframes slideDown {\n  from { transform: translateY(-80px); opacity: 0; }\n  to   { transform: translateY(0); opacity: 1; }\n}"}</style>
      <div className="login-prompt-box [margin-top:120px]! [background:#120007]! [border:2px_solid_#ff4040]! [border-radius:18px]! [box-shadow:0_8px_32px_#ff1a1a44]! [padding:2.2rem_2.5rem_1.5rem_2.5rem]! [min-width:340px]! [max-width:90vw]! [color:#fff]! [display:flex]! [flex-direction:column]! [align-items:center]! [animation:slideDown_0.35s_cubic-bezier(0.4,0,0.2,1)]! max-[768.01px]:[min-width:96vw]! max-[768.01px]:[max-width:99vw]! max-[768.01px]:[padding:1.2rem_0.7rem_1rem_0.7rem]! max-[768.01px]:[margin-top:60px]! max-[768.01px]:[border-radius:12px]!" onClick={e => e.stopPropagation()}>
        <div className="login-prompt-text [font-size:1.18rem]! [font-weight:700]! [color:#ff4040]! [margin-bottom:1.8rem]! [text-align:center]! [text-shadow:0_2px_10px_#ff1a1a55]! max-[768.01px]:[font-size:1rem]! max-[768.01px]:[margin-bottom:1.2rem]!">
          {message || defaultMessage}
        </div>
        <button className="login-prompt-btn [padding:0.8rem_1.5rem]! [border-radius:30px]! [font-size:1rem]! [font-weight:600]! [cursor:pointer]! [transition:all_0.3s_cubic-bezier(0.25,_0.46,_0.45,_0.94)]! [background:rgb(195,_65,_65)]! [color:#fff]! [border:3px_solid_rgb(112,_43,_43)]! [&:hover]:[border:3px_solid_rgb(112,_43,_43)]! [&:hover]:[border-radius:30px]! [&:hover]:[box-shadow:0_0_10px_rgba(195,_65,_65,_1)]! [&:hover]:[background:rgb(180,_55,_55)]! [&:hover]:[transform:scale(1.05)]! max-[768.01px]:[font-size:1rem]! max-[768.01px]:[padding:0.6rem_1.2rem]!" onClick={() => window.location.href = "/auth"}>
          Login
        </button>
      </div>
    </div>;
};
export default LoginPrompt;
