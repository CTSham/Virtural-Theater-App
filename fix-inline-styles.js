#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Define replacement patterns
const replacements = [
  // Form containers
  {
    from: /style=\{\{maxWidth:420, margin:'0 auto'\}\}/g,
    to: 'className="form-container"',
  },
  {
    from: /style=\{\{maxWidth:720, margin:'0 auto'\}\}/g,
    to: 'className="upload-container"',
  },
  { from: /style=\{\{maxWidth:560\}\}/g, to: 'className="max-width-560"' },

  // Spacers
  { from: /style=\{\{height:8\}\}/g, to: 'className="spacer-8"' },
  { from: /style=\{\{height:12\}\}/g, to: 'className="spacer-12"' },

  // Font styles
  { from: /style=\{\{fontWeight:600\}\}/g, to: 'className="font-weight-600"' },
  { from: /style=\{\{fontWeight:700\}\}/g, to: 'className="font-weight-700"' },
  {
    from: /style=\{\{fontSize:24, fontWeight:700\}\}/g,
    to: 'className="font-size-24 font-weight-700"',
  },

  // Padding
  { from: /style=\{\{padding:12\}\}/g, to: 'className="padding-12"' },

  // Grid layouts
  {
    from: /style=\{\{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8\}\}/g,
    to: 'className="grid-2col"',
  },
  {
    from: /style=\{\{gridTemplateColumns:'1fr 1fr', gap:16\}\}/g,
    to: 'className="grid-2col-16"',
  },
  {
    from: /style=\{\{gridTemplateColumns:'1fr 1.2fr', gap:24\}\}/g,
    to: 'className="grid-featured"',
  },
  {
    from: /style=\{\{gridTemplateColumns:'1.2fr .8fr', gap:16\}\}/g,
    to: 'className="grid-admin"',
  },
  {
    from: /style=\{\{gridTemplateColumns:'1fr 1fr 1fr'\}\}/g,
    to: 'className="grid-3col"',
  },

  // Flex layouts
  {
    from: /style=\{\{display:'flex', gap:12, flexWrap:'wrap'\}\}/g,
    to: 'className="flex-wrap-gap-12"',
  },
  {
    from: /style=\{\{display:'grid', gap:10\}\}/g,
    to: 'className="flex-gap-10"',
  },

  // Margins
  { from: /style=\{\{marginTop:8\}\}/g, to: 'className="margin-top-8"' },
  { from: /style=\{\{marginTop:12\}\}/g, to: 'className="margin-top-12"' },
  { from: /style=\{\{marginTop:16\}\}/g, to: 'className="margin-top-16"' },
  { from: /style=\{\{margin:"0 0 4px"\}\}/g, to: 'className="margin-0-0-4"' },
  { from: /style=\{\{margin:"0 0 8px"\}\}/g, to: 'className="margin-0-0-8"' },

  // Opacity
  { from: /style=\{\{opacity:0.8\}\}/g, to: 'className="opacity-80"' },
];

// Helper to fix className merging
const mergeClassNames = (content) => {
  // Fix cases where we have both className and our new className
  content = content.replace(
    /className="([^"]*)" className="([^"]*)"/g,
    'className="$1 $2"'
  );
  return content;
};

// Function to process a file
const processFile = (filePath) => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  replacements.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
    }
  });

  if (modified) {
    content = mergeClassNames(content);
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

console.log("Done!");
