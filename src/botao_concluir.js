function concluirAtividade(idparaApagar) {
    console.log('Init to delete: ', idparaApagar)
    var atividade = { _id: idparaApagar }
    $.post('/concluiAtiv', atividade)
    console.log('Trying to delete: ', atividade)
}

function concluirIniciativa(idparaApagar) {
    console.log('Init to delete: ', idparaApagar)
    var iniciativa = { _id: idparaApagar }
    $.post('/concluiIni', iniciativa)
    console.log('Trying to delete: ', iniciativa)
}

function concluirObjetivo(idparaApagar) {
    console.log('Init to delete: ', idparaApagar)
    var objetivo = { _id: idparaApagar }
    $.post('/concluiObj', objetivo)
    console.log('Trying to delete: ', objetivo)
}