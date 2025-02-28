import Sidebar from "./components/Sidebar";

const Layout = ({ children }) => {
   
    return (
        <div className={`flex h-screen`}>
            {/* Conditionally Render Sidebar */}
            <aside className="w-1/4">
            <Sidebar/>
            </aside>
            {/* Main Content */}
            {/* ${shouldHideSidebar ? "w-full" : */}
            <main className={`w-full  "w-3/4"}`}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
