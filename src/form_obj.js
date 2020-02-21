$(() => {
    $('#enviar').click(() => {
        var objetivos = { 
            objNome: $("#objNome").val(), 
            objTema: $("#objTema").val(),
            objStat: $("#objStat").val(),
            objDesc: $("#objDesc").val(),
            objMot: $("#objMot").val(),
            objRisk: $("#objRisk").val(),
            objDataCria: $("#objDataCria").val(),
            objDataFim: $("#objDataFim").val()
        }
        novoAtividade(objetivos)
    })
})   

function novoAtividade(objetivos) {
    $.post('https://tasksbruno.herokuapp.com/objetivos', objetivos)
}


function getObjetivos() {
    $.get(
        'https://tasksbruno.herokuapp.com/objetivos',
        (objetivos) => { objetivos.forEach(listarObjetivos) }
    )
}

getObjetivos()

function listarObjetivos(objetivos){
    $("#Obj").append(`
        <ul>
            <h3><strong>${objetivos.objNome}</strong></h3>
            <li><strong>ID: </strong>${objetivos._id}</li>
            <li><strong>Status atual: </strong>${objetivos.objStat}</li>
            <li><strong>Tema associado: </strong>${objetivos.objTema}</li>
            <li><strong>Início: </strong>${objetivos.objDataCria}</li>
            <li><strong>Fim: </strong>${objetivos.objDataFim}</li>
            <li><strong>Descrição: </strong>${objetivos.objDesc}</li>
            <li><strong>Motivo(s): </strong>${objetivos.objMot}</li>
            <li><strong>Risco(s): </strong>${objetivos.objRisk}</li>
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

