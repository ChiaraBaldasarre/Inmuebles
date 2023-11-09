
document.querySelector("#boton_hotel").addEventListener('click', traerDatos);

function traerDatos() {

    const jhttp = new XMLHttpRequest();

    jhttp.open('GET', 'habitacionhotel.json', true);
    jhttp.send();

    jhttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200) {

            let datos = JSON.parse(this.responseText);

            // Reemplazar el texto de la propiedad imagen
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
                <td>${item.nombre}</td>
                <td>${item.imagen}</td>
                <td>${item.descripcion}</td>
                <td>${item.ubicacion}</td>
                <td>${item.estrellas}</td>
                <td>${item.precio}</td>
                `;
            }

        }
    }
}

function filtrarPrecio(precio) {

    if (!precio || !/^\d+$/.test(precio)) {
        alert("El precio debe ser un número entero positivo.");
        return;
    }

    let datos = traerDatos();

    let datosFiltrados = datos.filter((casa) => {
        return casa.precio <= precio;
    });

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