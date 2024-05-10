const fs = require('fs')
const path = require('path')

const targetDirectoryPath = process.argv.length <= 2 ? "" : process.argv[2];
const directoryPath = path.join(__dirname,`/${targetDirectoryPath}`)
const searchPattern = "process\.env\.[a-zA-Z0-9_]+"; // Pattern to capture environment variables
const envFilePath = path.join(__dirname, ".env");
const validExtensions = ["js","jsx","ts","tsx","mjs","txt","json","html","css"]
validExtensions.push(...process.argv);
const separator = "#=========================================";


function readFilesSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true})
  const matches = [];
  for (const file of files) {
    const filePath = path.join(dir, file.name)
    const parts = file.name.split('.');
    const fileExtension = parts[parts.length-1]
   
    if (file.name.startsWith('.') ||
        file.name === 'package-lock.json') {
      continue;
    }
    if ((file.isDirectory() && file.name !== 'node_modules')) {
      matches.push(...readFilesSync(filePath)) // Recursive call for subdirectories (excluding node_modules)
    } 
    else if (file.isFile() && (validExtensions.indexOf(fileExtension) >= 0)) {

      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        // const match = content.match(searchPattern);
        // if (match) {
        //     matches.push(`# ${filePath}\n${match[0].split('.')[2]}=`);
        // }
        const lines = content.split('\n'); // Split content into lines
        for (let i = 0; i < lines.length; i++) {
          const patternFound = lines[i].match(searchPattern);
          if (patternFound) {
            const envVar = patternFound[0].split('.')[2];
            matches.push(`# ${filePath} Line:${i + 1}\n${envVar}=`); // Add comment with filePath and line number
          }
        }
      } catch (err) {
        console.error(`Error reading file: ${filePath}`, err)
      }
    }
  }
  return matches
}

const matches = readFilesSync(directoryPath)
function createEnvFile(matches)
{
    if(matches.length > 0)
    {
      const content = `\n${separator}\n${matches.join('\n\n')}\n${separator}\n`;
        fs.appendFileSync(envFilePath,content,'utf-8')
    }
}
createEnvFile(matches)