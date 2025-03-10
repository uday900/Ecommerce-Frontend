import { use, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext, BASE_URL } from "../context/AppContext";
import Loading from "./Loading";
import toast from "react-hot-toast";
import api from "../api/api";

const Navbar = () => {
  const path = useLocation();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("")


  const { categories,
    isLoading, setIsLoading,
    cartCount,
    fetchCartCount,
    fetchCategories,
    isAdmin,
    isUser,
    isAuthenticated, setIsAuthenticated,
    user, setUser,
    setInfo,
    isLoggedIn,


  } = useContext(AppContext);

  function handleLogout() {
    setIsLoading(true)
    localStorage.removeItem("token");
    localStorage.removeItem("user");


    setIsAuthenticated(false);
    setUser(null);
    setInfo(null);
    setIsLoading(false)
    navigate("/");

    toast.success("Logged out successfully")

  }


  // useEffect(() => {

  //   // fetchCategories();
  //   // isLoggedIn();

  // }, []);

  useEffect(() => {
    if (isAuthenticated && user != null && isUser) {
      fetchCartCount(user.id);
    }

  }, [isAuthenticated])

  if(isLoading){return <Loading/>}
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white border border-gray-200 sticky top-0 z-10">

      
      {/* Logo */}
      <div className="text-2xl font-bold text-black">
        <Link to="/" >
          Shop<span className="text-blue-500">Ease</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-8 text-gray-600 font-medium">
        {categories.slice(0, 3).map((category) => (
          <Link
            key={category.id}
            to={`/user/shop/${category.name}`}
            className="hover:text-black"
          >
            <div className="relative inline-block group cursor-pointer whitespace-nowrap">
              {/* Tooltip Text */}
              <span className="absolute top-6 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white text-black border border-gray-200 text-sm font-medium px-3 py-1 rounded-lg shadow-md">
                {category.name}
              </span>
              {/* Target Text */}
              {category.name.split(" ")[0]}
              {category.name.split(" ").length > 1 && ".."}
            </div>


          </Link>
        ))}

      </div>

      {/* Search, Cart */}
      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative">
<form action="">
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-96 px-4 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button className="cursor-pointer "
            onClick={() => searchValue && navigate(`/search/${searchValue}`)}>
            <i className="fas fa-search absolute top-2 right-2 text-gray-400 hover:text-gray-600"></i>
          </button>
          </form>
        </div>


      </div>

      <div className="flex space-x-6">
        {isAuthenticated ? <>

          {isAdmin ? <>
            <Link to='/admin/dashboard' className="">
              admin dashboard
            </Link>

          </> : <>
            {/* <Link to='/favorites' className="">
              <i className="fa-regular fa-heart"></i>
            </Link> */}
            <div>
              <Link to={`/user/profile/${user.id}`}
              className="hover:underline">
                <i className="fa-regular fa-user"></i>
                <span className="ml-2 text-gray-600"> {user.name}</span>
              </Link>

              
            </div>

            {!isAdmin && <Link to={`/user/cart`}>
          <button className="relative text-gray-600 hover:text-black cursor-pointer">
            <i className="fas fa-shopping-cart text-lg"></i>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
              {cartCount}
            </span>
          </button>
        </Link>}

          </>}


          <button
            className="cursor-pointer hover:text-red-500"
            onClick={() => handleLogout()}>
            Log out <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </>
          : <>

            <button className={`text-sm font-semibold 
        ${path.pathname === '/login' && 'bg-black text-white px-3 py-2 rounded-lg'} text-gray-800`}
            >
              <Link to="/login">Login</Link>
            </button>
            <button className="text-sm font-semibold px-4 py-1 border border-gray-800 rounded-md hover:bg-gray-200">
              <Link
                to="/register">
                Register
              </Link>
            </button>
          </>}
        {/* ${user.id || ''} */}
        {/* {!isAdmin && <Link to={`/user/cart`}>
          <button className="relative text-gray-600 hover:text-black">
            <i className="fas fa-shopping-cart text-lg"></i>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
              {cartCount}
            </span>
          </button>
        </Link>} */}


      </div>


    </nav>
  );
};

export default Navbar;
