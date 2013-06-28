function(doc) {
  if (doc._id !== '') {
    emit([doc._id, doc._rev], {
    	"status": doc.status,
    	"name": doc.name,
    	"tel": doc.tel,
    	"notes": doc.notes
    });
  } 
};