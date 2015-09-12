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
		d.addEventListener('dragenter', function(e){
			pd(e);
			console.log('dragenter()');
			d.classList.add('activated');
			dm.innerHTML = 'Drop your images here!';
		});
		d.addEventListener('dragleave', function(e){
			pd(e);
			console.log('dragleave()');
			d.classList.remove('activated');
			dm.innerHTML = 'Drag your images here!';
		});
		d.addEventListener('dragover', function(e){
			pd(e);
			console.log('dragover()');
			d.classList.add('activated');
		});
		d.addEventListener('drop', function(e){
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