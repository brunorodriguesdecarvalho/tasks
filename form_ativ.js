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
})   

function novoAtividade(atividades) {
    $.post('https://tasksbruno.herokuapp.com/atividades', atividades)
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
                <button id="excluir" onclick="javascript: alerta()">
                    excluir
                </button>
                <script src="src/alerta.js" type="text/javascript"></script>
            </li>
        </ul>
        <br>
    `)
}

listarAtividades()