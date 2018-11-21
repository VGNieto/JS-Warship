class Tablero{

    constructor(x,y){
        this.x = x;
        this.y = y;
        this.casillas =new Array(this.x);
        for(var i = 0; i<this.x;i++){
            this.casillas[i] = new Array(this.y);
            for(var j = 0; z<this.casillas[i].length;z++){
                this.casillas[i][j]= "agua";
            }
        }

    }

  /*  crearTablero() {
        
        var tablero = new Array(this.x);
       
        for(var i = 0; i<tablero.length;i++){
            tablero[i] = new Array(this.y);
            for(var z = 0; z<tablero[i].length;z++){
                tablero[i][z] = "agua";
            }
        }
        

        return tablero;
    }*/

    //mejorar para que compruebe todas las casillas que va a ocupar el barco
    comprobarPosicion(fila,columna){
        if(this.casillas[fila][columna]=="agua"){
            console.log("agua");
            return true;
        }else{
            console.log("no agua");
            return false;
        }

    }

    colocarBarco(barco,x,y,orientacion){
        

        barco.posicionInicialX = x;
        barco.posicionInicialY = y;

        if(this.comprobarPosicion(barco.posicionInicialX,barco.posicionInicialY)==true){
            
            //comprobar que no se sale el barco del tablero teniendo en cuenta la orientacion
            //comprobar por todas las posiciones que va a ocupar el barco

        }
        
        console.log(barco.x+""+barco.y+""+barco.orientacion);
        console.log(tablero);



    }

    
    
}