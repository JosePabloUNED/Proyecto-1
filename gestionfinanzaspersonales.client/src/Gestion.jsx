import React, { useState, useEffect } from "react";
import Nav from "./components/Nav.jsx";
import { useNavigate } from "react-router-dom";
import gestion from "./assets/gestion.jpg";
import Footer from "./components/Footer.jsx";

function Panel() {

    const [error, setError] = useState("");
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        tipo: "Ingreso",
        categoria: "",
        monto: "",
        fecha: "",
        descripcion: ""
    });

    // Obtener la fecha y hora actuales al cargar el componente
    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
        setFormData((prevState) => ({
            ...prevState,
            fecha: formattedDate
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //  lógica para enviar los datos a la API
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.tipo || !formData.categoria || !formData.monto || !formData.fecha || !formData.descripcion) {
            setError("Please fill out this field.");
            return;
        }

        setError("");

        fetch("http://localhost:5148/api/Transaction/CreateTransaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                IdAccount: "some-account-id", // Replace with actual account ID
                Type: formData.tipo,
                IdCategory: parseInt(formData.categoria), // Ensure this is an integer
                Amount: parseFloat(formData.monto),
                DateTransaction: formData.fecha,
                Description: formData.descripcion
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
                if (data === "Transacción registrada exitosamente.") {
                    navigate("/home"); // Redirect to Gestion page
                } else {
                    setError(data || "Error saving data.");
                    alert("ERROR: " + data);
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
            <h1>Gestión de ingresos y gastos</h1>
            <div className="container">
                <img
                    src={gestion}
                    alt="Gestión de ingresos y gastos"
                    title="Gestión de ingresos y gastos"
                    className="small-image"
                />
                <p className="image-caption">
                    Registra tus ingresos y gastos aquí para organizar sus finanzas personales.
                </p>

                <br></br>

                <h2> Registro de ingresos y gastos </h2>


                <form onSubmit={handleSubmit} className="form-container">
                    <label>
                        Tipo de Transacción:
                        <select name="tipo" value={formData.tipo} onChange={handleChange}>
                            <option value="Ingreso">Ingreso</option>
                            <option value="Gasto">Gasto</option>
                        </select>
                    </label>

                    <label>
                        Categoría:
                        <select
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona una categoría</option>
                            <option value="Salario">Salario</option>
                            <option value="Alquiler">Alquiler</option>
                            <option value="Comida">Comida</option>
                            <option value="Entretenimiento">Entretenimiento</option>
                        </select>
                    </label>

                    <label>
                        Monto:
                        <input
                            type="number"
                            name="monto"
                            value={formData.monto}
                            onChange={handleChange}
                            placeholder="Ej.: 2500.00"
                            required
                        />
                    </label>

                    <label>
                        Fecha y Hora:
                        <input
                            type="text"
                            name="fecha"
                            value={formData.fecha}
                            readOnly
                        />
                    </label>

                    <label>
                        Descripción:
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Ej.: Pago del alquiler del apartamento"
                            required
                        />
                    </label>

                    <button type="submit">Registrar</button>

                </form>
                {error && <p className="error">{error}</p>}

            </div>

            <br></br> <br></br> <br></br> <br></br> <br></br>

            <Footer />

        </div>
    );
}

export default Panel;
