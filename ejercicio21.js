// Ejercicio 2.1 · Validación de invariantes: SensorPresion

class SensorPresion {
  #valorPSI = 0;

  constructor(valorInicial = 0) {
    this.valorPSI = valorInicial; // pasa por el set
  }

  get valorPSI() {
    return this.#valorPSI;
  }

  set valorPSI(valor) {
    if (typeof valor !== "number" || Number.isNaN(valor)) {
      throw new TypeError("La presión debe ser un número");
    }
    if (valor < 0) {
      throw new RangeError("La presión no puede ser negativa");
    }
    if (valor > 200) {
      throw new RangeError("La presión no puede superar 200 PSI");
    }
    this.#valorPSI = valor;
  }
}

const sensor = new SensorPresion(50);
console.log("Valor inicial:", sensor.valorPSI); // 50

// Pruebas: valor válido, -5, 250 y un texto
for (const prueba of [120, -5, 250, "abc"]) {
  try {
    sensor.valorPSI = prueba;
    console.log(`Asignado ${prueba} -> valor actual: ${sensor.valorPSI}`);
  } catch (error) {
    console.log(`Rechazado ${JSON.stringify(prueba)} -> ${error.name}: ${error.message}`);
  }
}
console.log("Valor final (no se corrompió):", sensor.valorPSI); // 120

// Intento de acceder al campo privado desde fuera de la clase
try {
  eval("sensor.#valorPSI"); // fuera de la clase: SyntaxError
} catch (error) {
  console.log("Acceso a #valorPSI desde fuera:", error.name);
}