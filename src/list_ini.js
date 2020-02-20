function getIniciativas() {
    $.get(
        '/iniciativas',
        (iniciativas) => { iniciativas.forEach(listarIniciativas) }
    )
}

getIniciativas()

function listarIniciativas(iniciativas){
    $("#Ini").append(
        `<ul>
            <h2><strong>${iniciativas.iniNome}</strong></h2>
            <li><strong>Objetivo associado: </strong>${iniciativas.iniIni}</li>
            <li><strong>Status atual: </strong>${iniciativas.iniStat}</li>
            <li><strong>Prazo: </strong>${iniciativas.iniDataFim}</li>
            <li><strong>Descrição: </strong>${iniciativas.iniDesc}</li>
            <li><strong>Motivo(s): </strong>${iniciativas.iniMot}</li>
            <li><strong>Risco(s): </strong>${iniciativas.iniRisk}</li>
            <li>Início: ${iniciativas.iniDataCria}</li>
            <li>ID: ${iniciativas._id}</li>
        </ul>
        <br>
    `)
}

function deletar(chave) {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, dbpbsc) {
        if (err) throw err
        console.log("Conectato via Mongo Client 2 ")
        var dbo = dbpbsc.db("dbpbsc")
        var busca = { _id: ObjectID(chave) }
        dbo.collection("collinis").deleteOne(busca, function(err, res) {
            if (err) throw err
            console.log("Documento deletado! ", res)
            dbpbsc.close()
        })
    })
}