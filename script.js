

// Declaración de variables globales
const formulario = document.getElementById('formulario');           // formulario: almacena la referencia al elemento HTML #formulario (<form></form>)
const inputs = document.querySelectorAll('#formulario input');      // inputs: almacena un arreglo con todas las referencias a los elementos HTML del tipo input que se encuentran dentro del elemento HTML #formulario (#nombre, #apellido, #dni, #domicilio, #telefono, #correo, #terminos). Estos elementos representan los campos del formulario que se desea validar.

/*  ------------------------------------------------------------------------------------------------------------------------------------    */

// Declaración del objeto expresiones: almacena las expresiones regulares
const expresiones = {

    //  Referencias:
    //                  //  =   límite de la expresión regular
    //                  ^   =   inicio de la cadena
    //                  []  =   rango de caracteres
    //                  {}  =   longitud mínima y máxima de la cadena
    //                  $   =   indica el final de la cadena    --->    $ = <span class="math-inline">\
    //               a-zA-Z =   letra del alfabeto inglés, mayúscula o minúscula
    //                  À-ÿ =   letra, con acento, del alfabeto español
    //                  \s  =   espacio en blanco
    //                  0-9 =   número del 0 al 9
    //               _.+-   =   guión bajo, punto, uno o más caracteres, guión
    //                  \d  =   0-9

    nombre: /^[a-zA-ZÀ-ÿ\s]{6,20}$/,                              // nombre: 6 a 20 letras y espacios, pueden llevar acentos
    apellido: /^[a-zA-ZÀ-ÿ\s]{6,20}$/,                            // apellido: 6 a 20 letras y espacios, pueden llevar acentos
    dni: /^[0-9]{6,9}$/,                                          // dni: 6 a 9 dígitos estrictamente numéricos
    domicilio: /^[a-zA-Z0-9_.+-\s]{10,30}$/,                      // domicilio: letras números y espacios  
    telefono: /^\d{7,14}$/,                                       // telefono: 7 a 14 dígitos estrictamente numéricos
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/    // correo: sin longitud, acentos ni espacios, letras, números y caracteres especiales

    //                       +  indica que los carateres anteriores pueden repetirse una o más veces
    //                       @  separa el nombre de usuario del dominio
    //                       \. el dominio puede contener cualquier combinación de letras, números, guiones y puntos    -->  dominio: "gmail.com"

    // Cada clave (nombre, apellido, dni, domicilio, telefono y correo) representa el nombre del campo (name="") en los <input> del HTML, y su valor, la expresión regular que se utilizará para validarlo.
};

/*  ------------------------------------------------------------------------------------------------------------------------------------    */

// Declaración del objeto campos: almacena los campos con un valor booleano para controlar si han sido validados (todavía no = false)
const campos = {

    nombre: false,
    apellido: false,
    dni: false,
    domicilio: false,
    correo: false,
    telefono: false
}

/*  ------------------------------------------------------------------------------------------------------------------------------------    */

// Declaración de la función "validarFormulario" que recibe el parámetro (e) que representa los eventos "keyup" o "blur"
//  (e) => {...}    = declara un bloque de código que se ejecutará cuando se produzca el evento (e) en un elemento HTML del tipo input
//  switch (e.target.name) {...}    =   estructura condicional para identificar el campo del formulario que ha generado el evento
// e.target     =   se utiliza para obtener información sobre el elemento que desencadenó el evento (keyup o blur)

//  según los nombres de los campos (case " x "), invocamos la funcion validarCampo(expresión regular, input que representa al campo, nombre del campo)

const validarFormulario = (e) => {

    switch (e.target.name) {

        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;

        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
            break;

        case "dni":
            validarCampo(expresiones.dni, e.target, 'dni');
            break;

        case "domicilio":
            validarCampo(expresiones.domicilio, e.target, 'domicilio');
            break;

        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;

        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
    }
}

/*  ------------------------------------------------------------------------------------------------------------------------------------    */

// Declaración de la función "validarCampo" que recibe los parámetros(expresion, input, campo)
// expresion.test(input.value) =   comprueba si el valor del campo coincide con la expresión regular
//                     .test() =   comprueba si una cadena coincide con una expresión regular
//                             =   expresión regular .test (cadena)

//  expresión regular -> expresion
//  cadena -> input.value

