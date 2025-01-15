import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import AppRoutes from "@/routes/appRoutes.tsx"
import {ContextProvider} from "@/context/AppContex.tsx";
import {Bounce, ToastContainer} from "react-toastify";

createRoot(document.getElementById('root')!).render(

  <ContextProvider>
    <StrictMode>
      {AppRoutes()}
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
        />
    </StrictMode>
  </ContextProvider>
)
