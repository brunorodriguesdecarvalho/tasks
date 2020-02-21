const express = require('express')
var bodyParser = require('body-parser') //importar o bodyparser para lidar com as arrays
const app = express()
var http = require('http').Server(app) //chama a biblioteca http e cria um servidor com app
var mongoose = require('mongoose') //importa o mongoose para conectar com o o db
const port = process.env.PORT || 3000

app.use(express.static('./'))
app.use(bodyParser.json()) //usa o bodyparse importado para cuidar do JSON
app.use(bodyParser.urlencoded({extended:false}))

var cors = require('cors')
app.use(cors())

//link para o db, incluindo username e password
var dbUrl = 'mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority'

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
    var ordem = { ativDataFim: 1, ativStat: 1, ativIni: 1, ativDataCria: 1, ativNome: 1 }
    var busca = { ativStat: {'$regex' : '^((?!3 - Concluído).)*$', '$options' : 'i'} }
    dbModelAtiv.find(busca, (err, atividades) => {
        if (err) throw err
        res.send(atividades)    
    }).sort(ordem)
})

app.get('/iniciativas', (req, res) => {
    dbModelIni.find({}, (err, iniciativas) => {
        if (err) throw err
        res.send(iniciativas)    
    })
})

app.get('/objetivos', (req, res) => {
    var ordem = { objDataFim: 1, objStat: 1, objTema: 1, objDataCria: 1, objNome: 1 }
    var busca = { objStat: {'$regex' : '^((?!3 - Concluído).)*$', '$options' : 'i'} }
    dbModelObj.find(busca, (err, objetivos) => {
        if (err) throw err
        res.send(objetivos)    
    }).sort(ordem)
})

app.get('/ragstatus', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, function (err, dbpbsc) {
        if (err) throw err;
        var dbo = dbpbsc.db("dbpbsc");
        dbo.collection("ragstatus").find({}, { projection: { _id: 0 } }).toArray(function (err, ragstatus) {
            if (err) throw err;
            res.send(ragstatus)
            dbpbsc.close();
        })
    })
})

app.get('/listObj', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, function (err, dbpbsc) {
        if (err) throw err;
        var dbo = dbpbsc.db("dbpbsc");
        dbo.collection("collobjs").find({}, { projection: { _id: 0 } }).toArray(function (err, listObj) {
            if (err) throw err;
            res.send(listObj)
            dbpbsc.close();
        })
    })
})

app.get('/listIni', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, function (err, dbpbsc) {
        if (err) throw err;
        var dbo = dbpbsc.db("dbpbsc");
        dbo.collection("collinis").find({}, { projection: { _id: 0 } }).toArray(function (err, listIni) {
            if (err) throw err;
            res.send(listIni)
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

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true}, function(err, dbpbsc) {
    console.log('MongoDB ok.')
})

http.listen(port, () => console.log(`App ok na porta ${port}!`))


/* var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var url = "mongodb+srv://pbsc:wlmvccE6paAmpBNg@dbpbsc-mzrlo.mongodb.net/dbpbsc?retryWrites=true&w=majority";

function deletar(chave) {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        console.log("Conectato via Mongo Client")
        var dbo = dbpbsc.db("dbpbsc")
        var busca = { _id: ObjectID(chave) }
        dbo.collection("collativs").deleteOne(busca, function(err, res) {
            if (err) throw err
            console.log("Documento deletado! ", res)
            dbpbsc.close()
        })
    })
} */