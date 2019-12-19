let router = require('express').Router();

let sensorDataController = require('../controllers/sensorDataController');

router.route('/')
    .get(sensorDataController.getall)
    .post(sensorDataController.new);
router.route('/:sensorData_id')
    .get(sensorDataController.getId)
    .put(sensorDataController.update)
    .delete(sensorDataController.delete);
router.route('/name/:sensorData_name')
    .get(sensorDataController.getAllName);
router.route('/sensorid/:sensorData_sensorid')
    .get(sensorDataController.getAllSensorId);
router.route('/timestamp/:sensorData_timestamp')
    .get(sensorDataController.getAllTimestamp);
router.route('/query')
    .post(sensorDataController.getAllQuery);

module.exports = router;
