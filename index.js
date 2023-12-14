#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2] || "backend";
const projectPath = path.resolve(projectName);

const createApp = () => {
  if (projectPath !== ".") {
    fs.mkdirSync(projectPath);
    process.chdir(projectPath);
  }
  fs.mkdirSync("middlewares");
  fs.mkdirSync("configs");
  fs.mkdirSync("controllers");
  fs.mkdirSync("models");

  fs.writeFileSync(
    "package.json",
    `{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "Express app",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.3",
    "nodemon": "^3.0.1"
  }
}
`
  );

  fs.writeFileSync(
    ".gitignore",
    `
    node_modules/
.env
`
  );

  fs.writeFileSync(
    "./configs/db.js",
    `
    const mongoose = require("mongoose");
    require("dotenv").config();
    
    const connection = mongoose.connect(process.env.MONGO_DB);
    
    module.exports = { connection };
`
  );

  fs.writeFileSync(
    "vercel.json",
    `
    {
      "version": 2,
      "name": "${projectName}",
      "builds": [{ "src": "index.js", "use": "@vercel/node" }],
      "routes": [{ "src": "/(.*)", "dest": "/index.js" }]
    }
`
  );

  // Create server.js (your main app file)
  fs.writeFileSync(
    "index.js",
    `const express = require("express");
    const cors = require("cors");
    const { connection } = require("./configs/db");
    
    const app = express();
    const PORT = process.env.PORT || 8080;
    app.use(cors());
    app.use(express.json());
    
    app.get("/", (req, res) => {
      res.json({ message: "server is running" });
    });
    
    app.listen(PORT, async () => {
      try {
        await connection;
        console.log("DB is connected");
      } catch (error) {
        console.log("Error while connection to db");
        console.log(error);
      }
      console.log("server is running");
    });
`
  );
  fs.writeFileSync(
    ".env",
    `MONGO_DB = ;
    JWT_SECRET = ;`
  );
  // Inform the user
  console.log(`\n${projectName} created successfully!\n`);
  console.log(
    `To start your app, run:\n\n  cd ${projectName} \n npm install \n nodemon index.js\n`
  );
};

if (fs.existsSync(projectPath)) {
  console.error(
    `Error: ${projectName} already exists. Please choose a different name.`
  );
  process.exit(1);
}

createApp();
