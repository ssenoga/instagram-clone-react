import React, { useState } from "react";
import "./styles.css";

import Post from "./components/Post";

export default function App() {
  const url = "https://reactjs.org/logo-og.png";
  const [posts, setPosts] = useState([
    {
      username: "Eddy one",
      imageurl: url,
      caption: "This is soo cool"
    },
    {
      username: "Test",
      imageurl: url,
      caption: "Insta lets gooo"
    }
  ]);
  return (
    <div className="app">
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="hello"
          className="app__headerImage"
        />
      </div>
      <h1>Lets build a instagram clone </h1>
      {/* header */}

      {posts.map(({ username, imageurl, caption }) => (
        <Post
          key={username}
          username={username}
          imageurl={imageurl}
          caption={caption}
        />
      ))}
      {/* post image */}
      {/* post content */}
    </div>
  );
}
