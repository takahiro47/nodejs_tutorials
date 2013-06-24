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
		var postData = '';
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + ' received.');

		// 受信データのエンコーディングを定義
		request.setEncoding('utf8');

		request.addListener('data', function(postDataChunk) {
			postData += postDataChunk; // 新しいPOSTデータの塊を受けとる度に追記していく
			console.log('Received POST data chunk "' + postDataChunk + '"'); // コンソールにログ(あくまでテスト環境として)
		});

		request.addListener('end', function() {
			// routeは全てのPOSTデータが収集できた時にだけ呼び出される
			route(handle, pathname, response, postData);
		});

	}

	http.createServer(onRequest).listen(8888);
	console.log('Server has started.');
}

// パーツが持っている機能(関数)をエクスポート
exports.start = start;
