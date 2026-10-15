import React, { useState, useEffect } from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  opacity: 0;
  transform: scale(10);
  transition: opacity 1s;
  height: 30rem;
  padding-top: 10rem;
  background-size: cover;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  &.show {
    opacity: 1;
    transform: scale(1);
  }

  .blog-list-header-title {
    font-family: Poppins, sans-serif;
    font-size: 4rem;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
  }

  .blog-list-header-subtitle {
    font-family: Poppins, sans-serif;
    font-size: 1.15rem;
    text-align: center;
    color: #ddd;
    width: 50%;
    margin: auto;
    min-width: 30rem;
  }
`;

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <HeaderContainer className={isVisible ? "show" : ""}>
      <div className="blog-list-header-title">BLOG</div>
      <div className="blog-list-header-subtitle">
        As we dive deeper into the world of Machine Learning everyday, it becomes imperative to stay up-to-date with the different machine learning algorithms that not only help us build our data models but also provide an in-depth understanding of data science. Plunge right in and happy learning!
      </div>
    </HeaderContainer>
  );
};

export default Header;
