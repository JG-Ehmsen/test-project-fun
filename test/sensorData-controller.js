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

before((done) => {
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
            ]).then(() => done());
        });
});

after(() => {
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

                console.log(data);
                data.data.timestamp.should.equal(request.body.timestamp);
                done()
            });

            SensorDataController.new(request, response);
        });
    });
});
