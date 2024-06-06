
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
        <a href="/details.html?id=${laCarta._id}" class="btn btn-outline-dark btn-sm">Details</a>
    </div>`;

    ubicacionDiv.appendChild(nuevaCarta);

}

export function pintarCartas(ubicacionDiv, lasCartas) {
    ubicacionDiv.innerHTML = ''
    if (lasCartas != 0) {
        for (let i = 0; i < lasCartas.length; i++) {
            crearCarta(ubicacionDiv, lasCartas[i]);
        }
    }else{
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
