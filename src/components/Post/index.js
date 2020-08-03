import React, { useEffect, useState } from "react";

import "./post.css";

import Header from "./Header";
import Image from "./Image";
import Content from "./Content";
import Comments from "./Comments";

export default function Post({ username, caption, imageurl, postId, user }) {
  return (
    <div className="app__post">
      <Header username={username} />
      <Image image={imageurl} />
      <Content username={username} caption={caption} />
      <Comments postId={postId} user={user} />
    </div>
  );
}
