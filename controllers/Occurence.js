'use strict';

var utils = require('../utils/writer.js');
var Occurence = require('../service/OccurenceService');

module.exports.getOccurenceById = function getOccurenceById (req, res, next, occurenceId) {
  Occurence.getOccurenceById(occurenceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOccurences = function getOccurences (req, res, next, scientificName, taxonID, county, startDate, endDate, format) {
  Occurence.getOccurences(scientificName, taxonID, county, startDate, endDate)
    .then(function (response) {
      if (format=="csv") utils.writeCsv(res, response);
      else utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
