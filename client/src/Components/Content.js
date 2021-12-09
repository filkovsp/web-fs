import {useState, useEffect} from "react";
import ContentItem from "./ContentItem";
import Breadcrumbs from "./Breadcrumbs";

function Content({path}) {
    const [files, setFiles] = useState(null);

    useEffect(() => {
        // TODO: parametrize back-end server with
        // process.env.SERVER_IP:process.env.SERVER_PORT
        fetch(`http://localhost:3010/content?path=${path}`)
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
                <Breadcrumbs path={files.path} setPath={setFiles} />
                <ul>
                {
                    files.items.map((item, idx) => {
                        return (
                            <li key={`${idx}${item.name.replaceAll(/[^a-z0-9]+/ig, "")}`}>
                                <ContentItem key={idx} item={item} setPath={setFiles} />
                            </li>);
                    })
                }
                </ul>
            </>
        );    
    }

    return (<div></div>);
}

export default Content;