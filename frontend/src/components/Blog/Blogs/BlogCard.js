import React from "react";
import "./BlogCard.css";
import dataAnalysis from "./../../../assets/pics/dataanlysis_nyc.png";
import Fade from "../../Common/Motion/Fade.js"

const BlogCard = ({ blog }) => {
	const spaces = " ".repeat(10);

	return (
		<a
			class="blog-list-card-link"
			href={blog?.link}
			target="_blank"
			rel="noreferrer noopener"
		>
			<Fade bottom>
				<div className="blog-list-card">
					<div class="blog-list-card-image">
						<img src={blog?.img || dataAnalysis} alt="" />
					</div>
					<div class="blog-list-card-text">
						<div class="blog-list-card-topic">{blog?.topic || "TOPIC"}</div>
						<div class="blog-list-card-title">
							{blog?.title || "Blog Page Title"}
						</div>
						{/* <div class="blog-list-card-author">
							by
							{blog?.authors?.map((author, index) => {
								return (
									<span key={index} class="blog-list-card-authorname">
										{author}
									</span>
								);
							}) || (
								<>
									{" "}
									<span class="blog-list-card-authorname">Author1</span>,
									<span class="blog-list-card-authorname">Author2</span> and
									<span class="blog-list-card-authorname">Author3</span>|{" "}
									<span class="blog-list-card-date">Jan 23, 2021</span>
								</>
							)}
						</div> */}
						<span class="blog-list-card-date">
							{blog?.date || "Apr 17, 2021"}
						</span>
						<hr />
						<div class="blog-list-card-description">
							{blog?.description ||
								`
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a ut ex
          doloribus. Incidunt maiores nisi deleniti dolor mollitia. Veritatis
          molestiae sint, eligendi molestias tempora adipisci a corrupti iste
          blanditiis! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nemo, ex? ...
          `}
						</div>
						<div class="blog-list-card-tags">
							Tags:{spaces}
							{blog?.tag?.map((tag, index) => {
								return (
									<div key={index} class="blog-list-card-tag">
										{tag}
									</div>
								);
							}) || (
									<>
										<div class="blog-list-card-tag">K-Means</div>
										<div class="blog-list-card-tag">Clustering</div>
									</>
								)}
						</div>
					</div>
				</div>
			</Fade>
		</a>
	);
};

export default BlogCard;
