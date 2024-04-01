import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/Home/Home"
import Form from "./pages/Form/Form"
import Login from "./components/Login/Login"
import SignUp from "./components/SignUp/SignUp"
import PrivateRoutes from "./utils/PrivateRoutes"
import Statistic from "./pages/Statistic/Statistic"
import CustomizedSnackbars from "./components/shares/Alert"
import { useEffect } from "react"


function App() {
 

  return (
    <>
    <BrowserRouter>
         <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route element={<Home/>} path="/"/>
              <Route element={<Form />} path="/form/create"/>
              <Route element={<Form/>} path="/do-form/:id"/>
              <Route element={<Form />} path="form/edit/:id"/>
              <Route element={<Statistic />} path="/form/statistic/:id"/>
            </Route>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
          </Routes>  
    </BrowserRouter>
    <CustomizedSnackbars/>
    </>
  )
}

export default App
