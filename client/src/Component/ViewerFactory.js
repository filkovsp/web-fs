import ResponsivePlayer from 'react-player';

export default function Viewer ({url}) {
    const ext = url.split(".").at(-1);
    switch (ext) {
        // case "pdf":
        case "bmp":
        case "png":
        case "tiff":
        case "jpg":
        case "jpeg":
            return <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                "align-items": "center",
                "justify-content": "center"
            }}>
                <img alt={url.split("path=").at(1)} src={url}/>
            </div>

        case "mp3":
        case "mp4":
            return <ResponsivePlayer
              url={url}
              controls
              width='100%'
              height='100%'
            />

        default:
            return <div>
                couldn't found an appropriate content vewer for<br/>
                <a rel="noreferrer" href={url} target="_blank">{url.split("path=").at(1)}</a>
            </div>
    }
}