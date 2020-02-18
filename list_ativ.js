function getAtividades() {
    $.get(
        '/atividades',
        (atividades) => { atividades.forEach(listarAtividades) }
    )
}

getAtividades()

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

function listarAtividades(atividades){
    $("#Ativ").append(
        `<ul>
            <h3><strong>${atividades.ativNome}</strong></h3>
            <li><strong>ID: </strong>${atividades._id}</li>
            <li><strong>Status atual: </strong>${atividades.ativStat}</li>
            <li><strong>Iniciativa associada: </strong>${atividades.ativIni}</li>
            <li><strong>Início: </strong>${atividades.ativDataCria}</li>
            <li><strong>Fim: </strong>${atividades.ativDataFim}</li>
            <li><strong>Descrição: </strong>${atividades.ativDesc}</li>
            <li><strong>Motivo(s): </strong>${atividades.ativMot}</li>
            <li><strong>Risco(s): </strong>${atividades.ativRisk}</li>
            <li>
                <button id="excluir" onclick="javascript: deletar('${atividades._id}')">
                    excluir
                </button>
            </li>
        </ul>
        <br>
    `)
}