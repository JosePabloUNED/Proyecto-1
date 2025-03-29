import WeatherForecast from "../components/WeatherForecast.jsx";
import LogoutLink from "../components/LogoutLink.jsx";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView.jsx";

function Home() {
    return (
        <div>
                <span><LogoutLink>Logout <AuthorizedUser value="email" /></LogoutLink></span>
                <h1>hola</h1>
                <WeatherForecast />
        </div>

    );
}

export default Home;