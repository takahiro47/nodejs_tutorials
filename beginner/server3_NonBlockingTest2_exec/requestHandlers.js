var exec = require('child_process').exec;

function start(response) {
	console.log('Request handler "start" was called.');

	// 短い処理
	exec('ls -lah', function (error, stdout, stderr) { // 匿名関数
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(stdout);
		response.end();
	});
}

function find(response) {
	console.log('Request handler "find" was called.');

	// 長い処理
	exec("find /",
		{timeout: 10000, maxBuffer: 20000*1024},
		function (error, stdout, stderr) {
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(stdout);
			response.end();
  });
}

function upload(response) {
	console.log('Request handler "upload" was called.');
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write('Hello Upload');
	response.end();
}

exports.start = start;
exports.find = find;
exports.upload = upload;