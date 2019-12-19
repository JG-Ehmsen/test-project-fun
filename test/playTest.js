const expect = require('chai').expect;
const assert = require('chai').assert;

//const sayHello = require('../src/playFunction').sayHello;
//const addNumbers = require('../src/playFunction').addNumbers;
const play = require('../src/playFunction');

// Results
sayHelloResult = play.sayHello();
addNumbersResult = play.addNumbers();


describe('Play', function() {
    describe('sayHello', function () {
        it('sayHello should return hello', function () {
            //let result = play.sayHello();
            assert.equal(sayHelloResult, 'hello');

        });

        it('sayHello should return type string', function () {
            //let result = play.sayHello();
            assert.typeOf(sayHelloResult, 'string');

        });
    });


    describe('addNumbers', function () {
        it('It should not give a result of 6', function () {
            //let result = play.addNumbers(2, 3);
            expect(addNumbersResult).not.to.equal(6);
        });

        it('addNumbers should return type number', function() {
            //let result = play.addNumbers(5,5);
            assert.typeOf(addNumbersResult, 'number');
        });
    });

});


