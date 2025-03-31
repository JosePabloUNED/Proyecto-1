import "./css/main.css";
import { Link } from "react-router-dom";



function Nav() {


    return (
        <>
            <nav>
                <Link to="/home" className="nav-item">Inicio</Link>
                <Link to="/panel" className="nav-item">Panel de control</Link>
                <Link to="/gestion" className="nav-item">Ingresos y gastos</Link>
                <Link to="/presupuestos" className="nav-item">Presupuestos</Link>
            </nav>
          
        </>

    );
}

 export default Nav;