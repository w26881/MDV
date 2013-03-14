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
	
	
	function getCheckboxValue() {
		if ($("single").checked) {
			singleValue = "Yes";
		}else{
			single = "No";
		}
	}
	
	function toggleControls (x) {
	switch(x){
		case "on":
		    $("relForm").style.display ="none";
		    $("showData").style.display = "none";
			$("clearData").style.display = "inline";
			$("addNew").style.display = "inline";
			$("storeData").style.display = "none";
			break;
		case "off":
		    $("relForm").style.display ="block";
		    $("showData").style.display = "inline";
			$("clearData").style.display = "inline";
			$("addNew").style.display = "none";
			$("storeData").style.display = "inline";
			$("items").style.display = "none";
			break;  
		 default:
		    return false;    
		}
	}
	
	function saveData() {
		var id = Math.floor(Math.random()*1000001);
		getCheckboxValue();
		var item 				= {};
			item.status          =["Status:", $("status").value];
			item.name 		= ["Name: ", $("name").value];
			item.attraction	= ["Attraction Level: ", $("attraction").value];
			item.single		= ["Single: ", singleValue];
			item.birthdate	= ["Birth Date: ", $("birthdate").value];
			item.notes		= ["Notes: ", $("notes").value];

			localStorage.setItem(id, JSON.stringify(item));
			alert("Relationship Saved!");
	}
	
	function getData() {
		toggleControls("on");
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var getList = document.createElement("ul");
		makeDiv.appendChild(getList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++) {
			var getLi = document.createElement("li");
			getList.appendChild(getLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// Parse
			var obj = JSON.parse(value);
			var getSubList = document.createElement("ul");
			getLi.appendChild(getSubList);
			for (var x in obj) {
				var getSubLi = document.createElement("li");
				getSubList.appendChild(getSubLi);
				var subTxt = obj[x][0]+" "+obj[x][1];
				getSubLi.innerHTML = subTxt;
			}
		}
	}
	
	function clearLocal () {
	if(localStorage.length === 0){
		alert("No Data.")
	}else{
		localStorage.clear();
		alert("Data Cleared.");
		window.location.reload();
		return false;
	}	


} 
	
	//Variable Defaults
	var statusChoice = ["-MakeChoice-", "Ex", "Current", "Prospect"];
	makeStatus();
	
	
	//Set Link and Submit Events
	var displayLink = $("showData");
	displayLink.addEventListener("click", getData);
	var clearButton = $("clearData");
	clearButton.addEventListener("click", clearLocal);
	var save = $("storeData");
	save.addEventListener("click", saveData);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
