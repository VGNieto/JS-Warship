class Barco{

    //constructor con solo longitud por si creamos el barco y a la hora de insertarlo usamos los setters
    constructor(longitud){
        this.longitud=longitud;
    }

    //establecer orientacion del barco vertical (V) horizontal (H)
    set orientacion(orientacion){
        this.orientacion=orientacion;
    }

    //establecer cabecera del barco
    set posicionInicialX(x){
        this.x=x;
    }
    set posicionInicialY(y){
        this.y=y;
    }

    

}
