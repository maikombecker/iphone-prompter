$(document).ready(function(){

	// Change  visibility of the progress bar here
	iPrompter.progressbar({visible: true});

	iPrompter.cacheNextFile();
});



$(document).keydown(function(event) {

	switch (event.keyCode) {
		case 13: event.preventDefault(); break;

		case 32: iPrompter.next(); break;
		case 39: iPrompter.next(); break;
		case 40: iPrompter.next(); break;
		case 74: iPrompter.next(); break;
		case 75: iPrompter.next(); break;
		case 76: iPrompter.next(); break;

		case 37: iPrompter.prev(); break;
		case 38: iPrompter.prev(); break;
		case 68: iPrompter.prev(); break;
		case 70: iPrompter.prev(); break;
		case 83: iPrompter.prev(); break;
	}		     

});




var iPrompter = (function() {

	var myfiles = [];
	var items = [];
	var currentFile = 0;
	var currentItem = 0;
	
	var progressb = (function() {
		
		var visible  = false;
		var length   = 1;
		var position = 1;
		var totalWidth = 180;
		
		return {
		
			initialize: function(len) {
				if(len) length = len;
				$("#progressbar").html('<div id="progress_bar_empty"></div><div id="progress_bar_full"></div><div id="progress_text"></div>');
				(visible) ? $("#progressbar").show() : $("#progressbar").hide();
				iPrompter.progressbar().set(position);
			},
			
			set: function(pos) {
				position = pos;
				$("#progress_bar_empty").width(totalWidth*(length-position)/length +  "px");
				$("#progress_bar_full").width(totalWidth*position/length + "px");
				$("#progress_text").html((position) + "/" + length);
			},
			
			visible: function(bool) {
				visible = bool;
			}
		
		}
	}());

	return {
	
		progressbar: function(spec) {
			if (spec) {
				progressb.visible(spec.visible);
			}
			return progressb;
		},

		
		files: function(arr) {
			if (arr) {
				myfiles = arr;
			} else {
				return myfiles;
			}
		},
		
		randomize: function(bool) {
			//alert(bool);
		},
		
		currentItem: function () {
			if (items[currentFile]) {
				return items[currentFile][currentItem];
			} else {
				null;
			}
		},
		
		currentFileLength: function() {
			if (items[currentFile]) {
				return items[currentFile].length;
			} else {
				return 0
			}
		},
		
		addFile: function(arr) {
			items.push(arr);
		},
				
		prev: function() {		
			if (currentItem>1) {
				currentItem--;
				iPrompter.progressbar().set(currentItem);
			
				$("#item").html(items[currentFile][currentItem-1]);
				$("#buttonleft").attr("disabled", currentItem<=1);
				$("#buttonright").attr("disabled", currentItem>items[currentFile].length-1);
			}
		},
		
		next: function() {
			if (currentItem<items[currentFile].length) {
				currentItem++;
				iPrompter.progressbar().set(currentItem);
		
				$("#item").hide();
				$("#item").html(items[currentFile][currentItem-1]);
				$("#item").show("slide");
				$("#buttonleft").attr("disabled", currentItem<=1);
				$("#buttonright").attr("disabled", currentItem>items[currentFile].length-1);
			}
		},
		
		nextFile: function(spec) {
			if(spec || confirm("Load next list?")) {
				iPrompter.progressbar().initialize(items[currentFile].length);
				if(!spec) currentFile++;
				if (currentFile>=myfiles.length-1) {  $("#loadfilebutton").hide(); }
				currentItem = 0;
				iPrompter.next();
			}
		},
		
		cached: function() {
			return items.length;
		},
		
		cacheNextFile: function() {

			if (iPrompter.cached()===myfiles.length) {
				// done, let's get going!
				iPrompter.nextFile(true);
			} else {
				// let's cache a file;
				$.ajax({
					url: iPrompter.files()[iPrompter.cached()],
					success: function (data) {
						raw_items = data.split("\n");
						temp = new Array();
						for (var i=0; i<raw_items.length; i++) {
							if(raw_items[i].replace(/(\n|\r)+$/, '').length>0) temp.push(raw_items[i].replace(/(\n|\r)+$/, ''));
						}
						iPrompter.addFile(temp);
						iPrompter.cacheNextFile();
					},
					error: function() {
						console.error("Error! file not found.");
					}
				});
			}
		}
	
	}

}());



