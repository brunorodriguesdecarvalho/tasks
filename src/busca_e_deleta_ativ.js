var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority";

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, dbpbsc) {
    if (err) throw err
    var dbo = dbpbsc.db("dbpbsc")
    var ObjectId = require('mongodb').ObjectID
    var busca = { _id: ObjectId("5e4af330ef8d612c48ad46c8") }
    dbo.collection("collativs").deleteOne(busca, function(err, res) {
        if (err) throw err
        console.log("Documento deletado: ", res)
        dbpbsc.close()
    })
})