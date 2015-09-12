window.onload = function(){
	console.log('window ready');

	function pd(e) {
		e.preventDefault();
	}
	document.addEventListener('dragenter', pd);
	document.addEventListener('dragleave', pd);
	document.addEventListener('dragover', pd);
	document.addEventListener('drop', pd);

	d = document.getElementById('dragbox');
	d.classList.remove('activated');
	dm = document.getElementById('dragmessage');
	dm.innerHTML = 'Drag your images here!';
	if(window.FileReader) { 
		addEventHandler(d, 'dragenter', function(e){
			pd(e);
			console.log('dragenter()');
			d.classList.add('activated');
			dm.innerHTML = 'Drop your images here!';
		});
		addEventHandler(d, 'dragleave', function(e){
			pd(e);
			console.log('dragleave()');
			d.classList.remove('activated');
			dm.innerHTML = 'Drag your images here!';
		});
		addEventHandler(d, 'dragover', function(e){
			pd(e);
			console.log('dragover()');
			d.classList.add('activated');
		});
		addEventHandler(d, 'drop', function(e){
			pd(e);
			console.log('drop()');
			d.classList.remove('activated');
			dm.innerHTML = 'Drag your images here!';
		});
	} else {
		d.classList.add('error');
		dm.innerHTML = 'Your Browser doesn\'t support the HTML5 File Reader.';
	}
};

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