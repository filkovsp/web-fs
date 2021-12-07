import React, {useState, useEffect} from "react";
import ContentItem from "./ContentItem";

function Content({path}) {
    const [files, setFiles] = useState(null);

    useEffect(() => {
        fetch(`http://192.168.0.90:3010/content?path=${path}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            return null;
        })
        .then(data => {
            setFiles(data);
        })
        .catch(error => {
            console.error(error);
            setFiles(null);
        });
    }, [path]);
    
    if(files !== null) {
        return (
            <>
                <h2>{files.path}</h2>
                <ul>
                {
                    files.items.map((item, idx) => {
                        return <li key={idx}><ContentItem key={idx} item={item} setPath={setFiles} /></li>
                    })
                }
                </ul>
            </>
        );    
    }

    return (<div></div>);
}

export default Content;