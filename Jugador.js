class Jugador{

    constructor(nombre,barcos,tableroHTML){
        this.ataques=new Array();
        this.nombre=nombre; 
        this.tablero = new Tablero(10,10,tableroHTML,barcos);
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



    atacarAleatorio(jugadorEnemigo){

        let posicionAtaqueX = parseInt(Math.random() * 10);
        let posicionAtaqueY = parseInt(Math.random() * 10);
        let posicion = posicionAtaqueX+""+posicionAtaqueY;
        jugadorEnemigo.tablero.revelarBarcos(parseInt(posicion));
        
    }

    atacar(){
        if(this.tablero.añadirClickEnemigo() === true){
            this.tablero.añadirClickEnemigo();
        } else{
            this.atacarAleatorio(jugadorEnemigo);
        }
    }
     

    
}
