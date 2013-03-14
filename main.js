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
			  makeSelectElement = document.createElement("select");
			  makeSelectElement.setAttribute("id", "status");
		for (var i=0, j=statusChoice.length; i<j; i++){
			  var makeOptionElement = document.createElement("option");
			  var optionText = statusChoice[i];
			  makeOptionElement.setAttribute("value", optionText);
			  makeOptionElement.innerHTML = optionText;
			  makeSelectElement.appendChild(makeOptionElement);
		}
		selectLi.appendChild(makeSelectElement);
	}
	
	
	
	
	//Variable Defaults
	var statusChoice = ["-MakeChoice-", "Ex", "Current", "Prospect"];
	makeStatus();
	
	
	//Set Link and Submit Events
	//var displayLink = $("");
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
