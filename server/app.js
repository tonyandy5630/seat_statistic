const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes");
const app = express();
const db = require("./database/models");

const port = process.env.port || 8080;
const whitelist = [
  process.env.CLIENT_URL_PRODUCTION,
  process.env.CLIENT_URL_DEVELOPMENT,
  process.env.CLIENT_URL_DOMAIN,
];

app.use(bodyParser.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS at " + origin));
      }
    }, // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept",
  })
);

app.use(router);
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.listen(port);
console.log("running on " + port);
