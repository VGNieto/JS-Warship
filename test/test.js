var expect = require("chai").expect;
var funciones = require("./testIndividuales.js");
var Barco = require("../js/Barco.js");
var Ataque = require("../js/Ataque.js");

describe("Pruebas límites del tablero.", function() {
  it("Posición 9,9 vertical -> false", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 9;
    barco1.posicionInicialY = 9;
    barco1.establecer_orientacion = "vertical";
    barco1.nom = "Submarino";
    expect(funciones.comprobarInsercion(barco1)).to.equal(false);
    funciones.resetTablero();
  });

  it("Posición 9,9 horizontal -> false", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 9;
    barco1.posicionInicialY = 9;
    barco1.establecer_orientacion = "horizontal";
    barco1.nom = "Submarino";
    expect(funciones.comprobarInsercion(barco1)).to.equal(false);
    funciones.resetTablero();
  });

  it("Posición 1,1 vertical -> true", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 0;
    barco1.posicionInicialY = 0;
    barco1.establecer_orientacion = "vertical";
    barco1.nom = "Submarino";
    expect(funciones.comprobarInsercion(barco1)).to.equal(true);
    funciones.resetTablero();
  });

  it("Posición 1,1 horizontal -> true", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 0;
    barco1.posicionInicialY = 0;
    barco1.establecer_orientacion = "horizontal";
    barco1.nom = "Submarino";
    expect(funciones.comprobarInsercion(barco1)).to.equal(true);
    funciones.resetTablero();
  });

  it("Posición 1,9 vertical -> true", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 0;
    barco1.posicionInicialY = 9;
    barco1.establecer_orientacion = "vertical";
    barco1.nom = "Submarino";
    expect(funciones.comprobarInsercion(barco1)).to.equal(true);
    funciones.resetTablero();
  });

  it("Posición 1,9 horizontal -> false", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 0;
    barco1.posicionInicialY = 9;
    barco1.establecer_orientacion = "horizontal";
    barco1.nom = "Submarino";
    expect(funciones.comprobarInsercion(barco1)).to.equal(false);
    funciones.resetTablero();
  });

  it("Posición 9,1 vertical -> false", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 9;
    barco1.posicionInicialY = 0;
    barco1.establecer_orientacion = "vertical";
    barco1.nom = "Submarino";
    expect(funciones.comprobarInsercion(barco1)).to.equal(false);
    funciones.resetTablero();
  });

  it("Posición 9,1 horizontal -> true", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 9;
    barco1.posicionInicialY = 0;
    barco1.establecer_orientacion = "horizontal";
    barco1.nom = "Submarino";
    expect(funciones.comprobarInsercion(barco1)).to.equal(true);
    funciones.resetTablero();
  });

  it("Posición 4,4 vertical -> true", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 4;
    barco1.posicionInicialY = 4;
    barco1.establecer_orientacion = "vertical";
    barco1.nom = "Submarino";
    expect(funciones.comprobarInsercion(barco1)).to.equal(true);
    funciones.resetTablero();
  });

  it("Posición 4,4 horizontal -> true", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 4;
    barco1.posicionInicialY = 4;
    barco1.establecer_orientacion = "horizontal";
    barco1.nom = "Submarino";
    expect(funciones.comprobarInsercion(barco1)).to.equal(true);
    funciones.resetTablero();
  });
});

