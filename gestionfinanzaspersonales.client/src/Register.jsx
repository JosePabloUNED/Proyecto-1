import "./components/css/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLoginClick = () => {
        navigate("/");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "userName") setUserName(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Sending data:", { email, userName, password });

        if (!email || !userName || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            setSuccess("");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            setSuccess("");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setSuccess("");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            setSuccess("");
            return;
        }

        setError("");

        fetch("http://localhost:5148/api/Account/Register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.trim(),
                userName: userName.trim(),
                password: password.trim(),
            }),
        })
            .then((response) => {
                console.log("Response status:", response.status);

                if (!response.ok) {
                    // Handle 404 or 405 errors more gracefully
                    return response.text().then((text) => {
                        // If the response body has an error message, display it
                        const errorMessage = text || `Error: ${response.status}`;
                        throw new Error(errorMessage);
                    });
                }

                // If the response is OK, parse the response body as JSON
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
                if (data.message === "User registered successfully") {
                    setSuccess("Registration successful. Redirecting to login...");
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                } else {
                    setError(data.message || "Error registering.");
                    setSuccess("");
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                setError(error.message || "Error registering");
            });
    };

    return (
        <div className="container-forms">
            <h3>Registro de usuarios</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Correo:</label>
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="userName">Nombre de usuario:</label>
                </div>
                <div>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={userName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirme contraseña:</label>
                </div>
                <div>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <br></br>
                <div className="button-container">
                    <button type="submit">Registrarse</button>
               
                    <button type="button" onClick={handleLoginClick}>Inciar sesión</button>
                </div>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
}

export default Register;