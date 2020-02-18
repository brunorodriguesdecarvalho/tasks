var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority";

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, dbpbsc) {
    if (err) throw err
    var dbo = dbpbsc.db("dbpbsc")
    var myativ = {
        ativNome: "Teste 2",
        ativStat: "Em Andamento",
        ativIni: "Corrigir formulário",
        ativDesc: "Descrição teste",
        ativMot: "Motivo teste",
        ativRisk: "Risco teste",
        ativDataCria: "Data Início Teste",
        ativDataFim: "Data Fim Teste",
    }
    dbo.collection("collativs").insertOne(myativ, function(err, res) {
        if (err) throw err
        console.log("Novo registro arquivado.")
        dbpbsc.close()
    })
})