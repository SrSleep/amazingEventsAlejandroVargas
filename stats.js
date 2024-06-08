import * as functionsGlobal from "./modules/functions.js"
let urlApiEvents = "https://aulamindhub.github.io/amazing-api/events.json"

fetch(urlApiEvents)
.then(response =>response.json())
.then(data =>{


let eventHighAssis = functionsGlobal.highestAssistance(data.events, data.currentDate);
let eventLowAssis = functionsGlobal.lowestAssistance(data.events, data.currentDate);
let eventHighCapacity = functionsGlobal.highCapacity(data.events);
let eventNameTr = document.getElementById('eventName');
let eventNumbersTr = document.getElementById('eventNumbers');
let upcomingTBody = document.getElementById('upcomingTBody');
let pastEventTBody =document.getElementById('pastEventTBody');

let statisticsUCE = functionsGlobal.statisticsEvents(functionsGlobal.filterupComingEvents(data.events,data.currentDate));
let statisticsPE = functionsGlobal.statisticsEvents(functionsGlobal.filterPastEvents(data.events,data.currentDate));

functionsGlobal.pintarceldasStatistics(statisticsUCE, upcomingTBody)
functionsGlobal.pintarceldasStatistics(statisticsPE, pastEventTBody)


eventNameTr.innerHTML = ''
functionsGlobal.appendCell(eventNameTr, eventHighAssis.name);
functionsGlobal.appendCell(eventNameTr, eventLowAssis.name);
functionsGlobal.appendCell(eventNameTr, eventHighCapacity.name);

eventNumbersTr.innerHTML = ''
functionsGlobal.appendCell(eventNumbersTr, eventHighAssis.percentage + "%");
functionsGlobal.appendCell(eventNumbersTr, eventLowAssis.percentage + "%");
functionsGlobal.appendCell(eventNumbersTr, eventHighCapacity.capacity.toLocaleString('es-CO'));

})











// let upComingEventsCategory = []
// upComingEvents.forEach(evento => {
//     let categoryIndex = upComingEventsCategory.findIndex(cat => cat.name === evento.category)

//     if (categoryIndex === -1) {
//         upComingEventsCategory.push({
//             name: evento.category,
//             revenues: evento.estimate * evento.price,
//             capacity: evento.capacity,
//             estimate: evento.estimate,
//         })
//     } else {
//         upComingEventsCategory[categoryIndex].revenues += evento.estimate * evento.price
//         upComingEventsCategory[categoryIndex].capacity += evento.capacity
//         upComingEventsCategory[categoryIndex].capacity += evento.estimate
//     }
// });
