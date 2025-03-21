import { Route, Routes } from "react-router-dom"
import AdminRoutes from "./admin/AdminRoutes"
import LandingPage from "./user/pages/LandingPage"
import PageNotFound from "./common-componets/PageNotFound"
import Navbar from "./common-componets/Navbar"
import ScrollToTop from "./common-componets/ScrollToTop"
import { useContext, useEffect } from "react"
import { AppContext } from "./context/AppContext"
import Loading from "./common-componets/Loading"
import UserRoutes from "./user/UserRoutes"
import { Toaster } from "react-hot-toast"
import Login from "./common-componets/Login"
import Register from "./common-componets/Register"
import SearchProducts from "./common-componets/SearchProducts"
import ForgotPassword from "./common-componets/ForgotPassword"
import ResetPassword from "./common-componets/ResetPassword"
import ErrorPage from "./common-componets/Errorpage"
import Footer from "./common-componets/Footer"

function App() {

  // const token = localStorage.getItem('token');
  const { 
 
    isLoggedIn,
    fetchCategories,
    fetchCarouselImages,
    failedToFetch,
    setFailedToFetch,

  } = useContext(AppContext)
  
  useEffect(()=>{
    isLoggedIn();
    fetchCategories();
    fetchCarouselImages();

  },[])

 
  return (
   <>
   {/* { isLoading && <Loading/>} */}
   <Navbar/>
   <ScrollToTop/>
   <Routes>
    <Route path="/" element={  <LandingPage/> } />

    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />

    {/* <Route path="/logout" element={<>Logout</>} /> */}

    <Route path="/forgot-password" element={<ForgotPassword/> } />
    <Route path="/reset-password" element={<ResetPassword/>} />


    <Route path="/search/:searchValue" element={<SearchProducts/>} />

    
    <Route path="/admin/*" element={<AdminRoutes />} />
    
    <Route path="/user/*" element={<UserRoutes/>} />
    


    <Route path="*" element={<PageNotFound/>} />
   </Routes>

   <Toaster position="top-right"/>

   <Footer/>
   </>
  )
}

export default App
