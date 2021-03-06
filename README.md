# Swagger generated server

## Overview
This server was generated by the [swagger-codegen](https://github.com/swagger-api/swagger-codegen) project.  By using the [OpenAPI-Spec](https://github.com/OAI/OpenAPI-Specification) from a remote server, you can easily generate a server stub.

### Running the server
To run the server, run:

```
npm start
```

To view the Swagger UI interface:

```
open http://localhost:8084/docs
```

This project leverages the mega-awesome [swagger-tools](https://github.com/apigee-127/swagger-tools) middleware which does most all the work.



### Works with :
 - npm 3.5.2 / nodejs 8.10.0
 - npm 5.6.0 / nodejs 9.9.0 (10.15.2 ?)

### npm modules needed
```
npm i json2csv
npm i mongodb
npm start
```


### Production environment 
```
sudo npm install -g pm2
sudo pm2 start npm -- start
sudo pm2 delete npm
```
