import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie"

const cookie = new Cookies();
const Logout: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = cookie.remove("auth-token");
        console.log(token)
        navigate('/')
    }, []);

    return <div>Loading...</div>
} 
export default Logout;