// Ejercicio 4.2 · Desacoplamiento arquitectónico: despachador de eventos (duck typing)

class DespachadorEventos {
  #suscriptores = [];

  suscribir(objeto) {
    // Contrato implícito: el objeto debe saber hacer actualizarEstado()
    if (!objeto || typeof objeto.actualizarEstado !== "function") {
      throw new TypeError("El objeto debe implementar actualizarEstado()");
    }
    this.#suscriptores.push(objeto);
    return this;
  }

  emitir(evento) {
    console.log(`\n>> Emitiendo evento: ${evento}`);
    this.#suscriptores.forEach((s) => s.actualizarEstado(evento));
  }
}

// Clases sin relación entre sí (no comparten superclase)
class PanelWeb {
  actualizarEstado(evento) {
    console.log(`[PanelWeb] Mostrando en pantalla: ${evento}`);
  }
}

class RegistroLog {
  actualizarEstado(evento) {
    console.log(`[RegistroLog] ${new Date().toISOString()} - ${evento}`);
  }
}

class AlarmaSonora {
  actualizarEstado(evento) {
    console.log(`[AlarmaSonora] BEEP por: ${evento}`);
  }
}

// Un objeto literal también cumple el contrato
const medidorLiteral = {
  actualizarEstado(evento) {
    console.log(`[Medidor literal] Registré: ${evento}`);
  },
};

const despachador = new DespachadorEventos();
despachador
  .suscribir(new PanelWeb())
  .suscribir(new RegistroLog())
  .suscribir(new AlarmaSonora())
  .suscribir(medidorLiteral);

despachador.emitir("Presión alta en tubería 3");

// Un objeto que NO cumple el contrato es rechazado
try {
  despachador.suscribir({ nombre: "No sabe actualizarEstado" });
} catch (error) {
  console.log(`\nRechazado: ${error.name} - ${error.message}`);
}