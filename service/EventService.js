'use strict';

var dbMongo = require ('../dbmongo.js');

/**
 * Find event by ID
 * Returns a single event
 *
 * eventId String ID of event to return
 * returns Event
 **/
exports.getEventById = function(eventId) {
//http://localhost:8084/events/SFTstd:19960527:116

  return new Promise(function(resolve, reject) {
    var examples = {};
    /*examples['application/json'] = {
  "id" : "EXAMPLEID",
  "eventID" : "SFTstd:19960527:116",
  "samplingProtocol" : "http://www.fageltaxering.lu.se/inventera/metoder/standardrutter/metodik-standardrutter",
  "eventDate" : { },
  "eventTime" : "03:55:00",
  "locationID" : 116,
  "countryCode" : "SE",
  "county" : "Västra Götalands län",
  "decimalLatitude" : 58.432,
  "decimalLongitude" : 11.31,
  "geodeticDatum" : "WGS84"
};*/
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
        var collEvents = dbMongo.getCollection("Events");
        collEvents.findOne({ "eventID": eventId }, (error, result) => {
          if(error) {
            resolve(500);
              //return response.status(500).send(error);
          }
          resolve(result);
          //response.send(result);
        });
    }
  });
}

