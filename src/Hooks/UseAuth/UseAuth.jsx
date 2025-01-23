import { useContext } from "react"
import { AuthContext } from "../../Authentication/Authentication";

// eslint-disable-next-line react-refresh/only-export-components
const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

export default useAuth;