var Barco = require("../js/Barco.js");
var barcos = new Array(
  new Barco(5),
  new Barco(4),
  new Barco(3),
  new Barco(3),
  new Barco(2)
);
var casillas = new Array(10);
var x = 10,
  y = 10;
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

function colocarBarcosAleatorio() {
  for (let i = 0; i < barcos.length; i++) {
    do {
      barcos[i].posicionInicialX = parseInt(Math.random() * 10);
      barcos[i].posicionInicialY = parseInt(Math.random() * 10);
      barcos[i].nombre = nombresBarco[i];
      var ori = parseInt(Math.random() * 2);
      if (ori === 1) {
        barcos[i].establecer_orientacion = "horizontal";
      } else {
        barcos[i].establecer_orientacion = "vertical";
      }
    } while (colocarBarco(barcos[i]) != true);
    i = -1;
  }
  if (barcos.length == 0) {
    return true;
  } else {
    return false;
  }
}

function resetTablero() {
  for (let i = 0; i < x; i++) {
    casillas[i] = new Array(y);
    for (let j = 0; j < casillas[i].length; j++) {
      casillas[i][j] = "agua";
    }
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

  return contador;
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
    barcos.shift();
    nombresBarco.shift();
    return true;
  } else {
    return false;
  }
}

function ataqueAleatorio(casillas, ataque) {
  var ataque_X = parseInt(Math.random() * 10);
  var ataque_Y = parseInt(Math.random() * 10);

  while (
    casillas[ataque_X][ataque_Y] == "aguaTocada" ||
    casillas[ataque_X][ataque_Y] == "barcoDañado"
  ) {
    ataque_X = parseInt(Math.random() * 10);
    ataque_Y = parseInt(Math.random() * 10);
  }

  if (casillas[ataque_X][ataque_Y] == "agua") {
    //si me encuentro agua
    casillas[ataque_X][ataque_Y] = "aguaTocada";
    ataque.ultimoAtaque[0] = ataque_X;
    ataque.ultimoAtaque[1] = ataque_Y;
  } else {
    //si me encuentro un barco
    ataque.primerAtaqueExitoso[0] = ataque_X;
    ataque.primerAtaqueExitoso[1] = ataque_Y;
    ataque.aciertos = 1;

    ataque.tipoBarco = casillas[ataque_X][ataque_Y];
    casillas[ataque_X][ataque_Y] = "barcoDañado";
    let posicion =
      ataque.primerAtaqueExitoso[0] + "-" + ataque.primerAtaqueExitoso[1];
    ataque.ultimoAtaque[0] = ataque_X;
    ataque.ultimoAtaque[1] = ataque_Y;
  }
  return ataque;
}

