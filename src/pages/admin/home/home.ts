import { checkAuthUser, logout } from "../../../utils/auth";
import { PRODUCTS } from "../../../data/data";

const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

const tablaProductosAdmin = () => {

 const tabla =
  document.getElementById(
   "tabla-productos"
  );

 if(!tabla) return;

 PRODUCTS.forEach(producto => {

   const fila =
    document.createElement("tr");

   fila.innerHTML = `
     <td>${producto.id}</td>

     <td>
      <img
       src="${producto.imagen}"
       alt="${producto.nombre}"
       width="50"
      >
     </td>

     <td>${producto.nombre}</td>
     <td>${producto.categorias[0].nombre}</td>
     <td>$${producto.precio}</td>
     <td>${producto.stock}</td>

     <td>
       <a href="#">Editar</a> |
       <a href="#">Eliminar</a>
     </td>
   `;

   tabla.appendChild(fila);

 });

};

const initPage = () => {
  console.log("inicio de pagina");
  checkAuthUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/store/home/home.html",
    "admin"
  );
  tablaProductosAdmin();
};
initPage();