// import { useContext, useEffect, useState } from "react";
// import Sidebar from "./components/Sidebar";
// import { AppContext } from "../context/AppContext";
// import { CiMenuFries } from "react-icons/ci";
// import { Link } from "react-router-dom";

// const Layout = ({ children }) => {

//     const { categories, fetchCategories, isLoading, error } = useContext(AppContext)

//     const [showCategories, setShowCategories] = useState(false);
//     const [isShowSideBar, setIsShowSideBar] = useState(false);

//     useEffect(() => {
//         console.log("calling fetchCategories()")
//         fetchCategories();
//     }, [])


//     return (
//         <div className={`flex h-screen`}>
//             {/* Sidebar */}
//             <aside className={`"w-1/4"`}>
//                 {/* <Sidebar/> */}
//                 <div className=" w-64 px-5 h-screen text-black fixed border border-slate-200">

//                     <button
//                         className="md:hidden  text-xl font-bold flex items-center gap-2"
//                         onClick={() => setIsShowSideBar(!isShowSideBar)}
//                     >
//                         <CiMenuFries />
//                     </button>

//                     <div className="hidden md:block">
//                         <ul className="mt-4">
//                             {/* Dashboard */}
//                             <li className="hover-effect">
//                                 <Link to="/admin/dashboard">Dashboard</Link>
//                             </li>

//                             <li className="hover-effect">
//                                 <Link to='/admin/carousels'>Carousel</Link>

//                             </li>
//                             {/* Orders */}
//                             <li className="hover-effect">
//                                 <Link to='/admin/orders'>Orders</Link>
//                             </li>

//                             {/* Customers */}
//                             <li className="hover-effect">
//                                 <Link to='/admin/users' >Customers</Link>
//                             </li>


//                         </ul>
//                     </div>
//                 </div>
//             </aside>
//             {/* Main Content */}
//             {/* ${shouldHideSidebar ? "w-full" : */}
//             <main className={`w-full  "w-3/4"}`}>
//                 {children}
//             </main>
//         </div>
//     );
// };

// export default Layout;

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { CiMenuFries } from "react-icons/ci";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
    const { fetchCategories } = useContext(AppContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="flex h-screen w-full">
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
                    ✖
                </button>

                <ul className="mt-4 space-y-4">
                    <li className="hover:text-purple-600">
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li className="hover:text-purple-600">
                        <Link to="/admin/carousels">Carousel</Link>
                    </li>
                    <li className="hover:text-purple-600">
                        <Link to="/admin/orders">Orders</Link>
                    </li>
                    <li className="hover:text-purple-600">
                        <Link to="/admin/users">Customers</Link>
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
