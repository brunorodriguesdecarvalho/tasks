var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var idAtiv = "5e544ad95efbc80017a93d91"
/* var atividade = new dbModelAtiv(req.body) */
var url = "mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority";
var mongoose = require('mongoose') //importa o mongoose para conectar com o o db

var dbModelAtiv = mongoose.model('collativs', {
    ativNome: String,
    ativStat: String,
    ativIni: String,
    ativDesc: String,
    ativMot: String,
    ativRisk: String,
    ativDataCria: Date,
    ativDataFim: Date,
})

console.log("Chegou no servidor o pedidod para concluir ID " + idAtiv/* atividade._id */)

function concluir() {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        var dbo = dbpbsc.db("dbpbsc")
        var busca = { _id: ObjectID(idAtiv/* atividade._id */) }
        var atualizar = { $set: { ativStat: '3 - Concluído' } }
        dbo.collection("collativs").findOneAndUpdate(busca, atualizar, function(err, res) {
            if (err) throw err
            console.log("ID " + idAtiv/* atividade._id */ + " marcado como concluído! ", res)
            dbpbsc.close()
        })
    })
}
concluir()