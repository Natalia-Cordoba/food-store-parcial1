import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getUser, removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const checkAuthUser = (
  loginRedirect: string,
  roleRedirect: string,
  rol: Rol
) => {
  console.log("comienzo de checkeo");

  const user = getUser();

  if (!user) {
    console.log("No hay sesión");
    navigate(loginRedirect);
    return;
  }

  const parseUser: IUser = JSON.parse(user);
  
  if (parseUser.role !== rol) {
    console.log("No tiene permisos");
    navigate(roleRedirect);
    return;
  }

  console.log("Acceso autorizado");
};

export const logout = () => {
  removeUser();
  navigate("/src/pages/auth/login/login.html");
};