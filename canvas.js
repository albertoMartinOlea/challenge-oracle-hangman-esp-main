var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");

pincel.fillStyle = "lightgreen";
pincel.fillRect(0, 0, 1200, 800);

function dibujarGuiones(largo) {

    var x = 400;
    for (let i = 0; i < largo; i++) {


        pincel.beginPath();
        pincel.moveTo(x, 600);
        pincel.lineTo(x + 30, 600);
        pincel.lineWidth = 10;
        pincel.strokeStyle = "black";
        pincel.stroke();

        x += 50;
    }
    pincel.closePath();
}

var bandera = false;
var nuevaPalabra;
var errores = [];
var contError = 0;

function mostrarTexto(palabra, letra) {

    //creo un array y lo lleno con " "
    if (!bandera) {
        nuevaPalabra = new Array(palabra.length);
        for (let j = 0; j < nuevaPalabra.length; j++) {
            nuevaPalabra[j] = " ";
        }
        bandera = true;
    }

    var flagLetra = false;

    //verificar letra existe en la palabra
    if ((!nuevaPalabra.includes(letra)) && (!errores.includes(letra)) && (contError <= 6) && (!verificarTriunfo(nuevaPalabra, palabra))) {

        flagLetra = verificarLetra(letra, palabra);

        if (!flagLetra) {
            errores.push(letra); // letras erradas
            contError++;
            dibujarHorca(contError);
            dibujarLetraIncorrecta(errores);
        }

        if (verificarTriunfo(nuevaPalabra, palabra)) {
            dibujarLetraCorrecta(nuevaPalabra);
            cartelGanador();
            botonReiniciar();

        } else {
            dibujarLetraCorrecta(nuevaPalabra);
        }
    }
}

function verificarTriunfo(a1, a2) {

    for (let i = 0; i < a1.length; i++) {
        if (a1[i] != a2[i]) {
            return false;
        }
    }
    return true;
}

function verificarLetra(letra, palabra) {
    var estaLetra = false;
    for (let k = 0; k < palabra.length; k++) {
        if (letra == palabra[k]) {
            nuevaPalabra[k] = (letra);
            estaLetra = true;
        }
    }
    return estaLetra;
}

function dibujarLetraCorrecta(nuevaPalabra) {
    var x = 405;
    for (let i = 0; i < nuevaPalabra.length; i++) {
        pincel.lineWidth = 2;
        pincel.fillStyle = "black";
        pincel.font = 'bold 48px serif';
        pincel.strokeText(nuevaPalabra[i], x, 580, 20);
        x += 50;
    }
}
function dibujarLetraIncorrecta(errores) {
    var x = 900;
    for (let i = 0; i < errores.length; i++) {
        pincel.lineWidth = 2;
        pincel.fillStyle = "black";
        pincel.font = 'bold 48px serif';
        pincel.strokeText(errores[i], x, 400, 20);
        x += 50;
    }
}
function dibujarHorca(error) {

    switch (error) {
        case 1:
            //error 1 base
            pincel.beginPath();
            pincel.moveTo(500, 400);
            pincel.lineTo(400, 500);
            pincel.lineTo(600, 500);
            pincel.lineTo(500, 400);
            pincel.lineTo(500, 50);
            pincel.lineWidth = 10;
            pincel.strokeStyle = "black";
            pincel.stroke();

            break;
        case 2:

            //error 2
            pincel.lineTo(800, 50);
            pincel.lineTo(800, 100);
            pincel.lineWidth = 10;
            pincel.strokeStyle = "black";
            pincel.stroke();

            break;
        case 3:

            //error 3 cabeza
            pincel.beginPath();
            pincel.arc(800, 150, 50, 0, 2 * Math.PI);
            pincel.lineWidth = 10;
            pincel.strokeStyle = "black";
            pincel.stroke();
            break;
        case 4:

            //error 4 cuerpo
            pincel.beginPath();
            pincel.moveTo(800, 200);
            pincel.lineTo(800, 400);
            pincel.lineWidth = 10;
            pincel.strokeStyle = "black";
            pincel.stroke();

            break;
        case 5:
            //error 5 patitas
            pincel.beginPath();
            pincel.moveTo(800, 400);
            pincel.lineTo(700, 475);
            pincel.moveTo(800, 400);
            pincel.lineTo(900, 475);
            pincel.moveTo(800, 400);
            pincel.lineWidth = 10;
            pincel.strokeStyle = "black";
            pincel.stroke();
            break;
        case 6:
            //error 6 brasitos
            pincel.beginPath();
            pincel.moveTo(800, 250)
            pincel.lineTo(700, 275);
            pincel.moveTo(800, 250);
            pincel.lineTo(900, 275);
            pincel.lineWidth = 10;
            pincel.strokeStyle = "black";
            pincel.stroke();
            //cartel perdedor
            cartelPerdedor();
            contError = 7;
            botonReiniciar();

            break;

        default:
            break;
    }

}

function cartelGanador() {
    pincel.lineWidth = 2;
    pincel.fillStyle = "black";
    pincel.font = 'bold 48px serif';
    pincel.strokeText("  Ganaste!!!", 900, 300);

}

function cartelPerdedor() {
    pincel.lineWidth = 2;
    pincel.fillStyle = "black";
    pincel.font = 'bold 48px serif';
    pincel.strokeText("  Perdiste!!!", 900, 300);
}

function botonReiniciar() {
    var reinicio = document.querySelector("#reiniciar");
    var boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'btn';
    boton.id = 'btn-reinicio';
    boton.innerText = 'REINICIAR JUEGO';
    reinicio.appendChild(boton);
    reinicio.addEventListener("click", function (event) {

        location.reload();
    })
}

// falta validar palabras
var input = document.querySelector("input");
var botonAgregarPalabra = document.querySelector('#agregar-palabra');
botonAgregarPalabra.addEventListener("click", function (event) {
    event.preventDefault();
    palabras.push(input.value);

    guardarLocalStorage(palabras);
    input.value = "";
    console.log(palabras);
})


function guardarLocalStorage(array) {

    localStorage.setItem("array", JSON.stringify(array));

}

function recuperarLocalStorage() {
    palabras = JSON.parse(localStorage.getItem("array"));
    alert(palabras);

}



