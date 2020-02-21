//Começo lista objetivos - para Iniciativas
var dropdownObj = document.getElementById('iniObj');
dropdownObj.length = 0

let defaultOptionObj = document.createElement('option');
defaultOptionObj.text = 'Não atribuído';

dropdownObj.add(defaultOptionObj);
dropdownObj.selectedIndex = 0;

var urlObj = 'https://tasksbruno.herokuapp.com/listObj';

const requestObj = new XMLHttpRequest();
requestObj.open('GET', urlObj, true);

fetch(urlObj)
    .then(
        function(responseObj) {                    
            if (responseObj.status !== 200) {
                console.warn('Erro, código: ' + responseObj.status)
                return
            }

        responseObj.json().then(function(dataObj) {
            let optionObj

            for (let iObj = 0; iObj < dataObj.length; iObj++) {
                optionObj = document.createElement('option');
                optionObj.text = dataObj[iObj].objNome;
                optionObj.value = dataObj[iObj].objNome;
                dropdownObj.add(optionObj);
            }
        })
    }
)
.catch(function(err) {
    console.error("Erro de Fetch -", err)
})