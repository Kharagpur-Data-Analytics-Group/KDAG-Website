import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  return (
      <div className={`blog-list-header ${isVisible ? "show" : ""}`}>
        <div class="blog-list-header-title">BLOG</div>
        <div class="blog-list-header-subtitle">
        As we dive deeper into the world of Machine Learning everyday, it becomes imperative to stay up-to-date with the different machine learning algorithms that not only help us build our data models but also provide an in-depth understanding of data science. Plunge right in and happy learning!
        </div>
    </div>
  );
};

export default Header;
