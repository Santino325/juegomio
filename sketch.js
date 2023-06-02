document.addEventListener("DOMContentLoaded", function() {
  // Obtenemos el elemento del lienzo (canvas)
  var canvas = document.getElementById("gameCanvas");
  var ctx = canvas.getContext("2d");

  // Variables de juego
  var chico = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 30,
    height: 30,
    color: "#00FF00"
  };

  var zombies = [];
  var disparos = [];
  var puntos = 0;

  // Eventos del teclado
  document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
      chico.x -= 10;
    } else if (event.key === "ArrowRight") {
      chico.x += 10;
    } else if (event.key === " ") {
      disparos.push({ x: chico.x, y: chico.y });
    }
  });

  // Función para dibujar al chico
  function dibujarChico() {
    ctx.beginPath();
    ctx.rect(chico.x, chico.y, chico.width, chico.height);
    ctx.fillStyle = chico.color;
    ctx.fill();
    ctx.closePath();
  }

  // Función para dibujar a los zombies
  function dibujarZombies() {
    for (var i = 0; i < zombies.length; i++) {
      var z = zombies[i];
      ctx.beginPath();
      ctx.rect(z.x, z.y, z.width, z.height);
      ctx.fillStyle = z.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  // Función para dibujar los disparos
  function dibujarDisparos() {
    for (var i = 0; i < disparos.length; i++) {
      var d = disparos[i];
      ctx.beginPath();
      ctx.rect(d.x, d.y, 5, 10);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();
    }
  }

  // Función para detectar colisiones
  function detectarColisiones() {
    for (var i = 0; i < zombies.length; i++) {
      var z = zombies[i];
      for (var j = 0; j < disparos.length; j++) {
        var d = disparos[j];
        if (d.x > z.x && d.x < z.x + z.width && d.y > z.y && d.y < z.y + z.height) {
          zombies.splice(i, 1);
          disparos.splice(j, 1);
          puntos++;
        }
      }
    }
  }

  // Función para actualizar el juego
  function actualizarJuego() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dibujarChico();
    dibujarZombies();
    dibujarDisparos();
    detectarColisiones();

    // Movimiento de los zombies
    for (var i = 0; i < zombies.length; i++) {
      var z = zombies[i];
      z.x -= 2; // Velocidad de movimiento de los zombies

      // Detectar colisión con el chico
      if (z.x + z.width > chico.x && z.x < chico.x + chico.width &&
          z.y + z.height > chico.y && z.y < chico.y + chico.height) {
        // Game Over
        alert("Game Over");
        location.reload();
      }

      // Eliminar zombies que salen de la pantalla
      if (z.x + z.width < 0) {
        zombies.splice(i, 1);
      }
    }

    // Movimiento de los disparos
    for (var i = 0; i < disparos.length; i++) {
      var d = disparos[i];
      d.y -= 5; // Velocidad de movimiento de los disparos

      // Eliminar disparos que salen de la pantalla
      if (d.y < 0) {
        disparos.splice(i, 1);
      }
    }

    // Mostrar puntos
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Puntos: " + puntos, 8, 20);

    requestAnimationFrame(actualizarJuego);
  }

  // Generar zombies cada segundo
  setInterval(function() {
    var zombie = {
      x: canvas.width,
      y: Math.random() * (canvas.height - 30),
      width: 30,
      height: 30,
      color: "#FF0000"
    };
    zombies.push(zombie);
  }, 1000);

  // Iniciar el juego
  actualizarJuego();
});
