// Ejercicio 1.1 · Modelado de coordenadas: Punto3D (Java -> JavaScript ES6+)
class Punto3D {
    constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    }

  // Distancia euclidiana: √(dx² + dy² + dz²)
  // Si no se pasa otro punto, se mide hasta el origen (0, 0, 0)
    calcularDistancia(otro = new Punto3D(0, 0, 0)) {
    const dx = this.x - otro.x;
    const dy = this.y - otro.y;
    const dz = this.z - otro.z;
    return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
    }

    toString() {
    return `(${this.x}, ${this.y}, ${this.z})`;
    }
}

// Creación de instancias con new
const a = new Punto3D(1, 2, 2);
const b = new Punto3D(4, 6, 2);

console.log(`a = ${a}`);
console.log(`Distancia de a al origen: ${a.calcularDistancia()}`); // 3
console.log(`Distancia de a a b: ${a.calcularDistancia(b)}`); // 5

// Comparación de referencias con ===
const c = new Punto3D(1, 2, 2);
const d = a;
console.log("a === c (mismos valores, distinto objeto):", a === c); // false
console.log("a === d (misma referencia):", a === d); // true
console.log("a es instancia de Punto3D:", a instanceof Punto3D); // true