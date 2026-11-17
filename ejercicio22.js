// Ejercicio 2.2 · Metáfora de caja negra: compuerta hidráulica
// El exterior solo puede invocar abrir() y cerrar().

class CompuertaHidraulica {
  #estado = "cerrada";
  #temporizador = null;
  #duracionMs;

  constructor(duracionMs = 1000) {
    this.#duracionMs = duracionMs;
  }

  // Solo lectura del estado
  get estado() {
    return this.#estado;
  }

  abrir() {
    return this.#iniciarTransicion("abriendo", "abierta");
  }

  cerrar() {
    return this.#iniciarTransicion("cerrando", "cerrada");
  }

  // Método privado: el exterior no puede invocarlo
  #iniciarTransicion(intermedio, final) {
    if (this.#estado === final || this.#estado === intermedio) {
      return false; // ya está en ese estado o yendo hacia él
    }
    clearTimeout(this.#temporizador); // cancela una transición anterior
    this.#estado = intermedio;
    this.#temporizador = setTimeout(() => {
      this.#estado = final;
      this.#temporizador = null;
      console.log(`[compuerta] ahora está ${this.#estado}`);
    }, this.#duracionMs);
    return true;
  }
}

const compuerta = new CompuertaHidraulica(1000);
console.log("Estado inicial:", compuerta.estado); // cerrada

console.log("abrir() ->", compuerta.abrir()); // true
console.log("Estado:", compuerta.estado); // abriendo
console.log("abrir() otra vez ->", compuerta.abrir()); // false

// El exterior NO puede alterar los campos internos
compuerta.temporizador = 0; // crea una propiedad pública nueva; no toca #temporizador
compuerta.estado = "abierta"; // el getter no tiene set: se ignora
console.log("Estado tras intentar forzarlo:", compuerta.estado); // abriendo

try {
  eval("compuerta.#temporizador");
} catch (error) {
  console.log("Acceso a #temporizador desde fuera:", error.name); // SyntaxError
}

setTimeout(() => {
  console.log("Estado a los 1.5 s:", compuerta.estado); // abierta
  compuerta.cerrar();
}, 1500);