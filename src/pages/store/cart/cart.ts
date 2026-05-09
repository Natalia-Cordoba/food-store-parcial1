// Importaciones
import { checkAuthUser, logout } from "../../../utils/auth";
import type { CartItem } from "../../../types/product";

// Referencias DOM
const buttonLogout = document.getElementById(
    "logoutButton"
) as HTMLButtonElement;

const contenedorCarrito = document.getElementById(
    "contenedor-carrito"
) as HTMLDivElement;

// Cierre de sesión
buttonLogout?.addEventListener("click", () => {
    logout();
});

// Obtener carrito del localStorage
const obtenerCarrito = (): CartItem[] => {

    const carritoStorage =
        localStorage.getItem("cart");

    if (!carritoStorage) {
        return [];
    }

    return JSON.parse(carritoStorage);
};

// Guardar el carrito en el localStorage
const guardarCarrito = (
    carrito: CartItem[]
) => {

    localStorage.setItem(
        "cart",
        JSON.stringify(carrito)
    );

};

// Renderizar carrito
const cargarCarrito = () => {

    const carrito = obtenerCarrito();

    contenedorCarrito.innerHTML = "";

    // Carrito vacío
    if (carrito.length === 0) {

        contenedorCarrito.innerHTML = `
      <section class="carrito-vacio">
        <h3>🛒 Tu carrito está vacío</h3>

        <a href="../home/home.html">
          Ver catálogo de productos
        </a>
      </section>
    `;

        return;
    }

    let total = 0;

    // Contenedor principal
    const carritoProductos = document.createElement("section");

    carritoProductos.classList.add("carrito-productos");

    // Lista de productos
    const listaProductos = document.createElement("div");

    listaProductos.classList.add("lista-productos");

    // Resumen
    const resumen = document.createElement("aside");

    resumen.classList.add("resumen-carrito");

    // Productos
    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        const article = document.createElement("article");

        article.classList.add("producto-carrito");

        article.innerHTML = `
        <div class="producto-info">

            <img 
                src="${producto.imagen}" 
                alt="${producto.nombre}"
            >

            <div class="producto-texto">

                <h3>${producto.nombre}</h3>

                <p class="categoria">
                    ${producto.categorias[0].nombre}
                </p>

                <p class="subtotal">
                    Subtotal: $${subtotal}
                </p>

            </div>

        </div>
    `;

        // Acciones
        const acciones =
            document.createElement("div");

        acciones.classList.add(
            "producto-acciones"
        );

        // Botón -
        const btnMenos =
            document.createElement("button");

        btnMenos.textContent = "-";

        btnMenos.addEventListener(
            "click",
            () => {
                disminuirCantidad(producto.id);
            }
        );

        // Cantidad
        const cantidad = document.createElement("span");

        cantidad.textContent = producto.cantidad.toString();

        // Botón +
        const btnMas = document.createElement("button");

        btnMas.textContent = "+";

        btnMas.addEventListener(
            "click",
            () => {
                aumentarCantidad(producto.id);
            }
        );

        // Botón eliminar
        const btnEliminar = document.createElement("button");

        btnEliminar.classList.add("btn-eliminar");

        btnEliminar.textContent =
            "Eliminar";

        btnEliminar.addEventListener(
            "click",
            () => {
                eliminarProducto(producto.id);
            }
        );

        // Controles cantidad
        const controlCantidad =
            document.createElement("div");

        controlCantidad.classList.add(
            "cantidad-control"
        );

        controlCantidad.append(
            btnMenos,
            cantidad,
            btnMas
        );

        acciones.append(
            controlCantidad,
            btnEliminar
        );

        article.appendChild(acciones);

        listaProductos.appendChild(article);

    });

    // Resumen HTML
    resumen.innerHTML = `
    <h2>Resumen</h2>

    <div class="linea-resumen">
      <p>Subtotal</p>
      <p>$${total}</p>
    </div>

    <hr>

    <div class="linea-total">
      <h3>Total</h3>
      <h3>$${total}</h3>
    </div>

    <button class="btn-finalizar">
      Finalizar compra
    </button>

    <p class="checkout-info">
      ⚠️ El checkout no está disponible
      en esta versión.
    </p>

    <button class="btn-vaciar">
      Vaciar carrito
    </button>
  `;
    const btnVaciar =
        resumen.querySelector(
            ".btn-vaciar"
        ) as HTMLButtonElement;

    btnVaciar.addEventListener(
        "click",
        vaciarCarrito
    );

    // Append
    carritoProductos.append(
        listaProductos,
        resumen
    );

    contenedorCarrito.appendChild(carritoProductos);

};



// Aumentar cantidad de productos del carrito
const aumentarCantidad = (
    idProducto: number
) => {

    const carrito = obtenerCarrito();

    const producto =
        carrito.find(item =>
            item.id === idProducto
        );

    if (producto) {

        producto.cantidad += 1;

    }

    guardarCarrito(carrito);

    cargarCarrito();

};

// Disminuir cantidad de productos del carrito
const disminuirCantidad = (
    idProducto: number
) => {

    const carrito = obtenerCarrito();

    const producto =
        carrito.find(item =>
            item.id === idProducto
        );

    if (
        producto &&
        producto.cantidad > 1
    ) {

        producto.cantidad -= 1;

    }

    guardarCarrito(carrito);

    cargarCarrito();

};

// Eliminar un producto del carrito
const eliminarProducto = (
    idProducto: number
) => {

    const carritoFiltrado =
        obtenerCarrito().filter(
            producto =>
                producto.id !== idProducto
        );

    guardarCarrito(carritoFiltrado);

    cargarCarrito();

};

// Vaciar el carrito
const vaciarCarrito = () => {

    localStorage.removeItem("cart");

    cargarCarrito();

};

// Inicialización
const initPage = () => {

    checkAuthUser(
        "/src/pages/auth/login/login.html",
        "/src/pages/admin/home/home.html",
        "client"
    );

    cargarCarrito();

};

initPage();