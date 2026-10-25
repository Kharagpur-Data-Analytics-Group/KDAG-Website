import React from "react";
import styled from "styled-components";
import dataAnalysis from "./../../../assets/pics/dataanlysis_nyc.png";
import Fade from "../../Common/Motion/Fade.jsx";

const StyledLink = styled.a`
  text-decoration: none;
  display: block;
  width: 25%;
  min-width: 31rem;

  .blog-list-card {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
    margin: 2rem;
    transition: all 0.3s ease;
    height: 95%;
    background-color: rgba(255, 255, 255, 0.062);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 12px;
  }

  .blog-list-card:hover {
    transform: scale(1.02);
    background-color: rgba(104, 58, 58, 0.15);
    box-shadow: 0 0 20px rgba(250, 57, 70, 1);
    transform: translateY(-5px);
  }

  .blog-list-card:hover .blog-list-card-title {
    color: white;
  }

  .blog-list-card:hover .blog-list-card-description {
    color: white;
  }

  .blog-list-card:hover .blog-list-card-tag {
    color: #44a200;
  }

  .blog-list-card-image {
    width: 100%;
  }

  .blog-list-card-image img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
    border-radius: 15px;
  }

  .blog-list-card-text {
    padding: 1rem;
  }

  .blog-list-card-topic {
    color: #bfbfbf;
    font-family: Nunito, sans-serif;
    font-size: 1rem;
    font-weight: 700;
  }

  .blog-list-card-title {
    color: #fff;
    font-family: Poppins, sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0.5rem 0;
    transition: all 0.3s;
  }

  .blog-list-card-author {
    font-family: Poppins, sans-serif;
    font-size: 0.8rem;
  }

  .blog-list-card-authorname {
    color: #dc2626;
  }

  .blog-list-card-date {
    color: #bfbfbf;
    font-size: 0.9rem;
  }

  .blog-list-card-description {
    color: #bfbfbf;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    transition: all 0.3;
  }

  .blog-list-card-tags {
    margin: 1rem 0;
    font-family: Poppins, sans-serif;
    font-size: 0.9rem;
    color: #ff3a3a;
    font-weight: 900;
  }

  .blog-list-card-tag {
    display: inline-block;
    margin: 0.2rem 0.2rem;
    padding: 0.2rem 1rem;
    padding-left: 0;
    border-radius: 2px;
    color: #d1ff19;
    font-weight: 500;
    font-size: 0.8rem;
  }
`;

const BlogCard = ({ blog }) => {
  const spaces = " ".repeat(10);

  return (
    <StyledLink
      href={blog?.link}
      target="_blank"
      rel="noreferrer noopener"
    >
      <Fade bottom>
        <div className="blog-list-card">
          <div className="blog-list-card-image">
            <img src={blog?.img || dataAnalysis} alt="" />
          </div>
          <div className="blog-list-card-text">
            <div className="blog-list-card-topic">{blog?.topic || "TOPIC"}</div>
            <div className="blog-list-card-title">
              {blog?.title || "Blog Page Title"}
            </div>
            <span className="blog-list-card-date">
              {blog?.date || "Apr 17, 2021"}
            </span>
            <hr />
            <div className="blog-list-card-description">
              {blog?.description ||
                `
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a ut ex
          doloribus. Incidunt maiores nisi deleniti dolor mollitia. Veritatis
          molestiae sint, eligendi molestias tempora adipisci a corrupti iste
          blanditiis! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nemo, ex? ...
          `}
            </div>
            <div className="blog-list-card-tags">
              Tags:{spaces}
              {blog?.tag?.map((tag, index) => {
                return (
                  <div key={index} className="blog-list-card-tag">
                    {tag}
                  </div>
                );
              }) || (
                <>
                  <div className="blog-list-card-tag">K-Means</div>
                  <div className="blog-list-card-tag">Clustering</div>
                </>
              )}
            </div>
          </div>
        </div>
      </Fade>
    </StyledLink>
  );
};

export default BlogCard;
