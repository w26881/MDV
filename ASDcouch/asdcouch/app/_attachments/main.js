/*Kevin Tresemer
	  ASD 1306*/
	  
$('#home').on('pageinit', function(){
	
});

$('#add').on('pageinit', function(){
	var myForm = $('#addRelationshipForm');
	myForm.validate({
		invalidHandler: function(form, validator) {
		},
		submitHandler: function() {
			storeData(this.key);
		}
	});

});

$('#display').on('pageinit', function(){
	
});

var clearData = function(){
	if (localStorage.length === 0) {
			alert("There is no data.");
		} else {
			localStorage.clear();
			alert("Data cleared.");
			window.location.reload();
			return false;
		}
};

var autoFillData = function(){
	    $.ajax({
			"url":"_view/status",
			"dataType":"json",
			"success":function(data) {
			console.log(data);
				$.each(data.rows, function(index, rel) {
					var makeSubList = $('<div></div>')
					var parsed = $(
							'<p>' + "Status: " + rel.value.status  + '</p>' + 
							'<p>' + "Name: " + rel.value.name + '</p>' + 
							'<p>' + "Tel: " + rel.value.tel + '</p>' + 
							'<p>' + "Notes: " + rel.value.notes + '</p>' +
							'<br>'
					);	
					makeSubList.append(parsed).appendTo('#items');	
				});
			},

		});

};
	
var deleteItem = function(keyVar){
		var ask = confirm("Are you sure?");
		if(ask){
			localStorage.removeItem(keyVar);
			alert("Relationship deleted.");
			window.location = "#add";
			window.location.reload("#");
		}else{
			alert("Canceled.");
		}
	};    
    var editItem = function(keyVar) {
		var obj = JSON.parse(localStorage.getItem(keyVar));
		$("#status").val(obj.status[1]);
		$("#name").val(obj.name[1]);
		$("#tel").val(obj.tel[1]);
		$("#notes").val(obj.notes[1]);
		$('#saveData').prev('.ui-btn-inner').children('.ui-btn-text').html('Update Relationship');
		$("#saveData").val('Update Relationship').data('key', keyVar); 
    };
    

var getData = function(key){
	if(localStorage.length === 0){
		alert("There is no data in Local Storage so default data was added.");
		autoFillData();
	}
	
		for (var i = 0, j = localStorage.length; i < j; i++) {
		var key = localStorage.key(i),
			value = localStorage.getItem(key),
			obj = JSON.parse(value),
			makeRecord = $('<div></div>'),
			makeList = $(
					"<p>" + obj.status[0] + " " + obj.status[1] + "</p>" + 
					"<p>" + obj.name[0] + " " + obj.name[1] + "</p>" +
					"<p>" + obj.tel[0] + " " + obj.tel[1] + "</p>" +
					"<p>" + obj.notes[0] + " " + obj.notes[1] + "</p>");
				
			var editRel = $("<button data-key='"+key+"'><a href='#add'> Edit Relationship</a></button>");
				editRel.on('click', function(){
					keyVar = $(this).data('key');
					editItem(keyVar);
				});
			var deleteRel = $("<button data-key='"+key+"'><a href='#add' id='delete"+key+"'>Delete Relationship</a></button>");
				deleteRel.on('click', function(){
					keyVar = $(this).data('key');
					deleteItem(keyVar);
				});	
		makeRecord.append(makeList).append(editRel).append("<br>").append(deleteRel).appendTo("#items");
		}
    };

var keyVar = "";

	var storeData = function(){
		if (!keyVar) {
			var id = Math.floor(Math.random()*1000000);
		} else {
			var id = keyVar;
		}
	var item = {};
		item.status = ["Status:",$('#status').val()];
		item.name  = ["Name:",$('#name').val()];
		item.tel	 = ["Tel:",$('#tel').val()];
		item.notes = ["Notes:",$('#notes').val()];

		localStorage.setItem(id, JSON.stringify(item));
		$('#saveData').html('Add Relationship').removeData('key');
		alert("Relationship Saved.");
		$.mobile.changePage('#home');

}; 

		$("#displayButton").on("click", getData);
		$('#clearData').on('click', clearData);