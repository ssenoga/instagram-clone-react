import React from "react";
import Button from "@material-ui/core/Button";

import "./button.css";

export default function Buttons({ onLogin }) {
  return (
    <div className="header__buttons">
      <Button variant="contained" color="secondary">
        Login
      </Button>
      <Button variant="contained" color="primary" onClick={onLogin}>
        Sign Up
      </Button>
    </div>
  );
}
