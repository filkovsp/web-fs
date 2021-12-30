import React from "react";
import "./Overlay.css";
import Viewer from "./ViewerFactory";

export default function Overlay({ url, closeOverlay }) {
  return <div className="overlay-wrapper">
    <div className="overlay-backdrop"
         onClick={closeOverlay}>
      <div className="overlay-close-btn"
           onClick={closeOverlay}>x</div>
      <div className="overlay-content"
           onClick={(e) => {e.stopPropagation();}}>
        <Viewer url={url}/>
      </div>
    </div>
  </div>
}