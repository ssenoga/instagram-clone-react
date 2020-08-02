import React from "react";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import "./header.css";

export default function Header({ username }) {
  return (
    <div className="post__header">
      <div className="header__user">
        <Avatar
          src="/static/images/avatar/1.jpg"
          alt={username}
          className="post__avatar"
        />
        <h3>{username}</h3>
      </div>

      <div className="header__vertIcon">
        <MoreVertIcon />
      </div>
    </div>
  );
}
