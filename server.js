console.log("Iniciando leitura de Server.js");
const express = require('express')
var bodyParser = require('body-parser') //importar o bodyparser para lidar com as arrays
const app = express()
var http = require('http').Server(app) //chama a biblioteca http e cria um servidor com app
var mongoose = require('mongoose') //importa o mongoose para conectar com o o db
var cors = require('cors')
const port = process.env.PORT || 3000
var atraso = require('./src/atraso')
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var Url = "mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority";

var ordemAtiv = { ativDataFim: 1, ativStat: 1, ativIni: 1, ativDataCria: 1, ativNome: 1 }
var ordemIni = { iniDataFim: 1, iniStat: 1,  iniObj: -1, iniDataCria: 1, iniNome: 1 }
var ordemObj = { objDataFim: 1, objStat: 1, objTema: 1, objDataCria: 1, objNome: 1 }

app.use(express.static('./'))
app.use(bodyParser.json()) //usa o bodyparse importado para cuidar do JSON
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

//define o modelo  do objeto para o mongoose
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

var dbModelIni = mongoose.model('collinis', {
    iniNome: String,
    iniStat: String,
    iniObj: String,
    iniDesc: String,
    iniMot: String,
    iniRisk: String,
    iniDataCria: Date,
    iniDataFim: Date,
})

var dbModelObj = mongoose.model('collobjs', {
    objNome: String,
    objStat: String,
    objTema: String,
    objDesc: String,
    objMot: String,
    objRisk: String,
    objDataCria: Date,
    objDataFim: Date,
})

app.get('/atividades', (req, res) => {
    var busca = { ativStat: {'$regex' : '^((?!3 - Concluído).)*$', '$options' : 'i'} }
    dbModelAtiv.find(busca, (err, atividades) => {
        if (err) throw err
        res.send(atividades)    
    }).sort(ordemAtiv)
})

app.get('/atividades/ok', (req, res) => {
    var busca = { ativStat: '3 - Concluído' }
    dbModelAtiv.find(busca, (err, atividades) => {
        if (err) throw err
        res.send(atividades)    
    }).sort(ordemAtiv)
})

app.get('/atividades/pbsc', (req, res) => {
    var busca = { $and: [
        {ativIni: "PBSCv3"},
        {ativStat: {'$regex' : '^((?!3 - Concluído).)*$', '$options' : 'i'} }
    ]}
    dbModelAtiv.find(busca, (err, atividades) => {
        if (err) throw err
        res.send(atividades)    
    }).sort(ordemAtiv)
})

app.get('/atividades/nonpbsc', (req, res) => {
    var busca = { $and: [
        {ativIni: {'$regex' : '^((?!PBSCv3).)*$', '$options' : 'i'} },
        {ativStat: {'$regex' : '^((?!3 - Concluído).)*$', '$options' : 'i'} }
    ]}
    dbModelAtiv.find(busca, (err, atividades) => {
        if (err) throw err
        res.send(atividades)    
    }).sort(ordemAtiv)
})

app.get('/iniciativas', (req, res) => {
    dbModelIni.find({}, (err, iniciativas) => {
        if (err) throw err
        res.send(iniciativas)    
    }).sort(ordemIni)
})

app.get('/objetivos', (req, res) => {
    dbModelObj.find({}, (err, objetivos) => {
        if (err) throw err
        res.send(objetivos)    
    }).sort(ordemObj)
})

app.get('/ragstatus', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(Url, { useUnifiedTopology: true }, function (err, dbpbsc) {
        if (err) throw err;
        var dbo = dbpbsc.db("dbpbsc");
        var ordemStat = {ragstatus: 1}
        dbo.collection("ragstatus").find({}, { projection: { _id: 0 } }).sort(ordemStat).toArray(function (err, ragstatus) {
            if (err) throw err;
            res.send(ragstatus)
            dbpbsc.close();
        })
    })
})


app.post('/atividades', (req, res) => {
    var atividades = new dbModelAtiv(req.body)
    var ativSalvo = atividades.save()
    console.log('Nova atividade salva no MongoDB.')
})

app.post('/iniciativas', (req, res) => {
    var iniciativas = new dbModelIni(req.body)
    var iniSalvo = iniciativas.save()
    console.log('Nova iniciativa salva no MongoDB.')
})

app.post('/objetivos', (req, res) => {
    var objetivos = new dbModelObj(req.body)
    var objSalvo = objetivos.save()
    console.log('Novo objetivo salvo no MongoDB.')
})

app.post('/deletaAtiv', (req, res) => {
    var atividade = new dbModelAtiv(req.body)
    console.log("Chegou no servidor o pedidod para apagar ID " + atividade._id)
    function deletar() {
        MongoClient.connect(Url, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(atividade._id) }
            dbo.collection("collativs").deleteOne(busca, function(err, res) {
                if (err) throw err
                console.log("ID " + atividade._id + " deletado! ", res)
                dbpbsc.close()
            })
        })
    }
    deletar()
})

app.post('/deletaIni', (req, res) => {
    var iniciativa = new dbModelIni(req.body)
    console.log("Chegou no servidor o pedidod para apagar ID " + iniciativa._id)
    function deletar() {
        MongoClient.connect(Url, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(iniciativa._id) }
            dbo.collection("collinis").deleteOne(busca, function(err, res) {
                if (err) throw err
                console.log("ID " + iniciativa._id + " deletado! ", res)
                dbpbsc.close()
            })
        })
    }
    deletar()
})

