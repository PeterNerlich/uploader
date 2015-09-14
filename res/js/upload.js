var rawfiles = [];
var processedfiles = [];

window.onload = function(){
	console.log('window ready');

	function pd(e) {
		e = e || window.event; // get window.event if e argument missing (in IE)
		e.preventDefault();
	}
	addEventHandler(document, 'dragenter', pd);
	addEventHandler(document, 'dragleave', pd);
	addEventHandler(document, 'dragover', pd);
	addEventHandler(document, 'drop', pd);

	d = document.getElementById('dragbox');
	d.classList.remove('activated');
	dm = document.getElementById('dragmessage');
	dm.innerHTML = 'Drag your images here!';
	fs = document.getElementById('fileselector');
	if(window.FileReader) { 
		addEventHandler(d, 'dragenter', function(e){
			e = e || window.event; // get window.event if e argument missing (in IE)
			pd(e);
			console.log('dragenter()');
			d.classList.add('activated');
			dm.innerHTML = 'Drop your images here!';
		});
		addEventHandler(d, 'dragleave', function(e){
			e = e || window.event; // get window.event if e argument missing (in IE)
			pd(e);
			console.log('dragleave()');
			d.classList.remove('activated');
			dm.innerHTML = 'Drag your images here!';
		});
		addEventHandler(d, 'dragover', function(e){
			e = e || window.event; // get window.event if e argument missing (in IE)
			pd(e);
			console.log('dragover()');
			d.classList.add('activated');
		});
		addEventHandler(d, 'drop', function(e){
			e = e || window.event; // get window.event if e argument missing (in IE)
			pd(e);
			console.log('drop()');
			d.classList.remove('activated');
			dm.innerHTML = 'Drag your images here!';
			//addFiles(e);
			addFiles(e.dataTransfer.files);
		});
		addEventHandler(fileselector, 'change', function(e){
			e = e || window.event; // get window.event if e argument missing (in IE)
			pd(e);
			console.log('<input> change()');
			addFiles(e.target.files);
			fileselector.value = '';
		});
	} else {
		d.classList.add('error');
		dm.innerHTML = 'Your Browser doesn\'t support the HTML5 File Reader.';
	}
};

var dt = null;

function addFiles(files) {
	console.log('addFiles()');
	var list = document.getElementById('filecue').getElementsByTagName('ul')[0];

	//dt = e.dataTransfer;
	//console.log(dt);
	//var files = dt.files;
	var loadedfiles = 0;
	console.log(files.length+' files dropped');
	for (var i=0; i<files.length; i++) {
		var file = files[i];
		var reader = new FileReader();

		addEventHandler(reader, 'loadend', function(e, file) {
			loadedfiles++;
			console.log('file '+i+' loaded');
			var bin = this.result; 
			var li = document.createElement('li');
			li.innerHTML = '<p>Loaded : '+file.name+' size '+file.size+' B</p>';
			list.appendChild(li);
		}.bindToEventHandler(file));

		reader.readAsDataURL(file);
	}
}

function addEventHandler(obj, evt, handler) {
	if(obj.addEventListener) {
		// W3C method
		obj.addEventListener(evt, handler, false);
	} else if(obj.attachEvent) {
		// IE method.
		obj.attachEvent('on'+evt, handler);
	} else {
		// Old school method.
		obj['on'+evt] = handler;
	}
}

Function.prototype.bindToEventHandler = function bindToEventHandler() {
	var handler = this;
	var boundParameters = Array.prototype.slice.call(arguments);
	//create closure
	return function(e) {
		e = e || window.event; // get window.event if e argument missing (in IE)	 
		boundParameters.unshift(e);
		handler.apply(this, boundParameters);
	}
};