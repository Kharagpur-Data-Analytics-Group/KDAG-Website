import React from "react";
import profileImage from "./profile.jpeg";
import icon_viewed from "./asset_viewed.png";
import icon_commented from "./asset_comment.png";
import { Link } from "react-router-dom";
const DiscussionCard = ({
  post,
  numReplies
}) => {
  return <Link to={`/discussion_page/${post.post_id}/${numReplies}`} className="discussion-card-container [display:flex]! [justify-content:center]! [margin-bottom:20px]!">
      <div className="discussion-card [width:75%]! [display:flex]! [flex-direction:row]! [align-items:center]! [padding:8px]! [justify-content:space-around]! [border-radius:10px]! [border:solid_rgba(255,_255,_255,_0.15)_1px]! [box-shadow:0px_0px_0_white]! [transition:all_0.5s]! [&:hover]:[box-shadow:2px_2px_5px_rgba(255,_255,_255,_0.455)]! max-[500.01px]:[margin-bottom:-10px]! max-[500.01px]:[width:85%]!">
        {/* <div className="discussion-card-image-container">
          <img src={profileImage} alt="Profile" />
        </div> */}
        <div className="discussion-card-description [height:110px]! [padding:12px]! [width:720px]! [background:rgba(255,_255,_255,_0.06)]! [border-radius:6px]! [font-style:italic]! [transition:all_0.5s]! [overflow:hidden]! [backdrop-filter:blur(8px)]! [-webkit-backdrop-filter:blur(8px)]! [.discussion-card:hover_&]:[background:white]! item [flex-grow:1]!">
          {/* <div className="discussion-card-description-heading">
      {post.message}
      </div> */}
          <div className="discussion-card-description-user [color:aqua]! [font-size:15px]!">
            {post.author_name}
          </div>
          <div className="discussion-card-description-details [font-weight:500]! [color:rgb(197,_197,_197)]! [.discussion-card:hover_.discussion-card-description_&]:[color:rgb(140,_140,_140)]! max-[500.01px]:[font-size:12px]! max-[500.01px]:[text-align:justify]! max-[500.01px]:[line-height:15px]!">
            {post.message}
          </div>
        </div>
        <div className="discussion-card-actions [height:110px]! [background-color:white]! [padding:22px]! [padding-top:24px]! [background:rgba(255,_255,_255,_0.06)]! [border-radius:6px]! [color:rgb(197,_197,_197)]! [line-height:30px]! [font-style:italic]! [display:flex]! [flex-direction:column]! [align-items:center]! [justify-content:center]! [transition:all_0.5s]! [margin-left:5px]! [overflow:hidden]! [backdrop-filter:blur(8px)]! [&_img]:[height:20px]! [&_img]:[position:relative]! [&_img]:[top:-2px]! [&_img]:[margin-right:10px]! [&_img]:[filter:invert(78%)_sepia(22%)_saturate(6951%)_hue-rotate(339deg)_brightness(100%)_contrast(103%)]! [.discussion-card:hover_&]:[background:white]! [.discussion-card:hover_&]:[color:rgb(140,_140,_140)]! max-[500.01px]:[width:50px]! max-[500.01px]:[padding:8px]! max-[500.01px]:[text-wrap:nowrap]! item [flex-grow:1]! item-fixed [flex:0_0_auto]! [width:100px]!">
          {/* <div className="discussion-card-actions-viewed">
      <img src={icon_viewed} alt="Viewed" />
      {post.views}
      </div> */}
          <div className="discussion-card-actions-commented max-[500.01px]:[&_img]:[margin-right:3px]!">
            <img src={icon_commented} alt="Commented" />
            {numReplies}
          </div>
        </div>
        <div className="discussion-card-last-comment [height:110px]! [width:200px]! [background:rgba(255,_255,_255,_0.06)]! [border-radius:6px]! [color:rgb(197,_197,_197)]! [font-style:italic]! [white-space:nowrap]! [display:flex]! [flex-direction:column]! [align-items:center]! [justify-content:center]! [font-weight:500]! [transition:all_0.5s]! [margin-left:5px]! [overflow:hidden]! [backdrop-filter:blur(8px)]! [.discussion-card:hover_&]:[background:white]! [.discussion-card:hover_&]:[color:rgb(140,_140,_140)]! max-[500.01px]:[width:100px]! item [flex-grow:1]! item-fixed [flex:0_0_auto]! [width:100px]!">
          {/* <div className="discussion-card-last-comment-user">
      <span>{post.date}</span>
      </div> */}
          <div className="discussion-card-last-comment-date [&_span]:[font-weight:600]! [&_span]:[color:rgb(255,_150,_38)]! max-[500.01px]:[font-size:13px]! max-[500.01px]:[text-wrap:wrap]! max-[500.01px]:[padding:8px]!">
            <strong>Last edited</strong> on <span>{post.date}</span>
          </div>
        </div>
      </div>
    </Link>;
};
export default DiscussionCard;
