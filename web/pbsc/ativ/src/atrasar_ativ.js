function atrasar() {
    window.alert("Iniciando verificação de atividades atrasadas.");
    console.log("Atrasando via log - início")
    var mensagem = "Message in a Bottle !!!"
    $.post('/atrasarAtiv', mensagem)
    console.log("Atrasando via log - pós-post_action")
    setTimeout(function() {location.reload()}, 5000)
}