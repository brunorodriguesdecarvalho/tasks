function editarAtividade() {
    window.alert('Gravando dados no servidor, por favor aguarde...');
    let statusBox = document.getElementById("ativStat")

    var atividades = { 
        ativNome: document.getElementById("ativNome").value,
        ativIni: document.getElementById("ativIni").options[document.getElementById("ativIni").selectedIndex].value,
        ativStat: statusBox.options[statusBox.selectedIndex].text,
        ativDesc: document.getElementById("ativDesc").value,
        ativMot: document.getElementById("ativMot").value,
        ativRisk: document.getElementById("ativRisk").value,
        ativDataCria: document.getElementById("ativDataCria").value,
        ativDataFim: document.getElementById("ativDataFim").value,
        _id: document.getElementById("ativID").getAttribute("data-value")
    }
    console.log("Função Editar: ", atividades)
    gravarAtividade(atividades)

    var delay = 5000; 
    var url = './list_ativ.html'
    setTimeout(function(){ window.location = url; }, delay);
}

function gravarAtividade(atividades) {
    console.log('Função Gravar: ', atividades._id)
    $.post('/gravarAtiv', atividades)
}
