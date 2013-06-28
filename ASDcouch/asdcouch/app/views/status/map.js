function(doc) {
  if (doc._id.substr(0,5) === '5ac44') {
    emit([doc._id, doc._rev], {
    	"status": doc.status,
    	"name": doc.name,
    	"tel": doc.tel,
    	"notes": doc.notes
    });
  } 
};