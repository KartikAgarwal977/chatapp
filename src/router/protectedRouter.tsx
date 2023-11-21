import { Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies()
export default function ProtectedRoute({ children }: { children: React.JSX.Element }) {
    const {pathname} = useLocation()
    const authenticated = !!cookies.get("auth-token");
    if (authenticated) {
        return <>
            {children}
        </>;
    } else {
        return <Navigate to="/" replace state={{referrer: pathname}}/>;
    }
}