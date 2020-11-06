const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('199.7.159.58', (error, coords) => {
//   if (error) {
//     console.log("it didnt work!", error);
//     return;
//   }
//   console.log('it worked! returned coords: ', coords);
// });

// fetchISSFlyOverTimes({lattitude: 50, longitude: 50}, (error, times) => {
//   if (error) {
//     console.log('it didnt work!', error);
//     return;
//   }
//   console.log('it worked! returned fly times: ', times);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log('error');
    return;
  }
  printPassTimes(passTimes);
});
