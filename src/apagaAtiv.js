var url = "mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority";
var ObjectId = require('mongodb').ObjectID
var MongoClient = require('mongodb').MongoClient;

var idApagaAtiv = ObjectId("5e4b3e500e4e5b00179baf73")

apagaAtividade = function apagaAtividade() {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        console.log("MongoDB Conectado!")
        var dbo = dbpbsc.db("dbpbsc")
        var busca = { _id: idApagaAtiv }
        dbo.collection("collativs").deleteOne(busca, function(err, res) {
            if (err) throw err
            if (res.ativNome == undefined) {console.log("Atividade não encontrada. Verifique o ID e tente novamente.")}
            else {console.log("Atividade apagada com sucesso: ", res.ativNome)}
            dbpbsc.close()
        })
    })
}