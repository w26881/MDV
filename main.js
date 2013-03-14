/*VFW Project 2
Kevin Tresemer
VFW 1303*/

window.addEventListener("DOMContentLoaded", function() {
	
	
	//getElementById Function
	function $(x){
		var getElement = document.getElementById(x);
		return getElement;
	}
	
	function makeStatus(){
		var formTag = document.getElementsByTagName("form"),
			  selectLi = $("select"),
			  makeSelectElement = document.createElement("select"),
			  makeSelectElement.setAttribute("id", "status");
		for (var i=0, j=status.length; i<j; i++){
			  var makeOptionElement = document.createElement("option");
			  var optionText = status[i];
			  makeOptionElement.setAttribute("value", optionText);
			  makeOptionElement
		}
	}
	
	
	
	
	//Variable Defaults
	var status = ["Ex", "Current", "Prospect"];
	
	
	
	//Set Link and Submit Events
	var displayLink = $("");
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
