import "./Breadcrumbs.css";

function Breadcrumbs({path, setPath}) {
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
	
    return (
        <ul className="breadcrumbs">
            {path
                .split("/")
                .map((folder, idx, arr) => {
                    return <li 
                        key={`${idx}${folder.replaceAll(/[^a-z0-9]+/ig, "")}`} 
                        onClick={
                            // TODO: parametrize back-end server with
                            // process.env.SERVER_IP:process.env.SERVER_PORT
                            () => folderClickHandler(`http://localhost:3010/content?path=${arr.slice(0, idx + 1).join("/")}`)
                        }>{folder}</li>
                })}
        </ul>
    );
}
export default Breadcrumbs;