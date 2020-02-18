var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID
var url = "mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority";
var idkey = ObjectID("5e4c4ee682b3ac0017f2e2bb")

function deletar() {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        var dbo = dbpbsc.db("dbpbsc")
        var busca = { _id: idkey }
        dbo.collection("collativs").deleteOne(busca, function(err, res) {
            if (err) throw err
            console.log("Documento deletado! ", res)
            dbpbsc.close()
        })
    })
}