import React from "react";
import profileImage from "./profile.jpeg";
import icon_viewed from "./asset_viewed.png";
import icon_commented from "./asset_comment.png";
import { Link } from "react-router-dom";

const DiscussionCard = ({ post, numReplies }) => {
	return (
		<Link
			to={`/discussion_page/${post.post_id}/${numReplies}`}
			className="group flex justify-center mb-[20px] w-3/4"
		>
			<div className="group w-full flex flex-row items-center m-2 p-2 justify-around rounded-[10px] border !border-white/15 transition-all duration-500 hover:shadow-[2px_2px_5px_rgba(255,255,255,0.455)] ">
				<div className="flex-grow h-[110px] p-3 w-[720px] bg-white/5 rounded-md italic transition-all duration-500 overflow-hidden backdrop-blur-md group-hover:bg-white max-[500px]:w-auto">
					<div className="text-cyan-400 text-[15px]">
						{post.author_name}
					</div>
					<div className="font-medium line-clamp-2 text-[rgb(197,197,197)] max-[500px]:text-xs max-[500px]:leading-[15px] max-[500px]:text-justify group-hover:text-[rgb(140,140,140)]">
						{post.message}
					</div>
				</div>
				<div className="flex-shrink-0 w-[75px] h-[110px] bg-white/5 p-5.5 pt-6 rounded-md text-[rgb(197,197,197)] leading-[30px] italic flex flex-col items-center justify-center transition-all duration-500 ml-1 overflow-hidden backdrop-blur-md group-hover:bg-white group-hover:text-[rgb(140,140,140)] max-[500px]:w-[50px] max-[500px]:p-2">
					<div className="flex items-center">
						<img src={icon_commented} alt="Commented" className="h-5 relative top-[-2px] mr-2.5 filter-[invert(78%)_sepia(22%)_saturate(6951%)_hue-rotate(339deg)_brightness(100%)_contrast(103%)] max-[500px]:mr-0.5" />
						{numReplies}
					</div>
				</div>
				<div className="flex-shrink-0 px-3 h-[110px] bg-white/5 rounded-md text-[rgb(197,197,197)] italic whitespace-nowrap flex flex-col items-center justify-center font-medium transition-all duration-500 ml-1 overflow-hidden backdrop-blur-md group-hover:bg-white group-hover:text-[rgb(140,140,140)] max-[500px]:w-[100px]">
					<div className="font-bold text-white transition-all duration-500 max-[500px]:text-xs max-[500px]:text-wrap max-[500px]:p-2">
						<span className="group-hover:text-gray-400"><strong>Last edited</strong> on </span><span className="font-bold text-[rgb(255,150,38)]">{post.date}</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default DiscussionCard;
