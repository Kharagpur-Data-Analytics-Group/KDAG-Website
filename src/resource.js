import React from "react";
import "./resource.css";

// function resource() {
//     return (

//     )
// }
const Resource = () => {
  return (
    <div className="main-container">
      <div className="main-head-box">
        <div className="main-head">
          <div className="Topicrect"> </div>
          <div className="topic">Resources</div>
        </div>
      </div>

      <div className="blogs-head">
        <span>Blogs</span>
        <span className="see-all">See all</span>
        <img src="\icons\arrow.svg" alt="" />
       
      </div>

      <div className="blog-container">
        <div className="blog-box1">
          <p className="head-topic">Lorem ipsum dolor sit amet lorem</p>
          <p className="blog-topic">Topic</p>
         

          <p className="read-now">Read Now</p>
        </div>
        <div className="blog-box2">
          <p className="head-topic">Lorem ipsum dolor sit amet lorem</p>
          <p className="blog-topic">Topic</p>

          <p className="read-now">Read Now</p>
        </div>
        <div className="blog-box3">
          <p className="head-topic">Lorem ipsum dolor sit amet lorem</p>
          <p className="blog-topic">Topic</p>

          <p className="read-now">Read Now</p>
        </div>
      </div>
      <div className="videos-head">
        <span>Videos</span>
        <span className="see-all">See all</span>
        <img src="\icons\arrow.svg" alt="" />
       
      </div>

      <div className="video-container">
        <div className="video-box1">
          <p className="video-head-topic">Lorem ipsum dolor sit amet lorem</p>
          <p className="video-topic">Topic</p>

          <div className="video-read-now1">
            <img src="\icons\play.svg" alt="" />
            <span>Play</span>
          </div>
        </div>
        <div className="video-box2">
          <p className="video-head-topic">Lorem ipsum dolor sit amet lorem</p>
          <p className="video-topic">Topic</p>

          <div className="video-read-now2">
            <img src="\icons\play.svg" alt="" />
            <span>Play</span>
          </div>
        </div>
        <div className="video-box3">
          <p className="video-head-topic">Lorem ipsum dolor sit amet lorem</p>
          <p className="video-topic">Topic</p>

          <div className="video-read-now3">
            <img src="\icons\play.svg" alt="" />
            <span>Play</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource;
