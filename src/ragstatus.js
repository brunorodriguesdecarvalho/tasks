function getRAGstatus() {
    $.get(
        '/ragstatus',
        (ragstat) => {}
    )
}

getRAGstatus()

function listarRAGstatus(ragstat){
    $("#ativStat").append(`
        <option>${ragstat.ragstatus}</option>
    `)
}
