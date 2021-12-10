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

  // TODO: parametrize back-end server with
  // process.env.SERVER_IP:process.env.SERVER_PORT
  if (item.type === "folder") {
    return (
      <>
        <span
          className="folder"
          onClick={() => {
            const url = `http://${self.hostname}:3010/content?path=${item.path}`;
            folderClickHandler(url);
          }}
        >{item.name}</span>
      </>
    );
  } else {
    return (
      <>
        <a
          className="file"
          rel="noreferrer"
          target="_blank"
          href={`http://${self.hostname}:3010/content?path=${item.path}`}
        >
          {item.name}
        </a>{` : ${item.size}`}
      </>
    );
  }
}

export default ContentItem;
