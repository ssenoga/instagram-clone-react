import React from "react";
import Logo from "./Logo";
import "./header.css";
import Buttons from "./Buttons";

export default function Header({ onLogin }) {
  return (
    <div className="app__header">
      <Logo />
      <Buttons onLogin={onLogin} />
    </div>
  );
}
