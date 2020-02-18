$(() => {
    $('#enviar').click(() => {
        var atividades = { 
            ativNome: $("#ativNome").val(), 
            ativIni: $("#ativIni").val(),
            ativStat: $("#ativStat").val(),
            ativDesc: $("#ativDesc").val(),
            ativMot: $("#ativMot").val(),
            ativRisk: $("#ativRisk").val(),
            ativDataCria: $("#ativDataCria").val(),
            ativDataFim: $("#ativDataFim").val()
        }
        novoAtividade(atividades)
    })

    $('#excluir').click(() => {
        var ativItem = db.model('collativs', atividades)
        var query = { name: 'Corrigir' }
        ativItem.deleteOne(query, function (err, result) {
            if (err) {console.log("error query");
            } else {console.log(result)}
        })
        apagaAtiv()
    })
})   

function novoAtividade(atividades) {
    $.post('https://tasksbruno.herokuapp.com/atividades', atividades)
}

function apagaAtiv() {
        var id = '5e4ad8570484431dc4934ab5'
        collativs.findByIdAndDelete(id, function (err) {
            if(err) console.log(err);
        console.log("Successful deletion");
    });
}

function getAtividades() {
    $.get(
        'https://tasksbruno.herokuapp.com/atividades',
        (atividades) => { atividades.forEach(listarAtividades) }
    )
}

getAtividades()

function listarAtividades(atividades){
    $("#Ativ").append(`
        <ul>
            <h3><strong>${atividades.ativNome}</strong></h3>
            <li><strong>ID: </strong>${atividades._id}</li>
            <li><strong>Status atual: </strong>${atividades.ativStat}</li>
            <li><strong>Iniciativa associada: </strong>${atividades.ativIni}</li>
            <li><strong>Início: </strong>${atividades.ativDataCria}</li>
            <li><strong>Fim: </strong>${atividades.objDataFim}</li>
            <li><strong>Descrição: </strong>${atividades.ativDesc}</li>
            <li><strong>Motivo(s): </strong>${atividades.ativMot}</li>
            <li><strong>Risco(s): </strong>${atividades.ativRisk}</li>
            <li>
                <button type="submit" id="excluir">
                    excluir
                </button>
            </li>
            <li><a href="/index.html">Home</a></li>
        </ul>
        <br>
    `)
}

listarAtividades()