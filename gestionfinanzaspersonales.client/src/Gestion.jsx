import Nav from "./components/Nav.jsx";
import gestion from "./assets/gestion.jpg";




function Panel() {


    return (

        <div>
            <Nav />
            <h1>Gestión de ingresos y gastos</h1>
            <div className="container">
                <img src={gestion} alt="Gestión de ingresos y gastos" title="Gestión de ingresos y gastos" className="small-image" />
                <p className="image-caption">Registra tus ingresos y gastos aquí para organizar sus finanzas personales. </p>
            </div>
        </div>

    );
}

export default Panel;