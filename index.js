const { nextISSTimesForMyLocation, fetchISSFlyOverTimes, fetchCoordsByIP  } = require('./iss');

// fetchCoordsByIP('162.245.144.188', (error, coords) => {
  
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log(coords);

// });

// fetchISSFlyOverTimes({ latitude: '43.27670', longitude: '-123.13000' }, (error, responseTimes) => {
//   if (error) {
//     console.log("Error!!!", error);
//     return;
//   }
//   console.log(responseTimes);

// });

nextISSTimesForMyLocation((error, result) => {
  if (error) {
    console.log("error!!!!!!!!!!!", error);
  }

  
  result.forEach((el) => {
    const date = new Date(el.risetime * 1000);
    console.log(`Next pass is at ${date} for ${el.duration} seconds!`);
  })
});