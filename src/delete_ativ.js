var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority";

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, dbpbsc) {
    if (err) throw err
    var dbo = dbpbsc.db("dbpbsc")
    var busca = { _id: "5e4af330ef8d612c48ad46c8"}
    dbo.collection("collativs").deleteOne(busca, function(err, busca) {
        if (err) throw err
        console.log("1 documento deletado: ", busca)
        dbpbsc.close()
    })
})