import React, { useState } from "react";
import { Button } from "@material-ui/core";
import firestore from "firebase";

import { db, storage } from "../../firebase";
import "./imageUpload.css";

export default function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [upLoading, setUpLoading] = useState("upload");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    setUpLoading("uploading");
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //the progress thing is handled from here
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // error handler
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post the images into the database
            db.collection("posts").add({
              timestamp: firestore.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageURL: url,
              username: username
            });
            // unset all the variables after uploading
            setCaption("");
            setProgress(0);
            setImage(null);
            setUpLoading("upload");
          });
      }
    );
  };

  return (
    <div className="imageupload__container">
      <div className="imageupload__items">
        {progress > 0 && (
          <progress
            className="imageupload__progress"
            value={progress}
            max="100"
          />
        )}
        <input
          type="text"
          placeholder="Enter your caption here...."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input type="file" onChange={handleChange} />
        <Button
          disabled={upLoading === "uploading" ? true : false}
          variant="contained"
          color="primary"
          onClick={handleUpload}>
          {upLoading}
        </Button>
      </div>
    </div>
  );
}
