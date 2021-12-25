import "./Overlay.css";

export default function Overlay({ url, closeOverlay }) {
  return <div className="overlay-wrapper" onClick={closeOverlay}>
    <div className="overlay-backdrop">
      <div className="overlay-content">
        {url}
      </div>
    </div>
  </div>
}