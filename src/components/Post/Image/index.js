import React from "react";

import "./image.css";

export default function Image({ image }) {
  return (
    <div>
      <img className="post__image" src={image} alt="post" />
    </div>
  );
}
