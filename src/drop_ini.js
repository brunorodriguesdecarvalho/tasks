//Começo lista iniciativas - para Iniciativas
var dropdownIni = document.getElementById('listIni');
dropdownIni.length = 0

let defaultOptionIni = document.createElement('option');
defaultOptionIni.text = 'Não atribuído';

dropdownIni.add(defaultOptionIni);
dropdownIni.selectedIndex = 0;

var urlIni = 'http://tasksbruno.herokuapp.com/listIni';

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
                optionIni.text = dataIni[iIni].objNome;
                optionIni.value = dataIni[iIni].objNome;
                dropdownIni.add(optionIni);
            }
        })
    }
)
.catch(function(err) {
    console.error("Erro de Fetch -", err)
})