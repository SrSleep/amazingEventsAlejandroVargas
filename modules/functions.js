
function crearCarta(ubicacionDiv, laCarta) {
    let nuevaCarta = document.createElement('div');
    nuevaCarta.classList.add('card', 'mb-4');
    nuevaCarta.style.width = '18rem';
    nuevaCarta.innerHTML = `
    <img src="${laCarta.image}" class="card-img-top imgCard" alt="...">
    <div class="card-body text-center ">
        <h5 class="card-title">${laCarta.name}</h5>
        <p class="card-text">${laCarta.description}.</p>
    </div>
    <div class="card-body d-flex justify-content-around align-items-center ">
        <p class="m-0 card-text"> Price ${laCarta.price} $</p>
        <a href="/pages/details.html?id=${laCarta._id}" class="btn btn-outline-dark btn-sm">Details</a>
    </div>`;

    ubicacionDiv.appendChild(nuevaCarta);

}

export function pintarCartas(ubicacionDiv, lasCartas) {
    ubicacionDiv.innerHTML = ''
    if (lasCartas != 0) {
        lasCartas.forEach(element => {
            crearCarta(ubicacionDiv, element);
        });
    } else {
        ubicacionDiv.innerHTML = '<p>No results found</p>'
    }
}

function crearCheckbox(ubicacionDiv, checkbox,) {
    let checkboxUbicacion = document.createElement('div');
    checkboxUbicacion.classList.add('col', 'd-flex', 'align-items-center');

    checkboxUbicacion.innerHTML = `
    <input class="form-check-input" type="checkbox" value="${checkbox}" id="${checkbox}">
    <label class="form-check-label text-nowrap ms-2" for="${checkbox}">
        ${checkbox}
    </label>`;

    ubicacionDiv.appendChild(checkboxUbicacion);

}

export function pintarChecks(ubicacionDiv, checkbox) {
    let arrayCategory = [];
    checkbox.forEach(evento => {
        if (!arrayCategory.includes(evento.category)) {
            arrayCategory.push(evento.category);
        }
    });

    ubicacionDiv.innerHTML = '';
    for (let i = 0; i < arrayCategory.length; i++) {
        crearCheckbox(ubicacionDiv, arrayCategory[i])
    }
}

export function filtradoBuscar(texto, eventos) {
    let arrayBuscando = eventos.filter(busca =>
        busca.name.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
        busca.description.toLocaleLowerCase().includes(texto.toLocaleLowerCase())
    );
    return arrayBuscando;
}

export function filtradoChecks(eventos, arrayEvento) {
    let checkArray = arrayEvento.filter(check => {
        for (let i = 0; i < eventos.length; i++) {
            if (eventos[i].id === check.category) {
                return check;
            }
        };
    });

    if (checkArray.length != 0) {
        return checkArray
    } else {
        return arrayEvento
    }
}

function crearDetalles(ubicacionDiv, detalles) {
    let nuevoDetalle = document.createElement(`div`)
    nuevoDetalle.classList.add(`row`, `justify-content-around`, `p-3`)
    nuevoDetalle.innerHTML = `
    <div class="col-5 bg-light p-2">
        <img src="${detalles.image}" class="img-thumbnail img-fluid detailsImg" alt="">
    </div>
    <div class="col-5 bg-light">
    <h2 class=" display-4 d-md-none d-lg-block fs-1 text-center tituloDetalles"><i><b>${detalles.name}</b></i></h2>
    <h2 class=" display-4 d-none d-md-block d-lg-none fs-2 text-center" tituloDetalles><b>${detalles.name}</b></h2>
        <p class="fs-5">${detalles.description}</p>
        <p class="fs-5"><strong>Date: </strong> ${detalles.date}</p>
        <p class="fs-5"><strong>Category: </strong> ${detalles.category}</p>
        <p class="fs-5"><strong>Location: </strong> ${detalles.place}</p>
        <p class="fs-5"><strong>Capacity: </strong> ${detalles.capacity}</p>
        <p class="fs-5"><strong>Price: </strong> ${detalles.price}</p>
        <p class="fs-5">${detalles.estimate ? "<strong>Estimate: </strong> " + detalles.estimate : "<strong>Assistance: </strong> " + detalles.assistance}</p>
    </div>`


    ubicacionDiv.appendChild(nuevoDetalle)

}

