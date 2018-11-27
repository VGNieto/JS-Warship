class Tablero {
  constructor(x, y) {
    self = this;
    this.x = x;
    this.y = y;
    this.casillas = new Array(this.x);
    this.tablero = document.getElementById("juego"); //Cogemos la tabla del html
    for (var i = 0; i < this.x; i++) {
      this.casillas[i] = new Array(this.y);
      for (var j = 0; j < this.casillas[i].length; j++) {
        this.casillas[i][j] = "agua";
      }
    }
    this.pintarTablero();
  }

  //Edita la casilla que clickemos y dependiendo el resultado pondrá una cosa u otra.
  editarCasilla() {
    if (this.textContent === "barco") {
      console.log("Aquí hay un barco amigo, buen trabajo");
    } else {
      this.textContent = "X"; //Lo que se pondrá.
      self.casillas[Math.floor(this.id / self.x)][this.id % self.y] = "X"; //Guardamos en el array la modificacion.
    }
    console.log(self.casillas);
    return true;
  }

  //Pinta el tablero y se modifica cada vez que clickemos una posición.
  pintarTablero() {
    //Para cada posicion del array del tablero, creamos la tabla.
    var contadorPosiciones = 0;
    for (let i = 0; i < this.x; i++) {
      var fila = document.createElement("tr");
      for (let j = 0; j < this.y; j++) {
        var dato = document.createElement("td");
        fila.appendChild(dato);
        dato.className = "datos";
        dato.id = contadorPosiciones;
        dato.textContent = this.casillas[i][j];
        dato.addEventListener("click", this.editarCasilla);
        contadorPosiciones++;
      }
      this.tablero.appendChild(fila);
    }
  }

  //Actualiza el tablero, con los nuevos atributos.
  actualizarTablero() {

    for (let i = 0; i < this.x; i++) {
      var fila = document.getElementsByTagName("tr");
      for (let j = 0; j < this.y; j++) {
        var celda = fila[i].getElementsByTagName("td");
        if (self.casillas[i][j] == "barco") {
          celda[j].textContent = "barco";
        } //Continuará
      }
    }
    console.log(self.casillas);

  }

  //OK
  comprobarInsercion(barco) {
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
            console.log("la casilla ya esta ocupada");
            return false;
          }
        } else {
          console.log("me salgo del tablero");
          return false;
        }
      }
      if (bandera == false) {
        console.log("no se puede insertar");
        return false;
      } else {
        console.log("se puede insertar");
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
            console.log("la casilla esta ocupada");
            return false;
          }
        } else {
          console.log("me salgo del tablero");
          return false;
        }
      }
      if (bandera == false) {
        console.log("no se puede insertar");
        return false;
      } else {
        console.log("la bandera acaba en true");
        return true;
      }
    }
  }

  colocarBarco(barco) {
    if (this.comprobarInsercion(barco) == true) {
      if (barco.orientacion == "vertical") {
        for (
          var i = barco.x, contador = 0;
          contador < barco.longitud;
          i++, contador++
        ) {
          this.casillas[i][barco.y] = "barco";
        }
      } else {
        //colorcar barco horizontal
        for (
          var j = barco.y, contador = 0;
          contador < barco.longitud;
          j++, contador++
        ) {
          this.casillas[barco.x][j] = "barco";
        }
      }
      this.actualizarTablero();
    }
  }
}
