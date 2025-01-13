import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import App from "@/App.tsx";
import LoginPage from "@/pages/login.tsx";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<App />} />
                <Route path={"/login"} element={<LoginPage />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;