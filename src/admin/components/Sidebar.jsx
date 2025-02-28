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
        <li className="p-2 hover:bg-gray-300 cursor-pointer hover:underline">
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>

        {/* Products Section */}
        {/* <li className="p-2 hover:bg-gray-300 cursor-pointer">
          <div
            className="flex justify-between items-center"
            onClick={toggleCategories}
          >
            <span>Products</span>
            <span>
              {showCategories ? (
                <i className="fa-solid fa-angle-up"></i>
              ) : (
                <i className="fa-solid fa-angle-down"></i>
              )}
            </span>
          </div>
        </li> */}

        {/* Categories - Nested List
        {showCategories && (
          <ul className="ml-4 mt-2">
            {isLoading && <li>Loading categories...</li>}
            {error && <li className="text-red-500">{error}</li>}
            {!isLoading &&
              !error &&
              categories.map((category) => (
                <li
                  key={category.id}
                  className="p-2 hover:bg-gray-300 rounded cursor-pointer"
                >
                  {category.name}
                </li>
              ))}
          </ul>
        )} */}

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
