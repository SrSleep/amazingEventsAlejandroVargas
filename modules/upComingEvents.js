import * as functionsGlobal from "./functions.js"

// ubicacion del padre Div donde se van pintar las cartas
let cartasDiv = document.getElementById(`contenedorCartas`);
let checkboxDiv = document.getElementById(`contendorCheckbox`);
let inputBuscar = document.getElementById(`buscar`);
let urlApiEvents = "https://aulamindhub.github.io/amazing-api/events.json"
fetch(urlApiEvents)
    .then(response => response.json())
    .then(data => {

        functionsGlobal.pintarChecks(checkboxDiv, functionsGlobal.filterupComingEvents(data.events, data.currentDate));
        functionsGlobal.pintarCartas(cartasDiv, functionsGlobal.filterupComingEvents(data.events, data.currentDate));

        inputBuscar.addEventListener('input', (evento) => {
            let changeCategory = document.querySelectorAll("input[type=checkbox]:checked");
            let arrayChecks = functionsGlobal.filtradoChecks(changeCategory, data.events);

            if (inputBuscar.value !== 0) {
                arrayChecks = functionsGlobal.filtradoBuscar(inputBuscar.value, arrayChecks);
            }
            functionsGlobal.pintarCartas(cartasDiv, functionsGlobal.filterupComingEvents(arrayChecks, data.currentDate));
        });

        checkboxDiv.addEventListener('change', (evento) => {
            let changeCategory = document.querySelectorAll("input[type=checkbox]:checked");
            let arrayChecks = functionsGlobal.filtradoChecks(changeCategory, data.events);

            if (inputBuscar.value !== 0) {
                arrayChecks = functionsGlobal.filtradoBuscar(inputBuscar.value, arrayChecks);
            }

            functionsGlobal.pintarCartas(cartasDiv, functionsGlobal.filterupComingEvents(arrayChecks, data.currentDate));
        });

    })