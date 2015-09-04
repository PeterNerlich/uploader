var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
	console.log(req.url);
	if(req.url.match(/^\/show/)) {
		res.end('/show');
	} else if(req.url.match(/^\/upload/)) {
		res.end('/upload');
	} else {
		res.end('ERROR');
	}
});

server.listen(1234, function(){
	console.log('Server running at http://127.0.0.1:1234/');
});