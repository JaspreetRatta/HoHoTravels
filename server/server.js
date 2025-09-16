<<<<<<< HEAD
const express = require('express');
const { readdirSync } = require('fs');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;

const usersRoute = require('./routes/usersRoute');
const busesRoute = require('./routes/busesRoute');
const couponsRoute = require('./routes/couponsRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const tourRoute = require('./routes/tourRoute');
const cloundinaryRoute = require('./routes/cloudinaryRoute.js');
const memoriesRoute = require('./routes/memoriesRoute');
const pin = require('./routes/pins');
const reviewRoute = require('./routes/reviewRoute');
const profileRoute = require('./routes/profile');

app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100000, limit: '500mb' }));
app.use(
  express.json({
    limit: '50mb',
  })
);

// Route
app.use('/api/users', usersRoute);
app.use('/api/buses', busesRoute);
app.use('/api/coupons', couponsRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/tour', tourRoute);
app.use('/api/memories', memoriesRoute);
app.use('/api/cloundinary', cloundinaryRoute);
app.use('/api/pins', pin);
app.use('/api/review', reviewRoute);
app.use('/api/profile', profileRoute);
app.use(express.json());

app.listen(port, () => {
  console.log('Server is running on port ' + port);
=======
const express = require("express");
const { readdirSync } = require("fs");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;
const cors = require("cors");

const usersRoute = require("./routes/usersRoute");
const busesRoute = require("./routes/busesRoute");
const couponsRoute = require("./routes/couponsRoute");
const bookingsRoute = require("./routes/bookingsRoute");
const tourRoute = require("./routes/tourRoute");
const cloundinaryRoute = require("./routes/cloudinaryRoute.js");
const memoriesRoute = require("./routes/memoriesRoute");
const pin = require("./routes/pins");
const reviewRoute = require("./routes/reviewRoute");
const profileRoute = require("./routes/profile");

app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: "500mb",
  })
);
app.use(
  express.json({
    limit: "50mb",
  })
);
//cors
app.use(cors())
// Route
app.use("/api/users", usersRoute);
app.use("/api/buses", busesRoute);
app.use("/api/coupons", couponsRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/tour", tourRoute);
app.use("/api/memories", memoriesRoute);
app.use("/api/cloundinary", cloundinaryRoute);
app.use("/api/pins", pin);
app.use("/api/review", reviewRoute);
app.use("/api/profile", profileRoute);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/favicon.ico", (req, res) => {
  // Return a 204 No Content response to ignore the request
  res.status(204).end();
});

app.get("/ahmed", (req, res) => {
  res.send("It works!");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
>>>>>>> 501cafe1cd16251b928ad9581ff1d06a9397c0f1
});
