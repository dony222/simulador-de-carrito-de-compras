const productos = [
  { nombre: "Laptop", precio: 2500 },
  { nombre: "Mouse", precio: 80 },
  { nombre: "Teclado", precio: 150 },
  { nombre: "Monitor", precio: 900 },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>S/ ${producto.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(${index})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(index) {
  carrito.push(productos[index]);
  guardarCarrito();
  actualizarCarrito();
}

function eliminarDelCarrito(i) {
  carrito.splice(i, 1);
  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("carrito");
  lista.innerHTML = "";
  let total = 0;
  carrito.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - S/ ${item.precio.toFixed(2)} <button onclick="eliminarDelCarrito(${i})">❌</button>`;
    lista.appendChild(li);
    total += item.precio;
  });
  document.getElementById("total").textContent = total.toFixed(2);
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

mostrarProductos();
actualizarCarrito();
