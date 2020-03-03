//Começo lista iniciativas - para Iniciativas
var dropdownIni = document.getElementById('ativIni');
console.log(dropdownIni.length)
var option = document.createElement("option");
dropdownIni.length = 1

var urlIni = 'https://tasksbruno.herokuapp.com/listIni';

const requestIni = new XMLHttpRequest();
requestIni.open('GET', urlIni, true);

fetch(urlIni)
    .then(
        function(responseIni) {                    
            if (responseIni.status !== 200) {
                console.warn('Erro, código: ' + responseIni.status)
                return
            }

        responseIni.json().then(function(dataIni) {
            let optionIni

            for (let iIni = 0; iIni < dataIni.length; iIni++) {
                optionIni = document.createElement('option');
                optionIni.text = dataIni[iIni].iniNome;
                optionIni.value = dataIni[iIni].iniNome;
                dropdownIni.add(optionIni);
            }
        })
    }
)
.catch(function(err) {
    console.error("Erro de Fetch -", err)
})
