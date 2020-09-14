'use strict';

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var serverPort = 8084;

// swaggerRouter configuration
var options = {
    controllers: path.join(__dirname, './controllers')
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
expressAppConfig.addValidator();
var app = expressAppConfig.getApp();

var dbMongo = require ('./dbmongo.js');

const LIMIT_MAX=50;

//var dbMongo = require ('db-mongo.js');

// CUSTOM MATHIEU
/*
const Express = require("express");
const BodyParser = require("body-parser");

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
*/
// FIN CUSTOM


// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);

/*
    MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collEvents = database.collection("events");
        collOccurences = database.collection("occurences");
        console.log("Connected to `" + DATABASE_NAME + "`!");

    });*/

	dbMongo.connectToServer( function( err, client ) {
      if (err) console.log(err);
      console.log("connected");
    } );
});


/*
app.get("/events/:id", (request, response) => {
// SFTstd:19960523:143
    collEvents.findOne({ "eventID": request.params.id }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
*/