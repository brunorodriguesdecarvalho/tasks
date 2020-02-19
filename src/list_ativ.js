function getAtividades() {
    $.get(
        '/atividades',
        (atividades) => { atividades.forEach(listarAtividades) }
    )
}

getAtividades()

function listarAtividades(atividades){
    $("#Ativ").append(
        `<ul>
            <h2><strong>${atividades.ativNome}</strong></h2>
            <li><strong>Iniciativa associada: </strong>${atividades.ativIni}</li>
            <li><strong>Status atual: </strong>${atividades.ativStat}</li>
            <li><strong>Prazo: </strong>${atividades.ativDataFim}</li>
            <li><strong>Descrição: </strong>${atividades.ativDesc}</li>
            <li><strong>Motivo(s): </strong>${atividades.ativMot}</li>
            <li><strong>Risco(s): </strong>${atividades.ativRisk}</li>
            <li>Início: ${atividades.ativDataCria}</li>
            <li>ID: ${atividades._id}</li>
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
        dbo.collection("collativs").deleteOne(busca, function(err, res) {
            if (err) throw err
            console.log("Documento deletado! ", res)
            dbpbsc.close()
        })
    })
}