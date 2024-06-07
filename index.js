import * as functionsGlobal from "./modules/functions.js";

let urlApiEvents = "https://aulamindhub.github.io/amazing-api/events.json"
// ubicacion del padre Div donde se van pintar las cartas
let cartasDiv = document.getElementById('contenedorCartas');
let checkboxDiv = document.getElementById('contendorCheckbox');
let inputBuscar = document.getElementById('buscar')
fetch(urlApiEvents)
    .then(response => response.json())
    .then(data => {
        functionsGlobal.pintarChecks(checkboxDiv, data.events);
        functionsGlobal.pintarCartas(cartasDiv, data.events);;

        inputBuscar.addEventListener('input', (evento) => {
            let changeCategory = document.querySelectorAll("input[type=checkbox]:checked");
            let arrayChecks = functionsGlobal.filtradoChecks(changeCategory, data.events)
            if (inputBuscar.value != 0) {
                arrayChecks = functionsGlobal.filtradoBuscar(inputBuscar.value, arrayChecks)
            }
        
        
            functionsGlobal.pintarCartas(cartasDiv, arrayChecks)
        
        });

        checkboxDiv.addEventListener('change', (evento) => {
            let changeCategory = document.querySelectorAll("input[type=checkbox]:checked");
            let arrayChecks = functionsGlobal.filtradoChecks(changeCategory, data.events)
            if (inputBuscar.value != 0) {
                arrayChecks = functionsGlobal.filtradoBuscar(inputBuscar.value, arrayChecks)
            }
        
            functionsGlobal.pintarCartas(cartasDiv, arrayChecks)
        
        
        });
        




    })









