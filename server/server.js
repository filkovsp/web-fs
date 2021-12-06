const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const prettyBytes = require('pretty-bytes');

app.use(cors());

// use middleware for Content-Type: application/json
app.use(express.json());

// use middleware for Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));


app.get("/", function(request, response) {
  const homePath = "home";
  response.format({
    "text/html": () => response.status(200).send(`
        <style>* {font-size: medium; font-family: Helvetica; line-height: 1.6;}</style>
        <b>usage</b>:
        <ul>
            <li>
              <a href="/content?path=${homePath}">${request.protocol}://${request.headers.host}/content?path=${homePath}</a>
            </li>
        </ul>`)
  });
});

app.get("/content", function(request, response) {
  if(!Object.keys(request.query).includes("path")) {
    response.status(400).send("`path` query param is expeted!");
    return;
  }

  const contentPath = path.join(__dirname, `../@${request.query.path}`);

  if (fs.existsSync(contentPath)) {
    try {
      // check if requested path look at file or directory:
      const stats = fs.lstatSync(contentPath);
      if (stats.isDirectory()) {        
        // if folder, read contect, build the response and send as `content`:
        fs.readdir(contentPath, {encoding : "utf-8", withFileTypes : true}, (err, listing) => {
          if (listing.length > 0) {
              // build content object:
              const content = {
                  name: path.parse(contentPath).name,
                  type: "folder",
                  path: request.query.path,
                  items: listing.map(item => {  
                    const itemInfo = new Object();
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
              };
              
              // TODO: sort `res` by
              // 1) Folders first, in alphabetical order
              // 2) Files then, in alphabetical order
              
              response.json(content);
            } else {
              response.status(200).send([]);
            }
        });

      } else {
        response.sendFile(contentPath);
      }

    } catch (error) {
      console.error(error);
    }

  } else {
    response.status(404).send("Requested path couldn't be found");
  }
    
});

app.listen(3010, function() {
    console.log(`server is running on port ${this.address().port}!`);
});

