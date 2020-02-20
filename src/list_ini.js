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
            <li><strong>Objetivo associado: </strong>${iniciativas.iniObj}</li>
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