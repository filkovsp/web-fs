import { useContext } from "react";
import LocationContext from "../Contexts/LocationContext";
import "./Breadcrumbs.css";

function Breadcrumbs({ path, setPath }) {
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

  return (
    <ul className="breadcrumbs">
      {path.split("/").map((folder, idx, arr) => {
        return (
          <li
            key={`${idx}${folder.replaceAll(/[^a-z0-9]+/gi, "")}`}
            onClick={() => {
              const url = `http://${self.hostname}:3010/content?path=${arr.slice(0, idx + 1).join("/")}`;
              folderClickHandler(url);
            }}
          >
            {folder}
          </li>
        );
      })}
    </ul>
  );
}
export default Breadcrumbs;
