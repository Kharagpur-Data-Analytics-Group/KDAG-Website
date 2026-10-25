import { API_BASE_URL } from "../../config/api.js";
import React, { useEffect, useState, useContext } from "react";
import Header from "./Header";
import Fade from "../Common/Motion/Fade.jsx";
import Particless from "../Common/Particles/Particless";
import DiscussionCard from "./DiscussionCard";
import icon_add from "./asset_addition_symbol.png";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
const ForumPage = () => {
  const particless = React.useMemo(() => <Particless />, []);
  const {
    isLoggedIn,
    setIsLoggedIn,
    checkAuthStatus
  } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    checkAuthStatus();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get_posts`, {
          method: "GET"
        });
        if (!response.ok) {
          const jsonData = await response.json();
          console.log(jsonData.message);
        } else {
          const jsonData = await response.json();
          setPosts(jsonData.posts);
          setFilteredPosts(jsonData.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);
  const handleSearch = e => {
    setSearchQuery(e.target.value);
    const filtered = posts.filter(post => post.author_name.toLowerCase().includes(e.target.value.toLowerCase()) || post.message.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredPosts(filtered);
  };
  return <>
      <Fade left>
        <Header />
      </Fade>
      <div className="forum-section">
        <div className="discussion-cards">
          <div className="discussion-card-header [display:flex]! [justify-content:space-between]! [align-items:center]! [border:solid_#ffffff26_1px]! [margin:10px_50px]! [padding:10px]! [border-radius:50px]! [margin-bottom:50px]!">
            <div className="discussion-card-create-new [display:flex]! [justify-content:center]!">
              <div className="discussion-card-button-container [display:flex]! [flex-direction:row]! [align-items:center]! [transition:all_0.8s]! [border-radius:50px]! [&_button]:[padding:10px_20px]! [&_button]:[border-radius:60px]! [&_button]:[font-weight:600]! [&_button]:[font-style:italic]! [&_button]:[border:none]! [&_button]:[background-image:linear-gradient(to_right,_#ff8800,_#ffdaaa,_#30dd8a,_#269660)]! [&_button]:[background-size:300%_100%]! [&_button]:[transition:all_0.3s]! [&_button:hover]:[background-position:100%_0]! [&_button:hover]:[text-shadow:0_0_10px_white]! [&_button_img]:[height:20px]! [&_button_img]:[margin-right:20px]! max-[600.01px]:[&_button]:[width:40px]! max-[600.01px]:[&_button]:[height:40px]! max-[600.01px]:[&_button]:[border-radius:50px]! max-[600.01px]:[&_button]:[padding:0]! max-[600.01px]:[&_button_img]:[margin:0]! max-[600.01px]:[&_button_img]:[height:20px]! max-[600.01px]:[&_button_img]:[width:20px]!">
                <button style={{
                cursor: "none"
              }}>
                  <Link to="/create_discussion" style={{
                  cursor: "none"
                }}>
                    <img src={icon_add} alt="New Discussion Icon" />
                    <span className="new-discussion-text max-[600.01px]:[display:none]!">New Discussion</span>
                  </Link>
                </button>
              </div>
            </div>

            <div className="search-bar-container [display:flex]! [align-items:center]!">
              <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} className="search-bar-input [width:225px]! [border-radius:50px_0_0_50px]! [border:0px_solid_#ccc]! [background-color:#1f1f1f]! [color:#fff]! [outline:none]! [padding:10px_15px]! [margin-right:-15px]! [&::placeholder]:[color:#999]! max-[600.01px]:[width:200px]! max-[600.01px]:[font-size:13px]! max-[450.01px]:[width:125px]!" />
              <button className="search-bar-button [padding:8px_16px]! [border-radius:50px]! [border:1px_solid_#e69c00]! [background-color:black]! [color:#fff]! [margin-left:0]! [font-weight:700]! [background-image:linear-gradient(to_right,_black,_black,_#ff8800,_#ffdaaa)]! [background-size:300%_100%]! [transition:all_0.3s]! [height:40px]! [cursor:none]! [&:hover]:[background-position:100%_0]! [&:hover]:[text-shadow:0_0_10px_white]! [&:hover]:[color:#1f1f1f]! [&:hover]:[border:1px_solid_black]! [&:hover]:[cursor:none]! max-[600.01px]:[font-size:12px]!">Search</button>
            </div>
          </div>
          {filteredPosts.map(post => <Fade bottom key={post.post_id}>
              <DiscussionCard post={post} numReplies={post.replies} />
            </Fade>)}
        </div>
      </div>
      {particless}
    </>;
};
export default ForumPage;
