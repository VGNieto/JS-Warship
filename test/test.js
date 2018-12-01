var assert = require("assert");
var expect = require("chai").expect;
var funciones = require("./testIndividuales.js");
var Barco = require("../js/Barco.js");

describe("Prueba inserción barcos",function(){
    let barco1 = new Barco(5);
    barco1.posicionInicialX=1;
    barco1.posicionInicialY=9;
    barco1.establecer_orientacion="vertical";
    it("Prueba 1",function(){
        expect(funciones.comprobarInsercion(barco1)).to.equal(false);
    })
})

describe("Prueba barco hundido",function(){
    it("Prueba 1",function(){
        expect(funciones.comprobarBarcoHundido("Crucero")).to.equal(false);
    })
})
