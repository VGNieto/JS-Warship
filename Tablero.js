class Tablero{

    constructor(x,y){
        this.x = x;
        this.y = y;
        this.casillas =new Array(this.x);
        for(var i = 0; i<this.x;i++){
            this.casillas[i] = new Array(this.y);
            for(var j = 0; j<this.casillas[i].length;j++){
                this.casillas[i][j]= "agua";
            }
        }

    }

    //EN PROCESO
    //mejorar para que compruebe todas las casillas que va a ocupar el barco
    comprobarPosicion(barco){
        var bandera=true; //bandera que nos avisa si una casilla que va a ocupar el barco no es ocupable
        if(barco.orientacion="vertical"){
            //copio la Y del barco para no modificar el objeto al ir descendiendo por el tablero
            var inicio_vertical=barco.y;
            for(let i=0;i<barco.longitud;i++ , inicio_vertical++){
                //compruebo que no me salga por abajo
                if(barco.x<this.x&&barco.y<this.y){
                    if(this.casillas[barco.x][inicio_vertical]=="agua"){
                        bandera=true;
                    }else{
                        console.log("la bandera esta false");
                        bandera=false;
                        break;
                    }
                }else{
                    console.log("la bandera esta false");
                    bandera=false;
                    break;
                }
            }
            if(bandera==false){
                console.log("la bandera acaba en false");
            }else{
                console.log("la bandera acaba en true");
            }
            
        }else{
            //falta por implementar la comprobacion en caso de que queramos insertar el barco horizontalmente

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