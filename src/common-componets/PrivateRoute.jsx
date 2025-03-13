import React from 'react'
import LandingPage from '../user/pages/LandingPage';

function PrivateRoute({children, publicPage}) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (publicPage){
        return <>{children}</>;
    }
    return token ? children : <LandingPage/>;
  
}

export default PrivateRoute