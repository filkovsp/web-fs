import React from 'react';
import "./ContentItem.css";

function ContentItem({item, setPath}) {
    const folderClickHandler = (path) => {
        fetch(path)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            return null;
        })
        .then(data => {
            setPath(data);
        })
        .catch(error => {
            console.error(error);
            setPath(null);
        });
    };

    if(item.type === "folder") {
        return(
            <>
                <span className="folder" onClick={() => folderClickHandler(`http://192.168.0.90:3010/content?path=${item.path}`)}>{item.name}</span>
            </>
        );
    } else {
        return (
            <>
                <a className="file" href={`http://192.168.0.90:3010/content?path=${item.path}`} target="_blank" rel="noreferrer">{item.name}</a> : {item.size}
            </>
        );
    }
    
    
}

export default ContentItem;