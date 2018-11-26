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

    //OK
    comprobarInsercion(barco){
        var bandera=true; //bandera que nos avisa si una casilla que va a ocupar el barco no es ocupable
        if(barco.orientacion=="horizontal"){
            //copio la Y del barco para no modificar el objeto al ir descendiendo por el tablero
            var inicio_vertical=barco.y;
            for(let i=0;i<barco.longitud;i++ , inicio_vertical++){
                //compruebo que no me salga por abajo
                if(barco.x<=this.x&&barco.y+barco.longitud<=this.y){
                    if(this.casillas[barco.x][inicio_vertical]=="agua"){
                        bandera=true;
                    }else{
                        console.log("la casilla ya esta ocupada");;
                        return false;
                    }
                }else{
                    console.log("me salgo del tablero");
                    return false;
                }
            }
            if(bandera==false){
                console.log("no se puede insertar");
                return false;
            }else{
                console.log("se puede insertar");
                return true;
            }
            
        }else{
            //copio la X del barco para no modificar el objeto al ir descendiendo por el tablero
            var inicio_horizontal=barco.x;
            for(let i=0;i<barco.longitud;i++ , inicio_horizontal++){
                //compruebo que no me salga por abajo
                if(barco.x+barco.longitud<=this.x&&barco.y<=this.y){
                    if(this.casillas[inicio_horizontal][barco.y]=="agua"){
                        bandera=true;
                    }else{
                        console.log("la casilla esta ocupada");
                        return false;
                    }
                }else{
                    console.log("me salgo del tablero");
                    return false;
                }
            }
            if(bandera==false){
                console.log("no se puede insertar");
                return false;
            }else{
                console.log("la bandera acaba en true");
                return true;
            }

        }

    }



    colocarBarco(barco){
        
        if(this.comprobarInsercion(barco)==true){
           if (barco.orientacion=="vertical"){
                for(var i = barco.x, contador=0; contador<barco.longitud;i++, contador++){
                    this.casillas[i][barco.y]="barco";
                }
           }else{//colorcar barco horizontal
                for(var j = barco.y, contador=0; contador<barco.longitud;j++, contador++){
                    this.casillas[barco.x][j]="barco";
                }
           }
        }
        
        console.log(this.casillas);
        
        



    }

    
    
}