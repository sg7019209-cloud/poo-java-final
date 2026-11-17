// Ejercicio 3.1 · Jerarquía de dispositivos

class DispositivoIoT {
  constructor(id, direccionIP, conectado = false) {
    this.id = id;
    this.direccionIP = direccionIP;
    this.conectado = conectado;
  }

  conectar() {
    this.conectado = true;
    return `${this.id} conectado en ${this.direccionIP}`;
  }

  desconectar() {
    this.conectado = false;
    return `${this.id} desconectado`;
  }

  describir() {
    const estado = this.conectado ? "en línea" : "sin conexión";
    return `[${this.id}] ${this.direccionIP} (${estado})`;
  }
}

class CamaraSeguridad extends DispositivoIoT {
  constructor(id, direccionIP, resolucion) {
    super(id, direccionIP); // delegación obligatoria antes de usar this
    this.resolucion = resolucion;
    this.grabando = false;
  }

  iniciarGrabacion() {
    this.grabando = true;
    return `${this.id} grabando a ${this.resolucion}`;
  }
}

class TermostatoInteligente extends DispositivoIoT {
  constructor(id, direccionIP, temperaturaObjetivo = 22) {
    super(id, direccionIP);
    this.temperaturaObjetivo = temperaturaObjetivo;
  }

  ajustar(temperatura) {
    this.temperaturaObjetivo = temperatura;
    return `${this.id} ajustado a ${temperatura} °C`;
  }
}

const camara = new CamaraSeguridad("CAM-01", "192.168.1.10", "1080p");
const termostato = new TermostatoInteligente("TERM-01", "192.168.1.20");

console.log(camara.conectar());
console.log(camara.iniciarGrabacion());
console.log(termostato.conectar());
console.log(termostato.ajustar(24));

console.log(camara.describir());
console.log(termostato.describir());

// Los atributos de red se heredan de la superclase
console.log("camara instanceof DispositivoIoT:", camara instanceof DispositivoIoT); // true
console.log("termostato instanceof DispositivoIoT:", termostato instanceof DispositivoIoT); // true