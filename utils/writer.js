var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;
  var payload;

  if(arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  if(arg2 && Number.isInteger(arg2)) {
    code = arg2;
  }
  else {
    if(arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }
  if(code && arg1) {
    payload = arg1;
  }
  else if(arg1) {
    payload = arg1;
  }

  if(!code) {
    // if no response code given, we default to 200
    code = 200;
  }
  if(typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload);
}


function createCSVExport(result) {
  var arrFields = [];

  var { Parser } = require('json2csv');
  const json2csv = new Parser( { arrFields } );

  const csv = json2csv.parse(result)

  return csv
}



var writeCsv = exports.writeCsv = function (response, arg1, arg2) {

  csv = createCSVExport(arg1);

  response.header('Content-Type', 'text/csv');
  response.attachment('occurences-multiple-params.csv')
  response.status(200).send(csv)
}