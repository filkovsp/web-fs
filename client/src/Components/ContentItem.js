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

    // TODO: parametrize back-end server with
    // process.env.SERVER_IP:process.env.SERVER_PORT
    if(item.type === "folder") {
        return(
            <>
                <span className="folder" onClick={
                        () => folderClickHandler(`http://localhost:3010/content?path=${item.path}`)
                    }>{item.name}</span>
            </>
        );
    } else {
        return (
            <>
                <a className="file" rel="noreferrer" target="_blank"
                    href={`http://localhost:3010/content?path=${item.path}`}>{item.name}</a> : {item.size}
            </>
        );
    }
    
    
}

export default ContentItem;