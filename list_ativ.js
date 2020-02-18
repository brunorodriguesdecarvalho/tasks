function getAtividades() {
    $.get(
        'https://tasksbruno.herokuapp.com/atividades',
        (atividades) => { atividades.forEach(listarAtividades) }
    )
}

function listarAtividades(atividades) {
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
                <script src="src/apagaAtiv.js" type="text/javascript"></script>
                <button id="excluir" onclick="javascript: apagaAt()">
                    excluir
                </button>
            </li>
        </ul>
        <br>
    `)
}

getAtividades()