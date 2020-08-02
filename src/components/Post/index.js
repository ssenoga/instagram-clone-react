import React from "react";

import "./post.css";

import Header from "./Header";
import Image from "./Image";
import Content from "./Content";

export default function Post({ username, caption, imageURL }) {
  return (
    <div className="app__post">
      <Header username={username} />
      <Image image={imageURL} />
      <Content username={username} caption={caption} />
    </div>
  );
}
