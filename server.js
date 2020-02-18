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

var db = mongoose.connection

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
var atividades = []

app.get('/atividades', (req, res) => {
    var busca = { ativStat: /^N/}
    var ordem = { ativIni: 1, ativDataCria: -1, ativDataFim: -1}
    dbModelAtiv
        .find(busca, {projection: {_id: 0}})
        .sort(ordem)
        .toArray(function(err, atividades) {
            if (err) throw err
            else {
                console.log("Resposta da busca: ", res)
                res.send(atividades) 
        }  
    })
})

app.post('/atividades', (req, res) => {
    var atividades = new dbModelAtiv(req.body)
    var ativSalvo = atividades.save()
    console.log('Nova atividade salva no MongoDB.')
})

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    console.log('MongoDB ok.')
})

http.listen(port, () => console.log(`App ok na porta ${port}!`))