import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "./Loading";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import ErrorPage from "./Errorpage";
import { FaSignOutAlt } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { IoIosMenu, IoIosSearch } from "react-icons/io";

const Navbar = () => {
  const path = useLocation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    categories,
    isLoading,
    setIsLoading,
    cartCount,
    fetchCartCount,
    isAdmin,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    setInfo,
    isUser,
    isFailedToFetch,
    setFailedToFetch,
  } = useContext(AppContext);

  async function logOutApi() {
   
    setIsLoading(true);
    setFailedToFetch(false);

    try {
      const response = await api.post(`/users/logout`);
      if (response && response.status === 200) {
        toast.success(response.data);
      } else {
        toast.error("Failed to logout or user already logged out");
      }
    } catch (error) {
      toast.error("Failed to logout or user already logged out");
    } finally {
      setIsLoading(false);
    }
  }
  function handleLogout() {
    setIsLoading(true);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setInfo(null);
    setIsLoading(false);
    
    logOutApi();
    
    toast.success("Logged out successfully");
    navigate("/login");

  }

  useEffect(() => {
    if (isAuthenticated && user && isUser) {
      fetchCartCount(user.id);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Close menus when path changes
    setMenuOpen(false);
    setShowSearch(false);
  }, [path]);

  if (isLoading) return <Loading />;
  if (isFailedToFetch) return <ErrorPage />;

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border border-gray-200 sticky top-0 z-50 w-full">
      <div className="flex items-center ">
        {/* Logo */}
        <div className="text-2xl font-bold text-black mx-4">
          <Link to="/">Darla<span className="text-blue-500">Mart</span></Link>
        </div>
        <div className="hidden lg:flex space-x-6 text-gray-600 font-medium">
          {categories.slice(0, 3).map((category) => (
            <div key={category.id} className="relative group">
              <Link to={`/user/shop/${category.name}`} className="hover:text-black">
                {category.name.split(" ")[0]}{category.name.split(" ").length > 1 && ".."}
              </Link>
              <span className="w-auto absolute left-1/2 -translate-x-1/2 top-6 bg-blue-500 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-nowrap">
              <Link to={`/user/shop/${category.name}`}>
                {category.name}
              </Link>
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Search Bar */}
      <div className="relative">
        {/* //     Search, Cart */}
        <div className="hidden md:flex items-center space-x-6 w-full ">
          <div className="relative">
            <form action="">
              <input
                type="text"
                placeholder="Search Products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="max-w-96 sm:max-w-96 md:max-w-96 lg:min-w-96 px-4 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"

                // className="w-54 md:w-96 px-4 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                required />
              <button className="cursor-pointer "
                onClick={() => searchValue && navigate(`/search/${searchValue}`)}>
                {/* <i class="fas fa-search absolute top-2 right-2 text-gray-400 hover:text-blue-600"></i> */}
                <IoIosSearch className="absolute top-2 right-2 text-gray-400 hover:text-blue-600 text-xl"/>
              </button>
            </form>
          </div>
        </div>
        {/* )} */}
      </div>

      {/* Mobile Menu Button */}

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowSearch(true)}
          className="md:hidden text-gray-600 hover:text-black"
          aria-label="Open Search"
        >
          {/* <i className="fas fa-search text-lg"></i> */}
          <IoIosSearch className="text-xl" />
        </button>
        <button
          className="md:hidden text-gray-600 hover:text-black"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
         {menuOpen? <IoClose className="text-xl" /> : <IoIosMenu className="text-xl"/> } 
          {/* <i className="fas fa-bars text-lg"></i> */}
        </button>
      </div>

      {/* Desktop Auth & Cart */}
      <div className="hidden md:flex items-center space-x-6">
        {isAuthenticated ? (
          isAdmin ? (
            <Link to='/admin/dashboard' className="hover:underline">Admin Dashboard</Link>
          ) : (
            <Link to={`/user/profile/${user.id}`} className="hover:underline">
              <i className="fa-regular fa-user"></i>
              <span className="ml-2 text-gray-600"> {user.name}</span>
            </Link>
          )
        ) : (
          <>
            <Link to="/login" className="text-sm primary-button px-4 py-1 ">Login</Link>
            <Link to="/register" className="text-sm font-semibold px-4 py-1 border border-gray-800 rounded-md hover:bg-gray-200">Register</Link>
          </>
        )}
        {!isAdmin && isAuthenticated && (
          <Link to={`/user/cart`}>
            <button className="relative text-gray-600 hover:text-black cursor-pointer">
              <i className="fas fa-shopping-cart text-lg"></i>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                {cartCount}
              </span>
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        
        <div className="absolute top-full left-0 w-full bg-white shadow-lg p-4 flex flex-col items-center space-y-4 md:hidden">
          {isAuthenticated ? (
            isAdmin ? (
              <Link to='/admin/dashboard' className="hover:underline"
                onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
            ) : (
              <Link to={`/user/profile/${user.id}`} className="hover:underline" onClick={() => setMenuOpen(false)}>
                <i className="fa-regular fa-user"></i>
                <span className="ml-2 text-gray-600 "> {user.name}</span>
              </Link>
            )
          ) : (
            <>
              <Link to="/login" className="text-gray-800 hover:underline"
              onClick={() => setMenuOpen(false)}
              >Login</Link>
              <Link to="/register" className="text-gray-800 hover:underline" onClick={() => setMenuOpen(false)}
              >Register</Link>
            </>
          )}
          
          
          {/* {categories.slice(0, 3).map((category) => (
            <Link key={category.id} to={`/user/shop/${category.name}`} className="text-gray-600 hover:text-black">
              {category.name}
            </Link>
          ))} */}

{ isAuthenticated && <button className=" md:hidden text-gray-800 hover:text-red-500 cursor-pointer" onClick={handleLogout}>Log out <FaSignOutAlt className="inline" /></button>
      }
          
         
        </div>
        
      )}
       { isAuthenticated && <button className="hidden md:block text-gray-800 hover:text-red-500 cursor-pointer" onClick={handleLogout}>Log out <FaSignOutAlt className="inline" /></button>
      }
    </nav>
  );
};

export default Navbar;
