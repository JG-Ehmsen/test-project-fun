let mongoose = require('mongoose');

let sensorPackageSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    owner: {
        type: String,
        required: true
    }
});


let SensorPackage = module.exports = mongoose.model('sensorPackage', sensorPackageSchema);
module.exports.get = function (callback, limit) {
    SensorPackage.find(callback).limit(limit);
}
