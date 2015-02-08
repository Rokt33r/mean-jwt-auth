# MEAN stack auth with Json Web Token(JWT)

Example of MEAN stack authentication without using session

## Install

### 1. Run Gulp to build
``` bash
gulp
```

### 2. Setup MongoDB
``` bash
mkdir storage
mongod --dbpath="storage"
```
> If you want to use another MongoDB, check `server.js`.

### 3. Run Server
``` bash
node server.js
```
