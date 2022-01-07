import React from "react";
import "./Overlay.css";
import Viewer from "./ViewerFactory";

export default function Overlay({ url, closeOverlay }) {
  return <div className="overlay-wrapper" onClick={closeOverlay}>
      <div className="overlay-content"
           onClick={(e) => {e.stopPropagation();}}>
        <Viewer url={url}/>
      </div>
  </div>
}