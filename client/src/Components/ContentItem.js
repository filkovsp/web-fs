import { useContext } from "react";
import LocationContext from "../Contexts/LocationContext";
import "./ContentItem.css";

function ContentItem({ item, setPath }) {
  const self = useContext(LocationContext);
  const folderClickHandler = (path) => {
    fetch(path)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((data) => {
        setPath(data);
      })
      .catch((error) => {
        console.error(error);
        setPath(null);
      });
  };

  if (item.type === "folder") {
    return (
      <div className="folders" 
        onClick={() => {
          const url = `http://${self.hostname}:3010/content?path=${item.path}`;
          folderClickHandler(url);
        }}>
        
        <span className="icon folder"/>
        <div className="info">
          <span className="name">{item.name}</span>
        </div>
      </div>
    );
  } else {
    const fileExt = item.name.split(".").at(-1);
    return (
      <div className="files"
        onClick={()=>window.open(`http://${self.hostname}:3010/content?path=${item.path}`, "_blank")}>
        <span className="icon file f-mp4">{fileExt.length < 5 ? fileExt : ""}</span>
        <div className="info">
          <span className="name">{item.name}</span>
          <span className="details">{item.size}</span>
        </div>
      </div>
    );
  }
}

export default ContentItem;
