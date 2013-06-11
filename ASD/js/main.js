/*Kevin Tresemer
	  ASD 1306*/
	  
$('#home').on('pageinit', function(){
	
});

$('#add').on('pageinit', function(){

	function saveData(key) {
		if(!key){
			var id = Math.floor(Math.random()*1000001);
		}else{
			id = key;
		}
		var item 				= {};
			item.status      = ["Status:", $("#status").val()];
			item.name 		= ["Name: ", $("#name").val()];
			item.tel				= ["Tel: ", $("#tel").val()];
			item.notes		= ["Notes: ", $("#notes").val()];

			localStorage.setItem(id, JSON.stringify(item));
			alert("Relationship Saved!");
	}
});

$('#display').on('pageinit', function(){
	
});




