function excluirAtividade(idparaApagar) {
    console.log('Init to delete: ', idparaApagar)
    var atividade = { _id: idparaApagar }
    $.post('/deletaAtiv', atividade)
    console.log('Trying to delete: ', atividade)
}