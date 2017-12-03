var constants = require('./constants');
var rp = require('request-promise');
var querystring = require('querystring');

module.exports = function(type) {
  getEntropy()
    .then((res) => {
      var entropy = res.data.join('');
      var randomness = generateRandomness(type, entropy);
      console.info(randomness);
    });
}

function generateRandomness(type, entropy) {
  // converting string to base64 in node
  var randomness = Buffer.from(entropy, 'base64');

  switch(type) {
    case constants.hex:
      return randomness.toString('hex');
    case constants.bin:
    default:
      // node base64 is already binary
      return randomness.toString();
  }
}

function getEntropy(type = 'hex16', length = 10, size = 10) {
  var SOURCE_URL = 'https://qrng.anu.edu.au/API/jsonI.php';
  var queryParams = querystring.stringify({
    type,
    length,
    size
  });
  var url = `${SOURCE_URL}?${queryParams}`; 
  var options = {
    method: 'get',
    url,
    json: true
  }
  return rp(options, (err, res, body) => {
    if (err === null && body.data && body.data.length) {
      body.data.join('');
    }
  });
}