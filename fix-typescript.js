#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Define replacement patterns for TypeScript fixes
const typeReplacements = [
  // Fix map functions without types
  { from: /\.map\(m => \(/g, to: ".map((m: any) => (" },
  { from: /\.map\(p => \(/g, to: ".map((p: any) => (" },
  { from: /\.map\(u => \(/g, to: ".map((u: any) => (" },
  { from: /\.map\(r => \(/g, to: ".map((r: any) => (" },

  // Fix existing patterns that might be inconsistent
  {
    from: /\(movies as any\[\]\)\.map\(m => \(/g,
    to: "movies.map((m: any) => (",
  },
  {
    from: /\(movies as any\[\]\)\.map\(\(m\) => \(/g,
    to: "movies.map((m: any) => (",
  },
];

// Function to process a file
const processFile = (filePath) => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  typeReplacements.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
  }
};

// Find all TSX files
const findTsxFiles = (dir) => {
  const files = [];

  const scan = (currentDir) => {
    const items = fs.readdirSync(currentDir);

    items.forEach((item) => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (
        stat.isDirectory() &&
        !item.startsWith(".") &&
        item !== "node_modules"
      ) {
        scan(fullPath);
      } else if (item.endsWith(".tsx")) {
        files.push(fullPath);
      }
    });
  };

  scan(dir);
  return files;
};

// Process all projects
const projects = [
  "virtual-theater-auth",
  "virtual-theater-complete",
  "virtual-theater-finished",
  "virtual-theater-oauth-docker",
  "virtual-theater-pro",
  "virtual-theater-starter",
];

projects.forEach((project) => {
  const projectPath = path.join(__dirname, project);
  if (fs.existsSync(projectPath)) {
    console.log(`Processing ${project}...`);
    const tsxFiles = findTsxFiles(projectPath);
    tsxFiles.forEach(processFile);
  }
});

console.log("TypeScript fixes complete!");