describe("Pruebas superposición de barcos.", function() {
  it("Posición 1,1 superposición vertical -> false", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 1;
    barco1.posicionInicialY = 1;
    barco1.establecer_orientacion = "vertical";
    barco1.nom = "Submarino";
    funciones.colocarBarco(barco1);

    let barco2 = new Barco(3);
    barco2.posicionInicialX = 1;
    barco2.posicionInicialY = 1;
    barco2.establecer_orientacion = "vertical";
    barco2.nom = "Portaviones";

    expect(funciones.comprobarInsercion(barco2)).to.equal(false);
  });

  it("Posición 5,5 superposición vertical -> false", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 5;
    barco1.posicionInicialY = 5;
    barco1.establecer_orientacion = "horizontal";
    barco1.nom = "Submarino";
    funciones.colocarBarco(barco1);

    let barco2 = new Barco(3);
    barco2.posicionInicialX = 4;
    barco2.posicionInicialY = 5;
    barco2.establecer_orientacion = "vertical";
    barco2.nom = "Portaviones";

    expect(funciones.comprobarInsercion(barco2)).to.equal(false);
    funciones.resetTablero();
  });

  it("Posición 2,4 superposición horizontal -> false", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 2;
    barco1.posicionInicialY = 4;
    barco1.establecer_orientacion = "horizontal";
    barco1.nom = "Submarino";
    funciones.colocarBarco(barco1);

    let barco2 = new Barco(3);
    barco2.posicionInicialX = 2;
    barco2.posicionInicialY = 6;
    barco2.establecer_orientacion = "horizontal";
    barco2.nom = "Portaviones";

    expect(funciones.comprobarInsercion(barco2)).to.equal(false);
  });

  it("Posición 3,2 superposición vertical -> false", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 3;
    barco1.posicionInicialY = 2;
    barco1.establecer_orientacion = "vertical";
    barco1.nom = "Submarino";
    funciones.colocarBarco(barco1);

    let barco2 = new Barco(3);
    barco2.posicionInicialX = 2;
    barco2.posicionInicialY = 2;
    barco2.establecer_orientacion = "horizontal";
    barco2.nom = "Portaviones";

    expect(funciones.comprobarInsercion(barco2)).to.equal(false);
    funciones.resetTablero();
  });

  it("Posición 5,5 y 6,5 horizontal sin superposición -> true", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 5;
    barco1.posicionInicialY = 5;
    barco1.establecer_orientacion = "horizontal";
    barco1.nom = "Submarino";
    funciones.colocarBarco(barco1);

    let barco2 = new Barco(3);
    barco2.posicionInicialX = 6;
    barco2.posicionInicialY = 5;
    barco2.establecer_orientacion = "horizontal";
    barco2.nom = "Portaviones";

    expect(funciones.comprobarInsercion(barco2)).to.equal(true);
  });

  it("Posición 2,1 y 2,6 vertical sin superposición -> true", function() {
    let barco1 = new Barco(3);
    barco1.posicionInicialX = 2;
    barco1.posicionInicialY = 0;
    barco1.establecer_orientacion = "vertical";
    barco1.nom = "Submarino";
    funciones.colocarBarco(barco1);

    let barco2 = new Barco(3);
    barco2.posicionInicialX = 2;
    barco2.posicionInicialY = 3;
    barco2.establecer_orientacion = "vertical";
    barco2.nom = "Portaviones";

    expect(funciones.comprobarInsercion(barco2)).to.equal(true);
    funciones.resetTablero();
  });
});

describe("Colocar barcos aleatoriamente.", function() {
  it("Siempre tiene que ser true", function() {
    expect(funciones.colocarBarcosAleatorio()).to.equal(true);
    funciones.resetTablero();
  });
});

describe("Comprobar si destruyes un barco.", function() {
  it("El Submarino todavia tiene 2 posiciones sin dañar. -> 2", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 0;
    barco1.posicionInicialY = 0;
    barco1.establecer_orientacion = "vertical";
    barco1.nom = "Submarino";
    funciones.colocarBarco(barco1);
    funciones.casillas[0][0] = "barcoDañado";
    funciones.casillas[1][0] = "barcoDañado";
    funciones.casillas[2][0] = "barcoDañado";

    expect(funciones.comprobarBarcoHundido("Submarino")).to.equal(2);
    funciones.resetTablero();
  });

  it("El Submarino tiene todo dañado. -> 0", function() {
    let barco1 = new Barco(5);
    barco1.posicionInicialX = 0;
    barco1.posicionInicialY = 0;
    barco1.establecer_orientacion = "horizontal";
    barco1.nom = "Submarino";
    funciones.colocarBarco(barco1);
    funciones.casillas[0][0] = "barcoDañado";
    funciones.casillas[0][1] = "barcoDañado";
    funciones.casillas[0][2] = "barcoDañado";
    funciones.casillas[0][3] = "barcoDañado";
    funciones.casillas[0][4] = "barcoDañado";
    expect(funciones.comprobarBarcoHundido("Submarino")).to.equal(0);
    funciones.resetTablero();
  });

  it("El Destructor todavia tiene 1 posición sin dañar. -> 1", function() {
    let barco1 = new Barco(2);
    barco1.posicionInicialX = 5;
    barco1.posicionInicialY = 5;
    barco1.establecer_orientacion = "horizontal";
    barco1.nom = "Destructor";
    funciones.colocarBarco(barco1);
    funciones.casillas[5][5] = "barcoDañado";

    expect(funciones.comprobarBarcoHundido("Destructor")).to.equal(1);
    funciones.resetTablero();
  });

  it("El Destructor todavia tiene todo dañado. -> 0", function() {
    let barco1 = new Barco(2);
    barco1.posicionInicialX = 5;
    barco1.posicionInicialY = 5;
    barco1.establecer_orientacion = "horizontal";
    barco1.nom = "Destructor";
    funciones.colocarBarco(barco1);
    funciones.casillas[5][5] = "barcoDañado";
    funciones.casillas[5][6] = "barcoDañado";

    expect(funciones.comprobarBarcoHundido("Destructor")).to.equal(0);
  });
});

