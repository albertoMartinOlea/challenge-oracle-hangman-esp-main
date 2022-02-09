
var botonInicio = document.querySelector("#iniciar-juego");
var palabras = ["termino"];
var elegida;


botonInicio.addEventListener("click", function (event) {
    event.preventDefault();
    elegida = escogerPalabras();
    dibujarGuiones(elegida.length);
    capturaTeclado(event);


});


// FUncion para escoger palabras aleatoreamente


function escogerPalabras() {
    var azar = Math.floor(Math.random() * palabras.length);
    console.log(palabras[azar]);
    return palabras[azar];
}


function capturaTeclado(event){
    document.addEventListener('keydown', capturaTeclado);
    if (validarLetrasIngresadas(event.keyCode)){
        mostrarTexto(elegida,event.key);
    }//PODRIA MOSTAR MENSAje de que no presiono una letra
}

function validarLetrasIngresadas(codigo) {
    return (codigo >= '65' && codigo <= '90');  
}

