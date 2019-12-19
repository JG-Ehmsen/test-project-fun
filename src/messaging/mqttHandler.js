let mqtt = require('mqtt');
SensorData = require('../models/sensorDataModel');

// ----- Socket IO Setup -----
let dictSingleData = {};
const io = require('socket.io')(3002);
io.on('connection', socketSendDefault);
io.on('newListener', socketSendDefault);

function socketSendDefault(socket) {
    console.log('A client connected');
    for (const [key, value] of Object.entries(dictSingleData)) {
        let emitPath = "sensordata/" + value.id;
        socket.emit(emitPath, {
            id: value.id,
            name: value.name,
            value: value.value,
            timestamp: value.timestamp
        });
    }
}

class MqttHandler {
    constructor(host, token) {
        this.mqttClient = null;
        this.host = host;
        this.username = token;
    }

    connect(sensorTopic) {
        //Connect mqtt with credentials (In case of needed, otherwise we can omit 2nd param)
        this.mqttClient = mqtt.connect(this.host, {
            username: this.username,
            password: ""
        });

        // Mqtt error callback
        this.mqttClient.on("error", err => {
            console.log(err);
            this.mqttClient.end();
        });

        this.mqttClient.on("close", () => {
            console.log("mqtt client disconnected");
        });

        //Connection callback
        this.mqttClient.on("connect", () => {
            console.log(`mqtt client connected`);
        });

        // Mqtt subscriptions with various topics
        this.mqttClient.subscribe(sensorTopic, {qos: 0});

        // When a message arrive console log it
        this.mqttClient.on("message", function (topic, message) {
            let jsonMessage = JSON.parse(message);

            let sensorData = new SensorData();
            sensorData.id = jsonMessage.id;
            sensorData.name = jsonMessage.name;
            sensorData.value = jsonMessage.value;
            sensorData.timestamp = jsonMessage.timestamp;
            sensorData.save(function (err) {
                if (err) {
                    console.log("Error logging sensor data with message: " + message)
                } else {
                    let emitPath = "sensordata/" + sensorData.id;
                    io.emit(emitPath, {
                        id: sensorData.id,
                        name: sensorData.name,
                        value: sensorData.value,
                        timestamp: sensorData.timestamp
                    });
                    let dictKey = sensorData.id + sensorData.name;
                    dictSingleData[dictKey] = sensorData;
                }
            });
        });
    }

}

// Change an LED brightness
function setLEDBrightness(ledId, ledValue, mqttClient) {

    if (mqttClient && ledId && ledValue) {
        console.log("Set brightness of LED: " + ledId + " to " + ledValue);
        mqttClient.publish("" + ledId, "" + ledValue);
        return true;
    } else {
        console.log("Could not set brightness of LED: " + ledId + " to " + ledValue + ". MqttClient: " + mqttClient);
        return false;
    }
}

function updateConfig(packageId, config, mqttClient) {
    if (mqttClient && packageId && config) {
        console.log("Update config of Package: " + packageId + " to " + config);
        mqttClient.publish("/conf/" + packageId, "" + config);
        return true;
    } else {
        console.log("Could not update config of Package: " + packageId + " to " + config + ". MqttClient: " + mqttClient);
        return false;
    }
}

module.exports = MqttHandler;
module.exports.setLEDBrightness = setLEDBrightness;
module.exports.updateConfig = updateConfig;
