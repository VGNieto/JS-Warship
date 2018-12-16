function jugar() {
  barcosJugador1 = new Array(
    new Barco(5),
    new Barco(4),
    new Barco(3),
    new Barco(3),
    new Barco(2)
  );
  var tableroJugador1 = document.getElementById("juego");
  jugador1 = new Jugador("jugador1", barcosJugador1, tableroJugador1);

  barcosJugador2 = new Array(
    new Barco(5),
    new Barco(4),
    new Barco(3),
    new Barco(3),
    new Barco(2)
  );
  var tableroJugador2 = document.getElementById("juego1");
  jugador2 = new Jugador("maquina", barcosJugador2, tableroJugador2);

  jugador1.jugadorEn = jugador2;
  jugador2.jugadorEn = jugador1;

  jugador1.crearTablero();
  jugador1.tablero.pintarBarcos();

  jugador2.crearTablero();
  jugador2.tablero.pintarBarcos();

  document.getElementById("colocarAleatorio").addEventListener("click", () => {
    document.getElementById("horizontal").remove();
    document.getElementById("vertical").remove();
    jugador1.tablero.colocarBarcosAleatorio();
    document.getElementById("colocarAleatorio").remove();
  });

  document.getElementById("horizontal").addEventListener("click", () => {
    jugador1.tablero.barcos[0].establecer_orientacion = "horizontal";
  });

  document.getElementById("vertical").addEventListener("click", () => {
    jugador1.tablero.barcos[0].establecer_orientacion = "vertical";
  });
}
