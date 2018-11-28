class Jugador{

    constructor(nombre,barcos,tableroHTML){
        this.ataques=new Array();
        this.nombre=nombre;
        this.arrayBarcos = barcos;
        this.tableroHTML = tableroHTML;
        this.tablero = new Tablero(10,10,this.tableroHTML);
    }


    comprobarAtaque(x,y){

        for(let i=0;i<this.ataques.length;i++){
            if(this.ataques[i]==""+x+""+y){
                console.log("posicion atacada previamente")
                return false;
            }
        }
        console.log("se puede atacar");
        return true;
    }



    atacar(tablero_enemigo){

            tablero_enemigo.pintarTablero();
        
    }

    
}
