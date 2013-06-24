var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs');

function start(response, postData) {
	console.log('Request handler "start" was called.');

	var body = '<html>'+
		'<head>'+
			'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
		'</head>'+
		'<body>'+
			'<form action="/upload" enctype="multipart/form-data" method="post">'+
				'<input type="file" name="upload">'+
				'<textarea name="text" rows="20" cols="60"></textarea>'+
				'<input type="submit" value="Submit text" />'+
			'</form>'+
		'</body>'+
	'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, postData) {
	console.log('Request handler "upload" was called.');
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You've send the text: " + queryString.parse(postData).text);
	response.end();
}

function show(response, postData) {
	console.log('Request handler "show" was called.');
	fs.readFile('./tmp/test.png', 'binary', function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + '\n');
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, 'binary');
			response.end();
		}
	});
}

function ls(response) {
	console.log('Request handler "ls" was called.');

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

exports.start = start;
exports.upload = upload;
exports.show = show;

exports.ls = ls;
exports.find = find;