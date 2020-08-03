import React, { useState, useEffect } from "react";
import firebase from "firebase";
import moment from "moment";
import "./comments.css";
import { db } from "../../../firebase";

export default function Comments({ postId, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setComments(snapshot.docs.map((doc) => doc.data()))
        );
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        user: user.displayName,
        text: comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

    setComment("");
  };

  const formatDate = (s) => {
    if (s === null) {
      return moment
        .utc()
        .startOf("hour")
        .fromNow();
    }
    const formated = moment
      .utc(s.seconds * 1000)
      .startOf("hour")
      .fromNow();
    return formated;
  };

  const displayComments = () =>
    comments.map(({ user, text, timestamp }) => (
      <p key={timestamp}>
        <strong>{user}</strong> {text} -{" "}
        <small>
          <em>{formatDate(timestamp)}</em>
        </small>
      </p>
    ));

  return (
    <>
      {user && (
        <form className="comment__form">
          <input
            placeholder="Enter your comment ...."
            type="text"
            className="comment__input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="comment__button"
            disabled={!comment}
            onClick={postComment}>
            comment
          </button>
        </form>
      )}
      <div className="comment__text">{displayComments()}</div>
    </>
  );
}
