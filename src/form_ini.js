$(() => {
    $('#enviar').click(() => {
        var iniciativas = { 
            iniNome: $("#iniNome").val(), 
            iniObj: $("#iniObj").val(),
            iniStat: $("#iniStat").val(),
            iniDesc: $("#iniDesc").val(),
            iniMot: $("#iniMot").val(),
            iniRisk: $("#iniRisk").val(),
            iniDataCria: $("#iniDataCria").val(),
            iniDataFim: $("#iniDataFim").val()
        }
        novoAtividade(iniciativas)
    })
})   

function novoAtividade(iniciativas) {
    $.post('https://tasksbruno.herokuapp.com/iniciativas', iniciativas)
}


function getIniciativas() {
    $.get(
        'https://tasksbruno.herokuapp.com/iniciativas',
        (iniciativas) => { iniciativas.forEach(listarIniciativas) }
    )
}

getIniciativas()

function listarIniciativas(iniciativas){
    $("#Ativ").append(`
        <ul>
            <h3><strong>${iniciativas.iniNome}</strong></h3>
            <li><strong>ID: </strong>${iniciativas._id}</li>
            <li><strong>Status atual: </strong>${iniciativas.iniStat}</li>
            <li><strong>Iniciativa associada: </strong>${iniciativas.iniObj}</li>
            <li><strong>Início: </strong>${iniciativas.iniDataCria}</li>
            <li><strong>Fim: </strong>${iniciativas.objDataFim}</li>
            <li><strong>Descrição: </strong>${iniciativas.iniDesc}</li>
            <li><strong>Motivo(s): </strong>${iniciativas.iniMot}</li>
            <li><strong>Risco(s): </strong>${iniciativas.iniRisk}</li>
            <li>
                <script src="src/apagaAtiv.js" type="text/javascript"></script>
                <button id="excluir" onclick="javascript: apagaAt()">
                    excluir
                </button>
            </li>
        </ul>
        <br>
    `)
}

