import './App.css'
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

function App() {

  return (
    <div className={`h-screen w-full flex flex-col items-center justify-center`}>
        <h1 className={`text-4xl`}>Crudify</h1>

        <Button  className={`mt-4`}>
            <Link to={"/login"}>Goto Login Page</Link>
        </Button>
    </div>
  )
}

export default App
