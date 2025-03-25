
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { CiMenuFries } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Layout = ({ children }) => {
    const { fetchCategories } = useContext(AppContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="flex h-auto w-full">
            {/* Sidebar */}
            <aside
                className={`bg-white border-r border-slate-200 shadow-lg h-screen p-5
                fixed md:relative  md:w-1/4 transition-transform duration-300
                ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-64"} md:translate-x-0`}
            >
                <button
                    className="md:hidden text-2xl mb-4"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    {/* Icon for closing the sidebar */}
                    <IoClose className="text-xl" />
                </button>

                {/* Displaying Links on the sidebar on both mobile and desktop */}
                <ul className="mt-4 space-y-4">
                    <li className="hover:text-purple-600">
                        <Link to="/admin/dashboard" onClick={() => setIsSidebarOpen(false)}>Dashboard </Link>
                    </li>
                    <li className="hover:text-purple-600" >
                        <Link to="/admin/carousels" onClick={() => setIsSidebarOpen(false)}>Carousel</Link>
                    </li>
                    <li className="hover:text-purple-600">
                        <Link to="/admin/orders" onClick={() => setIsSidebarOpen(false)}>Orders</Link>
                    </li>
                    <li className="hover:text-purple-600">
                        <Link to="/admin/users" onClick={() => setIsSidebarOpen(false)}>Customers</Link>
                    </li>
                </ul>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 w-full md:w-3/4 md:ml-0 transition-all ">
                {/* Navbar for Mobile */}
                <nav className="bg-white shadow-md p-4 flex items-center md:hidden">
                    <button
                        className="text-2xl"
                        onClick={() => setIsSidebarOpen(true)}
                    >

                        {/* Icon for opening the sidebar */}
                        <CiMenuFries />
                    </button>
                    <h1 className="text-lg font-semibold ml-4">Admin Dashboard</h1>
                </nav>

                {/* Main content */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
