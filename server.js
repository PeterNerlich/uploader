#!/usr/bin/nodejs

var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var server = http.createServer(function (req, res) {
	console.log('→ '+req.url);
	///*
	if(req.url.match(/^\/show/)) {
		res.end('/show');
	} else if(req.url.match(/^\/upload/)) {
		if (req.url.match(/^\/upload\/script.js$/)) {
			sendfile('res/js/upload.js',res);
		} else if (req.url.match(/^\/upload$/) || req.url.match(/^\/upload\/$/)) {
			sendfile('res/html/upload.html',res);
		} else {
			error(404,res)(404);
		}
	} else if (req.url.match(/^\/main.css$/)) {
		sendfile('res/css/main.css',res);
	} else if (req.url.match(/^\/favicon.ico$/)) {
		sendfile('favicon.ico',res);
	} else {
		error(404,res)(404);
	}
	//*/
	//error(404,res)(404);
});

server.listen(1234, function(){
	console.log('Server running on port 1234');
});

function error(code, res) {
	if (code == 404) {
		return function(e){console.log(e); res.writeHead(404, {"Content-Type": "text/html"}); res.end('<!DOCTYPE html><html><head><title>ERROR 404</title></head><body><p>ERROR 404: FILE NOT FOUND</p></body></html>');};
	} else if (code == 500) {
		return function(e){console.log(e); res.writeHead(500, {"Content-Type": "text/html"}); res.end('<!DOCTYPE html><html><head><title>ERROR 500</title></head><body><p>ERROR 500: INTERNAL SERVER ERROR</p></body></html>');};
	} else {
		return function(e){console.log(e); res.writeHead(500, {"Content-Type": "text/html"}); res.end('<!DOCTYPE html><html><head><title>ERROR 500</title></head><body><p>ERROR 500: INTERNAL SERVER ERROR</p></body></html>');};
	}
}

function sendfile(uri, res) {
	var stream = fs.createReadStream(path.join(__dirname, uri));
	stream.on('error', error(500,res));
	//stream.on('readable', function(){console.log('streaming'); stream.pipe(res);});
	stream.pipe(res);
}