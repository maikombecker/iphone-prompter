var items = new Array();
var currentFile = 0;
var currentItem = 0;

$(document).ready(function(){
	loadNextFile();
});


$(document).keydown(function(event) {

	switch (event.keyCode) {
		case 13: event.preventDefault(); break;

		case 32: showNext(); break;
		case 39: showNext(); break;
		case 40: showNext(); break;
		case 74: showNext(); break;
		case 75: showNext(); break;
		case 76: showNext(); break;

		case 37: showPrev(); break;
		case 38: showPrev(); break;
		case 68: showPrev(); break;
		case 70: showPrev(); break;
		case 83: showPrev(); break;
	}		     

});


function loadNextFile() {
	if(currentFile==0 || confirm("Load next list?")) {
		$.get(files[currentFile], function(data) {
			raw_items = data.split("\n");
			
			items = new Array();
			for (var i=0; i<raw_items.length; i++) {
				if(raw_items[i].replace(/(\n|\r)+$/, '').length>0) items.push(raw_items[i].replace(/(\n|\r)+$/, ''));
			}
			if (randomize) {
				items.shuffle();
			}
			progress.initialize(items.length);
			currentFile++;
			if (currentFile>=files.length) {  $("#loadfilebutton").hide(); }
			$("#buttons").show();
			currentItem = 0;
			showNext();
		});
	}
}

function showPrev() {
	if (currentItem>1) {
		currentItem--;
		progress.set(currentItem);
	
		$("#item").html(items[currentItem-1]);
		$("#buttonleft").attr("disabled", currentItem<=1);
		$("#buttonright").attr("disabled", currentItem>items.length-1);
	}
}

function showNext() {
	if (currentItem<items.length) {
		currentItem++;
		progress.set(currentItem);

		$("#item").hide();
		$("#item").html(items[currentItem-1]);
		$("#item").show("slide");
		$("#buttonleft").attr("disabled", currentItem<=1);
		$("#buttonright").attr("disabled", currentItem>items.length-1);
	}
}


Array.prototype.shuffle = function () {
	for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
	return this;
}


