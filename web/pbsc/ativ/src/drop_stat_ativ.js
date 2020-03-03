//Começo da lista de status - para Iniciativas
var dropdown = document.getElementById('status');
dropdown.length = 1

var url = 'https://tasksbruno.herokuapp.com/ragstatus';

const request = new XMLHttpRequest();
request.open('GET', url, true);

fetch(url)
    .then(
        function(response) {                    
            if (response.status !== 200) {
                console.warn('Erro, código: ' + response.status)
                return
            }

        response.json().then(function(data) {
            let option

            for (let i = 1; (i-1) <= data.length; i++) {
                option = document.createElement('option');
                option.text = data[i].ragstatus;
                option.value = data[i].ragstatus;
                function incluir() {
                    dropdown.add(option);
                }
                incluir()
            }
        })
    }
)
.catch(function(err) {
    console.error("Erro de Fetch -", err)
})

