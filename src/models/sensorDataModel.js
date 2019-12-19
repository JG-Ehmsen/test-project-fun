let mongoose = require('mongoose');

let sensorDataSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});


let SensorData = module.exports = mongoose.model('sensorData', sensorDataSchema);
module.exports.get = function (callback, limit) {
    SensorData.find(callback).limit(limit);
}
