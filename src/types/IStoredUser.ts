import type { Rol } from "./Rol";

export interface IStoredUser {
  email: string;
  password: string;
  role: Rol;
}