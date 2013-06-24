/*
 * =router.js
 *
 * 名前の通り、ルータの役割を担う。
 * ---------------------------------------------------- */

function route(handle, pathname, response, postData) {
	console.log('About to route a request for ' + pathname);

	// パス名に対応するリクエストハンドラが存在するかどうかをチェック
	if (typeof handle[pathname] === 'function') {
		return handle[pathname](response, postData);
	} else {
		console.log('No request handler found for ' + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;