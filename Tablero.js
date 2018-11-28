class Tablero {
  constructor(x, y, tablero1, barcos) {
    self = this;
    this.x = x;
    this.y = y;
    this.casillas = new Array(this.x);
    this.barcos = barcos;
    this.tablero = tablero1; //Cogemos la tabla del html
    for (var i = 0; i < this.x; i++) {
      this.casillas[i] = new Array(this.y);
      for (var j = 0; j < this.casillas[i].length; j++) {
        this.casillas[i][j] = "agua";
      }
    }
  }

  //Pinta el tablero y se modifica cada vez que clickemos una posición.
  pintarBarcos() {
    console.log(this.barcos);
    //Para cada posicion del array del tablero, creamos la tabla.
    var contadorPosiciones = 0;
    for (let i = 0; i < this.x; i++) {
      var fila = this.tablero.insertRow(i);
      for (let j = 0; j < this.y; j++) {
        var dato = fila.insertCell(j);
        fila.appendChild(dato);
        dato.className = "datos";
        dato.id = contadorPosiciones;
        dato.innerHTML =
          '<img src="agua.png" width=30px; height=30px; style="opacity:0.4"; />';

        dato.addEventListener("click", this.agregarBarcoAlTablero);

        contadorPosiciones++;
      }
      this.tablero.appendChild(fila);
    }
  }

  agregarBarcoAlTablero() {
    console.log(self.tablero);
    for (let i = 0; i < self.barcos.length; i++) {
      self.barcos[i].posicionInicialX = parseInt(this.id / self.x);
      self.barcos[i].posicionInicialY = parseInt(this.id % self.y);
      
      self.colocarBarco(self.barcos[i]);
      if (self.barcos.length === 0) {
        document.getElementById("horizontal").remove();
        document.getElementById("vertical").remove();
      }
    }
  }
  colocarBarcosAleatorio() {
    for (let i = 0; i < this.barcos.length; i++) {
      do {
        this.barcos[i].posicionInicialX = parseInt(Math.random() * 10);
        this.barcos[i].posicionInicialY = parseInt(Math.random() * 10);
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

      this.barcos.shift();
      console.log(this.casillas);
      this.actualizarTablero();

      return true;
    } else {
      return false;
    }
  }


actualizarTablero() {

  var celdas = this.tablero.getElementsByTagName("td");
  for (let i = 0; i < celdas.length; i++) {
    if (
      this.casillas[Math.floor(celdas[i].id / this.x)][
        celdas[i].id % this.y
      ] == "barco"
    ) {
      celdas[i].innerHTML =
        '<img src="barco.png" width=30px; height=30px; />';
    }
  }
}

  editarCasilla() {
    if (this.textContent === "barco") {
      this.textContent = "O"; //Lo que se pondrá.
      self.casillas[Math.floor(this.id / self.x)][this.id % self.y] = "O";
    } else {
      this.textContent = "X"; //Lo que se pondrá.
      self.casillas[Math.floor(this.id / self.x)][this.id % self.y] = "X"; //Guardamos en el array la modificacion.
      this.addEventListener("click", function nada() {
        console.log("ya has atacado");
      });
    }

    console.log(self.casillas);
  }

  //Actualiza el tablero, con los nuevos atributos.
  

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

}
  
