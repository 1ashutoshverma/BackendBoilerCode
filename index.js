// index.js
const fs = require("fs");
const path = require("path");

const copyFiles = () => {
  const sourceDir = path.join(__dirname, "templates");
  const targetDir = process.cwd(); // Current working directory of the project

  // Copy files and folders from source to target
  fs.readdirSync(sourceDir).forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    fs.copyFileSync(sourcePath, targetPath);
  });

  console.log("Files copied successfully!");
};

module.exports = copyFiles;
