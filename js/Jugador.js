

class Jugador{

    constructor(nombre,barcos,tableroHTML){
        this.ataques=new Array();
        this.nombre=nombre; 
        this.barcos = barcos;
        this.tableroHTML = tableroHTML;
    }

    set jugadorEn(jugadorEnemigo){
        this.jugadorEnemigo = jugadorEnemigo;
    }

    crearTablero(){
        this.tablero = new Tablero(10,10,this.tableroHTML,this.barcos,this.jugadorEnemigo);
    } 
}
