function getIniciativas() {
    $.get(
        '/iniciativas',
        (iniciativas) => { iniciativas.forEach(listarIniciativas) }
    )
}

getIniciativas()

function listarIniciativas(iniciativas){
    $("#Ini").append(`
        <ul class="item">
            <li>
                <div class="linha">
                    <div id="bola-${iniciativas._id}" class="celula" style="
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
                        ">${iniciativas.iniNome}</p>
                    </div>
                </div>
            </li>
            <li><strong>Objetivo associado: </strong>${iniciativas.iniObj}</li>
            <li id="Stat-${iniciativas.iniStat}" data-value="${iniciativas.iniStat}">
                <strong>Status atual: </strong>
                ${iniciativas.iniStat}
            </li>
            <li><strong>Prazo: </strong>${iniciativas.iniDataFim}</li>
            <li><strong>Descrição: </strong>${iniciativas.iniDesc}</li>
            <li><strong>Motivo(s): </strong>${iniciativas.iniMot}</li>
            <li><strong>Risco(s): </strong>${iniciativas.iniRisk}</li>
            <li>Início: ${iniciativas.iniDataCria}</li>
            <br>
            <li>
                <a href="#" onclick="javascript: excluirIniciativa('${iniciativas._id}')">
                    <i class="material-icons" style="font-size: 31px">&#xe92b;</i>
                    <strong>Excluir</strong>
                </a>
                <a href="#" onclick="javascript: concluirIniciativa('${iniciativas._id}')">
                    <span class="fas" style="font-size: 24px">&#xf058;</span>
                    <strong>Concluir</strong>
                </a>
                <a href="#" onclick="javascript: andarIniciativa('${iniciativas._id}')">
                    <span class="fas" style="font-size: 24px">&#xf04b;</span>
                    <strong>Iniciar</strong>
                </a>
            </li>
        </ul>
        <script>
            function hello() {
                var valorStat = document.getElementById("Stat-${iniciativas.iniStat}").getAttribute("data-value");
                if (valorStat == "-1: Urgente") document.getElementById('bola-${iniciativas._id}').style.backgroundColor='#DC0000';
                else if (valorStat == "0 - Atrasado") document.getElementById('bola-${iniciativas._id}').style.backgroundColor='#DCA000' 
                else if (valorStat == "1 - Não Iniciado") document.getElementById('bola-${iniciativas._id}').style.backgroundColor='#000000'
                else if (valorStat == "2 - Em Andamento") document.getElementById('bola-${iniciativas._id}').style.backgroundColor='#009600'
                else if(valorStat == "3 - Concluído") document.getElementById('bola-${iniciativas._id}').style.backgroundColor='#00008C'
            };
            hello()
        </script>
        <br>
    `)
}
