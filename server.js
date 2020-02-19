const express = require('express')
var bodyParser = require('body-parser') //importar o bodyparser para lidar com as arrays
const app = express()
var http = require('http').Server(app) //chama a biblioteca http e cria um servidor com app
var mongoose = require('mongoose') //importa o mongoose para conectar com o o db
const port = process.env.PORT || 3000

app.use(express.static('./'))
app.use(bodyParser.json()) //usa o bodyparse importado para cuidar do JSON
app.use(bodyParser.urlencoded({extended:false}))

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

app.get('/atividades', (req, res) => {
    var ordem = { ativStat: 1, ativIni: 1, ativDataFim: 1, ativDataCria: 1, ativNome: 1 }
    var busca = { ativStat: {'$regex' : '^((?!Concluído).)*$', '$options' : 'i'} }
    dbModelAtiv.find(busca, (err, atividades) => {
        if (err) throw err
        res.send(atividades)    
    }).sort(ordem)
})

app.get('/ragstatus', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, function (err, dbpbsc) {
        if (err)
            throw err;
        var dbo = dbpbsc.db("dbpbsc");
        dbo.collection("ragstatus").find({}, { projection: { _id: 0 } }).toArray(function (err, ragstatus) {
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