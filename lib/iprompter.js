$(document).ready(function(){
	// Change  visibility of the progress bar here
	iPrompter.progressbar({visible: true});
	// get going
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

	var myfiles     = []; // holds names of files
	var items       = []; // holds contents of files (array of arrays)
	var currentFile = 0;
	var currentItem = 0;
	var textsize    = 6;
	
	// the progress bar
	var progressb = (function() {
		
		var visible    = false;
		var totalWidth = 180;
		var length     = 1;
		var that       = {}; // will get a reference to the parent object
		
		return {
			inherit: function(obj) {
				that = obj; // add a ref to the parent object
			},
			initialize: function(len) {
				if(len) length = len;
				$("#progressbar").html('<div id="progress_bar_empty"></div><div id="progress_bar_full"></div><div id="progress_text"></div>');
				(visible) ? $("#progressbar").show() : $("#progressbar").hide();
				that.progressbar().set(1);
			},
			set: function(position) {
				$("#progress_bar_empty").width(totalWidth*(length-position)/length +  "px");
				$("#progress_bar_full").width(totalWidth*position/length + "px");
				$("#progress_text").html(position + "/" + length);
			},
			visible: function(bool) {
				visible = bool;
			}
		}
	}());

	return {
		
		// progress bar initialization and access
		progressbar: function(spec) {
			if (spec) {
				progressb.visible(spec.visible);
				progressb.inherit(this);
			}
			return progressb;
		},


		// maybe I will add randomization one day
		randomize: function(bool) {
			//alert(bool);
		},



		// buttons for going through items and files
		prev: function() {		
			if (currentItem>1) {
				currentItem--;
				this.progressbar().set(currentItem);
			
				$("#item").html(items[currentFile][currentItem-1]);
				$("#buttonleft").attr("disabled", currentItem<=1);
				$("#buttonright").attr("disabled", currentItem>items[currentFile].length-1);
			}
		},
		next: function() {
			if (currentItem<items[currentFile].length) {
				currentItem++;
				this.progressbar().set(currentItem);
		
				$("#item").hide();
				$("#item").html(items[currentFile][currentItem-1]);
				$("#item").show("slide");
				$("#buttonleft").attr("disabled", currentItem<=1);
				$("#buttonright").attr("disabled", currentItem>items[currentFile].length-1);
			}
		},
		nextFile: function(spec) {
			if(spec) { 
				$("#item").css("font-size",textsize + "em");
			}
			if(spec || confirm("Load next list?")) {
				this.progressbar().initialize(items[currentFile].length);
				if(!spec) currentFile++;
				if (currentFile>=myfiles.length-1) {  $("#loadfilebutton").attr("disabled",true); }
				currentItem = 0;
				this.next();
			}
		},
		


		// get files from the user
		files: function(arr) {
			if (arr) {
				myfiles = arr;
			}
		},
		
		textSize: function(size) {
			textsize = size;
		},
		

		// loading files from the server into memory
		cacheNextFile: function() {

			if (items.length===myfiles.length) {
				// done caching, let's get going!
				this.nextFile(true);
			} else {
				// let's cache a file;
				var that = this;
				$.ajax({
					url: myfiles[items.length],
					success: function (data) {
						raw_items = data.split("\n");
						temp = new Array();
						for (var i=0; i<raw_items.length; i++) {
							if(raw_items[i].replace(/(\n|\r)+$/, '').length>0) temp.push(raw_items[i].replace(/(\n|\r)+$/, ''));
						}
						items.push(temp);
						that.cacheNextFile();
					},
					error: function() {
						console.error("Error! file not found.");
					}
				});
			}
		}
	
	}

}());



