document.querySelector("#boton_casas").addEventListener('click', traerDatos);

function traerDatos() {

    const jhttp = new XMLHttpRequest();

    jhttp.open('GET', 'casas.json', true);
    jhttp.send();

    jhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            let datos = JSON.parse(this.responseText);

            // Reemplaza el texto por la imagen
            datos = datos.map((item) => {
                item.imagen = `<img src="${item.imagen}" alt="${item.titulo}">`;
                return item;
            });

            let resultado = document.querySelector(".datos");
            let resultado2 = document.querySelector(".items");

            for (clave in datos) {
                var arreglo = [];
                for (item in datos[clave]) {
                    arreglo.push(item);
                    resultado2.innerHTML = ` 
                    <th>${arreglo[0]}</th>
                    <th>${arreglo[1]}</th>
                    <th>${arreglo[2]}</th>
                    <th>${arreglo[3]}</th>
                    <th>${arreglo[4]}</th>
                    <th>${arreglo[5]}</th>
                    `;
                }
            }

            resultado.innerHTML = '';
            for (let item of datos) {
                resultado2.innerHTML += `  
                <td>${item.agencia}</td>
                <td>${item.titulo}</td>
                <td>${item.imagen}</td>
                <td>${item.descripcion}</td>
                <td>${item.precio}</td>
                <td>${item.direccion}</td>
                `;
            }
        }
    }
}

// Función para filtrar los datos de las casas según el precio, validando el campo input para ingresar números únicamente
function filtrarPrecio(precio) {
    // Validar el campo input
    if (!precio || !/^\d+$/.test(precio)) {
        alert("El precio debe ser un número entero positivo.");
        return;
    }

    // Obtener los datos
    let datos = traerDatos();

    // Filtrar los datos
    let datosFiltrados = datos.filter((casa) => {
        return casa.precio <= precio;
    });

    // Mostrar los datos filtrados
    document.querySelector(".datos").innerHTML = "";
    for (let casa of datosFiltrados) {
        document.querySelector(".datos").innerHTML += `  
        <td>${casa.agencia}</td>
        <td>${casa.titulo}</td>
        <td>${casa.imagen}</td>
        <td>${casa.descripcion}</td>
        <td>${casa.precio}</td>
        <td>${casa.direccion}</td>
        `;
    }
}