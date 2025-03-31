function Nav() {


    return (
        <div>
            <nav>
                <Link to="/" className="nav-item">Homepage</Link>
                <Link to="/about" className="nav-item">About Little Lemon</Link>
                <Link to="/contact" className="Nav-item">Contact</Link>
                 <Link to="/admin" className="Nav-item">Admin</Link>
                 <Link to="/client" className="Nav-item">Client</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/about" element={<AboutLittleLemon />}></Route>
                <Route path="/contact" element={<Contact />}> </Route>
                <Route path="/admin" element={<Admin />}> </Route>
                <Route path="/client" element={<Client />}> </Route>
            </Routes>
        </div>

    );
}