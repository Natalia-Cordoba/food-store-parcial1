import type { IUser } from "../types/IUser";

export const saveUser = (user: IUser) => {
  //const parseUser = JSON.stringify(user);
  //localStorage.setItem("userData", parseUser);
  localStorage.setItem(
    "userData",
    JSON.stringify(user)
  );
};

export const getUser = () => {
  return localStorage.getItem("userData");
};

export const removeUser = () => {
  localStorage.removeItem("userData");
};