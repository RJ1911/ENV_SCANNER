# ENV_SCANNER
```bash 
usage : node envScanner.js [directoryName] [Extra File Extensions]
```
#### directoryName : 
  if in current directory ""
  else use relative directory path
#### Extra fileExtensions : 
  some other custom file extesnsions which might contain process.env.some_env_var
#### Example : 
```
node envSanner.js "./src" mjs tsx
```



