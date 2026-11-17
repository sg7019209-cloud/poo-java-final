// Ejercicio 1.2 · Análisis de referencias: objetos vs primitivos

class Vehiculo {
  constructor(matricula, velocidad) {
    this.matricula = matricula;
    this.velocidad = velocidad;
  }
}

// --- 1. Primitivos: se copia el valor ---
let a = 40;
let b = a;
b += 20;
console.log("Primitivos -> a:", a, "| b:", b); // a: 40 | b: 60

// --- 2. Objetos: se copia la referencia ---
const auto1 = new Vehiculo("XYZ-123", 40);
let auto2 = auto1; // dos nombres, un solo objeto
auto2.velocidad = 60; // MUTAR afecta a todas las referencias
console.log("Después de mutar -> auto1.velocidad:", auto1.velocidad); // 60
console.log("auto1 === auto2:", auto1 === auto2); // true

// --- 3. Reasignar una variable solo cambia hacia dónde apunta ---
auto2 = new Vehiculo("ABC-999", 10); // auto2 ahora apunta a otro objeto
console.log("Después de reasignar -> auto1:", auto1); // sigue intacto
console.log("Después de reasignar -> auto2:", auto2);
console.log("auto1 === auto2:", auto1 === auto2); // false

// --- 4. Paso a una función: primitivo vs objeto ---
function modificarPrimitivo(n) {
  n += 100; // solo cambia la copia local
  return n;
}

function mutarObjeto(v) {
  v.velocidad += 100; // cambia el objeto compartido
}

function reasignarObjeto(v) {
  v = new Vehiculo("NUEVO-000", 0); // solo cambia la variable local
  return v;
}

let numero = 5;
modificarPrimitivo(numero);
console.log("Primitivo tras la función:", numero); // 5 (no cambió)

mutarObjeto(auto1);
console.log("Objeto tras mutarlo en la función:", auto1.velocidad); // 160

reasignarObjeto(auto1);
console.log("Objeto tras reasignar dentro de la función:", auto1.matricula); // XYZ-123