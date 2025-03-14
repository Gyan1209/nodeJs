/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const app = express();

// module.exports = app;

import express from "express";
const app = express();
const port = 3000;
//import path from "path";
import fs from "fs";

//const filesFolder = path.join(__dirname, "files");
app.get("/files", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) {
      console.log(err);
    } else {
      const filesArrayObject = files.map((file) => ({ fileName: file })); //It takes file as its parameter and returns an object { fileName: file }.
      res.status(200).json(filesArrayObject);
    }
  });
});

app.get("/files/:fileName", (req, res) => {
  let name = req.params.fileName;
  console.log(name);
  fs.readFile(`./files/${name}`, "utf8", (err, data) => {
    if (err) {
      res.statusCode = 404;
      return res.send("File Not Found");
    } else {
      if (data.length === 0) res.status(404).send("File is empty");
      else {
        res.setHeader("Content-Type", "text/plain");
        res.send(data);
      }
    }
  });
});

app.listen(port);
