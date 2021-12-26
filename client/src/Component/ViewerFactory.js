import ResponsivePlayer from 'react-player';
import "./Viewer.css";

export default function Viewer ({url}) {
  const fileExt = url.split(".").at(-1);
  switch (fileExt) {
    // todo: add support for pdf files:
    case "bmp":
    case "png":
    case "tiff":
    case "jpg":
    case "jpeg":
      return <div className="viewer">
        <img alt={url.split("path=").at(1)} src={url}/>
      </div>

    case "mp3":
    case "mp4":
    case "webm":
    case "mkv":
      return <div className="viewer">
        <div className="title">{url.split("/").at(-1)}</div>
        <ResponsivePlayer
          url={url}
          playing={true}
          controls={true}
          width='90%'
          height='90%'
        />
      </div>

    default:
      return <div className="viewer">
        couldn't find an appropriate content viewer for<br/>
        <span className="link" onClick={() => window.open(url, "_blank")}>
          {url.split("path=").at(1)}
        </span>
      </div>
  }
}