export function pintarDetalles(ubicacionDiv, detalles, idUrl) {
    ubicacionDiv.innerHTML = ``;
    for (let i = 0; i < detalles.length; i++) {
        if (detalles[i]._id == idUrl) {
            crearDetalles(ubicacionDiv, detalles[i])
        }
    }
}

export function filterupComingEvents(array, dateCurrent) {
    return array.filter(date => dateCurrent < date.date);
}

export function filterPastEvents(array, dateCurrent) {
    return array.filter(date => dateCurrent > date.date);
}

export function highestAssistance(array, date) {
    array = filterPastEvents(array, date)
    let highAssistancePercentage = 0;
    let nameHighAssistanceEvent = '';
    array.forEach(element => {
        if ((element.assistance / element.capacity) * 100 > highAssistancePercentage) {
            highAssistancePercentage = (element.assistance / element.capacity) * 100
            nameHighAssistanceEvent = element.name
        }
    });
    return {
        name: nameHighAssistanceEvent,
        percentage: parseFloat(highAssistancePercentage).toFixed(1)
    };
}

export function lowestAssistance(array, date) {
    array = filterPastEvents(array, date)
    let lowestAssistancePercentage = 100;
    let namelowestAssistanceEvent = '';
    array.forEach(element => {
        if ((element.assistance / element.capacity) * 100 < lowestAssistancePercentage) {
            lowestAssistancePercentage = (element.assistance / element.capacity) * 100
            namelowestAssistanceEvent = element.name
        }
    });
    return {
        name: namelowestAssistanceEvent,
        percentage: parseFloat(lowestAssistancePercentage).toFixed(1)
    };
}

export function highCapacity(array) {
    let highCapacity = 0;
    let nameHighCapacityEvent = '';
    array.forEach(element => {
        if (element.capacity > highCapacity) {
            highCapacity = element.capacity
            nameHighCapacityEvent = element.name

        }

    });
    return {
        name: nameHighCapacityEvent,
        capacity: highCapacity
    };
}

export function appendCell(ubicacion, contenido) {
    let celda = document.createElement('td');
    celda.innerHTML = contenido;
    ubicacion.appendChild(celda);
}

export function statisticsEvents(array) {
    let upComingEventsCategory = []
    array.forEach(evento => {
        let categoryIndex = upComingEventsCategory.findIndex(cat => cat.name === evento.category)

        if (categoryIndex === -1) {
            upComingEventsCategory.push({
                name: evento.category,
                revenues: (evento.assistance ? evento.assistance : evento.estimate) * evento.price,
                capacity: evento.capacity,
                estimate: evento.estimate ? evento.estimate : evento.assistance,
            })
        } else {
            upComingEventsCategory[categoryIndex].revenues += (evento.assistance ? evento.assistance : evento.estimate) * evento.price
            upComingEventsCategory[categoryIndex].capacity += evento.capacity
            upComingEventsCategory[categoryIndex].estimate += evento.estimate ? evento.estimate : evento.assistance
        }
      
    });

    return upComingEventsCategory
}

export function pintarceldasStatistics(arrayStatistic, ubicacion) {
    ubicacion.innerHTML = ''
    arrayStatistic.forEach(element => {
        let percentage = parseFloat((element.estimate / element.capacity) * 100);
        let celda = document.createElement('tr')
        celda.classList.add('text-center')
        celda.innerHTML = `
        <td>${element.name}</td>
        <td>${element.revenues.toLocaleString('es-CO')}</td>
        <td>${percentage === 100 ? '100%' : percentage.toFixed(1) + '%'}</td>`
        ubicacion.appendChild(celda)
    });
}