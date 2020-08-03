import React, { useState, useEffect } from "react";
import InstagramEmbed from "react-instagram-embed";
import "./styles.css";

import Post from "./components/Post";
import Header from "./components/Header";
import Modals from "./components/Modals";
import ImageUpload from "./components/ImageUpload";
import { db, auth } from "./firebase";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loginClick, setLoginClick] = useState(false);

  //check if the user has regestered or logined if
  const is_user = user !== null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        // console.log(authUser);
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
    setLoginClick(true);
    setOpen(true);
  };

  const onSignup = ({ name, mail, pass }) => {
    setUsername(name);
    setLoginClick(false);
    //set the auth here
    auth
      .createUserWithEmailAndPassword(mail, pass)
      .then((authUser) => {
        setOpen(false);
        return authUser.user.updateProfile({ displayName: name });
      })
      .catch((err) => alert(err.message));
  };

  const handleClose = () => setOpen(false);

  const handleOnSignupClick = () => {
    setLoginClick(false);
    setOpen(true);
  };

  const onLogin = ({ email, password }) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser) {
          setOpen(false);
        }
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  return (
    <div className="app">
      <Modals
        isOpen={open}
        handleClose={handleClose}
        onSignup={onSignup}
        loginClick={loginClick}
        onLogin={onLogin}
      />
      <Header
        onSignup={onSignup}
        handleLoginClick={handleOnLoginClick}
        handleSignupClick={handleOnSignupClick}
        loggedIn={is_user}
        onLogin={handleOnLoginClick}
      />

      {/* header */}
      <div className="app__container">
        <div className="app__postLeft">
          {posts.map(({ id, post }) => (
            <Post
              postId={id}
              key={id}
              username={post.username}
              imageurl={post.imageURL}
              caption={post.caption}
              user={user}
            />
          ))}
        </div>

        {/* instagram embed */}
        <div className="app__postRight">
          <InstagramEmbed
            url="https://www.instagram.com/p/BYueDxiHC0q/"
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>

        {/* the input goes here */}
        <div className="post__footer">
          {user?.displayName ? (
            <ImageUpload username={user.displayName} />
          ) : (
            <center>
              <h3>Sorry you need to login to post</h3>
            </center>
          )}
        </div>
      </div>
    </div>
  );
}
