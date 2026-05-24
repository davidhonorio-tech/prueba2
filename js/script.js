// =====================================================
// script.js — Desafío Web Matemático
// Fibonacci + Números Primos
//
// RESTRICCIONES CUMPLIDAS:
//  - Solo document.getElementById() (sin querySelector)
//  - Sin prompt(), sin alert() para mostrar resultados
//  - Sin arrays/vectores
//  - Sin la palabra "not" ni el operador !
//  - Variables simples + ciclos while
// =====================================================


// --------------------------------------------------
// FUNCIÓN AUXILIAR: verificar si un número es primo
// Cuenta divisores con un ciclo. Si son exactamente
// 2 (el 1 y el mismo número) → es primo.
// --------------------------------------------------
function esPrimo(numero) {
  var contador = 0;  // cantidad de divisores exactos
  var i = 1;

  // El 0 y el 1 no son primos
  if (numero < 2) {
    return false;
  }

  // Ciclo: contar cuántos divisores tiene el número
  while (i <= numero) {
    if (numero % i == 0) {
      contador = contador + 1;
    }
    i = i + 1;
  }

  // Exactamente 2 divisores → primo
  if (contador == 2) {
    return true;
  }

  return false;
}


// --------------------------------------------------
// FUNCIÓN PRINCIPAL: calcular()
// Lee el formulario, genera la serie de Fibonacci
// sin arreglos, verifica primos y pinta el resultado.
// --------------------------------------------------
function calcular() {

  // Capturar el valor del formulario con getElementById
  var campoCantidad = document.getElementById("cantidad");
  var cantidad = parseInt(campoCantidad.value);

  // Referencia al área de resultado
  var areaResultado = document.getElementById("resultado");

  // --- Validación de entrada ---
  if (campoCantidad.value == "" || isNaN(cantidad) || cantidad < 1 || cantidad > 70) {
    areaResultado.innerHTML =
      "<p class='error-msg'>Por favor ingresa un número entero entre 1 y 70.</p>";
    return;
  }

  // --- Generar serie de Fibonacci + detectar primos ---
  // Variables para la serie (sin arrays)
  var a = 0;   // término actual F(n-2)
  var b = 1;   // término siguiente F(n-1)
  var c = 0;   // variable temporal para la suma

  var contadorPrimos    = 0;  // cuántos términos son primos
  var contadorTerminos  = 0;  // índice del término actual (1-based)

  // Construir filas de la tabla mientras se genera la serie
  var filasTabla = "";

  while (contadorTerminos < cantidad) {

    // El primer término es a=0, el segundo a=1;
    // a partir del tercero usamos la suma
    var termino = 0;

    if (contadorTerminos == 0) {
      termino = 0;
    } else if (contadorTerminos == 1) {
      termino = 1;
    } else {
      termino = a;  // 'a' ya fue actualizado en la iteración anterior
    }

    // Verificar si el término es primo
    var esPrimoTermino = esPrimo(termino);

    // Armar la clase y badge según sea primo o no
    var claseFila  = "";
    var badgeTexto = "";

    if (esPrimoTermino == true) {
      claseFila  = "fila-primo";
      badgeTexto = "<span class='badge-primo'>PRIMO</span>";
      contadorPrimos = contadorPrimos + 1;
    } else {
      claseFila  = "";
      badgeTexto = "<span class='badge-compuesto'>Compuesto</span>";
    }

    // Agregar fila a la tabla
    filasTabla = filasTabla +
      "<tr class='" + claseFila + "'>" +
        "<td>" + (contadorTerminos + 1) + "</td>" +
        "<td><strong>" + termino + "</strong></td>" +
        "<td>" + badgeTexto + "</td>" +
      "</tr>";

    // Avanzar en la serie: c = a + b, luego a = b, b = c
    c = a + b;
    a = b;
    b = c;

    contadorTerminos = contadorTerminos + 1;
  }

  // --- Pintar resultado en el HTML ---
  areaResultado.innerHTML =

    // Tarjeta resumen
    "<div class='resumen-card'>" +
      "<h3>Resumen</h3>" +
      "<div class='stat-bloque'>" +
        "<span class='stat-label'>Términos analizados</span>" +
        "<span class='stat-valor'>" + cantidad + "</span>" +
      "</div>" +
      "<div class='stat-bloque'>" +
        "<span class='stat-label'>Primos encontrados</span>" +
        "<span class='stat-valor' style='color:var(--primo)'>" + contadorPrimos + "</span>" +
      "</div>" +
    "</div>" +

    // Tabla de resultados
    "<p class='tabla-titulo'>Detalle término por término</p>" +
    "<table class='tabla-terminos'>" +
      "<thead>" +
        "<tr>" +
          "<th>N°</th>" +
          "<th>Término F(n)</th>" +
          "<th>¿Es primo?</th>" +
        "</tr>" +
      "</thead>" +
      "<tbody>" +
        filasTabla +
      "</tbody>" +
    "</table>";
}