import React from "react";
import Logo from "./Logo";
import "./header.css";
import Buttons from "./Buttons";

export default function Header({
  onSignup,
  loggedIn,
  onLogin,
  handleLoginClick,
  handleSignupClick
}) {
  return (
    <div className="app__header">
      <Logo />
      <Buttons
        onSignup={onSignup}
        loggedIn={loggedIn}
        onLogin={onLogin}
        handleLoginClick={handleLoginClick}
        handleSignupClick={handleSignupClick}
      />
    </div>
  );
}
