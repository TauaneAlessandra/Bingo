const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const srcDir = path.join(__dirname, 'src');
const files = getFiles(srcDir);
const results = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n').length;
  results.push({
    relative: path.relative(__dirname, file),
    lines: lines
  });
});

results.sort((a, b) => b.lines - a.lines);
console.log(JSON.stringify(results, null, 2));
