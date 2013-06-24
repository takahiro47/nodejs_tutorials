var exec = require('child_process').exec,
		querystring = require('querystring'),
		fs = require('fs'),
		formidable = require('formidable');

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

function upload(response, request) {
	console.log('Request handler "upload" was called.');

	var form = new formidable.IncomingForm();
	console.log('about to parse');
	form.parse(request, function(error, fields, files) {
		console.log('parsing done');

		/* Possible error on Windows systems:
		 * tried to rename to an already exsiting file */
		fs.rename(files.upload.path, './tmp/test.png', function(err) {
			if (err) {
				fs.unlink('./tmp/test.png');
				fs.rename(files.upload.path, './tmp/test.png');
			}
		});
	});

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write('Received image:<br />');
	response.write('<img src="./show" />');
	response.end();
}

function show(response) {
	console.log('Request handler "show" was called.');

	fs.readFile('./tmp/test.png', 'binary', function(err, file) {
		if (err) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(err + '\n');
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