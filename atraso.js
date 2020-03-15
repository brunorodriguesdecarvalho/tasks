var events = require('events');
var eventEmitter = new events.EventEmitter();

var myEventHandler = function () {
    console.log('Eu escutei um grito!');
}

eventEmitter.on('grito', myEventHandler);

eventEmitter.emit('grito');