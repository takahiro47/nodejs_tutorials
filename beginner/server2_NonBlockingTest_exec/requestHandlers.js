var exec = require('child_process').exec;

function start() {
	console.log('Request handler "start" was called.');

	/*
	function sleep(milliSeconds) {
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSeconds);
	}
	sleep(10000); // 10秒
	*/

	var content = 'empty';
	exec('ls -lah', function (error, stdout, stderr) { // 匿名関数
		content = stdout;
	});

	return content;
}

function upload() {
	console.log('Request handler "upload" was called.');
	return 'Hello Upload';
}

exports.start = start;
exports.upload = upload;