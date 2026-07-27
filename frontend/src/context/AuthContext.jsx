import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("accessToken");

        const role = localStorage.getItem("role");
        const email = localStorage.getItem("email");
        const firstName = localStorage.getItem("firstName");
        const lastName = localStorage.getItem("lastName");

        if (token && role && email) {

            setUser({

                token,

                role,

                email,

                firstName,

                lastName

            });

        }

        setLoading(false);

    }, []);

    const login = (response) => {

        const data = response.data.data;

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("lastName", data.lastName);

        setUser({

            token: data.accessToken,

            role: data.role,

            email: data.email,

            firstName: data.firstName,

            lastName: data.lastName

        });

    };

    const logout = () => {

        localStorage.clear();

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);