import "./Overlay.css";

export default function Overlay({ closeOverlay }) {
  return <div className="overlay-wrapper" onClick={closeOverlay}>
    <div className="overlay-backdrop">
      <div className="overlay-content">
        Hello!
      </div>
    </div>
  </div>
}