function ataque1(tablero, ataque) {
  switch (ataque.direccion) {
    case "unknown":
      if (
        ataque.ultimoAtaque[0] > 0 &&
        tablero[ataque.ultimoAtaque[0] - 1][ataque.ultimoAtaque[1]] !=
          "aguaTocada" &&
        tablero[ataque.ultimoAtaque[0] - 1][ataque.ultimoAtaque[1]] !=
          "barcoDañado"
      ) {
        if (
          tablero[ataque.ultimoAtaque[0] - 1][ataque.ultimoAtaque[1]] == "agua"
        ) {
          //si me encuentro agua
          tablero[ataque.ultimoAtaque[0] - 1][ataque.ultimoAtaque[1]] =
            "aguaTocada";
          ataque.direccion = "DRCHA";
        } else {
          tablero[ataque.ultimoAtaque[0] - 1][ataque.ultimoAtaque[1]] =
            "barcoDañado";
          ataque.ultimoAtaque[0] = ataque.ultimoAtaque[0] - 1;
          ataque.ultimoAtaque[1] = ataque.ultimoAtaque[1];
          ataque.direccion = "VA";
          ataque.orientacion = "vertical";
          ataque.aciertos++;
        }
        break;
      } else {
        ataque.direccion = "DRCHA";
      }

    case "DRCHA":
      if (
        ataque.ultimoAtaque[1] < 9 &&
        tablero[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1] + 1] !=
          "aguaTocada" &&
        tablero[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1] + 1] !=
          "barcoDañado"
      ) {
        if (
          tablero[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1] + 1] == "agua"
        ) {
          //si me encuentro agua
          tablero[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1] + 1] =
            "aguaTocada";
          ataque.direccion = "VD";
        } else {
          tablero[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1] + 1] =
            "barcoDañado";
          ataque.ultimoAtaque[0] = ataque.ultimoAtaque[0];
          ataque.ultimoAtaque[1] = ataque.ultimoAtaque[1] + 1;
          ataque.direccion = "DRCHA";
          ataque.orientacion = "horizontal";
          ataque.aciertos++;
        }
        break;
      } else {
        ataque.direccion = "VD";
      }

    case "VD":
      if (
        ataque.ultimoAtaque[0] < 9 &&
        tablero[ataque.ultimoAtaque[0] + 1][ataque.ultimoAtaque[1]] !=
          "aguaTocada" &&
        tablero[ataque.ultimoAtaque[0] + 1][ataque.ultimoAtaque[1]] !=
          "barcoDañado"
      ) {
        if (
          tablero[ataque.ultimoAtaque[0] + 1][ataque.ultimoAtaque[1]] == "agua"
        ) {
          //si me encuentro agua
          tablero[ataque.ultimoAtaque[0] + 1][ataque.ultimoAtaque[1]] =
            "aguaTocada";
          ataque.direccion = "IZDA";
        } else {
          tablero[ataque.ultimoAtaque[0] + 1][ataque.ultimoAtaque[1]] =
            "barcoDañado";
          ataque.ultimoAtaque[0] = ataque.ultimoAtaque[0] + 1;
          ataque.ultimoAtaque[1] = ataque.ultimoAtaque[1];
          ataque.direccion = "VD";
          ataque.orientacion = "vertical";
          ataque.aciertos++;
        }
        break;
      } else {
        ataque.direccion = "IZDA";
      }

    case "IZDA":
      if (
        ataque.ultimoAtaque[1] > 0 &&
        tablero[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1] - 1] !=
          "aguaTocada" &&
        tablero[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1] - 1] !=
          "barcoDañado"
      ) {
        if (
          tablero[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1] - 1] == "agua"
        ) {
          //si me encuentro agua
          tablero[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1] - 1] =
            "aguaTocada";
          ataque.direccion = "unknown";
        } else {
          tablero[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1] - 1] =
            "barcoDañado";
          ataque.ultimoAtaque[0] = ataque.ultimoAtaque[0];
          ataque.ultimoAtaque[1] = ataque.ultimoAtaque[1] - 1;
          ataque.direccion = "IZDA";
          ataque.orientacion = "horizontal";
          ataque.aciertos++;
        }
        break;
      } else {
        ataque.direccion = "unknown";
      }

    default:
      ataque = ataque.inicializar_ataque(ataque);
      ataque = tablero.ataqueAleatorio(tablero, ataque);
      break;
  }
  if (ataque.tipoBarco == "Destructor" && ataque.aciertos == 2) {
    ataque.hundido++;
  }

  return ataque;
}

