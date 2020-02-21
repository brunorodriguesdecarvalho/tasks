function getObjetivos() {
    $.get(
        '/objetivos',
        (objetivos) => { objetivos.forEach(listarObjetivos) }
    )
}

getObjetivos()

function listarObjetivos(objetivos){
    $("#Obj").append(
        `<ul class="item">
            <h2><strong>${objetivos.objNome}</strong></h2>
            <li><strong>Tema associado: </strong>${objetivos.objTema}</li>
            <li><strong>Status atual: </strong>${objetivos.objStat}</li>
            <li><strong>Prazo: </strong>${objetivos.objDataFim}</li>
            <li><strong>Descrição: </strong>${objetivos.objDesc}</li>
            <li><strong>Motivo(s): </strong>${objetivos.objMot}</li>
            <li><strong>Risco(s): </strong>${objetivos.objRisk}</li>
            <li>Início: ${objetivos.objDataCria}</li>
            <li>ID: ${objetivos._id}</li>
        </ul>
        <br>
    `)
}