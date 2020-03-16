console.log("atraso.js iniciando...")

var evento = require('events');
var emissor = new evento.EventEmitter();
var MongoClient = require('mongodb').MongoClient
var Url = "mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority";
    
var mensagemInicio = function () { console.log('Iniciando verificação de tarefas atrasadas...');}
emissor.on('inicio', mensagemInicio); 

var mensagemFim = function () { console.log('Mensagem onload no meio/fim do atraso.js');}
emissor.on('fim', mensagemFim); 

function atrasaAtiv() {
    MongoClient.connect(Url, {useUnifiedTopology: true}, function(err, dbpbsc) {
        console.log("Conectando ao servidor para iniciar o atraso")
        if (err) throw err
        var dbo = dbpbsc.db("dbpbsc")
        var busca = { ativDataFim: { $lt: new Date() }, ativStat: { $nin: ["3 - Concluído", "0 - Atrasado", "-1: Urgente" ] } }
        var atualizar = {$set: {ativStat: "0 - Atrasado"}}
        console.log("Iniciando updateMany...")
        dbo.collection("collativs").updateMany(busca, atualizar, function(err, res) {
            if (err) throw err
            console.log("No meio da updateMany...")
            dbpbsc.close()
            console.log("updateMany encerrando...")
        })
    })
}

exports.atrasar = function () {
    atrasaAtiv();
};

exports.whats = function () { 
    emissor.emit('fim');
};

console.log("atraso.js finalizando...")