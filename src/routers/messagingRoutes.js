let router = require('express').Router();

let mqttHandler = require('../messaging/mqttHandler');
let _mqttClient = null;
function setMqttClient(mqttClient)
{
    _mqttClient = mqttClient;
}

router.route('/leds')
    .post(function (req, res) {
        let ledId = "/control/"+req.body.ledId+"/led";
        let ledValue = req.body.ledValue;

        let result = mqttHandler.setLEDBrightness(ledId, ledValue, _mqttClient);
        if (result) {
            res.json({
                message: "Sent LED update message."
            })
        } else
        {
            res.json({
                message: "LED update could not be sent."
            })
        }
    });
router.route('/config/:rpi_id')
    .post(function (req, res) {
        let rpi_id = req.params.rpi_id;
        let config = JSON.stringify(req.body);

        let result = mqttHandler.updateConfig(rpi_id, config, _mqttClient);
        if (result) {
            res.json({
                message: "Sent conf update message."
            })
        } else
        {
            res.json({
                message: "Conf update could not be sent."
            })
        }
    });

module.exports = router;
module.exports.setMqttClient = setMqttClient;
