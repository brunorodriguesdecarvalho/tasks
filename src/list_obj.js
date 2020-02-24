function getObjetivos() {
    $.get(
        '/objetivos',
        (objetivos) => { objetivos.forEach(listarObjetivos) }
    )
}

getObjetivos()

function listarObjetivos(objetivos){
    $("#Obj").append(`
        <div class="linha">
            <div id="bola-${objetivos._id}" class="celula" style="
                border: none; 
                height: 28px; 
                width: 28px; 
                border-radius:30px;
                vertical-align: middle;
            ">
            </div>
            <div class="celula" style="vertical-align: middle;">
                <p style="
                    font-size: 28px; 
                    font-weight: bold;
                    margin-block-start: 0em;
                    margin-block-end: 0em;
                ">${objetivos.objNome}</p>
            </div>
        </div>
        <ul class="item">
            <li><strong>Tema associado: </strong>${objetivos.objTema}</li>
            <li id="Stat-${objetivos.objStat}" data-value="${objetivos.objStat}">
                <strong>Status atual: </strong>
                ${objetivos.objStat}
            </li>
            <li><strong>Prazo: </strong>${objetivos.objDataFim}</li>
            <li><strong>Descrição: </strong>${objetivos.objDesc}</li>
            <li><strong>Motivo(s): </strong>${objetivos.objMot}</li>
            <li><strong>Risco(s): </strong>${objetivos.objRisk}</li>
            <li>Início: ${objetivos.objDataCria}</li>
            <li>
                <a href="#" onclick="javascript: excluirObjetivo('${objetivos._id}')">
                    <i class="material-icons" style="font-size: 31px">&#xe92b;</i>
                    <strong>Excluir</strong>
                </a>
            </li>
        </ul>
        <script>
            function hello() {
                var valorStat = document.getElementById("Stat-${objetivos.objStat}").getAttribute("data-value");
                if (valorStat == "-1: Urgente") document.getElementById('bola-${objetivos._id}').style.backgroundColor='#DC0000';
                else if (valorStat == "0 - Atrasado") document.getElementById('bola-${objetivos._id}').style.backgroundColor='#DCA000' 
                else if (valorStat == "1 - Não Iniciado") document.getElementById('bola-${objetivos._id}').style.backgroundColor='#000000'
                else if (valorStat == "2 - Em Andamento") document.getElementById('bola-${objetivos._id}').style.backgroundColor='#009600'
                else if(valorStat == "3 - Concluído") document.getElementById('bola-${objetivos._id}').style.backgroundColor='#00008C'
            };
            hello()
        </script>
        <br>
    `)
}