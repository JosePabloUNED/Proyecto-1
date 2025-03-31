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
    <div className="containerbox">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <label className="forminput" htmlFor="email">Email:</label>
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
                <label htmlFor="password">Password:</label>
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
                <input
                    type="checkbox"
                    id="rememberme"
                    name="rememberme"
                    checked={rememberme}
                    onChange={handleChange} /><span>Remember Me</span>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
            <div>
                <button onClick={handleRegisterClick}>Register</button>
            </div>
        </form>
        {error && <p className="error">{error}</p>}
    </div>
);
}

export default Login;