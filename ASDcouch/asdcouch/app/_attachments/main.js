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
			var data = myForm.serializeArray();
			storeData(data);
		}
	});

});

$('#display').on('pageinit', function(){
	
});


$(document).on('pageinit', '#display', function () {
var labels = ["Status: ", "Name: ", "Tel: ", "Notes: "];
	    $.couch.db("asdproject").view("asdproject/status", {
			"success":function(data) {
			console.log(data);
				$.each(data.rows, function(index, rel) {
				var makeSubList = $('<div>')
					.attr('data-role', 'collapsible')
					.attr('data-mini', 'true')
					.attr('id', rel.key)
					.appendTo('#items')
				;

				var makeH3 = $('<h3>')
					.html(rel.value.name + ' - ' + rel.value.status)
					.appendTo(makeSubList)
				;

				var makeDetailsList = $('<ul>').appendTo(makeSubList);
				var labelCounter = 0;
				for (var n in rel.value) {
					var makeLi = $('<li>')
						.html(labels[labelCounter] + rel.value[n])
						.appendTo(makeDetailsList)
					;
					labelCounter++;
				}
				
					var buttonDiv = $('<div>').attr('class', 'ui-grid-a').appendTo(makeSubList);
					var editButtonDiv = $('<div>').attr('class', 'ui-block-a').appendTo(buttonDiv);
					var deleteButtonDiv = $('<div>').attr('class', 'ui-block-b').appendTo(buttonDiv);
				var editButton = $('<a>')
					.attr('data-role', 'button')
					.attr('href', '#add')
					.html('Edit')
					.data('key', rel.key[0])
					.data('rev', rel.key[1])
					.appendTo(editButtonDiv)
					.on('click', editRel);
				var removeButton = $('<a>')
					.attr('data-role', 'button')
					.attr('href', '#')
					.html('Remove')
					.data('key', rel.key[0])
					.data('rev', rel.key[1])
					.appendTo(deleteButtonDiv)
					.on('click', deleteRel);
				console.log(rel.key[0]);
				console.log(rel.key[1]);
				$(makeSubList).trigger('create');
			});
			$('#items').trigger('create');
		}
	});
});
					

var storeData = function(data){
	var key = $('#saveData').data('key');
	var rev = $('#saveData').data('rev');
	console.log(key);
	console.log(rev);
	var rel = {};

	if (rev) {	
		rel._id = key;
		rel._rev = rev;
	}

	rel.status = $("#status").val();
	rel.name = $("#name").val();
	rel.tel = $("#tel").val();
	rel.notes = $("#notes").val();

	$.couch.db('asdproject').saveDoc(rel, {
		success: function(rel){
			alert('Relationship Saved.');
			$('#saveData').attr('value', 'Add This Relationship').removeData('key').removeData('rev');
			$.mobile.changePage('#display');
			window.location.reload("#");
		}
	});
}; 

var editRel = function (){
	var key = $(this).data('key');
	var rev = $(this).data('rev');
console.log(rev);
	$.couch.db('asdproject').openDoc(key,{
		success: function(rel) {
			$('#status').val(rel.status);
			$('#name').val(rel.name);
			$('#tel').val(rel.tel);
			$('#notes').val(rel.notes);
			$('#saveData').prev('.ui-btn-inner').children('.ui-btn-text').html('Update Relationship');
			$('#saveData').val('Update Relationship').data('key', key).data('rev', rev);
		}
	});
};

var	deleteRel = function (){
	var ask = confirm("Delete Relationship?");
	if (ask) {
		var doc = {
				'_id': $(this).data('key'),
				'_rev': $(this).data('rev')
		};
		console.log(doc);
		$.couch.db('asdproject').removeDoc(doc, {
			success: function(data){
				alert("Deleted.");
				console.log('');
				window.location.reload("#");
			}
		});
	} else {
		alert("Canceled.");
	}		
};

