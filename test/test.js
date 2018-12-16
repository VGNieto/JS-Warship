var assert = require("assert");
var expect = require("chai").expect;
var funciones = require("./testIndividuales.js");
var Barco = require("../js/Barco.js");
var tablero = require("../js/Tablero.js");
var Ataque = require("../js/Ataque.js");



describe("Prueba ataque",function(){
    let barco1 = new Barco(5);
    barco1.posicionInicialX=3;
    barco1.posicionInicialY=3;
    barco1.establecer_orientacion="vertical";

    it("Prueba 3,3",function(){
        expect(funciones.comprobarInsercion(barco1)).to.equal(true);
        
    })
})

describe("Prueba ataque aleatorio",function(){
    let ataque = new Ataque(5);
    var tablero =new Array(10);
    for (let i = 0; i <10 ; i++) {
        tablero[i] = new Array(10);
        for (let j = 0; j < tablero[i].length; j++) {
            tablero[i][j] = "agua";
        }
    }
    ataque=funciones.ataqueAleatorio(tablero,ataque);


    it("Prueba 1",function(){
        expect(ataque.aciertos).to.equal(-1);
        
    })
})

describe("Pruebas superposición de barcos y límites del tablero.",function(){
    let barco1 = new Barco(5);
    barco1.posicionInicialX=3;
    barco1.posicionInicialY=3;
    barco1.establecer_orientacion="vertical";

    it("Prueba 3,3",function(){
        expect(funciones.comprobarInsercion(barco1)).to.equal(true);
        
    })
    it("Prueba 3,3",function(){
        expect(funciones.comprobarInsercion(barco1)).to.equal(false);
    })
    

})


describe("prueba colocacion",function(){
    let barco1 = new Barco(5);
    barco1.posicionInicialX=3;
    barco1.posicionInicialY=3;
    barco1.establecer_orientacion="vertical";

    it("Prueba 3,3",function(){
        expect(funciones.comprobarInsercion(barco1)).to.equal(true);
        
    })
    it("Prueba 3,3",function(){
        expect(funciones.comprobarInsercion(barco1)).to.equal(false);
    });
    

})










describe("Prueba barco hundido",function(){
    it("Prueba 1",function(){
        expect(funciones.comprobarBarcoHundido("Crucero")).to.equal(false);
    })
})
