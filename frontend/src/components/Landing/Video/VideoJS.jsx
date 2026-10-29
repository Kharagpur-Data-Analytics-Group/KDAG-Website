import React from 'react';

const src = "https://drive.google.com/file/d/1kgW9DYyk4u-z_E9FOWBgfieyO3zUzykR/view?usp=share_link";

const VideoJS = () => {
  return (
    <video controls width="100%">
      <source src={src} type="application/vnd.google-apps.file" />
      Sorry, your browser doesn't support embedded videos.
    </video>
  );
};

export default VideoJS;