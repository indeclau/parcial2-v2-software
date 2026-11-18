// Nueva sección (feature-nueva-seccion): resumen con contadores, barra de progreso y filtros.
(function () {
  "use strict";

  var filtro = "todas";

  // app.js consulta este filtro al dibujar el listado.
  window.filtroTareas = function () { return filtro; };

  function actualizarResumen(tareas) {
    var total = tareas.length;
    var hechas = tareas.filter(function (t) { return t.hecha; }).length;
    var porcentaje = total ? Math.round((hechas / total) * 100) : 0;

    document.getElementById("cont-total").textContent = total;
    document.getElementById("cont-pendientes").textContent = total - hechas;
    document.getElementById("cont-hechas").textContent = hechas;
    document.getElementById("barra-progreso").style.width = porcentaje + "%";
    document.querySelector(".progreso").setAttribute("aria-valuenow", porcentaje);
    document.getElementById("texto-progreso").textContent = porcentaje + "% completado";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var botones = document.querySelectorAll(".filtro");
    botones.forEach(function (boton) {
      boton.addEventListener("click", function () {
        filtro = boton.getAttribute("data-filtro");
        botones.forEach(function (b) { b.classList.toggle("activo", b === boton); });
        window.gestorTareas.rerender();
      });
    });

    window.gestorTareas.suscribir(actualizarResumen);
  });
})();
