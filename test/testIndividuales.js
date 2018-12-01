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

module.exports.comprobarInsercion = comprobarInsercion;
module.exports.comprobarBarcoHundido = comprobarBarcoHundido;


