import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "@/pages/Home"
import Signup from "@/pages/Signup"
import Login from "@/pages/Login"
import Todopage from "@/pages/Todopage"

function App(){
  return <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Home/>} />
      <Route path = "/signup" element = {<Signup/>} />
      <Route path = "/login" element = {<Login/>} />
      <Route path = "/todopage" element = {<Todopage/>} />
    </Routes>
  </BrowserRouter>

}

export default App;