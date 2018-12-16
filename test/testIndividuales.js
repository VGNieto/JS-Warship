var Barco = require("../js/Barco.js");
var barcos = new Array(new Barco(5),new Barco(4),new Barco(3),new Barco(3),new Barco(2));
var casillas = new Array(10);
var x = 10,y=10;
var barcosDanados = new Array();

var nombresBarco = new Array(
    "Portaviones",
    "Acorazado",
    "Crucero",
    "Submarino",
    "Destructor"
  );  

for (let i = 0; i < x; i++) {
    casillas[i] = new Array(y);
    for (let j = 0; j < casillas[i].length; j++) {
      casillas[i][j] = "agua";
    }
}




function comprobarInsercion(barco) {
    if (typeof barco == "undefined") {
      //console.log("barco erroneo");
      return false;
    }

    if (typeof barco.orientacion == "undefined") {
      return false;
    }

    var bandera = true; //bandera que nos avisa si una casilla que va a ocupar el barco no es ocupable
    if (barco.orientacion == "horizontal") {
      //copio la Y del barco para no modificar el objeto al ir descendiendo por el tablero
      var inicio_vertical = barco.y;
      for (let i = 0; i < barco.longitud; i++, inicio_vertical++) {
        //compruebo que no me salga por abajo
        if (barco.x <= x && barco.y + barco.longitud <= y) {
          if (casillas[barco.x][inicio_vertical] == "agua") {
            bandera = true;
          } else {
            //console.log("la casilla ya esta ocupada");
            return false;
          }
        } else {
          //console.log("me salgo del tablero");
          return false;
        }
      }
      if (bandera == false) {
        return false;
      } else {
        //console.log("se puede insertar");
        return true;
      }
    } else {
      //copio la X del barco para no modificar el objeto al ir descendiendo por el tablero
      var inicio_horizontal = barco.x;
      for (let i = 0; i < barco.longitud; i++, inicio_horizontal++) {
        //compruebo que no me salga por abajo
        if (barco.x + barco.longitud <= x && barco.y <= y) {
          if (casillas[inicio_horizontal][barco.y] == "agua") {
            bandera = true;
          } else {
            //console.log("la casilla esta ocupada");
            return false;
          }
        } else {
          //console.log("me salgo del tablero");
          return false;
        }
      }
      if (bandera == false) {
        //console.log("no se puede insertar");
        return false;
      } else {
        //console.log("la bandera acaba en true");
        return true;
      }
    }
}

function comprobarBarcoHundido(string) {
    

    var contador = 0;
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        if (string.indexOf(casillas[i][j].toString()) > -1) {
          contador++;
        }
      }
    }

    if (contador == 1) {
      return true;
    } else{
      return false;
    }
}

function colocarBarco(barco) {
  if (comprobarInsercion(barco) == true) {
    if (barco.orientacion == "vertical") {
      for (
        var i = barco.x, contador = 0;
        contador < barco.longitud;
        i++, contador++
      ) {
        casillas[i][barco.y] = barco.nom;
      }
    } else {
      //colorcar barco horizontal
      for (
        var j = barco.y, contador = 0;
        contador < barco.longitud;
        j++, contador++
      ) {
        casillas[barco.x][j] = barco.nom;
      }
    }
   
    return true;
  } else {
    return false;
  }
}

function ataqueAleatorio(casillas,ataque){
    
  var ataque_X= parseInt(Math.random() * 10);
  var ataque_Y= parseInt(Math.random() * 10);
    
  while(casillas[ataque_X][ataque_Y] == "aguaTocada"||casillas[ataque_X][ataque_Y] == "barcoDañado"){
    ataque_X= parseInt(Math.random() * 10);
    ataque_Y= parseInt(Math.random() * 10);
  }
    
  if(casillas[ataque_X][ataque_Y]=="agua"){//si me encuentro agua
      casillas[ataque_X][ataque_Y] = "aguaTocada";
      ataque.ultimoAtaque[0]=ataque_X;
      ataque.ultimoAtaque[1]=ataque_Y;

    
    }else{//si me encuentro un barco
      ataque.primerAtaqueExitoso[0]=ataque_X;
      ataque.primerAtaqueExitoso[1]=ataque_Y;
      ataque.aciertos=1;
      
      ataque.tipoBarco=casillas[ataque_X][ataque_Y];
      casillas[ataque_X][ataque_Y] = "barcoDañado";
      let posicion=ataque.primerAtaqueExitoso[0]+"-"+ataque.primerAtaqueExitoso[1];
      ataque.ultimoAtaque[0]=ataque_X;
      ataque.ultimoAtaque[1]=ataque_Y;
    }
  return ataque;
}



module.exports.comprobarInsercion = comprobarInsercion;
module.exports.comprobarBarcoHundido = comprobarBarcoHundido;
module.exports.colocarBarco = colocarBarco;
module.exports.ataqueAleatorio = ataqueAleatorio;



