'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.getEventById = function getEventById (req, res, next, eventId) {

  Event.getEventById(eventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
