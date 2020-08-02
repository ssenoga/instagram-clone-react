import React from "react";

import "./content.css";

export default function Content({ username, caption }) {
  return (
    <div className="content__container">
      <h4 className="content__text">
        <strong>{username}</strong>: {caption}
      </h4>
    </div>
  );
}
