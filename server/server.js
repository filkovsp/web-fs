const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const prettyBytes = require('pretty-bytes');

const paths = {
  dotenv: path.resolve(__dirname, '..', '.env.dev'),
};

if (fs.existsSync(path.join(__dirname, '..', '.env.local'))) {
  paths.dotenv = path.resolve(__dirname, '..', '.env.local');
};

require('dotenv').config({path: paths.dotenv});

app.use(cors());

// use middleware for Content-Type: application/json
app.use(express.json());

// use middleware for Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

app.get("/", function(request, response) {
  // see readme.md file for more information about usage of ROOT_PATH
  const rootPath = process.env.ROOT_PATH || "@home";
  response.format({
    "text/html": () => response.status(200).send(`
        <style>* {font-size: medium; font-family: Helvetica,sans-serif; line-height: 1.6;}</style>
        <b>usage</b>:
        <ul>
            <li>
              directly: <a href="/content?path=${rootPath}">
                ${request.protocol}://${request.headers.host}/content?path=${rootPath}
              </a>
            </li>
            <li>
              through <b>api</b> proxy: <a href="/api/content?path=${rootPath}">
                ${request.protocol}://${request.hostname}/api/content?path=${rootPath}
              </a>
          </li>
        </ul>`)
  });
});

app.get("/content", function(request, response) {
  if(!Object.keys(request.query).includes("path")) {
    response.status(400).send("`path` query param is expected!");
    return;
  }

  // see readme.md file for more information about usage of HOME_PATH
  const basePath = process.env.HOME_PATH || "../";

  let contentPath;
  if (path.isAbsolute(basePath)) {
    contentPath = path.join(basePath, request.query.path);
  } else {
    contentPath = path.join(__dirname, path.join(basePath, request.query.path));
  }

  if (fs.existsSync(contentPath)) {
    try {
      // check if requested path look at file or directory:
      const stats = fs.lstatSync(contentPath);
      if (stats.isDirectory()) {        
        // if folder, read contect, build the response and send as `content`:
        fs.readdir(contentPath, {encoding : "utf-8", withFileTypes : true}, (err, listing) => {
              
          // build content object:
          const content = {
              name: path.parse(contentPath).name,
              type: "folder",
              path: request.query.path,
              items: listing.length === 0 ? [] : listing
                // hide items that have name starting with `.`:
                .filter(item => !String(item.name).startsWith("."))
                // for the rest of the items collect and map the necessary info:
                .map(item => {
                  const itemInfo = {};
                  // assign default properties:
                  Object.assign(itemInfo, {
                    name: item.name,
                    path: `${request.query.path}/${item.name}`
                  });

                  if(item.isFile()) {
                    // assign file-specific prperties:
                    Object.assign(itemInfo, {
                      type: "file",
                      size: prettyBytes(fs.lstatSync(`${contentPath}/${item.name}`).size),
                    });
                  } else {
                    // assign folder-specific prperties:
                    Object.assign(itemInfo, {
                      type: "folder"
                    });
                  }
                  return itemInfo;
              })
              .sort(function(a, b){
                if(a.type === "folder" && b.type === "file") { return -1; }
                if(a.type === "file" && b.type === "folder") { return 1; }
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
              })
            };
            response.json(content);
        });

      } else {
        response.setHeader('Content-Disposition', 'attachment;filename=' + encodeURI(path.basename(contentPath)));
        response.sendFile(contentPath);
      }

    } catch (error) {
      console.error(error);
    }

  } else {
    response.status(404).send("Requested path couldn't be found");
  }
    
});

app.listen(process.env.SERVER_PORT || 5000, function() {
    console.log(`server is running on port ${this.address().port}!`);
});

