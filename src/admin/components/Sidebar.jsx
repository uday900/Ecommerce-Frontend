import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";

const Sidebar = () => {

  const { categories, fetchCategories, isLoading, error } = useContext(AppContext)

  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    console.log("calling fetchCategories()")
    fetchCategories();
  }, [])

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="w-64 px-5 h-screen text-black fixed border border-slate-200">
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
  );
};

export default Sidebar;
