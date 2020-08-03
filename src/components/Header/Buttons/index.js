import React from "react";
import Button from "@material-ui/core/Button";

import "./button.css";
import { auth } from "../../../firebase";

export default function Buttons({
  onSignup,
  loggedIn,
  onLogin,
  handleSignupClick,
  handleLoginClick
}) {
  return (
    <div className="header__buttons">
      {loggedIn ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => auth.signOut()}>
          Logout
        </Button>
      ) : (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLoginClick}>
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignupClick}>
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
}
