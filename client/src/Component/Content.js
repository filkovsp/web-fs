import React, { useState, useEffect, useContext, useRef } from "react";
import ContentItem from "./ContentItem";
import Breadcrumbs from "./Breadcrumbs";
import LocationContext from "../Context/LocationContext";
import Overlay from "./Overlay";
import "./Content.css";

export default function Content({ path }) {
  const [files, setFiles] = useState(null);
  const contentLink = useRef(null);
  const self = useContext(LocationContext);

  const [isOpen, setOverlay] = useState(false);
  const closeOverlay = () => {
    setOverlay(false);
    contentLink.current = null;
  };

  const openOverlay = (url) => {
    contentLink.current = url;
    setOverlay(true);
  };

  useEffect(() => {
    const url = `${self.protocol}//${self.hostname}:${self.serverPort}/content?path=${path}`;
    fetch(url)
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
      <>
        <div className="filemanager">
          <Breadcrumbs path={files.path} setPath={setFiles} />
          <div className="data animated">
            {files.items.map((item, idx) => {
              const key = `${idx}${item.path.replaceAll(/[^a-z0-9]+/gi, "")}`;
              return (
                  <ContentItem key={key} item={item} setPath={setFiles} openHandle={openOverlay}/>
                );
            })}
          </div>
        </div>
        { isOpen && <Overlay url={contentLink.current} closeOverlay={closeOverlay}></Overlay>}
      </>
    );
  }

  return <div className="filemanager"></div>;
}