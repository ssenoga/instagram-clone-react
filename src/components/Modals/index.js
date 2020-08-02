import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { TextField, Button } from "@material-ui/core";

import "./modals.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "400px",
    backgroundColor: theme.palette.background.paper,
    outlin: 0,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function Modals({ isOpen, handleClose, onSignup }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <center>
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="hello"
          className="app__headerImage"
          id="simple-modal-title"
        />
      </center>

      <form
        className="modals__form"
        id="simple-modal-description"
        autoComplete="off">
        <TextField
          id="standard-basic"
          label="Username"
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            onSignup({ name: username, mail: email, pass: password });
          }}>
          Signup
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </div>
  );
}
