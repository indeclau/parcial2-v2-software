// Gestor de Tareas: agregar, completar y borrar tareas, guardadas en localStorage.
(function () {
  "use strict";

  var CLAVE = "parcial2-tareas";

  var TAREAS_INICIALES = [
    { id: 1, texto: "Crear el repositorio parcial2-v2-software", prioridad: "alta", hecha: true },
    { id: 2, texto: "Escribir el Dockerfile con nginx:alpine", prioridad: "media", hecha: true },
    { id: 3, texto: "Hacer el merge de feature-nueva-seccion", prioridad: "media", hecha: false },
    { id: 4, texto: "Adjuntar las capturas al informe", prioridad: "baja", hecha: false }
  ];

  var form = document.getElementById("form-tarea");
  var input = document.getElementById("input-tarea");
  var selectPrioridad = document.getElementById("select-prioridad");
  var lista = document.getElementById("lista-tareas");
  var vacia = document.getElementById("lista-vacia");

  function cargar() {
    try {
      var guardadas = JSON.parse(localStorage.getItem(CLAVE));
      if (Array.isArray(guardadas)) return guardadas;
    } catch (e) { /* almacenamiento no disponible o dato corrupto */ }
    return TAREAS_INICIALES.slice();
  }

  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(tareas)); } catch (e) { /* se ignora */ }
  }

  var tareas = cargar();

  // Punto de extensión: otras secciones pueden reaccionar a los cambios del listado.
  var suscriptores = [];
  function notificar() {
    suscriptores.forEach(function (fn) { fn(tareas); });
  }

  function filtroActual() {
    return window.filtroTareas ? window.filtroTareas() : "todas";
  }

  function render() {
    var filtro = filtroActual();
    var visibles = tareas.filter(function (t) {
      if (filtro === "pendientes") return !t.hecha;
      if (filtro === "hechas") return t.hecha;
      return true;
    });

    lista.innerHTML = "";
    visibles.forEach(function (t) {
      var li = document.createElement("li");
      li.className = "tarea" + (t.hecha ? " hecha" : "");

      var check = document.createElement("input");
      check.type = "checkbox";
      check.checked = t.hecha;
      check.setAttribute("aria-label", "Marcar como hecha");
      check.addEventListener("change", function () {
        t.hecha = check.checked;
        actualizar();
      });

      var texto = document.createElement("span");
      texto.className = "texto";
      texto.textContent = t.texto;

      var prioridad = document.createElement("span");
      prioridad.className = "prioridad " + t.prioridad;
      prioridad.textContent = t.prioridad;

      var borrar = document.createElement("button");
      borrar.className = "boton-borrar";
      borrar.type = "button";
      borrar.textContent = "✕";
      borrar.setAttribute("aria-label", "Eliminar tarea");
      borrar.addEventListener("click", function () {
        tareas = tareas.filter(function (x) { return x.id !== t.id; });
        actualizar();
      });

      li.append(check, texto, prioridad, borrar);
      lista.appendChild(li);
    });

    vacia.hidden = visibles.length > 0;
  }

  function actualizar() {
    guardar();
    render();
    notificar();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var texto = input.value.trim();
    if (!texto) return;
    tareas.push({ id: Date.now(), texto: texto, prioridad: selectPrioridad.value, hecha: false });
    input.value = "";
    actualizar();
  });

  window.gestorTareas = {
    suscribir: function (fn) { suscriptores.push(fn); fn(tareas); },
    rerender: render
  };

  render();
})();
