class JugadorManual extends Jugador{

    constructor(){
        super(nombre);
    }

    agregarBarco(tablero,barco){
        while(this.arrayBarcos.length!=4){
            if(tablero.comprobarInsercion(barco)==true){
                this.arrayBarcos.push(barco);
            }
        }
        

        
       
    }

}