describe("Prueba ataque aleatorio", function() {
  let ataque = new Ataque(5);
  var tablero = new Array(10);

  it("Prueba dando agua", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    ataque.inicializar_ataque(ataque);
    ataque = funciones.ataqueAleatorio(tablero, ataque);
    expect(ataque.aciertos).to.equal(-1);
  });

  it("Prueba dando barco", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "Submarino";
      }
    }
    ataque = funciones.ataqueAleatorio(tablero, ataque);
    expect(ataque.aciertos).to.equal(1);
    expect(ataque.tipoBarco).to.equal("Submarino");
  });
});

describe("Prueba tras acertar un disparo aleatorio", function() {
  let ataque = new Ataque(5);
  var tablero = new Array(10);

  it("Prueba dando agua", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "barcoDañado";
    tablero[2][3] = "Submarino";
    tablero[2][4] = "Submarino";
    ataque.primerAtaqueExitoso[0] = 2;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 1;
    ataque.tipoBarco = "Submarino";
    ataque.ultimoAtaque[0] = 2;
    ataque.ultimoAtaque[1] = 2;

    ataque = funciones.ataque1(tablero, ataque);
    expect(ataque.direccion).to.equal("DRCHA");
    expect(ataque.aciertos).to.equal(1);
  });

  it("Prueba acertando", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "barcoDañado";
    tablero[1][2] = "Submarino";
    tablero[0][2] = "Submarino";
    ataque.primerAtaqueExitoso[0] = 2;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 1;
    ataque.direccion = "unknown";
    ataque.tipoBarco = "Submarino";
    ataque.ultimoAtaque[0] = 2;
    ataque.ultimoAtaque[1] = 2;

    ataque = funciones.ataque1(tablero, ataque);
    expect(ataque.direccion).to.equal("VA");
    expect(ataque.aciertos).to.equal(2);
    expect(ataque.orientacion).to.equal("vertical");
  });

  it("Prueba acertando tras dar agua", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "barcoDañado";
    tablero[2][3] = "Submarino";
    tablero[2][4] = "Submarino";
    ataque.primerAtaqueExitoso[0] = 2;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 1;
    ataque.tipoBarco = "Submarino";
    ataque.ultimoAtaque[0] = 2;
    ataque.ultimoAtaque[1] = 2;
    ataque.direccion = "DRCHA";

    ataque = funciones.ataque1(tablero, ataque);
    expect(ataque.direccion).to.equal("DRCHA");
    expect(ataque.aciertos).to.equal(2);
    expect(ataque.orientacion).to.equal("horizontal");
  });

  it("Prueba dando agua tras dar agua", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "barcoDañado";
    tablero[3][2] = "Submarino";
    tablero[4][2] = "Submarino";
    ataque.primerAtaqueExitoso[0] = 2;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 1;
    ataque.tipoBarco = "Submarino";
    ataque.ultimoAtaque[0] = 2;
    ataque.ultimoAtaque[1] = 2;
    ataque.direccion = "DRCHA";

    ataque = funciones.ataque1(tablero, ataque);
    expect(ataque.direccion).to.equal("VD");
    expect(ataque.aciertos).to.equal(1);
    expect(tablero[2][3]).to.equal("aguaTocada");
  });

  it("Prueba acertando tras dar agua x2", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "barcoDañado";
    tablero[3][2] = "Submarino";
    tablero[4][2] = "Submarino";
    ataque.primerAtaqueExitoso[0] = 2;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 1;
    ataque.tipoBarco = "Submarino";
    ataque.ultimoAtaque[0] = 2;
    ataque.ultimoAtaque[1] = 2;
    ataque.direccion = "VD";

    ataque = funciones.ataque1(tablero, ataque);
    expect(ataque.direccion).to.equal("VD");
    expect(ataque.aciertos).to.equal(2);
    expect(ataque.orientacion).to.equal("vertical");
  });

  it("Prueba dando agua tras dar agua x2", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "barcoDañado";
    tablero[1][2] = "Submarino";
    tablero[0][2] = "Submarino";
    ataque.primerAtaqueExitoso[0] = 2;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 1;
    ataque.tipoBarco = "Submarino";
    ataque.ultimoAtaque[0] = 2;
    ataque.ultimoAtaque[1] = 2;
    ataque.direccion = "VD";

    ataque = funciones.ataque1(tablero, ataque);
    expect(ataque.direccion).to.equal("IZDA");
    expect(ataque.aciertos).to.equal(1);
    expect(tablero[3][2]).to.equal("aguaTocada");
  });

  it("Prueba acertando tras dar agua x3", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "barcoDañado";
    tablero[2][1] = "Submarino";
    tablero[2][0] = "Submarino";
    ataque.primerAtaqueExitoso[0] = 2;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 1;
    ataque.tipoBarco = "Submarino";
    ataque.ultimoAtaque[0] = 2;
    ataque.ultimoAtaque[1] = 2;
    ataque.direccion = "IZDA";

    ataque = funciones.ataque1(tablero, ataque);
    expect(ataque.direccion).to.equal("IZDA");
    expect(ataque.aciertos).to.equal(2);
    expect(ataque.orientacion).to.equal("horizontal");
  });

  it("Prueba la maquina destruye el destructor", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "barcoDañado";
    tablero[2][1] = "Destructor";
    ataque.primerAtaqueExitoso[0] = 2;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 1;
    ataque.tipoBarco = "Destructor";
    ataque.ultimoAtaque[0] = 2;
    ataque.ultimoAtaque[1] = 2;
    ataque.direccion = "IZDA";

    ataque = funciones.ataque1(tablero, ataque);
    expect(ataque.direccion).to.equal("IZDA");
    expect(ataque.hundido).to.equal(1);
    expect(ataque.orientacion).to.equal("horizontal");
  });
});

