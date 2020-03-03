const selectElement = document.querySelector('.status');
const bola = document.getElementById('bola-${atividades._id}')
const StatusAtual = document.getElementById('status-${atividades._id}')

selectElement.addEventListener('change', (event) => {
    window.alert("Você mudou de opção!")
    var valorStat = StatusAtual.getAttribute("data-value");
        if (valorStat == "-1: Urgente") bola.style.backgroundColor='#DC0000';
        else if (valorStat == "0 - Atrasado") bola.style.backgroundColor='#DCA000' 
        else if (valorStat == "1 - Não Iniciado") bola.style.backgroundColor='#000000'
        else if (valorStat == "2 - Em Andamento") bola.style.backgroundColor='#009600'
        else if(valorStat == "3 - Concluído") bola.style.backgroundColor='#00008C'    
});