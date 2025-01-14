import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import AppRoutes from "@/routes/appRoutes.tsx"
import {ContextProvider} from "@/context/AppContex.tsx";

createRoot(document.getElementById('root')!).render(

  <ContextProvider>
    <StrictMode>
      {AppRoutes()}
    </StrictMode>
  </ContextProvider>
)
