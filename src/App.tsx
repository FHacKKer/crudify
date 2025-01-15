import './App.css'
import DashboardPage from "@/features/dashboard/dashboard-page.tsx";
import {useAppContext} from "@/context/AppContex.tsx";
import api from "@/services/api.ts";
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";

type FailureResponse =  {
  success:false;
  message: string;
}
type SuccessResponse =  {
  success:false;
  message: string;
  token:string
}

function App() {

  const { isLoggedIn, setIsLoggedIn,setAccessToken } = useAppContext()
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem("refreshToken");
  console.log(`Refresh Token: ${refreshToken}`);
  if(!isLoggedIn && refreshToken) {
  //   send post request to refresh verification token to auto login user
    const refreshTokenFunc = async () => {
      try {
        const {data}:AxiosResponse<SuccessResponse, FailureResponse> = await api.post(`/api/v1/auth/verify`)
        if(data.success) {
          setAccessToken(data.token)
          setIsLoggedIn(true)
          navigate("/")
        }
      } catch (error) {
        console.log(`Failed to auto login ${error}`)
      }
    }

    refreshTokenFunc().catch((error) => console.log(error));
  }

  return ( <DashboardPage isAuthenticated={isLoggedIn} /> )
}

export default App
