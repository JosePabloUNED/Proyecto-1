import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import home from "./assets/home.jpg";



function Home() {

    const [error, setError] = useState("");
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        nameAccount: "",
        typeAccount: "",
        initialBalance: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nameAccount || !formData.typeAccount || !formData.initialBalance) {
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
                if (data.Message === "Account created successfully") {
                    navigate("/home"); // Redirect to home page
                } else {
                    setError(data.Message || "Error creating account.");
                }
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
                    Somos la herramienta que estructura sus asuntos personales sencilla y fácilmente. </p>

                <br></br> <br></br> 

                <h2> Registro de cuentas </h2>


                <form onSubmit={handleSubmit} className="form-container">
                    <label>
                        Account Name:
                        <input
                            type="text"
                            name="nameAccount"
                            value={formData.nameAccount}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Account Type:
                        <input
                            type="text"
                            name="typeAccount"
                            value={formData.typeAccount}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Initial Balance:
                        <input
                            type="number"
                            name="initialBalance"
                            value={formData.initialBalance}
                            onChange={handleChange}
                            required
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
