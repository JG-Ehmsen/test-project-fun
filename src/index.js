// ----- Express Import & Setup -----
let app = require('express')();

let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let sensorRoutes = require('./routers/sensorRoutes');
let sensorDataRoutes = require('./routers/sensorDataRoutes');
let sensorPackageRoutes = require('./routers/sensorPackageRoutes');
let userRoutes = require('./routers/userRoutes');
let messagingRoutes = require('./routers/messagingRoutes');

let mqttHandler = require("./messaging/mqttHandler.js");
let config = require('../config.json');

// ----- Parser Options Setup -----
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ----- DB Setup -----
mongoose.connect(config.url + config.db, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// ----- MQTT Setup -----
const mqttHandle = new mqttHandler(config.flespiHost, config.flespiToken);
mqttHandle.connect(config.sensorTopic);
messagingRoutes.setMqttClient(mqttHandle.mqttClient);

// ----- Route Setup -----
app.use('/api/sensorPackages/', sensorPackageRoutes);
app.use('/api/sensors/', sensorRoutes);
app.use('/api/sensorData/', sensorDataRoutes);
app.use('/api/users/', userRoutes);
app.use('/api', messagingRoutes);

// ----- Start Listening -----
const port = process.env.PORT || config.port;
app.listen(port, function () {
    console.log("Running API on port " + port);
});
