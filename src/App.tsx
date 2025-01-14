import './App.css'
import DashboardPage from "@/features/dashboard/dashboard-page.tsx";
import {useAppContext} from "@/context/AppContex.tsx";

function App() {

  const { isLoggedIn } = useAppContext()

  return ( <DashboardPage isAuthenticated={isLoggedIn} /> )
}

export default App
