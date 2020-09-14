'use strict';

var dbMongo = require ('../dbmongo.js');
/**
 * Find occurence by ID
 * Returns a single occurence
 *
 * occurenceId String ID of occurence to return
 * returns Occurence
 **/
exports.getOccurenceById = function(occurenceId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    /*examples['application/json'] = {
  "id" : "SFTstd:19960523:143,",
  "basisOfRecord" : "HumanObservation,",
  "occurrenceID" : "SFTstd:19960523:143:100138:l,",
  "recordedBy" : "441,",
  "individualCoun" : "1,",
  "eventID" : "SFTstd:19960523:143,",
  "taxonID" : "100138,",
  "scientificName" : "Tetrao urogallus,",
  "kingdom" : "Animalia,",
  "genus" : "Tetrao,",
  "specificEpithet" : "urogallus,",
  "taxonRank" : "species"
};*/
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
        var collOccurences = dbMongo.getCollection("Occurences");
        collOccurences.findOne({ "occurrenceID": occurenceId }, (error, result) => {
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

async function getArrayEvents (collEvents, paramRequestEvents) {

  return new Promise(resolve => {

    var arrEvents = [];

    collEvents.find(paramRequestEvents).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }

        for (var i=0; i < result.length; i++) {
            
          arrEvents.push(result[i].eventID);
          // do something with item
        }

        resolve(arrEvents);

    });
  });

}


/**
 * Find occurences using several optionnal parameters
 * Returns an array of occurences
 *
 * scientificName String occurences with matching scientificName (optional)
 * taxonID Integer occurences with matching taxonID. A list (comma separated) can be provided (optional)
 * county Integer occurences with matching counties. A list (comma separated) can be provided (optional)
 * startDate date occurences with matching startDate. Using \">= startDate\" (optional)
 * endDate date occurences with matching endDate. Using \"<= endDate\" (optional)
 * returns Occurence
 **/
exports.getOccurences = function(scientificName,taxonID,county,startDate,endDate) {
// http://localhost:8084/occurences?scientificName=Tetrao%20urogallus|Bucephala%20clangula&taxonID=100138
// http://localhost:8084/occurences?taxonID=100138|102990
// http://localhost:8084/occurences?startDate=2018-07-01&endDate=2018-07-03
// http://localhost:8084/occurences?startDate=2018-07-01&endDate=2018-07-03&taxonID=100138|102990
// http://localhost:8084/occurences?startDate=2018-07-01&endDate=2018-07-03&taxonID=100138|102990&format=csv

  var paramRequest = {};
  var paramRequestEvents = {};
  var arrEvents = [];

  return new Promise(async function(resolve, reject) {
    var examples = {};
    /*examples['application/json'] = {
  "id" : "SFTstd:19960523:143,",
  "basisOfRecord" : "HumanObservation,",
  "occurrenceID" : "SFTstd:19960523:143:100138:l,",
  "recordedBy" : "441,",
  "individualCoun" : "1,",
  "eventID" : "SFTstd:19960523:143,",
  "taxonID" : "100138,",
  "scientificName" : "Tetrao urogallus,",
  "kingdom" : "Animalia,",
  "genus" : "Tetrao,",
  "specificEpithet" : "urogallus,",
  "taxonRank" : "species"
};*/
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      //console.log("scientificName:"+ scientificName);
      //console.log("taxonID:"+ taxonID);
      //console.log("county:"+ county);
      //console.log("startDate:"+ startDate);
      //console.log("endDate:"+ endDate);

      var isArrEventsMandatory =false;
      var collOccurences = dbMongo.getCollection("Occurences");
      var collEvents = dbMongo.getCollection("Events");

      if (typeof scientificName !== 'undefined' && scientificName !== null){
        var splitScientificName = scientificName.split('|');
        paramRequest.scientificName = { $in : splitScientificName  };
      }
      if (typeof taxonID !== 'undefined' && taxonID !== null){
        var splitTaxonId = taxonID.split('|').map(Number);
        paramRequest.taxonID = { $in : splitTaxonId  };

      }
      if (typeof county !== 'undefined' && county !== null){
        var splitCounties = county.split('|');
        paramRequestEvents.county = { $in : splitCounties  };
      } 

      var isStartDate=false;
      var isEndDate=false;

      if (typeof startDate !== 'undefined' && startDate !== null){

          isStartDate=true;

      }
      if (typeof endDate !== 'undefined' && endDate !== null){

          isEndDate=true;
      }
      if (isStartDate && isEndDate) {
          paramRequestEvents.eventDate = { 
              $gte : new Date( startDate + "T00:00:00.001Z"),
              $lte : new Date( endDate + "T23:59:59.999Z") 
          };

      }
      else if (isStartDate) {
          paramRequestEvents.eventDate = { $gte : new Date( startDate + "T00:00:00.001Z") };
      }
      else if (isEndDate) {
          paramRequestEvents.eventDate = { $lte : new Date( endDate + "T23:59:59.999Z") };
      }

      //console.log(paramRequestEvents);
      if (Object.keys(paramRequestEvents).length > 0 ) {

        arrEvents = await getArrayEvents(collEvents, paramRequestEvents);
        isArrEventsMandatory=true;

      }

      if (isArrEventsMandatory) {
            // add it even if it's emmpty
          paramRequest.eventID = { $in : arrEvents  };

      }
      /*
      else {
          if (typeof eventID !== 'undefined' && eventID !== null){

              paramRequest.eventID = eventID;

          }
      }
      */



      //console.log(paramRequest);

      

      collOccurences.find(paramRequest).limit(50).toArray((error, result) => {

        if(error) {
            //return response.status(500).send(error);
            resolve(500);
        }

        console.log("Nb of results :" + result.length);

        // check format
        /*
        if (typeof format !== 'undefined' && format == "csv"){
            csv = createCSVExport(collOccurences, paramRequest, result);

            response.header('Content-Type', 'text/csv');
            response.attachment('occurences-multiple-params.csv')
            response.status(200).send(csv)
        }
        else {
            //response.send(result);  
            resolve(result);
        }
        */

        resolve(result);

      });
      //resolve();
    }
  });
}

