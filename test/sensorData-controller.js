const expect = require('chai').expect;
const assert = require('chai').assert;
const sinon = require('sinon');

const SensorData = require('../src/models/sensorDataModel');

const SensorDataController = require('../src/controllers/sensorDataController');

describe('SensorData Controller', function () {
    describe('create one', function () {
        it('should add a created sensordata to the list with sensordata', function () {

            const req = {
                body: {
                    id: '1',
                    name: 'temperature',
                    value: '35',
                    timestamp: 12,
                },
            };

            const res = {
                status: function() {
                    return this;
                },
                json: function () {}
            };

            SensorDataController.new(req, res, () => {}).then(sensorData => {
                expect(sensorData).to.have.property('id');
                assert.typeOf(sensorData, 'string');
            })
        });
    });
});