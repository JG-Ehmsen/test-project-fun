let mongoose = require('mongoose');

let sensorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    master: {
        type: String,
        required: true
    }
});


let Sensor = module.exports = mongoose.model('sensor', sensorSchema);
module.exports.get = function (callback, limit) {
    Sensor.find(callback).limit(limit);
}
