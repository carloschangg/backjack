(function(){ 
    
    const $pedirCarta    = document.querySelector(".ask-card"),
      $puntosJugador     = document.querySelector(".player span"),
      $puntosComputadora = document.querySelector(".computer span"),
      $cartaJugador      = document.getElementById("jugador-cartas"),
      $cartaComputadora  = document.getElementById("computer-cartas"),
      $detener           = document.querySelector(".stop"),
      $comenzar          = document.querySelector(".new-game");


      
      
let deck              = [],
    puntosJugador     = 0,
    puntosComputadora = 0;
   
const tipos      = ['C', 'D', 'S', 'H'],
      especiales = ['J','Q','K','A'];
    


const crearDeck = () => {
 
    for(let carta of tipos){

       for(let i = 2; i <= 10; i++){
           deck.push(`${i}${carta}`)
       };

       for(let especial of especiales){
        deck.push(`${especial}${carta}`)
       };
        
    };
    deck = _.shuffle(deck)
    return deck
};

crearDeck()



const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
  }


const valorCarta = (carta) => {

    let valor = carta.substring(0, carta.length - 1);
    let puntos = 0;


     if(isNaN(valor)){
       
        if(valor === 'A') {
            puntos = 11;
        } else{
            puntos = 10;
        }
    } else {
        puntos = valor * 1;
    }
    // console.log(valor);
    // console.log(puntos);
    return puntos
};


const turnoComputadora = (puntosMinimos) => {

   do {
    const  carta = pedirCarta(); 
    puntosComputadora = puntosComputadora + valorCarta(carta);
    $puntosComputadora.textContent =  puntosComputadora;
 
    let imgComputadora = document.createElement("img");     
     imgComputadora.src = `/cartas/${carta}.png`;
     imgComputadora.classList.add("card");

     $cartaComputadora.append(imgComputadora);

     
   } while ((puntosComputadora <= puntosMinimos) && (puntosMinimos <= 21));
  
   setTimeout(() => {
    if(puntosComputadora > 21){       
        alert("Jugador gana")       
    } else if (puntosComputadora > puntosMinimos){
        alert("Gana la computadora")       
    } else if(puntosComputadora === puntosMinimos){
        alert("empeta")        
    } else if(puntosMinimos > 21){
        alert("gana la computadora")
    } else if(puntosComputadora < puntosMinimos){
        alert("Gana el jugador") 
    }
    
}, 1000);
};


$pedirCarta.addEventListener("click", (e) => {

   const  carta = pedirCarta(); 
   puntosJugador = puntosJugador + valorCarta(carta);
   $puntosJugador.textContent = puntosJugador;


    let imgJugar = document.createElement("img");     
    imgJugar.src = `/cartas/${carta}.png`;
    imgJugar.classList.add("card");

    $cartaJugador.append(imgJugar);

    if(puntosJugador > 21) {
        $pedirCarta.disabled = true;
        turnoComputadora(puntosJugador)
    } 

});


$detener.addEventListener("click", (e) => {

     turnoComputadora(puntosJugador)
     $detener.disabled = true;
     $pedirCarta.disabled = true;
});

$comenzar.addEventListener("click",() => {
    deck= [];
    deck =  crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;
    $puntosJugador.textContent = 0;
    $puntosComputadora.textContent = 0;
    $cartaJugador.innerHTML = "";
    $cartaComputadora.innerHTML = "";
    

    $detener.disabled = false;
    $pedirCarta.disabled = false;
})
})();
