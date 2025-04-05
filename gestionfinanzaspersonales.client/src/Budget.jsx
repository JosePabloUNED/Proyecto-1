import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";



function Budget() {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        categoria: "",
        monto: "",
        periodo: "",
    });

    // Fetch categories
    useEffect(() => {
        fetch(`http://localhost:5148/api/Transaction/GetCategory`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                setError("Network error. Please try again later.");
            });
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

        if (!formData.categoria || !formData.periodo || !formData.monto) {
            setError("Please fill out all fields.");
            return;
        }

        setError("");

        fetch("http://localhost:5148/api/Account/CreateBudget", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                IdCategory: formData.categoria,
                Period: formData.periodo,
                Amount: parseFloat(formData.monto)
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

                navigate("/budget"); // Redirect to home page
                window.location.reload(); // Refresh the page

                alert("Presupuesto registrado exitosamente");
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                setError("Network error. Please try again later.");
            });
    };

    return (
        <div>
            <Nav />

            <h1>Presupuestos Mensuales</h1>

            <div className="container">

                <form className="form-container" onSubmit={handleSubmit}>
                    <label>
                        Categoría:
                        <select
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((category) => (
                                <option key={category.idCategory} value={category.idCategory}>
                                    {category.nameCategory}
                                </option>
                            ))}

                        </select>
                    </label>

                    <label>Periodo: <input type="month" name="periodo" value={formData.periodo}
                        onChange={handleChange} /></label>


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

                    <button type="submit">Crear Presupuesto</button>
                </form>
                {error && <p className="error">{error}</p>}

                <table>
                    <thead>
                        <tr>
                            <th>Categoría</th>
                            <th>Periodo</th>
                            <th>Monto Asignado</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Renderizar filas dinámicamente */}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default Budget;  
