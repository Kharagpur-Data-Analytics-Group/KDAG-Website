import React from "react";
import "./HeaderDiscussion.css";
import profileImage from "./profile.jpeg";
import icon_viewed from "./asset_viewed.png";
import icon_commented from "./asset_comment.png";
import { Link } from "react-router-dom";

const DiscussionCard = ({ post, numReplies }) => {
	return (
		<Link
			to={`/discussion_page/${post.post_id}/${numReplies}`}
			className="discussion-card-container"
		>
			<div className="discussion-card">
				{/* <div className="discussion-card-image-container">
          <img src={profileImage} alt="Profile" />
        </div> */}
				<div className="discussion-card-description item">
					{/* <div className="discussion-card-description-heading">
						{post.message}
					</div> */}
					<div className="discussion-card-description-user">
						{post.author_name}
					</div>
					<div className="discussion-card-description-details">
						{post.message}
					</div>
				</div>
				<div className="discussion-card-actions item item-fixed">
					{/* <div className="discussion-card-actions-viewed">
						<img src={icon_viewed} alt="Viewed" />
						{post.views}
					</div> */}
					<div className="discussion-card-actions-commented">
						<img src={icon_commented} alt="Commented" />
						{numReplies}
					</div>
				</div>
				<div className="discussion-card-last-comment item item-fixed">
					{/* <div className="discussion-card-last-comment-user">
						<span>{post.date}</span>
					</div> */}
					<div className="discussion-card-last-comment-date">
						<strong>Last edited</strong> on <span>{post.date}</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default DiscussionCard;
