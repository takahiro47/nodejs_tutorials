var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {}
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;

handle['/ls'] = requestHandlers.ls;
handle['/find'] = requestHandlers.find;


server.start(router.route, handle);

