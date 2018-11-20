class Tablero{

    constructor(x,y){
        this.x = x;
        this.y = y;

    }

    crearTablero() {
        
        var tablero = new Array(this.x);
       
        for(var i = 0; i<tablero.length;i++){
            tablero[i] = new Array(this.y);
            for(var z = 0; z<tablero[i].length;z++){
                tablero[i][z] = "agua";
            }
        }
        

        console.log(tablero);
        return tablero;
    }

    colocarBarco(barco,x,y,orientacion){

        barco.posicionInicialX = x;
        barco.posicionInicialY = y;
        
        console.log(barco.x+""+barco.y+""+barco.orientacion);
        console.log(tablero);



    }

    
    
}