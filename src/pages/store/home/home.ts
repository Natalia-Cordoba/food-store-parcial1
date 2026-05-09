// importaciones
import { checkAuthUser, logout } from "../../../utils/auth";
import { PRODUCTS, getCategories } from "../../../data/data";
import type { Product } from "../../../types/product";
import type { CartItem } from "../../../types/product";

// referencias del DOM
const buttonLogout = document.getElementById(
    "logoutButton"
) as HTMLButtonElement;

const listaCategorias = document.getElementById(
    "lista-categorias"
) as HTMLUListElement;

const contenedor = document.getElementById(
    "contenedor-productos"
) as HTMLElement;

const inputBusqueda = document.getElementById(
    "buscarProducto"
) as HTMLInputElement;

const contadorCarrito = document.getElementById(
    "contador-carrito"
) as HTMLSpanElement;

// Cierre de sesión
buttonLogout?.addEventListener("click", () => {
    logout();
});

// Obtener carrito
const obtenerCarrito = (): CartItem[] => {

    const carritoStorage = localStorage.getItem("cart");

    if (!carritoStorage) {
        return [];
    }

    return JSON.parse(carritoStorage) as CartItem[];

};

// Actualizar contador de productos del carrito
const actualizarContadorCarrito = () => {

    const carrito = obtenerCarrito();

    const cantidadTotal =
        carrito.reduce((acc, producto) =>
            acc + producto.cantidad,
            0
        );

    contadorCarrito.textContent =
        cantidadTotal.toString();

};

// Agregar al carrito
const agregarAlCarrito = (producto: Product) => {

    const carrito = obtenerCarrito();

    const productoExistente =
        carrito.find(item =>
            item.id === producto.id
        );

    // si existe aumenta cantidad
    if (productoExistente) {

        productoExistente.cantidad += 1;

    } else {

        // si no existe lo agrega
        carrito.push({
            ...producto,
            cantidad: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(carrito)
    );

    actualizarContadorCarrito();

};


// Carga de productos
const cargarProductos = (productos: Product[]) => {

    contenedor.innerHTML = "";

    if (productos.length === 0) {

        contenedor.innerHTML = `
            <p>No se encontraron productos</p>
        `;

        return;
    }

    productos.forEach(producto => {

        const article = document.createElement("article");

        article.classList.add("producto");

        article.innerHTML = `
            <img 
                src="${producto.imagen}" 
                alt="${producto.nombre}"
            >
            <h3>${producto.categorias[0].nombre}</h3>
            <h4>${producto.nombre}</h4>
            <p>${producto.descripcion}</p>
        `;

        // Contenedor precio y boton para agregar al carrito
        const footerCard = document.createElement("div");

        footerCard.classList.add("footer-producto");

        const precio = document.createElement("p");

        precio.classList.add("precio-producto");

        precio.textContent = `$${producto.precio}`;

        const btnCarrito = document.createElement("button");

        btnCarrito.textContent = "+ Agregar al carrito";

        btnCarrito.addEventListener("click", () => {
            agregarAlCarrito(producto);
        }
        );

        footerCard.append(
            precio,
            btnCarrito
        );

        article.appendChild(footerCard);

        contenedor.appendChild(article);

    });

};

// Carga de categorías
const cargarCategorias = () => {

    listaCategorias.innerHTML = "";

    // categoría todos los productos
    const liTodos = document.createElement("li");

    liTodos.classList.add("categoria");

    liTodos.innerHTML = `
        <a href="#">Todos los productos</a>
    `;

    const linkTodos = liTodos.querySelector("a");
    linkTodos?.classList.add("categoria-activa");

    liTodos.addEventListener("click", () => {

        document
            .querySelectorAll(".categoria a")
            .forEach(link => {
                link.classList.remove(
                    "categoria-activa"
                );
            });

        linkTodos?.classList.add(
            "categoria-activa"
        );

        cargarProductos(PRODUCTS);

    });

    listaCategorias.appendChild(liTodos);

    // categorías individuales de productos
    const categorias = getCategories();

    categorias.forEach(categoria => {

        const li = document.createElement("li");

        li.classList.add("categoria");

        li.innerHTML = `
            <a href="#">${categoria.nombre}</a>
        `;

        //li.addEventListener("click", () => {

        const linkCategoria =
            li.querySelector("a");

        li.addEventListener("click", () => {

            document
                .querySelectorAll(".categoria a")
                .forEach(link => {
                    link.classList.remove(
                        "categoria-activa"
                    );
                });

            linkCategoria?.classList.add(
                "categoria-activa"
            );

            const productosFiltrados =
                PRODUCTS.filter(producto =>
                    producto.categorias.some(cat =>
                        cat.nombre === categoria.nombre
                    )
                );

            cargarProductos(productosFiltrados);

        });

        listaCategorias.appendChild(li);
    });
};

// Búsqueda por nombre
inputBusqueda.addEventListener("input", () => {

    const textoBusqueda = inputBusqueda.value.toLowerCase();

    const productosFiltrados = PRODUCTS.filter(producto => producto
        .nombre
        .toLowerCase()
        .includes(textoBusqueda)
    );

    cargarProductos(productosFiltrados);
});

//Inicialización
const initPage = () => {

    checkAuthUser(
        "/src/pages/auth/login/login.html",
        "/src/pages/admin/home/home.html",
        "client"
    );
    cargarCategorias();
    cargarProductos(PRODUCTS);
    actualizarContadorCarrito();
};

initPage();