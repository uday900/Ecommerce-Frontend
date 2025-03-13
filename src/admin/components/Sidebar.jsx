import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";

const Sidebar = () => {

  const { categories, fetchCategories, isLoading, error } = useContext(AppContext)

  const [showCategories, setShowCategories] = useState(false);
  const [isShowSideBar, setIsShowSideBar] = useState(false);

  useEffect(() => {
    console.log("calling fetchCategories()")
    fetchCategories();
  }, [])


  return (
    <div className=" w-64 px-5 h-screen text-black fixed border border-slate-200">

      <button
        className="md:hidden  text-xl font-bold flex items-center gap-2"
        onClick={() => setIsShowSideBar(!isShowSideBar)}
      >
        <CiMenuFries /> 
      </button>

      <div className="hidden md:block">
      <ul className="mt-4">
        {/* Dashboard */}
        <li className="hover-effect">
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>

        <li className="hover-effect">
          <Link to='/admin/carousels'>Carousel</Link>

        </li>
        {/* Orders */}
        <li className="hover-effect">
          <Link to='/admin/orders'>Orders</Link>
        </li>

        {/* Customers */}
        <li className="hover-effect">
          <Link to='/admin/users' >Customers</Link>
        </li>


      </ul>
      </div>
    </div>
  );
};

export default Sidebar;
