class Tablero {
  constructor(x, y, tablero) {
    self = this;
    this.x = x;
    this.y = y;
    this.casillas = new Array(this.x);
    this.barcos = new Array(
      new Barco(5),
      new Barco(4),
      new Barco(3),
      new Barco(3),
      new Barco(2)
    );

    this.tablero = document.getElementById(tablero); //Cogemos la tabla del html
    for (var i = 0; i < this.x; i++) {
      this.casillas[i] = new Array(this.y);
      for (var j = 0; j < this.casillas[i].length; j++) {
        this.casillas[i][j] = "agua";
      }
    }
  }

  //Edita la casilla que clickemos y dependiendo el resultado pondrá una cosa u otra.
  agregarBarcoAlTablero() {
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

  //Pinta el tablero y se modifica cada vez que clickemos una posición.
  pintarBarcos() {
    //Para cada posicion del array del tablero, creamos la tabla.
    var contadorPosiciones = 0;
    for (let i = 0; i < this.x; i++) {
      var fila = document.createElement("tr");
      for (let j = 0; j < this.y; j++) {
        var dato = document.createElement("td");
        fila.appendChild(dato);
        dato.className = "datos";
        dato.id = contadorPosiciones;
        dato.innerHTML =
          '<img src="agua.png" width=30px; height=30px; style="opacity:0.4"; />';
        if (this.tablero.id == "juego") {
          dato.addEventListener("click", this.agregarBarcoAlTablero);
        }
        contadorPosiciones++;
      }
      this.tablero.appendChild(fila);
    }
  }

  //Actualiza el tablero, con los nuevos atributos.
  actualizarTablero() {
    
      var tonto = self.tablero.getElementsByTagName("td");
      for (let i = 0; i < tonto.length; i++) {
       
        if (
          self.casillas[Math.floor(tonto[i].id / self.x)][
            tonto[i].id % self.y
          ] == "barco"
        ) {
          
          tonto[i].innerHTML =
            '<img src="barco.png" width=30px; height=30px; />';
          tonto[i].addEventListener("mouseover", () => {  
           
            console.log(self.casillas);

            self.casillas[Math.floor(tonto[i].id / self.x)][
              tonto[i].id % self.y
            ] = "barcoDañado";
            
            tonto[i].innerHTML =
              '<img src="barcoDañado.png" width=30px; height=30px; />';
          });
        }
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
          self.casillas[i][barco.y] = "barco";
        }
      } else {
        //colorcar barco horizontal
        for (
          var j = barco.y, contador = 0;
          contador < barco.longitud;
          j++, contador++
        ) {
          self.casillas[barco.x][j] = "barco";
        }
      }

      self.barcos.shift();
      this.actualizarTablero();

      return true;
    } else {
      return false;
    }
  }
}
