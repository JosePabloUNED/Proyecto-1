import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import home from "./assets/home.jpg";
import React, { useState, useEffect } from "react";

function Home() {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        idAccount: "",
        nameAccount: "",
        typeAccount: "",
        initialBalance: 0
    });

    useEffect(() => {
        // Generate the account ID when the component mounts
        const generateAccountId = () => {
            const part1 = Math.floor(1000 + Math.random() * 9000).toString();
            const part2 = Math.floor(1000 + Math.random() * 9000).toString();
            return `CR-${part1}-${part2}`;
        };

        setFormData((prevFormData) => ({
            ...prevFormData,
            idAccount: generateAccountId()
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nameAccount || !formData.typeAccount) {
            setError("Please fill out all fields.");
            return;
        }

        setError("");

        fetch("http://localhost:5148/api/Account/CreateAccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                NameAccount: formData.nameAccount,
                TypeAccount: formData.typeAccount,
                InitialBalance: parseFloat(formData.initialBalance)
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("API Response:", data);
               
                navigate("/home"); // Redirect to home page
                window.location.reload(); // Refresh the page

                alert("Cuenta registrada exitosamente");
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                setError("Network error. Please try again later.");
            });
    };

    return (
        <div>
            <Nav />
            <h1>Sistema de Gestión de Finanzas Personales</h1>
            <div className="container">
                <img src={home} alt="Gestión de Finanzas" title="Gestión de finanzas personales" className="small-image" />
                <p className="image-caption">Gestiona tus finanzas personales con nosotros, crea presupuestos y organiza tus ingresos y gastos de forma segura.
                    Somos la herramienta que estructura sus asuntos personales sencilla y fácilmente.
                </p>

                <br></br> <br></br>

                <h2> Registro de cuentas </h2>

                <form onSubmit={handleSubmit} className="form-container">
                    <label>
                        Número de cuenta::
                        <input
                            type="text"
                            name="idAccount"
                            value={formData.idAccount}
                            readOnly
                        />
                    </label>
                    <label>
                        Nombre de la cuenta:
                        <input
                            type="text"
                            name="nameAccount"
                            value={formData.nameAccount}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Tipo de cuenta:
                        <select
                            name="typeAccount"
                            value={formData.typeAccount}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona una categoría</option>
                            <option value="Ahorros">Ahorros</option>
                            <option value="Corriente">Corriente</option>
                            <option value="Crédito">Crédito</option>
                            <option value="Inversión">Inversión</option>
                        </select>
                    </label>

                    <label>
                        Balance inicial:
                        <input
                            type="number"
                            name="initialBalance"
                            value={formData.initialBalance}
                            onChange={handleChange}
                            readOnly

                        />
                    </label>

                    <button type="submit">Create Account</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>

            <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>

            <Footer />
        </div>
    );
}

export default Home;