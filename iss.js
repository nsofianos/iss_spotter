const request = require('request');

const fetchMyIP = (cb) => {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`
      cb(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).ip;
    cb(null,data);
  })
};

const fetchCoordsByIP = (ip, cb) => {
  console.log(ip);
  request('https://ipvigilante.com/' + ip, (error, response, body) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`
      cb((msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;
    cb(null, { latitude, longitude });
  })
};

const fetchISSFlyOverTimes = (coords, cb) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    
    if (error) {
      cb(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`
      cb((msg), null);
      return;
    }
    
    const responseTimes = JSON.parse(body).response;
    cb(null, responseTimes);
  })
};

const nextISSTimesForMyLocation = (cb) => {

  fetchMyIP((error, ip) => {
    if (error) {
      return cb(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return cb(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, responseTimes) => {
        if (error) {
          return cb(error, null);
        }
        cb(error, responseTimes);
      })
    })
  })
  
};



module.exports = { nextISSTimesForMyLocation, fetchISSFlyOverTimes, fetchCoordsByIP };