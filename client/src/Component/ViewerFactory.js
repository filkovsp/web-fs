import { useLayoutEffect } from "react";
import ResponsivePlayer from 'react-player';
import "./Viewer.css";

export default function Viewer ({url}) {
  const fileExt = url.split(".").at(-1);

  useLayoutEffect(() => {
    // for pdf files having transparent or dark background is fine, but
    // for txt files being opened in iframe it makes impossible to read
    // default font color = "black" which becomes the same as frame's BG
    if (fileExt === "txt") {
      // could have been an option to do so:
      // document.querySelector("iframe.viewer-frame")
      //   .contentWindow.document.body.style.color = 'white'
      // but this events into a CORS exception, kinda:
      // Blocked a frame with origin "http://localhost:3000" from accessing a cross-origin frame.
      // so as a workaround, we can change background for the .overlay-content element:
      document.querySelector(".overlay-content").style.backgroundColor="#ddd";

      // TODO: consider working out the ReadableStream
      // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
      // to get content of the page returned from the back-end server
      // and then pull the text from its body and do whatever we want...
    }
  }, [fileExt]);

  switch (fileExt) {
    case "txt":
    case "pdf":
      return <div className="viewer">
        <iframe className="viewer-frame"
                frameBorder="0" vspace="0" hspace="0"
                name={url.split("/").at(-1)}
                title={url.split("/").at(-1)}
                allowFullScreen={true}
                scrolling="auto"
                src={url} />
      </div>

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