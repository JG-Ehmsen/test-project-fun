const should = require('should');

const SensorData = require('../src/models/sensorDataModel');

const mockData = [
    {
        id: '1',
        name: 'temperature',
        value: '35',
        timestamp: 12,
    },
];

const SensorDataController = require('../src/controllers/sensorDataController');
const http_mocks = require('node-mocks-http');


const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');


function buildResponse() {
    return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
}

let mongoServer;
const opts = { };
var dbMockData;

beforeEach((done) => {
    mongoServer = new MongoMemoryServer();

    mongoServer.getConnectionString()
        .then((mongoUri) => {
            return mongoose.connect(mongoUri, opts, (err) => {
                if (err) done(err);
            });
        })
        .then(() => {
            // preparing in memory database contents
            Promise.all([
                SensorData.create(mockData[0]),
            ]).then(function (sensorData) {
                dbMockData = sensorData;
                done();
            });
        });
});

afterEach(() => {
    mongoose.disconnect();
    mongoServer.stop();
});

describe('SensorData Controller', function () {
    describe('create one', function () {
        it('should add a created sensordata to the list with sensordata', function (done) {

            var response = buildResponse();
            var request  = http_mocks.createRequest({
                method: 'POST',
                url: '/api/sensorData/',
            });

            request.body = {
                id: '1',
                name: 'temperature',
                value: '25',
                timestamp: 123456789,
            };

            response.on('end', function() {
                response._isJSON().should.be.true;
                const data = JSON.parse(response._getData());

                data.data.timestamp.should.equal(request.body.timestamp);
                done()
            });

            SensorDataController.new(request, response);
        });
    });
    describe('getAll', function () {
        it('should get all data from sensordata', function (done) {

            var response = buildResponse();
            var request  = http_mocks.createRequest({
                method: 'GET',
                url: '/api/sensorData/getAll',
            });

            response.on('end', function() {
                response._isJSON().should.be.true;
                const data = JSON.parse(response._getData());

                data.data[0].id.should.equal(mockData[0].id);
                data.data[0].name.should.equal(mockData[0].name);
                data.data[0].value.should.equal(mockData[0].value);
                data.data[0].timestamp.should.equal(mockData[0].timestamp);

                done()
            });

            SensorDataController.getall(request, response);
        });
    });
    describe('update', function () {
        it('should update value of object in database', function (done) {

            var response = buildResponse();
            var request  = http_mocks.createRequest({
                method: 'PUT',
                url: '/api/sensorData/update',
            });

            request.params = { 'sensorData_id': dbMockData[0]._id };
            request.body = {
                value: '125'
            };

            response.on('end', function() {
                response._isJSON().should.be.true;
                const data = JSON.parse(response._getData());

                data.data.value.should.equal('125');

                done()
            });

            SensorDataController.update(request, response);
        });
    });
});
