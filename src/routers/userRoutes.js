let router = require('express').Router();

let userController = require('../controllers/userController');

router.route('/')
    .get(userController.getall)
    .post(userController.new);
router.route('/:user_id')
    .get(userController.getId)
    .put(userController.update)
    .delete(userController.delete);
router.route('/name/:user_name')
    .get(userController.getAllName);
router.route('/email/:user_email')
    .get(userController.getAllEmail);
router.route('/query')
    .post(userController.getAllQuery);

module.exports = router;
