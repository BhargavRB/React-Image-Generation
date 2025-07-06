import { createContext, use, useState} from "react";

const AuthContext = createContext({
    token: null,
    signup: (email, password) => {},
    login: (email, password) => {},
    logout: () => {},
});

export function useAuthContext() {
    const context = use(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }

    return context;
}

export function AuthContextProvider({ children }) {
    const [token, setToken] = useState(null);

    async function signup(email, password) {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            });

            const resData = await response.json();
            if (!response.ok) {
            throw new Error(
                resData.message ||
                'Creating a user failed. Check your credentials or try later.'
            );
            }

            setToken(resData.token);
    }
    
    async function login(email, password) {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            });

            const resData = await response.json();
            if (!response.ok) {
            throw new Error(
                resData.message ||
                'Login failed. Check your credentials or try later.'
            );
            }

            setToken(resData.token);
    }

    function logout() {}

    const contextValue = {
        token,
        signup,
        login,
        logout,
    };

  return <AuthContext value={contextValue}>{children}</AuthContext>;
}