import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';

const UserContext = createContext({});

function AuthorizeView(props) {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ email: "" });

    useEffect(() => {
        async function checkAuthorization() {
            try {
                const response = await fetch("/pingauth", { method: "GET" });
                if (response.status === 200) {
                    const data = await response.json();
                    setUser({ email: data.email });
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }
            } catch (error) {
                console.error("Authorization check failed:", error);
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        }

        checkAuthorization();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!authorized) {
        return <Navigate to="/login" />;
    }

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
}

export function AuthorizedUser(props) {
    const user = React.useContext(UserContext);
    return props.value === "email" ? <>{user.email}</> : null;
}

export default AuthorizeView;