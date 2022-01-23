import React from "react";
import "./ContentItem.css";

export default function ContentItem({ item, setPath, openHandle }) {
  const url = `/api/content?path=${item.path}`;
  
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
      <div className="folderItem"
        onClick={() => {
          folderClickHandler(url);
        }}>
        <div className="icon-container">
          <span className="icon folder"/>
        </div>
        <div className="info">
          <span className="name">{item.name}</span>
        </div>
      </div>
    );
  } else {
    const fileExt = item.name.split(".").at(-1);
    return (
      <div className="fileItem" onClick={() => openHandle(url)}>
        <div className="icon-container">
          <span className={`icon file f${"-".concat(fileExt)}`}>{fileExt.length < 5 ? fileExt : ""}</span>
        </div>
        <div className="info">
            <span className="name">{item.name}</span>
            <span className="size">{item.size}</span>
        </div>
      </div>
    );
  }
}
