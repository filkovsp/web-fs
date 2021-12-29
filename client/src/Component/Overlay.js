import React from "react";
import "./Overlay.css";
import Viewer from "./ViewerFactory";

export default function Overlay({ url, closeOverlay }) {
  return <div className="overlay-wrapper">
    <div className="overlay-backdrop">
      <div className="overlay-close-btn" onClick={closeOverlay}>close</div>
      <div className="overlay-content">
        <Viewer url={url}/>
      </div>
    </div>
  </div>
}