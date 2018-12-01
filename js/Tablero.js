class Tablero {
  constructor(x, y, tablero1, barcos,jugadorEnemigo) {
    this.x = x;
    this.y = y;
    this.jugadorEnemigo = jugadorEnemigo;
    this.casillas = new Array(this.x);
    this.barcos = barcos;
    this.tablero = tablero1; //Cogemos la tabla del html
    this.nombresBarco = new Array("Portaviones","Acorazado","Crucero","Submarino","Destructor");
    this.barcosDañados = new Array();
    this.resultados = document.getElementById("resultados");
    this.resultados.style.height = (this.resultados.scrollHeight+70)+'px';
    this.resultados.style.resize = "none";

    for (var i = 0; i < this.x; i++) {
      this.casillas[i] = new Array(this.y);
      for (var j = 0; j < this.casillas[i].length; j++) {
        this.casillas[i][j] = "agua";
      }
    }

  }

  //Pinta el tablero y se mete un barco en la posición indicada.
  pintarBarcos() {
    //Para cada posicion del array del tablero, creamos la tabla.
    var contadorPosiciones = 0;
    for (let i = 0; i < this.x; i++) {
      let fila = this.tablero.insertRow(i); //Insertamos una fila al tablero.
      for (let j = 0; j < this.y; j++) {
        let dato = fila.insertCell(j); //Insetamos una celda a la fila.
        fila.appendChild(dato); //Unimos esa celda a la fila.
        dato.id = contadorPosiciones;
        dato.innerHTML = '<img src="imagenes/agua.png" width=30px; height=30px; style="opacity:0.4"; />';
        //Cuando se produzca el click, se llamará a esa función.
        if(this.tablero.id === "juego"){
          dato.addEventListener("click",() => this.agregarBarcoAlTablero(dato.id),false);
        }
        contadorPosiciones++;
        this.tablero.appendChild(fila); //Unimos la fila con sus celdas al tablero.
      }
    }
  }

  
  //Agrega en la posición indicada un barco si es posible,recibe como parametro la posición.
  agregarBarcoAlTablero(dato) {
    //Recorremos el array de barcos y para cada uno le establecemos la posicion X y la posicion Y y lo colocamos.  
    if(this.barcos[0].orientacion === undefined){
      this.resultados.value = "Escoge una orientación para el "+this.nombresBarco[0];
      this.resultados.scrollTop = this.resultados.scrollHeight;

    } else{
    for (let i = 0; i < this.barcos.length; i++) {
      this.barcos[i].posicionInicialX = parseInt(dato / this.x);
      this.barcos[i].posicionInicialY = parseInt(dato % this.y);
      this.barcos[i].nombre = this.nombresBarco[i];
      
      this.colocarBarco(this.barcos[i]);
      if (this.barcos.length === 0) {
        document.getElementById("horizontal").remove();
        document.getElementById("vertical").remove();
        document.getElementById("colocarAleatorio").remove();
      }
    }
  }
}
  colocarBarcosAleatorio() {
  
    for (let i = 0; i < this.barcos.length; i++) {
      do {
        this.barcos[i].posicionInicialX = parseInt(Math.random() * 10);
        this.barcos[i].posicionInicialY = parseInt(Math.random() * 10);
        this.barcos[i].nombre = this.nombresBarco[i];
        var ori = parseInt(Math.random() * 2);
        if (ori === 1) {
          this.barcos[i].establecer_orientacion = "horizontal";
        } else {
          this.barcos[i].establecer_orientacion = "vertical";
        }
      } while (this.colocarBarco(this.barcos[i]) != true);
      i = -1;
    }
  }

  colocarBarco(barco) {
    if (this.comprobarInsercion(barco) == true) {
      if (barco.orientacion == "vertical") {
        for (var i = barco.x, contador = 0;contador < barco.longitud;i++, contador++) {
          this.casillas[i][barco.y] =barco.nom;
        }
      } else {
        //colorcar barco horizontal
        for (var j = barco.y, contador = 0;contador < barco.longitud;j++, contador++) {
          this.casillas[barco.x][j] = barco.nom;
        }
      }

      this.barcos.shift();
      this.nombresBarco.shift();

      if(this.barcos.length === 0){
        this.jugadorEnemigo.tablero.colocarBarcosAleatorio();
        this.añadirClickEnemigo();
      }

      this.actualizarTablero();

      return true;
    } else {
      return false;
    }
  }

  añadirClickEnemigo(){
    
    if (this.tablero.id == "juego1") {
      let celdas = this.tablero.getElementsByTagName("td");
      for (let i = 0; i < celdas.length; i++) {
        let id = celdas[i].id;
        celdas[i].addEventListener("click",()=>{
            if(this.revelarBarcos(id) === true ){
              window.setTimeout(()=>this.atacarEnemigo(),1500);              
             }; 
          });
      }
    } 

}

atacarEnemigo(){
  let posicionAtaqueX = parseInt(Math.random() * 10);
  let posicionAtaqueY = parseInt(Math.random() * 10);
  let posicion = posicionAtaqueX+""+posicionAtaqueY;
  this.jugadorEnemigo.tablero.revelarBarcos(parseInt(posicion));
}

comprobarBarcoHundido(string){
  var contador = 0;
  for(let i = 0; i<this.x;i++){
    for(let j=0;j<this.y;j++){
      if (  string.indexOf(this.casillas[i][j].toString()) > -1){
        contador++;
      }
    } 
  }
  if(contador == 1){
   return true;
  }
}

  revelarBarcos(id){

    let casilla = this.casillas[Math.floor(id / this.x)][id % this.y];
    let posicion = Math.floor((id / this.x)+1) + "-" + Math.floor((id % this.y)+1);
    
      if(casilla !== "agua" && casilla !== "barcoDañado" && casilla !== "aguaTocada" ){
        
        
          if(this.tablero.id === "juego1"){
            this.resultados.value="¡Has atacado a la posición "+ posicion +" y has dañado un " + casilla+"!";
            this.resultados.scrollTop = this.resultados.scrollHeight;
          } else{
            this.resultados.value+="\n\n¡Te han atacado a la posición "+ posicion +" y te han dañado un " + casilla+"!";
            this.resultados.scrollTop = this.resultados.scrollHeight;
          }
        
        
        
        if(this.comprobarBarcoHundido(casilla.toString())){
          if(this.tablero.id === "juego1"){
            this.resultados.value= "¡Has destruido el " + casilla+"!";
            this.resultados.scrollTop = this.resultados.scrollHeight;
          } else{
            this.resultados.value+= "\n\n¡Te han destruido el " + casilla+"!";
            this.resultados.scrollTop = this.resultados.scrollHeight;
          }
        };
        this.barcosDañados.push(casilla);
        console.log(this.barcosDañados);
        this.casillas[Math.floor(id / this.x)][id % this.y] = "barcoDañado";
        
        
        this.actualizarTablero();
        if(this.barcosDañados.length >= 17){
          if( window.confirm("¡HAS GANADO! ¿Quieres empezar una nueva partida?")){
            location.reload();
          }
          
        } else if (this.jugadorEnemigo.tablero.barcosDañados.length >= 17){
            if( window.confirm("¡HAS PERDIDO! ¿Quieres empezar una nueva partida?")){
              location.reload();
            }
        }
        return true;

      } else if(casilla !== "aguaTocada" && casilla!== "barcoDañado"){
          if(this.tablero.id === "juego1"){
            this.resultados.value= "¡Has disparado al agua!";
            this.resultados.scrollTop = this.resultados.scrollHeight;
          } else{
            this.resultados.value+="\n\n¡El enemigo ha fallado!";
            this.resultados.scrollTop = this.resultados.scrollHeight;

          }
        this.casillas[Math.floor(id / this.x)][id % this.y] = "aguaTocada";
        this.actualizarTablero();
        return true;

      } else if( this.tablero.id === "juego1" && casilla === "aguaTocada" || casilla === "barcoDañado"){
        this.resultados.value= "¡Ahí ya has disparado!";
        this.resultados.scrollTop = this.resultados.scrollHeight;
        return false;
      } else{
        return false;
      }

  }



  actualizarTablero() {
  
    var celdas = this.tablero.getElementsByTagName("td");
    for (let i = 0; i < celdas.length; i++) {
      let casilla = this.casillas[Math.floor(celdas[i].id / this.x)][celdas[i].id % this.y];
      if ( casilla !="agua") {
        if(this.tablero.id === "juego"){
        celdas[i].innerHTML = '<img src="imagenes/barco.png" width=30px; height=30px; />';
        }
      }
    }

    for (let i = 0; i < celdas.length; i++) {
      let casilla = this.casillas[Math.floor(celdas[i].id / this.x)][celdas[i].id % this.y];
      if (casilla == "barcoDañado") {
        celdas[i].innerHTML = '<img src="imagenes/barcoDañado.png" width=30px; height=30px; />';
      } else if(casilla == "aguaTocada"){
        celdas[i].innerHTML ='<img src="imagenes/aguaTocada.png" width=30px; height=30px; />';
      }
    }
    
  }

  comprobarTest(dato){
    if(dato === "hola"){
      return true;
    } else{
      return false;
    }
  }

  comprobarInsercion(barco) {
    if (typeof barco == "undefined") {
      //console.log("barco erroneo");
      return false;
    }

    if (typeof barco.orientacion == "undefined") {
      return false;
    }

    var bandera = true; //bandera que nos avisa si una casilla que va a ocupar el barco no es ocupable
    if (barco.orientacion == "horizontal") {
      //copio la Y del barco para no modificar el objeto al ir descendiendo por el tablero
      var inicio_vertical = barco.y;
      for (let i = 0; i < barco.longitud; i++, inicio_vertical++) {
        //compruebo que no me salga por abajo
        if (barco.x <= this.x && barco.y + barco.longitud <= this.y) {
          if (this.casillas[barco.x][inicio_vertical] == "agua") {
            bandera = true;
          } else {
            //console.log("la casilla ya esta ocupada");
            return false;
          }
        } else {
          //console.log("me salgo del tablero");
          return false;
        }
      }
      if (bandera == false) {
        return false;
      } else {
        //console.log("se puede insertar");
        return true;
      }
    } else {
      //copio la X del barco para no modificar el objeto al ir descendiendo por el tablero
      var inicio_horizontal = barco.x;
      for (let i = 0; i < barco.longitud; i++, inicio_horizontal++) {
        //compruebo que no me salga por abajo
        if (barco.x + barco.longitud <= this.x && barco.y <= this.y) {
          if (this.casillas[inicio_horizontal][barco.y] == "agua") {
            bandera = true;
          } else {
            //console.log("la casilla esta ocupada");
            return false;
          }
        } else {
          //console.log("me salgo del tablero");
          return false;
        }
      }
      if (bandera == false) {
        //console.log("no se puede insertar");
        return false;
      } else {
        //console.log("la bandera acaba en true");
        return true;
      }
    }
  }

  ataque1(tablero,ataque){
    switch(ataque.direccion){
      case "undefined":
        if(ataque.ultimoAtaque[1]>0&&tablero.casillas[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1]-1]!="aguaTocada"&&tablero.casillas[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1]-1]!="barcoDañado"){
          if(tablero.casillas[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1]-1]=="agua"){//si me encuentro agua
            tablero.casillas[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1]-1] = "aguaTocada";
            ataque.direccion="DRCHA";
          }else{
            tablero.casillas[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1]-1] = "barcoDañado";
            ataque.ultimoAtaque[0]=ataque.ultimoAtaque[0];
            ataque.ultimoAtaque[1]=ataque.ultimoAtaque[1]-1;
            ataque.direccion="VA";
            ataque.orientacion="vertical";
            ataque.aciertos++;
          }
          break;
        }else{
          ataque.direccion="DRCHA";
        }
      case "DRCHA":
        if(ataque.ultimoAtaque[0]<9&&tablero.casillas[ataque.ultimoAtaque[0]+1][ataque.ultimoAtaque[1]]!="aguaTocada"&&tablero.casillas[ataque.ultimoAtaque[0]+1][ataque.ultimoAtaque[1]]!="barcoDañado"){
          if(tablero.casillas[ataque.ultimoAtaque[0]+1][ataque.ultimoAtaque[1]]=="agua"){//si me encuentro agua
            tablero.casillas[ataque.ultimoAtaque[0]+1][ataque.ultimoAtaque[1]] = "aguaTocada";
            ataque.direccion="VD";
          }else{
            tablero.casillas[ataque.ultimoAtaque[0]+1][ataque.ultimoAtaque[1]] = "barcoDañado";
            ataque.ultimoAtaque[0]=ataque.ultimoAtaque[0]+1;
            ataque.ultimoAtaque[1]=ataque.ultimoAtaque[1];
            ataque.direccion="DRCHA";
            ataque.orientacion="horizontal";
            ataque.aciertos++;
          }
          break;
        }else{
          ataque.direccion="VD";
        }
      case "VD":
        if(ataque.ultimoAtaque[1]<9&&tablero.casillas[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1]+1]!="aguaTocada"&&tablero.casillas[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1]+1]!="barcoDañado"){
          if(tablero.casillas[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1]+1]=="agua"){//si me encuentro agua
            tablero.casillas[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1]+1] = "aguaTocada";
            ataque.direccion="IZDA";
          }else{
            tablero.casillas[ataque.ultimoAtaque[0]][ataque.ultimoAtaque[1]+1] = "barcoDañado";
            ataque.ultimoAtaque[0]=ataque.ultimoAtaque[0];
            ataque.ultimoAtaque[1]=ataque.ultimoAtaque[1]+1;
            ataque.direccion="VD";
            ataque.orientacion="vertical";
            ataque.aciertos++;
          }
          break;
        }else{
          ataque.direccion="IZDA";
        }
      case "IZDA":
        if(ataque.ultimoAtaque[1]<9&&tablero.casillas[ataque.ultimoAtaque[0]-1][ataque.ultimoAtaque[1]]!="aguaTocada"&&tablero.casillas[ataque.ultimoAtaque[0]-1][ataque.ultimoAtaque[1]]!="barcoDañado"){
          if(tablero.casillas[ataque.ultimoAtaque[0]-1][ataque.ultimoAtaque[1]]=="agua"){//si me encuentro agua
            tablero.casillas[ataque.ultimoAtaque[0]-1][ataque.ultimoAtaque[1]] = "aguaTocada";
            ataque.direccion="unknown";
          }else{
            tablero.casillas[ataque.ultimoAtaque[0]-1][ataque.ultimoAtaque[1]] = "barcoDañado";
            ataque.ultimoAtaque[0]=ataque.ultimoAtaque[0]-1;
            ataque.ultimoAtaque[1]=ataque.ultimoAtaque[1];
            ataque.direccion="IZDA";
            ataque.orientacion="horizontal";
            ataque.aciertos++;
          }
          break;
        }else{
          ataque.direccion="unknown";
        }
      default:
        ataque=inicializar_ataque(ataque);
        ataqueAleatorio(tablero,ataque);
        break;
    }
    
    return ataque;
  }

  ataque2(tablero,ataque){
        
    switch(ataque.tipoBarco){
      case "Portaviones":
          switch(ataque.orientacion){
            case "horizontal":
              
              let i=0;
              while(tablero.casillas[ataque.ultimoAtaque[0]][i]!="Portaviones"){
                i++;
              }
              tablero.casillas[ataque.ultimoAtaque[0]][i]!="barcoDañado";
              ataque.aciertos++;
              if(ataque.aciertos==5){
                console.log("portaviones destruido");
                ataque=inicializar_ataque(ataque);
              }
              break;

            
            case "vertical":
              let i=0;
              while(tablero.casillas[i][ataque.ultimoAtaque[0]]!="Portaviones"){
                i++;
              }
              tablero.casillas[i][ataque.ultimoAtaque[0]]!="barcoDañado";
              ataque.aciertos++;
              if(ataque.aciertos==5){
                console.log("portaviones destruido");
                ataque=inicializar_ataque(ataque);
              }
              break;
            default:
              ataque=inicializar_ataque(ataque);
              ataqueAleatorio(tablero,ataque);
              break;
          }
      case "Acorazado":
          switch(ataque.orientacion){
            case "horizontal":
              
              let i=0;
              while(tablero.casillas[ataque.ultimoAtaque[0]][i]!="Acorazado"){
                i++;
              }
              tablero.casillas[ataque.ultimoAtaque[0]][i]!="barcoDañado";
              ataque.aciertos++;
              if(ataque.aciertos==5){
                console.log("Acorazado destruido");
                ataque=inicializar_ataque(ataque);
              }
              break;

            
            case "vertical":
              let i=0;
              while(tablero.casillas[i][ataque.ultimoAtaque[0]]!="Acorazado"){
                i++;
              }
              tablero.casillas[i][ataque.ultimoAtaque[0]]!="barcoDañado";
              ataque.aciertos++;
              if(ataque.aciertos==5){
                console.log("Acorazado destruido");
                ataque=inicializar_ataque(ataque);
              }
              break;
            default:
              ataque=inicializar_ataque(ataque);
              ataqueAleatorio(tablero,ataque);
              break;
          }
      case "Crucero":
          switch(ataque.orientacion){
            case "horizontal":
              
              let i=0;
              while(tablero.casillas[ataque.ultimoAtaque[0]][i]!="Crucero"){
                i++;
              }
              tablero.casillas[ataque.ultimoAtaque[0]][i]!="barcoDañado";
              ataque.aciertos++;
              if(ataque.aciertos==3){
                console.log("Crucero destruido");
                ataque=inicializar_ataque(ataque);
              }
              break;

            
            case "vertical":
              let i=0;
              while(tablero.casillas[i][ataque.ultimoAtaque[0]]!="Crucero"){
                i++;
              }
              tablero.casillas[i][ataque.ultimoAtaque[0]]!="barcoDañado";
              ataque.aciertos++;
              if(ataque.aciertos==5){
                console.log("Crucero destruido");
                ataque=inicializar_ataque(ataque);
              }
              break;
            default:
              ataque=inicializar_ataque(ataque);
              ataqueAleatorio(tablero,ataque);
              break;
          }
      case "Submarino":
          switch(ataque.orientacion){
            case "horizontal":
              
              let i=0;
              while(tablero.casillas[ataque.ultimoAtaque[0]][i]!="Submarino"){
                i++;
              }
              tablero.casillas[ataque.ultimoAtaque[0]][i]!="barcoDañado";
              ataque.aciertos++;
              if(ataque.aciertos==3){
                console.log("Crucero destruido");
                ataque=inicializar_ataque(ataque);
              }
              break;

            
            case "vertical":
              let i=0;
              while(tablero.casillas[i][ataque.ultimoAtaque[0]]!="Submarino"){
                i++;
              }
              tablero.casillas[i][ataque.ultimoAtaque[0]]!="barcoDañado";
              ataque.aciertos++;
              if(ataque.aciertos==5){
                console.log("Sumarino destruido");
                ataque=inicializar_ataque(ataque);
              }
              break;
            default:
              ataque=inicializar_ataque(ataque);
              ataqueAleatorio(tablero,ataque);
              break;
          }
      default:
          ataque=inicializar_ataque(ataque);
          ataqueAleatorio(tablero,ataque);
          break;

    }
    return ataque;

  }
  
  ataqueAleatorio(tablero,ataque){
    
    do{
      var ataque_X= parseInt(Math.random() * 10);
      var ataque_Y= parseInt(Math.random() * 10);
    }while(tablero.casillas[ataque_X][ataque_Y] == "aguaTocada"||tablero.casillas[ataque_X][ataque_Y] == "barcoTocado");
      
    if(tablero.casillas[ataque_X][ataque_Y]=="agua"){//si me encuentro agua
        tablero.casillas[ataque_X][ataque_Y] = "aguaTocada";
        ataque.ultimoAtaque[0]=ataque_X;
        ataque.ultimoAtaque[1]=ataque_Y;
      
      }else{//si me encuentro un barco
        ataque.primerAtaqueExitoso[0]=ataque_X;
        ataque.primerAtaqueExitoso[2]=ataque_Y;
        ataque.aciertos=1;
        ataque.tipoBarco=tablero.casillas[ataque_X][ataque_Y];
        tablero.casillas[ataque_X][ataque_Y] = "barcoDañado";
        ataque.ultimoAtaque[0]=ataque_X;
        ataque.ultimoAtaque[1]=ataque_Y;
      }
    return ataque;
  }

  ataqueEnemigo(tablero,ataque){
    

    /*if(datos_obtenidos[3])COMPROBAR SI EL BARCO ESTA HUNDIDO*/
    if (ataque.aciertos!=-1){//si no es el primer acierto exitoso
      if(ataque.aciertos==1){//si el lanzamiento aleatorio fue el primer acierto
        ataque=ataque1(tablero,ataque);
        
      }else{//llevo mas de un acierto
        ataque=ataque2(tablero,ataque);
      }
    }else{
      ataque=ataqueAleatorio(tablero,ataque);
      
  }

  }
  
}



