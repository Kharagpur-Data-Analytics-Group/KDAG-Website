import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Fade from "../Common/Motion/Fade.jsx";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import profileImage from "./profile.jpeg";
import icon_viewed from "./asset_viewed.png";
import icon_commented from "./asset_comment.png";
import DiscussionComment from "./DiscussionComment";
import upvote_img from "./../../assets/pics/upvote.png";
import downvote_img from "./../../assets/pics/downvote.png";
import already_upvoted_img from "./../../assets/pics/already_upvoted.png";
import already_downvoted_img from "./../../assets/pics/already_downvoted.png";
import { jwtDecode } from "jwt-decode";
const HeaderDiscussion = () => {
  const {
    post_id,
    numReplies
  } = useParams();
  const [post, setPost] = useState([]);
  const history = useHistory();
  const [deleted, setDeleted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [jsonData, setJsonData] = useState([]);
  const [userId, setUserId] = useState("empty");
  const token = localStorage.getItem("access_token");
  const [showDelete, setShowDelete] = useState(false);
  const [currLevel, setCurrLevel] = useState("none");
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  useEffect(() => {
    if (userId === post.author_id) {
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  }, [post.author_id]);
  useEffect(() => {
    if (post?.voters?.includes(userId)) {
      setIsUpvoted(true);
    } else {
      setIsUpvoted(false);
    }
    if (post?.voters_downvoted?.includes(userId)) {
      setIsDownvoted(true);
    } else {
      setIsDownvoted(false);
    }
  }, [post, userId]);
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.sub && decodedToken.sub.user_id) {
          setUserId(decodedToken.sub.user_id);
          setIsAdmin(decodedToken.sub.is_admin);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);
  const userProfileLink = userId === post.author_id ? `/user_profile_self/${post.author_id}` : `/user_profile_public/${post.author_id}`;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_FETCH_URL}/get_post/${post_id}`, {
          method: "GET"
        });
        if (!response.ok) {
          const jsonData = await response.json();
          // toast.error(jsonData.message);
          console.log("Error", jsonData);
        } else {
          const jsonData = await response.json();
          setPost(jsonData.post);
          setJsonData(jsonData);
          setUpvotes(jsonData.post.upvotes);
          setDownvotes(jsonData.post.downvotes);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        // toast.error("Error fetching posts. Please try again later.");
      }
    };
    fetchPosts();
  }, [post_id]);
  const [showReplies, setShowReplies] = useState(false);
  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_FETCH_URL}/delete_post/${post_id}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const jsonData = await response.json();
        console.log("Error", jsonData);
      } else {
        const jsonData = await response.json();
        setDeleted(true);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const handleUpVote = async () => {
    try {
      if (!token) {
        throw new Error("User is not authenticated.");
      }
      const response = await fetch(`${import.meta.env.VITE_FETCH_URL}/upvote/${post_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to upvote the post");
      }
      const result = await response.json();
      setUpvotes(result.newUpvoteCount);
      setDownvotes(result.newDownvoteCount);
      if (result?.new_voters?.includes(userId)) {
        setIsUpvoted(true);
        setIsDownvoted(false);
      } else if (result?.new_voters_downvoted?.includes(userId)) {
        setIsDownvoted(true);
        setIsUpvoted(false);
      } else {
        setIsDownvoted(false);
        setIsUpvoted(false);
      }
    } catch (error) {
      console.error("Error during upvote:", error.message);
    }
  };
  const handleDownVote = async () => {
    try {
      if (!token) {
        throw new Error("User is not authenticated.");
      }
      const response = await fetch(`${import.meta.env.VITE_FETCH_URL}/downvote/${post_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to downvote the post");
      }
      const result = await response.json();
      setUpvotes(result.newUpvoteCount);
      setDownvotes(result.newDownvoteCount);
      if (result?.new_voters?.includes(userId)) {
        setIsUpvoted(true);
        setIsDownvoted(false);
      } else if (result?.new_voters_downvoted?.includes(userId)) {
        setIsDownvoted(true);
        setIsUpvoted(false);
      } else {
        setIsDownvoted(false);
        setIsUpvoted(false);
      }
    } catch (error) {
      console.error("Error during downvote:", error.message);
    }
  };
  useEffect(() => {
    if (deleted) {
      history.push("/forum");
    }
  }, [deleted]);
  const replies = jsonData.post ? jsonData.post.replies.map((reply, index) => <Fade bottom key={index + 1}>
          <DiscussionComment post_id={post_id} level={(index + 1).toString()} reply={reply} />
        </Fade>) : [];
  return <div className="header-discussion-card-container [display:flex]! [flex-direction:column]! [justify-content:center]! [align-items:center]! [margin-bottom:20px]! [padding-top:115px]! [margin-top:0]! [height:auto]! [width:82%]! max-[500.01px]:[padding-top:95px]! max-[500.01px]:[width:100%]!">
      <div className="header-discussion-card [position:relative]! [left:12%]! [width:75%]! [height:auto]! [display:flex]! [flex-direction:row]! [padding:5px]! [border-radius:20px]! [transition:all_0.5s]! max-[500.01px]:[left:0%]! max-[500.01px]:[width:95%]! max-[500.01px]:[padding:5px]! max-[500.01px]:[border-radius:10px]!">
        {/* <div className="header-discussion-card-image-container">
     <img src={profileImage} />
     </div> */}
        <div className="header-discussion-card-description [height:auto]! [padding:12px_20px]! [width:100%]! [background:rgba(255,_255,_255,_0.05)]! [border-radius:15px]! [font-style:italic]! [transition:all_0.5s]! [backdrop-filter:blur(8px)]!">
          <div className="header-discussion-card-description-poster [height:auto]! [overflow:hidden]! [border-top-left-radius:15px]! [border-top-right-radius:15px]! [background-position:top]! [display:flex]! [align-items:center]! [justify-content:center]! [padding-bottom:15px]! [border-bottom:white_solid_1px]! [&_img]:[height:100%]! max-[500.01px]:[border-top-left-radius:8px]! max-[500.01px]:[border-top-right-radius:8px]! max-[500.01px]:[height:200px]! max-[500.01px]:[&_img]:[height:auto]! max-[500.01px]:[&_img]:[width:100%]! max-[500.01px]:[&_img]:[border-radius:5px]!">
            <img src="https://img.freepik.com/free-photo/cyberpunk-urban-scenery_23-2150712464.jpg" alt="img" />
          </div>

          {/* <div className="header-discussion-card-description-heading">
      Description Title Description Title Description Title
      </div> */}
          <div className="header-discussion-card-voter-box [display:flex]! [justify-content:space-between]! [align-items:center]!">
            <div className="header-discussion-card-initial-details">
              <div className="header-discussion-card-posted-by [position:relative]! [top:0px]! [color:cyan]! [font-size:18px]! [font-weight:600]! [margin-bottom:4px]! [transition:all_0.3s]! [&:hover]:[text-shadow:0px_0px_15px_cyan]!" style={{
              cursor: "none"
            }}>
                <Link to={userProfileLink}>{post.author_name}</Link>
              </div>
              <div className="header-discussion-card-last-comment-date [position:relative]! [top:-10px]! [font-size:12px]! [color:rgb(126,_126,_126)]! [&_span]:[font-weight:600]! [&_span]:[font-size:13px]! [&_span]:[color:rgb(255,_150,_38)]!" style={{
              cursor: "none"
            }}>
                posted on <span>{post.date}</span>
              </div>
            </div>
            <div className="discussion-votes [display:flex]! [color:#ffffff]! [&_button]:[display:flex]! [&_button]:[align-items:center]! [&_button]:[justify-content:center]! [&_button]:[background:transparent]! [&_button]:[border:none]! [&_button]:[padding:5px]! [&_button]:[border-radius:100px]! [&_button]:[transition:all_0.3s]! [&_button:hover]:[box-shadow:0_0_10px_#ff9626]! [&_button_img]:[height:25px]! [&_button_img]:[cursor:none]!">
              <div className="discussion-votes-upvotes [display:flex]! [align-items:center]! [justify-content:center]! [margin-right:15px]!">
                <button onClick={handleUpVote}>
                  <img src={isUpvoted ? already_upvoted_img : upvote_img} alt="upvote_img" />
                </button>
                <span>{upvotes}</span>
              </div>
              <div className="discussion-votes-downvotes [display:flex]! [align-items:center]! [justify-content:center]! [margin-right:15px]!">
                <button onClick={handleDownVote}>
                  <img src={isDownvoted ? already_downvoted_img : downvote_img} alt="upvote_img" />
                </button>
                <span>{downvotes}</span>
              </div>
            </div>
          </div>

          <div className="header-discussion-card-description-details [margin-top:15px]! [color:rgb(197,_197,_197)]! [text-align:justify]! [min-height:110px]! [padding:8px]! [width:100%]! [background:rgba(255,_255,_255,_0.06)]! [border-radius:6px]! [font-style:italic]! [transition:all_0.5s]! [white-space:pre-wrap]! [font-size:16px]! max-[500.01px]:[margin-top:10px]! max-[500.01px]:[padding:8px]! max-[500.01px]:[font-size:16px]!">
            {post.message}
          </div>
          <div className="header-discussion-card-actions [margin-top:15px]! [display:flex]! [border-radius:6px]! [color:rgb(197,_197,_197)]! [font-style:italic]! [transition:all_0.5s]! [justify-content:space-between]! [&_img]:[height:20px]! [&_img]:[position:relative]! [&_img]:[top:-2px]! [&_img]:[margin-right:5px]! [&_img]:[filter:invert(78%)_sepia(22%)_saturate(6951%)_hue-rotate(339deg)_brightness(100%)_contrast(103%)]! [.header-discussion-card:hover_&]:[color:rgb(140,_140,_140)]!">
            {/* <div className="header-discussion-card-actions-viewed">
       <img src={icon_viewed} />
       53
       </div> */}
            <div className="header-discussion-card-actions-commented [.header-discussion-card-actions_&]:[margin-right:25px]! [.header-discussion-card-actions_&_button]:[background:transparent]! [.header-discussion-card-actions_&_button]:[border:none]! [.header-discussion-card-actions_&_button]:[color:rgb(197,_197,_197)]! [.header-discussion-card-actions_&_button]:[border-radius:50px]! [.header-discussion-card-actions_&_button]:[padding:5px]! [.header-discussion-card-actions_&_button:hover]:[box-shadow:0px_0px_3px_rgb(255,_150,_38)]! [.header-discussion-card-actions_&_img]:[margin-right:2px]!">
              <button onClick={toggleReplies} style={{
              cursor: "none"
            }}>
                <img src={icon_commented} />
                {numReplies}
              </button>
            </div>
            <div className="header-discussion-card-actions-delete [.header-discussion-card-actions_&_button]:[background:transparent]! [.header-discussion-card-actions_&_button]:[color:rgb(255,_150,_38)]! [.header-discussion-card-actions_&_button]:[border:none]! [.header-discussion-card-actions_&_button]:[font-size:14px]! [.header-discussion-card-actions_&_button]:[font-weight:700]! [.header-discussion-card-actions_&_button]:[font-style:italic]! [.header-discussion-card-actions_&_button]:[transition:0.3s_all]! [.header-discussion-card-actions_&_button]:[padding:4px]! [.header-discussion-card-actions_&_button]:[border-radius:35px]! [.header-discussion-card-actions_&_button:hover]:[background:rgb(255,_150,_38)]! [.header-discussion-card-actions_&_button:hover]:[color:black]!">
              {token && <button style={{
              cursor: "none"
            }}>
                  <Link style={{
                cursor: "none"
              }} to={`/create_comment/${post_id}/${currLevel}`}>
                    Comment
                  </Link>
                </button>}
            </div>
            {(showDelete || isAdmin) && <div className="header-discussion-card-actions-delete [.header-discussion-card-actions_&_button]:[background:transparent]! [.header-discussion-card-actions_&_button]:[color:rgb(255,_150,_38)]! [.header-discussion-card-actions_&_button]:[border:none]! [.header-discussion-card-actions_&_button]:[font-size:14px]! [.header-discussion-card-actions_&_button]:[font-weight:700]! [.header-discussion-card-actions_&_button]:[font-style:italic]! [.header-discussion-card-actions_&_button]:[transition:0.3s_all]! [.header-discussion-card-actions_&_button]:[padding:4px]! [.header-discussion-card-actions_&_button]:[border-radius:35px]! [.header-discussion-card-actions_&_button:hover]:[background:rgb(255,_150,_38)]! [.header-discussion-card-actions_&_button:hover]:[color:black]!">
                <button onClick={handleDelete} style={{
              cursor: "none"
            }}>
                  Delete post
                </button>
              </div>}
          </div>
        </div>
      </div>

      {showReplies && replies}
    </div>;
};
export default HeaderDiscussion;
