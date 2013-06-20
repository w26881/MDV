function(doc) {
  if (doc.status === "Ex") {
    emit(doc._id, {
    	"status": doc.status,
    	"name": doc.name,
    	"tel": doc.tel,
    	"notes": doc.notes
    });
  } else
  	if (doc.status === "Current") {
    emit(doc._id, {
    	"status": doc.status,
    	"name": doc.name,
    	"tel": doc.tel,
    	"notes": doc.notes
    });
  } else
  	if (doc.status === "Prospect") {
    emit(doc._id, {
    	"status": doc.status,
    	"name": doc.name,
    	"tel": doc.tel,
    	"notes": doc.notes
    });
  } 
};