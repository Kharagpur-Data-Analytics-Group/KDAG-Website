import React from "react";
import Header from "./Header/Header";
import BlogList from "./Blogs/BlogList";
import Particless from "../Common/Particles/Particless";

const BlogPage = () => {
  return (
    <>
      <Header />
      <BlogList />
      <Particless />
    </>
  );
};

export default BlogPage;
