function Progressbar(obj) {

	this.length   = obj.length || 1;
	this.adjust   = obj.adjustWidth || 1;
	this.position = obj.startat || 1;
	this.visible  = obj.visible || false;

	this.initialize = function(len) {
		if(len) this.length = len;
		$("#progressbar").html('<div id="progress_bar_empty"></div><div id="progress_bar_full"></div><div id="progress_text"></div>');
		(this.visible) ? $("#progressbar").show() : $("#progressbar").hide();
		this.set(this.position);
	}

	this.set = function(pos) {
		this.position = pos + 1;
		$("#progress_bar_empty").width((this.length-this.position)*this.adjust +  "px");
		$("#progress_bar_full").width((this.position)*this.adjust + "px");
		$("#progress_text").html((this.position) + "/" + this.length);
	}

}