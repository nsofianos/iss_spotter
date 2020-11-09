const request = require('request-promise-native');

const fetchMyIP = () => {

  return request('https://api.ipify.org?format=json')
};

const fetchCoordsByIP = (body) => {
  const IP = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${IP}`);
};

const fetchISSFlyOverTimes = (body) => {
  const lat = JSON.parse(body).lat;
  const lon = JSON.parse(body).lon;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`;
  return request(url);
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((body) => {
    const responseTimes = JSON.parse(body).response;
    return responseTimes;
  })
}












module.exports = { nextISSTimesForMyLocation };