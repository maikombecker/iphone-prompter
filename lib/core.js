var items = new Array();
var currentFile = 0;
var currentItem = 0;

$(document).ready(function(){
	loadNextFile();
});

function loadNextFile() {
	if(currentFile==0 || confirm("Load next list?")) {
		$.get(files[currentFile], function(data) {
			items = data.split("\n");
			progress.initialize(items.length);
			currentFile++;
			if (currentFile>=files.length) {  $("#loadfilebutton").hide(); }
			$("#buttons").show();
			currentItem = -1;
			showNext();
		});
	}
}

function showPrev() {
	currentItem--;
	progress.set(currentItem);

	$("#item").html(items[currentItem]);

	$("#buttonleft").attr("disabled", currentItem<=0);
	
	if (currentItem<items.length-1) {
		$("#buttonright").attr("disabled", false);
	}
}

function showNext() {
	currentItem++;
	progress.set(currentItem);

	$("#item").hide();
	$("#item").html(items[currentItem]);
	$("#item").show("slide");

	$("#buttonleft").attr("disabled", currentItem<=0);

	$("#buttonright").attr("disabled", true);
	if (currentItem<items.length-1) {
		setTimeout('$("#buttonright").attr("disabled", false);',0);
	}
}
