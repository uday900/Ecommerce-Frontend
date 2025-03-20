import React, { useContext, useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import { Route, Routes, useNavigate } from 'react-router-dom'
import PageNotFound from '../common-componets/PageNotFound'
import Layout from './Layout'
import ManageCategories from './pages/ManageCategories'
import AddProduct from './components/AddProduct'
import ProductDetails from './pages/ProductDetails'
import UpdateProduct from './components/UpdateProduct'
import Carousel from './pages/Carousel'
import Users from './pages/Users'
import Orders from './pages/Orders'
import { AppContext } from '../context/AppContext'
import AuthRequired from '../common-componets/AuthRequired'

function AdminRoutes() {
  const navigate = useNavigate();
  const { 
    isAuthenticated,
    isAdmin,
    isLoggedIn,
    user,
  } = useContext(AppContext);

  useEffect(() => {
    isLoggedIn();  // Ensure authentication state updates
    if (!user) {
      navigate('/login');
    }
  }, []);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login');
  //   }
  // }, [isAuthenticated]);

  
  if (!isAdmin) {
    return <AuthRequired />;
  }
  

  return (
    <>
      <Layout>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/manage-categories' element={<ManageCategories/>} />
          <Route path='/add-product' element={<AddProduct/>} />
          <Route path='/product-details/:productId' element={<ProductDetails/>} />
          <Route path='/update-product/:productId' element={<UpdateProduct/>} />  

          <Route path='/users' element={<Users/>} />

          <Route path='/carousels' element={<Carousel/>} />

          <Route path='/orders' element={<Orders/>} />
          
          {/* <Route path='/delete-product' */}

          <Route path='*' element={<PageNotFound />} />

        </Routes>
      </Layout>

    </>
  )
}

export default AdminRoutes