import Nav from "./components/Nav.jsx";
import home from "./assets/home.jpg";



function Home() {
    return (
        <div>
            <Nav />
            <h1>Sistema de Gestión de Finanzas Personales</h1>
            <div className="container">
                <img src={home} alt="Gestión de Finanzas" title="Gestión de finanzas personales" className="small-image" />
                <p className="image-caption">Gestiona tus finanzas personales con nosotros, crea presupuestos y organiza tus ingresos y gastos de forma segura.
                    Somos la herramienta que estructura sus asuntos personales sencilla y fácilmente. </p>
            </div>
        </div>
    );
}

export default Home;