function ataque2(tablero, ataque) {
  switch (ataque.tipoBarco) {
    case "Portaviones":
      switch (ataque.orientacion) {
        case "horizontal":
          let contador1 = 0;
          while (tablero[ataque.ultimoAtaque[0]][contador1] != "Portaviones") {
            contador1++;
          }
          tablero[ataque.ultimoAtaque[0]][contador1] = "barcoDañado";
          ataque.aciertos++;
          if (ataque.aciertos == 5) {
            ataque.hundido++;
          }
          break;
        case "vertical":
          let contador2 = 0;
          while (tablero[contador2][ataque.ultimoAtaque[1]] != "Portaviones") {
            contador2++;
          }
          tablero[contador2][ataque.ultimoAtaque[1]] = "barcoDañado";
          ataque.aciertos++;
          if (ataque.aciertos == 5) {
            ataque.hundido++;
          }
          break;
        default:
          ataque = ataque.inicializar_ataque(ataque);
          ataque = tablero.ataqueAleatorio(tablero, ataque);
          break;
      }
      break;
    case "Acorazado":
      switch (ataque.orientacion) {
        case "horizontal":
          let contador3 = 0;
          while (tablero[ataque.ultimoAtaque[0]][contador3] != "Acorazado") {
            contador3++;
          }
          tablero[ataque.ultimoAtaque[0]][contador3] = "barcoDañado";
          ataque.aciertos++;
          if (ataque.aciertos == 4) {
            ataque.hundido++;
          }
          break;
        case "vertical":
          let contador4 = 0;
          while (tablero[contador4][ataque.ultimoAtaque[1]] != "Acorazado") {
            contador4++;
          }
          tablero[contador4][ataque.ultimoAtaque[1]] = "barcoDañado";
          ataque.aciertos++;
          if (ataque.aciertos == 4) {
            ataque.hundido++;
          }
          break;
        default:
          ataque = ataque.inicializar_ataque(ataque);
          ataque = tablero.ataqueAleatorio(tablero, ataque);
          break;
      }
      break;
    case "Crucero":
      switch (ataque.orientacion) {
        case "horizontal":
          let contador5 = 0;
          while (tablero[ataque.ultimoAtaque[0]][contador5] != "Crucero") {
            contador5++;
          }
          tablero[ataque.ultimoAtaque[0]][contador5] = "barcoDañado";
          ataque.aciertos++;
          if (ataque.aciertos == 3) {
            ataque.hundido++;
          }
          break;
        case "vertical":
          let contador6 = 0;
          while (tablero[contador6][ataque.ultimoAtaque[1]] != "Crucero") {
            contador6++;
          }
          tablero[contador6][ataque.ultimoAtaque[1]] = "barcoDañado";
          ataque.aciertos++;
          if (ataque.aciertos == 3) {
            ataque.hundido++;
          }
          break;
        default:
          ataque = ataque.inicializar_ataque(ataque);
          ataque = tablero.ataqueAleatorio(tablero, ataque);
          break;
      }
      break;
    case "Submarino":
      switch (ataque.orientacion) {
        case "horizontal":
          let contador7 = 0;
          while (tablero[ataque.ultimoAtaque[0]][contador7] != "Submarino") {
            contador7++;
          }
          tablero[ataque.ultimoAtaque[0]][contador7] = "barcoDañado";
          ataque.aciertos++;

          if (ataque.aciertos == 3) {
            ataque.hundido++;
          }
          break;
        case "vertical":
          let contador8 = 0;
          while (tablero[contador8][ataque.ultimoAtaque[1]] != "Submarino") {
            contador8++;
          }
          tablero[contador8][ataque.ultimoAtaque[1]] = "barcoDañado";
          ataque.aciertos++;
          if (ataque.aciertos == 3) {
            ataque.hundido++;
          }
          break;
        default:
          ataque = ataque.inicializar_ataque(ataque);
          ataque = tablero.ataqueAleatorio(tablero, ataque);
          break;
      }
      break;
    default:
      ataque = ataque.inicializar_ataque(ataque);
      ataque = tablero.ataqueAleatorio(tablero, ataque);
      break;
  }
  if (ataque.hundido >= 5) {
    if (window.confirm("¡HAS PERDIDO! ¿Quieres empezar una nueva partida?")) {
      ataque.hundido = 0;
      location.reload();
    }
  }
  return ataque;
}

module.exports.comprobarInsercion = comprobarInsercion;
module.exports.comprobarBarcoHundido = comprobarBarcoHundido;
module.exports.colocarBarco = colocarBarco;
module.exports.colocarBarcosAleatorio = colocarBarcosAleatorio;
module.exports.casillas = casillas;
module.exports.resetTablero = resetTablero;
module.exports.ataqueAleatorio = ataqueAleatorio;
module.exports.ataque1 = ataque1;
module.exports.ataque2 = ataque2;
