import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/store";
import { useEffect } from "react";


const PrivateRoutes = () => {
  const navigate = useNavigate()
  const {isAuthenticated} = useAuthStore()
  const logged = localStorage.getItem("isLoggedIn")

  useEffect(() => {
    if(!logged){
      localStorage.removeItem('token')
    }
    
    if(!isAuthenticated){
      navigate("/")
    }
  }, [isAuthenticated])

  return (
    logged ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes