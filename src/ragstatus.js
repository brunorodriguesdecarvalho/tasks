function getRAGstatus() {
    $.get(
        '/ragstatus',
        (ragstat) => {}
    )
}

getRAGstatus()

function listarRAGstatus(ragstat){
    $("#ativRAGstatus").append(`
        <option>${ragstat.ragstatus}</option>
    `)
}