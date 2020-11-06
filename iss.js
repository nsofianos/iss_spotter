const request = require('request');

const fetchMyIP = (cb) => {
  request('https://api.ipify.org?format=json', function (error, response, body) {
    if(error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }
    const IP = JSON.parse(body).ip;
    cb(null, IP);
  })
};

const fetchCoordsByIP = (ip, cb) => {
  request('http://ip-api.com/json/' + ip, (error, response, body) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coords. Response: ${body}`;
      cb(Error(msg), null);
    }
    const data = JSON.parse(body);
    const coords = { lattitude: data.lat, longitude: data.lon };
    cb(null, coords);
  })
}

const fetchISSFlyOverTimes = (coords, cb) => {
  const lat = coords.lattitude;
  const lon = coords.longitude;
  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`, (error, response, body) => {
    if (error) {
      cb(error, null)
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching times. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const flyTimes = data.response;
    console.log(flyTimes);
    cb(null, flyTimes);
  })
}

const nextISSTimesForMyLocation = (cb) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return cb(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return cb(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          return cb(error, null);
        }
        cb(null, times);
      })
    });
  });

};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation }; 

