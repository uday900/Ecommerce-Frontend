import React from 'react'
import PageNotFound from '../common-componets/PageNotFound'
import SingleProduct from './components/SingleProduct'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import CategorySection from './pages/CategorySection'
import UserProfile from './pages/UserProfile'
import PrivateRoute from '../common-componets/PrivateRoute'

function UserRoutes() {
  return (
    <>

    <Routes>

        <Route path = '/shop/:categoryName' element={<CategorySection/>} />
        {/* single product */}
        <Route path = '/shop/:categoryName/:productId' element={<SingleProduct/>} />

        {/* make sure  */}
        <Route path='/cart' element={<PrivateRoute publicPage={false}> <Cart/> </PrivateRoute>} />

        <Route path='/profile/:userId' element={<PrivateRoute publicPage={false}> <UserProfile/> </PrivateRoute>} />


        <Route path = '*' element={<PageNotFound/>} />
    </Routes>
    </>
  )
}

export default UserRoutes