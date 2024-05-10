# ENV_SCANNER
> Scan whole project for environment variables used and add it to .env file,
> use this instead of manually searching and going through the files

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

#### To Do :
- change read and write to async read and write 
- currently only for node js project , make it viable for other projects like python and java
- add more custom cli options



