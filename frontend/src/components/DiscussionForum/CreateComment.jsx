import { API_BASE_URL } from "../../config/api.js";
import Particless from "../Common/Particles/Particless";
import Fade from "../Common/Motion/Fade.jsx";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { jwtDecode } from "jwt-decode";
const CreateComment = () => {
  const particless = React.useMemo(() => <Particless />, []);
  const {
    isLoggedIn,
    setIsLoggedIn
  } = useContext(AuthContext);
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day.toString().padStart(2, "0")}-${month.toString().padStart(2, "0")}-${year.toString().slice(-2)}`;
  const {
    post_id
  } = useParams();
  let {
    currLevel
  } = useParams();
  currLevel = decodeURIComponent(currLevel);
  const history = useHistory();
  const [commentMessage, setCommentMessage] = useState("");
  const token = localStorage.getItem("access_token");
  const [rdirect, setRdirect] = useState(false);
  const [level, setLevel] = useState(currLevel);
  // console.log(currLevel);
  const [authorId, setAuthorId] = useState("");
  useEffect(() => {
    if (currLevel === "none") {
      setLevel("");
    }
  }, []);
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.sub && decodedToken.sub.user_id) {
          setAuthorId(decodedToken.sub.user_id);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/auth");
    }
  }, [isLoggedIn]);
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = {
        message: commentMessage,
        author_id: authorId,
        level: level,
        date: formattedDate
      };
      const response = await fetch(`${API_BASE_URL}/reply/create_reply/${post_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData
        })
      });
      if (!response.ok) {
        const jsonData = await response.json();
        console.log("Error creating comment:", jsonData.message);
      } else {
        const jsonData = await response.json();
        console.log("comment posted successfully:", jsonData.message);
        setRdirect(true);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  if (rdirect) {
    history.goBack();
  }
  return <div>
      {isLoggedIn && <div className="create-discussion-container [height:100vh]! [display:flex]! [align-items:center]! [justify-content:center]!">
          <div className="discussion-circle [position:absolute]! [width:600px]! [height:600px]! [border:solid_rgb(139,_218,_255)_4px]! [border-radius:50%]! [top:110px]! [border-style:dotted]!"></div>
          <Fade right>
            <div className="create-discussion-form-container [margin-top:100px]! [background-color:rgba(255,_255,_255,_0.06)]! [border-radius:15px]! [box-shadow:0_5px_15px_rgba(0,_0,_0,_0.35)]! [overflow:hidden]! [width:500px]! [height:520px]! [padding:25px]! [backdrop-filter:blur(12px)]! [&_form]:[background-color:rgba(255,_255,_255,_0)]! [&_form]:[padding:0_40px]! [&_form]:[height:100%]! [&_h1]:[color:rgb(255,_255,_255)]! [&_h1]:[font-size:25px]! [&_h1]:[font-weight:900]! [&_form_input]:[background-color:rgb(255,_255,_255,_0.04)]! [&_form_input]:[border:none]! [&_form_input]:[border-radius:500px]! [&_form_input]:[margin:25px_0_6px_0]! [&_form_input]:[padding:10px_15px]! [&_form_input]:[font-size:14px]! [&_form_input]:[font-weight:600]! [&_form_input]:[width:100%]! [&_form_input]:[outline:none]! [&_form_input]:[color:rgb(255,_255,_255)]! [&_form_textarea]:[background-color:rgb(255,_255,_255,_0.04)]! [&_form_textarea]:[border:none]! [&_form_textarea]:[border-radius:25px]! [&_form_textarea]:[margin:6px_0]! [&_form_textarea]:[padding:10px_15px]! [&_form_textarea]:[font-size:14px]! [&_form_textarea]:[font-weight:600]! [&_form_textarea]:[width:100%]! [&_form_textarea]:[min-height:250px]! [&_form_textarea]:[max-height:250px]! [&_form_textarea]:[resize:none]! [&_form_textarea]:[outline:none]! [&_form_textarea]:[color:rgb(255,_255,_255)]! [&_form_textarea]:[transition:all_0.5s]! [&_form_input[type='text']:focus]:[box-shadow:0_0_5px_rgba(255,_255,_255,_0.76)]! [&_form_textarea[type='text']:focus]:[box-shadow:0_0_5px_rgba(255,_255,_255,_0.76)]! [&_button[type='submit']]:[color:#ffffff]! [&_button[type='submit']]:[font-size:15px]! [&_button[type='submit']]:[padding:7px_45px]! [&_button[type='submit']]:[border:1px_solid_transparent]! [&_button[type='submit']]:[border-radius:500px]! [&_button[type='submit']]:[font-weight:600]! [&_button[type='submit']]:[letter-spacing:0.5px]! [&_button[type='submit']]:[margin-top:25px]! [&_button[type='submit']]:[cursor:none]! [&_button[type='submit']]:[background-image:linear-gradient(_to_right,_#4e3eff,_#40dfe4,_#30dd8a,_#269660_)]! [&_button[type='submit']]:[background-size:300%_100%]! [&_button[type='submit']]:[transition:all_0.3s]! [&_button[type='submit']]:[width:100%]! [&_button[type='submit']:hover]:[background-position:100%_0]! [&_button[type='submit']:hover]:[text-shadow:0_0_10px_white]! max-[420.01px]:[width:330px]! max-[420.01px]:[height:520px]! max-[420.01px]:[display:flex]! max-[420.01px]:[align-items:center]! max-[420.01px]:[&_form]:[margin-left:15px]! max-[420.01px]:[&_form]:[width:250px]! max-[420.01px]:[&_form]:[display:flex]! max-[420.01px]:[&_form]:[flex-direction:column]! max-[420.01px]:[&_form]:[align-items:center]! max-[420.01px]:[&_form_input]:[margin:25px_0_6px_0]! max-[420.01px]:[&_form_input]:[padding:10px_15px]! max-[420.01px]:[&_form_input]:[width:250px]! max-[420.01px]:[&_form_textarea]:[width:250px]!">
              <form onSubmit={handleSubmit}>
                <h1>Post Comment</h1>
                {/* <input type="text" placeholder="Title" required /> */}
                <textarea type="text" placeholder="Type your message here" required onChange={e => setCommentMessage(e.target.value)} />
                <button type="submit">Comment</button>
              </form>
            </div>
          </Fade>
        </div>}
      {particless}
    </div>;
};
export default CreateComment;
