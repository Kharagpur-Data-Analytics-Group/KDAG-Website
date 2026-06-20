import React from "react";
import "./BlogList.css";
import BlogCard from "./BlogCard";
import blogs from "./BlogsStatic";

blogs.reverse()

const BlogList = () => {
  // To be used later
  // const [blogs, setBlogs] = useState();

  return (
    <div class="blog-list-cards">
      {blogs?.map((blog) => {
        return <BlogCard key={blog.id} blog={blog} />;
      })}
    </div>
  );
};

export default BlogList;
