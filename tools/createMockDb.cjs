/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockData = require("./mockData.cjs");

const {
  passengers,
  ancillaryServices,
  checkInPassengers,
  flights,
  seats,
  services,
} = mockData;
const data = JSON.stringify({
  passengers,
  ancillaryServices,
  checkInPassengers,
  flights,
  seats,
  services,
});
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
