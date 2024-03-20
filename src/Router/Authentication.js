import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Authentication({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    const authenticate = () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            if (location.pathname != "" || location.pathname !="/home") {
                navigate(location.pathname);
            } else {
                navigate("/home")
            }
        } else {
            navigate("/login")
        }
    }

    useEffect(() => {
        authenticate();
    }, []);

    return (
        children
    );
}

export default Authentication;