app.post('/deletaObj', (req, res) => {
    var objetivo = new dbModelObj(req.body)
    console.log("Chegou no servidor o pedidod para apagar ID " + objetivo._id)
    function deletar() {
        MongoClient.connect(Url, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(objetivo._id) }
            dbo.collection("collobjs").deleteOne(busca, function(err, res) {
                if (err) throw err
                console.log("ID " + objetivo._id + " deletado! ", res)
                dbpbsc.close()
            })
        })
    }
    deletar()
})

app.post('/concluiAtiv', (req, res) => {
    var atividade = new dbModelAtiv(req.body)
    console.log("Chegou no servidor o pedidod para concluir ID " + atividade._id)
    function concluir() {
        MongoClient.connect(Url, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(atividade._id) }
            var atualizar = {
                $set: { ativStat: '3 - Concluído' },
                $currentDate: { ativDataFim: true }
            }
            dbo.collection("collativs").findOneAndUpdate(busca, atualizar, function(err, res) {
                if (err) throw err
                console.log("ID " + atividade._id + " marcado como concluído! ", res)
                dbpbsc.close()
            })
        })
    }
    concluir()
})

app.post('/concluiIni', (req, res) => {
    var iniciativa = new dbModelIni(req.body)
    console.log("Chegou no servidor o pedidod para concluir ID " + iniciativa._id)
    function concluir() {
        MongoClient.connect(Url, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(iniciativa._id) }
            var atualizar = { $set: { iniStat: '3 - Concluído' }, $currentDate: { iniDataFim: true } }
            dbo.collection("collinis").findOneAndUpdate(busca, atualizar, function(err, res) {
                if (err) throw err
                console.log("ID " + iniciativa._id + " marcado como concluído! ", res)
                dbpbsc.close()
            })
        })
    }
    concluir()
})

app.post('/concluiObj', (req, res) => {
    var objetivo = new dbModelObj(req.body)
    console.log("Chegou no servidor o pedidod para concluir ID " + objetivo._id)
    function concluir() {
        MongoClient.connect(Url, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(objetivo._id) }
            var atualizar = { $set: { objStat: '3 - Concluído' }, $currentDate: { objDataFim: true } }
            dbo.collection("collobjs").findOneAndUpdate(busca, atualizar, function(err, res) {
                if (err) throw err
                console.log("ID " + objetivo._id + " marcado como concluído! ", res)
                dbpbsc.close()
            })
        })
    }
    concluir()
})

app.post('/andarAtiv', (req, res) => {
    var atividade = new dbModelAtiv(req.body)
    console.log("Chegou no servidor o pedidod para andar ID " + atividade._id)
    function andar() {
        MongoClient.connect(Url, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(atividade._id) }
            var atualizar = { $set: { ativStat: '2 - Em Andamento' } }
            dbo.collection("collativs").findOneAndUpdate(busca, atualizar, function(err, res) {
                if (err) throw err
                console.log("ID " + atividade._id + " marcado como em andamento! ", res)
                dbpbsc.close()
            })
        })
    }
    andar()
})

app.post('/andarIni', (req, res) => {
    var iniciativa = new dbModelIni(req.body)
    console.log("Chegou no servidor o pedidod para andar ID " + iniciativa._id)
    function andar() {
        MongoClient.connect(Url, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(iniciativa._id) }
            var atualizar = { $set: { iniStat: '2 - Em Andamento' } }
            dbo.collection("collinis").findOneAndUpdate(busca, atualizar, function(err, res) {
                if (err) throw err
                console.log("ID " + iniciativa._id + " marcado como em andamento! ", res)
                dbpbsc.close()
            })
        })
    }
    andar()
})

app.post('/andarObj', (req, res) => {
    var objetivo = new dbModelObj(req.body)
    console.log("Chegou no servidor o pedidod para andar ID " + objetivo._id)
    function andar() {
        MongoClient.connect(Url, {useUnifiedTopology: true}, function(err, dbpbsc) {
            if (err) throw err
            var dbo = dbpbsc.db("dbpbsc")
            var busca = { _id: ObjectID(objetivo._id) }
            var atualizar = { $set: { objStat: '2 - Em Andamento' } }
            dbo.collection("collobjs").findOneAndUpdate(busca, atualizar, function(err, res) {
                if (err) throw err
                console.log("ID " + objetivo._id + " marcado como concluído! ", res)
                dbpbsc.close()
            })
        })
    }
    andar()
})

app.post('/web/pbsc/ativ/atividades/buscaID', (req, res) => {
    var dados = new dbModelAtiv(req.body)
    var ativID = dados._id
    console.log("tentando buscar", ativID)
    var busca = { _id: ativID }
    dbModelAtiv.findOne(busca, (err, atividades) => {
        if (err) throw err
        var nomelido = atividades.ativNome
        res.render('/web/pbsc/ativ/edit_ativ', function (err, atividades) {
            if (err) throw err
            res.send(atividades)
        })
        console.log("nomelido: ", nomelido)
    })
})

app.post('/atrasarAtiv', (req, res) => {
    console.log("Acessando rota para marcar atividades como atrasada!", req)
    atraso.atrasar();
    res.send(console.log("atrasado? -> Chegamos no final do get"))
})

mongoose.connect(Url, { useNewUrlParser: true, useUnifiedTopology: true}, function(err, dbpbsc) {
    console.log('MongoDB ok.')
})

http.listen(port, () => console.log(`App ok na porta ${port}!`))

atraso.whats();

console.log("Finalizando leitura de Server.js");