/*
 * =server.js
 *
 * 名前の通り、サーバの役割を担う。
 * PHPなどでいえば、Apacheのようもの。
 * ---------------------------------------------------- */

var http = require('http');
var url = require('url');

function start(route, handle) {
	/*
	var server = http.createServer(function(request, response){
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write('Hello World');
		response.end();
	}).listen(8888);
	*/
	function onRequest(request, response) { // requestとresponseはオブジェクト
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + ' received.');

		route(handle, pathname, response, request);

	}

	http.createServer(onRequest).listen(8888);
	console.log('Server has started.');
}

// パーツが持っている機能(関数)をエクスポート
exports.start = start;

