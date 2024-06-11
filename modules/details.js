import * as functionsGlobal from "./functions.js";

let urlApiEvents = "https://aulamindhub.github.io/amazing-api/events.json"
let url = new URL(document.location).searchParams;
let idUrl = url.get("id");
let detallesDiv = document.getElementById(`contenedorDetalles`)
fetch(urlApiEvents)
    .then(response => response.json())
    .then(data => {
        functionsGlobal.pintarDetalles(detallesDiv, data.events, idUrl)
    })