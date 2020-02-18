var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var url = "mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority";
var chave = ObjectID("5e4c500582b3ac0017f2e2bc")
function deletar() {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        var dbo = dbpbsc.db("dbpbsc")
        var busca = { _id: chave }
        dbo.collection("collativs").deleteOne(busca, function(err, res) {
            if (err) throw err
            console.log("Documento deletado! ", res)
            dbpbsc.close()
        })
    })
}

deletar()