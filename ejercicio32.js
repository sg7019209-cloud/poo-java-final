// Ejercicio 3.2 · Sobreescritura controlada: consumoEnergetico()

class DispositivoIoT {
  constructor(id, direccionIP, potenciaBaseW) {
    this.id = id;
    this.direccionIP = direccionIP;
    this.conectado = false;
    this.potenciaBaseW = potenciaBaseW;
  }

  // Consumo base en kWh para un número de horas
  consumoEnergetico(horas) {
    return (this.potenciaBaseW * horas) / 1000;
  }
}

class CamaraSeguridad extends DispositivoIoT {
  static FACTOR = 1.8; // sensor + almacenamiento + transmisión de video

  constructor(id, direccionIP, potenciaBaseW, grabando = true) {
    super(id, direccionIP, potenciaBaseW);
    this.grabando = grabando;
  }

  consumoEnergetico(horas) {
    const base = super.consumoEnergetico(horas); // reutiliza el cálculo del padre
    return this.grabando ? base * CamaraSeguridad.FACTOR : base;
  }
}

class TermostatoInteligente extends DispositivoIoT {
  static FACTOR = 0.6; // trabaja por ciclos, no de forma continua

  consumoEnergetico(horas) {
    return super.consumoEnergetico(horas) * TermostatoInteligente.FACTOR;
  }
}

const dispositivos = [
  new DispositivoIoT("GEN-01", "192.168.1.5", 10),
  new CamaraSeguridad("CAM-01", "192.168.1.10", 12),
  new TermostatoInteligente("TERM-01", "192.168.1.20", 8),
];

const HORAS = 24;
for (const d of dispositivos) {
  console.log(
    `${d.constructor.name} (${d.id}): ${d.consumoEnergetico(HORAS).toFixed(3)} kWh en ${HORAS} h`
  );
}