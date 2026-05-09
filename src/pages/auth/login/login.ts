import type { IStoredUser } from "../../../types/IStoredUser";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value.trim();
  const valuePassword = inputPassword.value.trim();

  if (!valueEmail || !valuePassword) return;

  const usersStorage = localStorage.getItem("users");

  if (!usersStorage) {
    alert("No hay usuarios registrados");
    return;
  }

  const users: IStoredUser[] = JSON.parse(usersStorage);

  const userFound = users.find(
    user =>
      user.email === valueEmail &&
      user.password === valuePassword
  );

  if (!userFound) {
    alert("Email o contraseña incorrectos");
    return;
  }

  localStorage.setItem(
    "userData",
    JSON.stringify({
      email: userFound.email,
      role: userFound.role
    })
  );

  if (userFound.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else {
    navigate("/src/pages/store/home/home.html");
  }
});
