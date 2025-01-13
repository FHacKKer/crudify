import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import App from "@/App.tsx";
import LoginPage from "@/pages/login.tsx";
import Register from "@/pages/register.tsx";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={ <App /> } />
                <Route path={"/login"} element={ <LoginPage /> } />
                <Route path={"/register"} element={ <Register /> } />
            </Routes>
        </Router>
    )
}

export default AppRoutes;