class Barco{

    //constructor con solo longitud por si creamos el barco y a la hora de insertarlo usamos los setters
    constructor(longitud){
        this.longitud=longitud;
    }

    //constructor completo, por si pedimos de primeras todos los datos y con eso lo creamos
    constructor(longitud,x,y,orientacion){
        this.longitud=longitud;
        this.x=x;
        this.y=y;
        this.orientacion=orientacion;
    }

    set longitud(longitud){
        this.longitud=longitud;
    }

    //establecer orientacion del barco vertical (V) horizontal (H)
    set orientacion(orientacion){
        this.orientacion=orientacion;
    }

    //establecer cabecera del barco
    set posisicionInicial(x,y){
        this.x=x;
        this.y=y;
    }

    

}
