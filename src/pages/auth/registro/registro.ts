import type { IStoredUser } from "../../../types/IStoredUser";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("register") as HTMLFormElement;

const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();

    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();

    if (!email || !password) return;

    if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres");
        return;
    }

    const usersStorage = localStorage.getItem("users");

    const users: IStoredUser[] = usersStorage
        ? JSON.parse(usersStorage)
        : [];

    const userExists = users.some(
        user => user.email === email
    );

    if (userExists) {
        alert("Ese usuario ya está registrado");
        return;
    }

    const newUser: IStoredUser = {
        email,
        password,
        role: "client"
    };

    users.push(newUser);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Registro exitoso");

    navigate("/src/pages/auth/login/login.html");
});