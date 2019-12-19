let router = require('express').Router();

let sensorController = require('../controllers/sensorController');

router.route('/')
    .get(sensorController.getall)
    .post(sensorController.new);
router.route('/:sensor_id')
    .get(sensorController.getId)
    .put(sensorController.update)
    .delete(sensorController.delete);
router.route('/name/:sensor_name')
    .get(sensorController.getAllName);
router.route('/master/:sensor_master')
    .get(sensorController.getAllMaster);
router.route('/query')
    .post(sensorController.getAllQuery);

module.exports = router;
