var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority";

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, dbpbsc) {
    if (err) throw err
    var dbo = dbpbsc.db("dbpbsc")
    var busca = { ativNome: /^C/}
    var ordem = { ativDataFim: -1}
    dbo.collection("collativs").find(busca, {projection: { _id: 0 }}).sort(ordem).toArray(function(err, res) {
        if (err) throw err
        console.log("Resposta da busca: ", res)
        dbpbsc.close()
    })
})