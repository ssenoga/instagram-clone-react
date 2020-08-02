import React, { useState, useEffect } from "react";
import "./styles.css";

import Post from "./components/Post";
import Header from "./components/Header";
import Modals from "./components/Modals";
import { db, auth } from "./firebase";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //user has logged out
        setUser(null);
      }
    });
    return () => {
      //do some clean ups
      unsubscribe();
    };
  }, [user, username]);

  const handleOnLoginClick = () => {
    setOpen(true);
  };

  const handleOnSignupClick = ({ name, mail, pass }) => {
    setUsername(name);
    setOpen(false);
    //set the auth here
    auth
      .createUserWithEmailAndPassword(mail, pass)
      .then((authUser) => {
        return authUser.user.updateProfile({ displayName: name });
      })
      .catch((err) => alert(err.message));
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  return (
    <div className="app">
      <Modals
        isOpen={open}
        handleClose={handleClose}
        onSignup={handleOnSignupClick}
      />
      <Header onLogin={handleOnLoginClick} />
      <h1>Lets build a instagram clone </h1>
      {/* header */}

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          imageurl={post.imageURL}
          caption={post.caption}
        />
      ))}
      {/* post image */}
      {/* post content */}
    </div>
  );
}
