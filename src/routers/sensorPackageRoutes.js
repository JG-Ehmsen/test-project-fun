let router = require('express').Router();

let sensorPackageController = require('../controllers/sensorPackageController');

router.route('/')
    .get(sensorPackageController.getall)
    .post(sensorPackageController.new);
router.route('/:sensorPackage_id')
    .get(sensorPackageController.getId)
    .put(sensorPackageController.update)
    .delete(sensorPackageController.delete);
router.route('/name/:sensorPackage_name')
    .get(sensorPackageController.getAllName);
router.route('/owner/:sensorPackage_owner')
    .get(sensorPackageController.getAllOwner);
router.route('/query')
    .post(sensorPackageController.getAllQuery);

module.exports = router;
