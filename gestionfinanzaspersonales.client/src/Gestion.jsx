import React, { useState, useEffect } from "react";
import Nav from "./components/Nav.jsx";
import { useNavigate } from "react-router-dom";
import gestion from "./assets/gestion.jpg";
import Footer from "./components/Footer.jsx";

function Gestion() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);


    const [formData, setFormData] = useState({
        tipo: "",
        categoria: "",
        monto: "",
        // fecha: "",
        descripcion: "",
        accountId: ""
    });

    // Obtener la fecha y hora actuales al cargar el componente
    useEffect(() => {
        //   const currentDate = new Date();
        // const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
        setFormData((prevState) => ({
            ...prevState,
            //            fecha: formattedDate
        }));
    }, []);


    // Fetch user accounts
    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
        if (userId) {
            fetch(`http://localhost:5148/api/Transaction/GetUserAccounts/${userId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setAccounts(data);
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                    setError("Network error. Please try again later.");
                });
        } else {
            setError("User not logged in.");
            navigate('/login'); // Redirect to login page if userId is not found
        }
    }, [navigate]);



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

    //  lógica para enviar los datos a la API
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.tipo || !formData.categoria || !formData.monto || !formData.descripcion || !formData.accountId) {
            setError("Please fill out this field.");
            return;
        }

        // setError("LOOKS LIKE THERE'S AN ERROR IN HERE");

        fetch("http://localhost:5148/api/Account/CreateTransaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                IdAccount: formData.accountId,
                Type: formData.tipo,
                IdCategory: parseInt(formData.categoria),
                Amount: parseFloat(formData.monto),
                Description: formData.descripcion
            }),
        })
            .then((response) => {

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);

                }

                console.log(formData);

                return response.json();
            })
            .then((data) => {
                console.log("API Response:", data);
                navigate("/gestion"); // Redirect to home page
                window.location.reload(); // Refresh the page                
                alert("Transacción registrada exitosamente");
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
                            <option value="">Selecciona una transacción</option>
                            <option value="Ingreso">Ingreso</option>
                            <option value="Gasto">Gasto</option>
                        </select>
                    </label>

                    <label>
                        Cuenta:
                        <select
                            name="accountId"
                            value={formData.accountId}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona una cuenta</option>
                            {accounts.map((account) => (
                                <option key={account.idAccount} value={account.idAccount}> {account.idAccount} {' - '}
                                    {account.nameAccount} {' - '} {account.typeAccount}
                                </option>
                            ))}
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
                            {categories.map((category) => (
                                <option key={category.idCategory} value={category.idCategory}>
                                    {category.nameCategory}
                                </option>
                            ))}

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

                    {/*<label>*/}
                    {/*    Fecha y Hora:*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        name="fecha"*/}
                    {/*        value={formData.fecha}*/}
                    {/*        readOnly*/}
                    {/*    />*/}
                    {/*</label>*/}

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

export default Gestion;