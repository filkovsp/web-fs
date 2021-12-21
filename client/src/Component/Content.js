import { useState, useEffect, useContext } from "react";
import ContentItem from "./ContentItem";
import Breadcrumbs from "./Breadcrumbs";
import LocationContext from "../Context/LocationContext";
import "./Content.css";

export default function Content({ path }) {
  const [files, setFiles] = useState(null);
  const self = useContext(LocationContext);

  useEffect(() => {
    fetch(`http://${self.hostname}:${self.serverPort}/content?path=${path}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((data) => {
        setFiles(data);
      })
      .catch((error) => {
        console.error(error);
        setFiles(null);
      });
  }, [path, self]);

  if (files !== null) {
    return (
      <div className="filemanager">
        <Breadcrumbs path={files.path} setPath={setFiles} />
        <ul className="data animated">
          {files.items.map((item, idx) => {
            return (
              <li key={`${idx}${item.name.replaceAll(/[^a-z0-9]+/gi, "")}`}>
                <ContentItem key={idx} item={item} setPath={setFiles} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return <div className="filemanager"></div>;
}