const validarCampo = (expresion, input, campo) => {

    if (expresion.test(input.value)) {  //   Ejecuta si el valor del campo SI coincide con la expresión regular

        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        // Elimina la clase "formulario__grupo-incorrecto" del elemento de grupo del campo.

        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        // Agrega la clase "formulario__grupo-correcto" al elemento de grupo del campo

        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        // Cambia el ícono del grupo del campo a un ícono de verificación

        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        // Elimina el ícono de error del grupo del campo

        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        // Oculta el texto de error del campo

        campos[campo] = true;

        //  #grupo__${ campo }      =   se utiliza para agregar o eliminar clases CSS en el elemento de grupo del campo
        //  #grupo__${ campo } i    =   se utiliza para seleccionar el ícono de verificación o error del elemento de grupo del campo
        //                     i    =   es un selector CSS que se utiliza para seleccionar el ícono del elemento de grupo


    } else {    // Ejecuta si el valor del campo NO coincide con la expresión regular

        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        //  Agrega la clase "formulario__grupo-incorrecto" al elemento de grupo del campo

        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        //  Elimina la clase "formulario__grupo-correcto" del elemento de grupo del campo

        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        //  Cambia el ícono del grupo del campo a un ícono de error

        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        //  Elimina el ícono de verificación del grupo del campo

        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        //  Muestra el texto de error del campo

        campos[campo] = false;

    }
}

/*  ------------------------------------------------------------------------------------------------------------------------------------    */

// Bucle para recorrer todos los elementos de entrada
inputs.forEach((input) => {

    input.addEventListener('keyup', validarFormulario);
    // Agregamos el evento "keyup" al elemento de entrada

    input.addEventListener('blur', validarFormulario);
    // Agregamos el evento "blur" al elemento de entrada
});

/*  ------------------------------------------------------------------------------------------------------------------------------------    */

// Agregamos el evento "submit" al formulario para realizar la comprobación, cuando el usuario hace clic en el botón de envío del formulario
formulario.addEventListener('submit', (e) => {

    e.preventDefault(); // Previene que el formulario se envíe

    // Obtenemos el elemento de entrada con el #terminos, que representa el checkbox de aceptación de la política de privacidad
    const terminos = document.getElementById('terminos');

    // Comprobamos si todos los campos están validados y si se ha aceptado la política de privacidad
    if (campos.nombre && campos.apellido && campos.dni && campos.correo && campos.telefono && terminos.checked) {

        formulario.reset();     // Vaciamos los campos del formulario

        // Agregamos la clase "formulario__mensaje-exito-activo" al elemento de mensaje de éxito
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');

        // Establecemos un temporizador para eliminar la clase "formulario__mensaje-exito-activo" después de 5 segundos
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        //  forEach() recorre los elementos de la clase "formulario__grupo-correcto" y elimina la clase "formulario__grupo-correcto" de cada uno
        //  .forEach((icono) => {   abre el bloque de código que se ejecutará para cada elemento del array o colección
        //  (icono)     -->     iterador
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {

            //  Elimina la clase "formulario__grupo-correcto" del elemento al que apunta el iterador
            icono.classList.remove('formulario__grupo-correcto');
        });

    } else {

        // Agregamos la clase "formulario__mensaje-activo" al elemento de mensaje de error
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');

        // Estrablecemos un temporizador para eliminar la clase "formulario__mensaje-activo" después de 3 segundos
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 5000);

    }
});

/*  ------------------------------------------------------------------------------------------------------------------------------------    */
/*  ------------------------------------------------------------------------------------------------------------------------------------    */

//  REFERENCIAS:

// 'formulario__grupo-incorrecto' , 'formulario__grupo-correcto' , 'fa-check-circle' , 'fa-times-circle' , '.formulario__input-error' , 'formulario__input-error-activo' , 'formulario__mensaje-exito' , 'formulario__mensaje-exito-activo' --> se definen en el archivo CSS


//  formulario__grupo-incorrecto        =   elemento de grupo del campo cuando el campo NO está validado
//  formulario__grupo-correcto          =   elemento de grupo del campo cuando el campo SI está validado

//  fa-check-circle                     =   ícono de VERIFICACIÓN del elemento de grupo del campo
//  fa-times-circle                     =   ícono de ERROR del elemento de grupo del campo

//  .formulario__input-error            =   texto de error del elemento de entrada del campo
//  formulario__input-error-activo      =   texto de error del elemento de entrada del campo cuando está activo

//  formulario__mensaje-exito           =   mensaje de éxito del formulario
//  formulario__mensaje-exito-activo    =   mensaje de éxito del formulario cuando está activo

//  formulario__mensaje                 =   mensaje de error del formulario
//  formulario__mensaje-activo          =   mensaje de error del formulario cuando está activo