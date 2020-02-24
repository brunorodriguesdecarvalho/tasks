function andarAtividade(idparaApagar) {
    console.log('Init to ongoing: ', idparaApagar)
    var atividade = { _id: idparaApagar }
    $.post('/andarAtiv', atividade)
    console.log('Trying to ongoing: ', atividade)
}

function andarIniciativa(idparaApagar) {
    console.log('Init to ongoing: ', idparaApagar)
    var iniciativa = { _id: idparaApagar }
    $.post('/andarIni', iniciativa)
    console.log('Trying to ongoing: ', iniciativa)
}

function andarObjetivo(idparaApagar) {
    console.log('Init to ongoing: ', idparaApagar)
    var objetivo = { _id: idparaApagar }
    $.post('/andarObj', objetivo)
    console.log('Trying to ongoing: ', objetivo)
}