describe("Prueba tras acertar dos casillas de un barco", function() {
  let ataque = new Ataque(5);
  var tablero = new Array(10);

  it("Prueba destruir el submarino horizontal", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "barcoDañado";
    tablero[2][1] = "BarcoDañado";
    tablero[2][0] = "Submarino";
    ataque.primerAtaqueExitoso[0] = 2;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 2;
    ataque.tipoBarco = "Submarino";
    ataque.ultimoAtaque[0] = 2;
    ataque.ultimoAtaque[1] = 2;
    ataque.direccion = "IZDA";
    ataque.orientacion = "horizontal";
    ataque.ultimoAtaque[0] = 2;
    ataque.ultimoAtaque[1] = 1;

    ataque = funciones.ataque2(tablero, ataque);
    expect(ataque.hundido).to.equal(1);
    expect(ataque.aciertos).to.equal(3);
    expect(ataque.orientacion).to.equal("horizontal");
    expect(tablero[2][0]).to.equal("barcoDañado");
  });

  it("Prueba destruir el crucero vertical", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "barcoDañado";
    tablero[0][2] = "Crucero";
    tablero[1][2] = "BarcoDañado";
    ataque.primerAtaqueExitoso[0] = 2;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 2;
    ataque.tipoBarco = "Crucero";
    ataque.ultimoAtaque[0] = 1;
    ataque.ultimoAtaque[1] = 2;
    ataque.direccion = "VA";
    ataque.orientacion = "vertical";
    ataque.ultimoAtaque[0] = 1;
    ataque.ultimoAtaque[1] = 2;

    ataque = funciones.ataque2(tablero, ataque);
    expect(ataque.hundido).to.equal(2);
    expect(ataque.aciertos).to.equal(3);
    expect(ataque.orientacion).to.equal("vertical");
    expect(tablero[0][2]).to.equal("barcoDañado");
  });

  it("Prueba dañar el portaviones horizontal", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "barcoDañado";
    tablero[2][1] = "Portaviones";
    tablero[2][0] = "Portaviones";
    tablero[2][3] = "BarcoDañado";
    tablero[2][4] = "Portaviones";
    ataque.primerAtaqueExitoso[0] = 2;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 2;
    ataque.tipoBarco = "Portaviones";
    ataque.direccion = "DRCHA";
    ataque.orientacion = "horizontal";
    ataque.ultimoAtaque[0] = 2;
    ataque.ultimoAtaque[1] = 1;

    ataque = funciones.ataque2(tablero, ataque);
    expect(ataque.aciertos).to.equal(3);
    expect(ataque.orientacion).to.equal("horizontal");
    expect(tablero[2][0]).to.equal("barcoDañado");
  });

  it("Prueba volver dañar el portaviones horizontal", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "barcoDañado";
    tablero[2][1] = "Portaviones";
    tablero[2][0] = "BarcoDañado";
    tablero[2][3] = "BarcoDañado";
    tablero[2][4] = "Portaviones";
    ataque.primerAtaqueExitoso[0] = 2;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 3;
    ataque.tipoBarco = "Portaviones";
    ataque.direccion = "DRCHA";
    ataque.orientacion = "horizontal";
    ataque.ultimoAtaque[0] = 2;
    ataque.ultimoAtaque[1] = 1;

    ataque = funciones.ataque2(tablero, ataque);
    expect(ataque.aciertos).to.equal(4);
    expect(ataque.orientacion).to.equal("horizontal");
    expect(tablero[2][1]).to.equal("barcoDañado");
  });

  it("Prueba hundir el portaviones horizontal", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "barcoDañado";
    tablero[2][1] = "barcoDañado";
    tablero[2][0] = "BarcoDañado";
    tablero[2][3] = "BarcoDañado";
    tablero[2][4] = "Portaviones";
    ataque.primerAtaqueExitoso[0] = 2;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 4;
    ataque.tipoBarco = "Portaviones";
    ataque.direccion = "DRCHA";
    ataque.orientacion = "horizontal";
    ataque.ultimoAtaque[0] = 2;
    ataque.ultimoAtaque[1] = 1;

    ataque = funciones.ataque2(tablero, ataque);
    expect(ataque.hundido).to.equal(3);
    expect(ataque.aciertos).to.equal(5);
    expect(ataque.orientacion).to.equal("horizontal");
    expect(tablero[2][4]).to.equal("barcoDañado");
  });

  it("Prueba dañar el acorazado vertical", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "Acorazado";
    tablero[3][2] = "Acorazado";
    tablero[4][2] = "BarcoDañado";
    tablero[5][2] = "BarcoDañado";
    ataque.primerAtaqueExitoso[0] = 5;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 2;
    ataque.tipoBarco = "Acorazado";
    ataque.direccion = "DRCHA";
    ataque.orientacion = "vertical";
    ataque.ultimoAtaque[0] = 4;
    ataque.ultimoAtaque[1] = 2;

    ataque = funciones.ataque2(tablero, ataque);
    expect(ataque.aciertos).to.equal(3);
    expect(ataque.orientacion).to.equal("vertical");
    expect(tablero[2][2]).to.equal("barcoDañado");
    expect(ataque.hundido).to.equal(3);
  });

  it("Prueba destruir el acorazado vertical", function() {
    for (let i = 0; i < 10; i++) {
      tablero[i] = new Array(10);
      for (let j = 0; j < tablero[i].length; j++) {
        tablero[i][j] = "agua";
      }
    }
    tablero[2][2] = "BarcoDañado";
    tablero[3][2] = "Acorazado";
    tablero[4][2] = "BarcoDañado";
    tablero[5][2] = "BarcoDañado";
    ataque.primerAtaqueExitoso[0] = 5;
    ataque.primerAtaqueExitoso[1] = 2;
    ataque.aciertos = 3;
    ataque.tipoBarco = "Acorazado";
    ataque.direccion = "DRCHA";
    ataque.orientacion = "vertical";
    ataque.ultimoAtaque[0] = 4;
    ataque.ultimoAtaque[1] = 2;

    ataque = funciones.ataque2(tablero, ataque);
    expect(ataque.aciertos).to.equal(4);
    expect(ataque.orientacion).to.equal("vertical");
    expect(tablero[3][2]).to.equal("barcoDañado");
  });
});
