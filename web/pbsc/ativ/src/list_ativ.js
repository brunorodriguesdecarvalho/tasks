function getAtividades() {
    $.get(
        '/atividades',
        (atividades) => { atividades.forEach(listarAtividades) }
    )
}

getAtividades()

function listarAtividades(atividades){
    $("#Ativ").append(`
        <ul class="item"><form method="post" action="./list_ativ.html">
            <div class="linha">
                <div id="bola-${atividades._id}" class="celula" style="
                    border: none; 
                    height: 28px; 
                    width: 28px; 
                    border-radius:30px;
                    vertical-align: middle;
                ">
                </div>
                <div class="celula">
                    <input type="text" id="ativNome" value="${atividades.ativNome}">
                </div>
            </div>  
            <br>
            <div class="linha">
                <div class="linha">
                    <div class="celula">
                        <strong>Iniciativa associada: </strong>
                    </div>
                    <div class="celula">
                        <select id="ativIni">
                            <option>${atividades.ativIni}</option>
                        </select>
                    </div>
                </div>
                <div class="linha">
                    <div class="celula">
                        <strong>Status atual: </strong>
                    </div>
                    <div class="celula">
                        <select id="ativStat" class="status" data-value="${atividades.ativStat}">
                            <option selected>${atividades.ativStat}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="linha">
                <div class="celula">
                    <strong>Prazo: </strong>
                    <input type="text" id="ativDataFim" value="${atividades.ativDataFim}">
                </div>
                <div class="celula">
                    <strong>Início: </strong>
                    <input type="text" value="${atividades.ativDataCria}" id="ativDataCria">
                </div>
            </div>
            <div class="linha">
                <strong>Descrição: </strong>
                <textarea id="ativDesc">${atividades.ativDesc}</textarea>
            </div>
            <div class="linha">
                <strong>Motivo(s): </strong>
                <textarea id="ativMot">${atividades.ativMot}</textarea>
            </div>
            <div class="linha">
                <strong>Motivo(s): </strong>
                <textarea id="ativRisk">${atividades.ativRisk}</textarea>
            </div>
            <br>
            <div class="linha" id="ativID" data-value="${atividades._id}">
                <strong>ID(s): </strong>
                ${atividades._id}
            </div>
            <br>
            <div class="linha">
                <div class="celula">
                    <a href="#" onclick="javascript: excluirAtividade('${atividades._id}')">
                        <i class="material-icons" style="font-size: 24px">&#xe92b;</i>
                        <strong>Excluir</strong>
                    </a>
                </div>
                <div class="celula">
                    <a href="#" onclick="javascript: editarAtividade()">
                        <span class="fas" style="font-size: 16px">&#xf04b;</span>
                        <strong>EDITAR</strong>
                    </a>
                </div>
            </div>
            </form>
        </ul>
        <script src="./src/drop_stat_ativ.js"></script>
        <script src="./src/drop_ini.js"></script>
        <script>    
            function hello() {
                var valorStat = document.getElementById("ativStat").getAttribute("data-value");
                if (valorStat == "-1: Urgente") document.getElementById('bola-${atividades._id}').style.backgroundColor='#DC0000';
                else if (valorStat == "0 - Atrasado") document.getElementById('bola-${atividades._id}').style.backgroundColor='#DCA000' 
                else if (valorStat == "1 - Não Iniciado") document.getElementById('bola-${atividades._id}').style.backgroundColor='#000000'
                else if (valorStat == "2 - Em Andamento") document.getElementById('bola-${atividades._id}').style.backgroundColor='#009600'
                else if(valorStat == "3 - Concluído") document.getElementById('bola-${atividades._id}').style.backgroundColor='#00008C'
            };
            hello()
        </script>
        <script src="../../../../src/selectIniCheck.js"></script>
        <br>
    `)
}