function editarAtividade (idparaeditar) {
    console.log('Init to edit: ', idparaeditar)
    var atividades = { _id: idparaeditar }
    
    $.post('/web/pbsc/ativ/atividades/buscaID',
        (atividades) => { atividades.forEach(listarAtividades)}
    )
    console.log('Trying to edit: ', atividade)
}

function listarAtividades(atividades){
    $("#Ativ").append(`
        <ul class="item">
            <li><div class="linha">
                <div class="celula" style="
                    vertical-align: middle;
                    font-size: 28px; 
                    font-weight: bold;
                    margin-block-start: 0em;
                    margin-block-end: 0em;">
                    ${atividades.ativNome}
                </div>
            </div></li>
        </ul>
        <br>
    `)
}