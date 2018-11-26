class Jugador{

    constructor(nombre){
        this.ataques=new Array();
        this.nombre=nombre;
        this.arrayBarcos = new Array(4);
    }


    agregarBarco(barco);

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



    atacar(tablero_enemigo,x,y);

    
}