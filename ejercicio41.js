// Ejercicio 4.1 · Simulador de renderizado: polimorfismo con dibujar()
// Nunca se verifica el tipo con instanceof.

class Circulo {
  constructor(radio) {
    this.radio = radio;
  }
  dibujar() {
    const area = Math.PI * this.radio ** 2;
    console.log(`Círculo de radio ${this.radio} -> área = π·r² = ${area.toFixed(2)}`);
  }
}

class Rectangulo {
  constructor(base, altura) {
    this.base = base;
    this.altura = altura;
  }
  dibujar() {
    const area = this.base * this.altura;
    console.log(`Rectángulo ${this.base}x${this.altura} -> área = b·h = ${area}`);
  }
}

class Triangulo {
  constructor(base, altura) {
    this.base = base;
    this.altura = altura;
  }
  dibujar() {
    const area = (this.base * this.altura) / 2;
    console.log(`Triángulo ${this.base}x${this.altura} -> área = b·h/2 = ${area}`);
  }
}

// Colección heterogénea
const figuras = [new Circulo(3), new Rectangulo(4, 5), new Triangulo(6, 2)];

// El método correcto se resuelve en tiempo de ejecución (enlace tardío)
figuras.forEach((figura) => figura.dibujar());