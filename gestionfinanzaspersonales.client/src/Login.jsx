//import styles from "./components/css/Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberme, setRememberme] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberme") setRememberme(e.target.checked);
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields.");
        } else {
            setError("");
            fetch("http://localhost:5148/api/Account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    rememberMe: rememberme
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === "Login successful") {
                        console.log("IM HERE HIII");
                        localStorage.setItem('userId', data.userId);

                        navigate("/home"); // Redirect to home page
                    } else {
                        setError(data.message || "Error Logging In.");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setError("Network error. Please try again later.");
                });
        }
    };

    return (
        <div className={styles["container-forms"]}>
            <h2>Sistema Gestor de Finanzas Personales</h2>
            <h3>Incio de sesión</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles["container-input"]}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder=" "
                    />
                    <label htmlFor="email">Correo <span className={styles["req"]}>*</span></label>
                </div>
                <div className={styles["container-input"]}>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        placeholder=" "
                    />
                    <label htmlFor="password">Contraseña  <span className={styles["req"]}>*</span></label>
                </div>
                <div className={styles["button-container"]}>
                    <button type="submit">Iniciar sesión</button>
                    <button type="button" onClick={handleRegisterClick}>Registrarse</button>
                </div>
            </form>
            {error && <p className={styles["error"]}>{error}</p>}
        </div>
    );
}

export default Login;