function getAtividades() {
    $.get(
        '/atividades',
        (atividades) => { atividades.forEach(listarAtividades) }
    )
}

getAtividades()

function listarAtividades(atividades){
    $("#Ativ").append(
        `<ul class="item">
            <h2><strong>${atividades.ativNome}</strong></h2>
            <li><strong>Iniciativa associada: </strong>${atividades.ativIni}</li>
            <li><strong>Status atual: </strong>${atividades.ativStat}</li>
            <li><strong>Prazo: </strong>${atividades.ativDataFim}</li>
            <li><strong>Descrição: </strong>${atividades.ativDesc}</li>
            <li><strong>Motivo(s): </strong>${atividades.ativMot}</li>
            <li><strong>Risco(s): </strong>${atividades.ativRisk}</li>
            <li>Início: ${atividades.ativDataCria}</li>
            <li id="${atividades._id}">ID: ${atividades._id}</li>
        </ul>
        <br>
    `)
}