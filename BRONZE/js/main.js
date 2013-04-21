/*MIU Project 3
	  Kevin Tresemer
	  MIU 1304*/

window.addEventListener("DOMContentLoaded", function() {
	
	
	//getElementById Function
	function re(x){
		var getElement = document.getElementById(x);
		return getElement;
	}
	
	function makeStatus(){
		var formTag = document.getElementsByTagName("form"),
			  selectLi = re("select"),
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
		if (re("single").checked) {
			singleValue = "Yes";
		}else{
			single = "No";
		}
	}
	
	function toggleControls (x) {
	switch(x){
		case "on":
		    re("relForm").style.display ="none";
		    re("showData").style.display = "none";
			re("clearData").style.display = "inline";
			re("addNew").style.display = "inline";
			re("storeData").style.display = "none";
			break;
		case "off":
		    re("relForm").style.display ="block";
		    re("showData").style.display = "inline";
			re("clearData").style.display = "inline";
			re("addNew").style.display = "none";
			re("storeData").style.display = "inline";
			re("items").style.display = "none";
			break;  
		 default:
		    return false;    
		}
	}
	
	function saveData(key) {
		if(!key){
			var id = Math.floor(Math.random()*1000001);
		}else{
			id = key;
		}
		getCheckboxValue();
		var item 				= {};
			item.status      = ["Status:", re("status").value];
			item.name 		= ["Name: ", re("name").value];
			item.attraction	= ["Attraction Level: ", re("attraction").value];
			item.single		= ["Single: ", singleValue];
			item.birthdate	= ["Birth Date: ", re("birthdate").value];
			item.notes		= ["Notes: ", re("notes").value];

			localStorage.setItem(id, JSON.stringify(item));
			alert("Relationship Saved!");
	}
	
	function getData() {
		toggleControls("on");
		if(localStorage.length === 0){
			autoFillData();
			alert("There is no data in Local Storage so default data was added.");
		}
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var getList = document.createElement("ul");
		makeDiv.appendChild(getList);
		document.body.appendChild(makeDiv);
		re("items").style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++) {
			var getLi = document.createElement("li");
			var linksLi = document.createElement("li");
			getList.appendChild(getLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var getSubList = document.createElement("ul");
			getLi.appendChild(getSubList);
			getImage(obj.status[1], getSubList);
			for (var x in obj) {
				var getSubLi = document.createElement("li");
				getSubList.appendChild(getSubLi);
				var subTxt = obj[x][0]+" "+obj[x][1];
				getSubLi.innerHTML = subTxt;
				getSubLi.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	
	function getImage(statusName, getSubList){
		var imageLi = document.createElement('li');
		getSubList.appendChild(imageLi);
		var newImage = document.createElement('img');
		var setSrc = newImage.setAttribute("src", "images/"+ statusName +".png");
		imageLi.appendChild(newImage);
	}
	
	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*1000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Relationship";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var lineBreak = document.createElement("br");
		linksLi.appendChild(lineBreak);

		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Relationship";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);

	}
	
	function deleteItem(key){
		var ask = confirm("Delete This Relationship?")
		if (ask){
			localStorage.removeItem(this.key);
			window.location.reload();
			alert("Relationship Deleted.");
		}else{
			alert("Relationship NOT Deleted.");
		}
	}
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		toggleControls("off");
		re("status").value = item.status[1];
		re("name").value = item.name[1];
		re("attraction").value = item.attraction[1];
		re("birthdate").value = item.birthdate[1];
		re("notes").value = item.notes[1];
		if (item.single[1] == "Yes"){
			re("single").setAttribute("checked", "checked");
		}
		save.removeEventListener("click", saveData);
		re("storeData").value = "Edit Relationship";
		var editSave = re("storeData");
		editSave.addEventListener("click", validate);
		editSave.key = this.key;
	}
	
	function validate(eventData){
		var getStatus = re("status");
		var getName = re("name");
		var getBirthdate = re("birthdate");
		var getNotes = re("notes");

		errorMsg.innerHTML = "";
			getStatus.style.border = "1px solid black";
			getName.style.border = "1px solid black";
			getBirthdate.style.border = "1px solid black";
			getNotes.style.border = "1px solid black";



		var errorArray = [];


		if(getStatus.value === "-Make Choice-"){
			var statusError = "Please enter a status.";
			getStatus.style.border = "2px solid red";
			errorArray.push(statusError);
		}
		if(getName.value === ""){
			var nameError = "Please enter a name.";
			getName.style.border = "2px solid red";
			errorArray.push(nameError);
		}
		if(getBirthdate.value === ""){
			var birthdateError = "Please enter a birthdate.";
			getBirthdate.style.border = "2px solid red";
			errorArray.push(birthdateError);
		}
		if(getNotes.value === ""){
			var notesError = "Please record notes.";
			getNotes.style.border = "2px solid red";
			errorArray.push(notesError);
		}
		if(errorArray.length >= 1){
			for(var i=0, j=errorArray.length; i < j; i++){
				var li = document.createElement("li");
				li.innerHTML = errorArray[i];
				errorMsg.appendChild(li);
			}
			eventData.preventDefault();
			return false;
		}else{
			saveData(this.key);
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
	var statusChoice = ["-Make Choice-", "Ex", "Current", "Prospect"];
	var errorMsg = re("errors");
	makeStatus();
	
	
	//Set Link and Submit Events
	var displayLink = re("showData");
	displayLink.addEventListener("click", getData);
	var clearButton = re("clearData");
	clearButton.addEventListener("click", clearLocal);
	var save = re("storeData");
	save.addEventListener("click", validate);
	
	
});
