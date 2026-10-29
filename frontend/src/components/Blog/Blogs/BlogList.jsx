import React from "react";
import styled from "styled-components";
import BlogCard from "./BlogCard";
import blogs from "./BlogsStatic";

blogs.reverse();

const BlogListCards = styled.div`
  display: flex;
  padding: 3rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const BlogList = () => {
  return (
    <BlogListCards>
      {blogs?.map((blog) => {
        return <BlogCard key={blog.id} blog={blog} />;
      })}
    </BlogListCards>
  );
};

export default BlogList;
