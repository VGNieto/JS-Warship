class Ataque{
    constructor(){
        this.primerAtaqueExitoso=new Array(2);//x e y -> COORDENADAS DEL PRIMER ATAQUE QUE ACERTE (EL ALEATORIO)
        this.ultimoAtaque=new Array(2);//x e y -> COORDENADAS DEL ULTIMO ATQUE exitoso
        this.orientacion="unknown";//posicion en la que se encuentra el barco encontrado
        this.direccion="unknown";//direccion por la que me muevo dentro del tablero VA DRCHA VD IZDA
        this.hundido=false;//saber si un barco está hundido
        this.aciertos=-1;
        this.tipoBarco="unknown";

    }

    inicializar_ataque(ataque){
        ataque.primerAtaqueExitoso[0]=-1;
        ataque.primerAtaqueExitoso[1]=-1;//x e y -> COORDENADAS DEL PRIMER ATAQUE QUE ACERTE (EL ALEATORIO)
        ataque.ultimoAtaque[0]=-1;//x e y -> COORDENADAS DEL ULTIMO ATQUE
        ataque.ultimoAtaque[1]=-1;
        ataque.orientacion="unknown";//posicion en la que se encuentra el barco encontrado
        ataque.direccion="unknown";//direccion por la que me muevo dentro del tablero VA DRCHA VD IZDA
        ataque.hundido=false;//saber si un barco está hundido
        ataque.aciertos=-1;
        
        ataque.tipoBarco="unknown";
        return ataque;

    }



}