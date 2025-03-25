import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
// import { Toaster } from "react-hot-toast";
import ScrollToTop from "./common-componets/ScrollToTop";
import Navbar from "./common-componets/Navbar";
import Footer from "./common-componets/Footer";
import Loading from "./common-componets/Loading";

// Regular imports (not lazy)
import LandingPage from "./user/pages/LandingPage";
import Login from "./common-componets/Login";
import Register from "./common-componets/Register";
import { ToastContainer } from "react-toastify";

// Lazy load remaining components
const AdminRoutes = lazy(() => import("./admin/AdminRoutes"));
const UserRoutes = lazy(() => import("./user/UserRoutes"));
const ForgotPassword = lazy(() => import("./common-componets/ForgotPassword"));
const ResetPassword = lazy(() => import("./common-componets/ResetPassword"));
const SearchProducts = lazy(() => import("./common-componets/SearchProducts"));
const PageNotFound = lazy(() => import("./common-componets/PageNotFound"));

function App() {
  const { isLoggedIn, fetchCategories, fetchCarouselImages } = useContext(AppContext);

  useEffect(() => {
    isLoggedIn();
    fetchCategories();
    fetchCarouselImages();
  }, []);

  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>
        {/* Regularly loaded components */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Lazy-loaded components wrapped in Suspense */}
        <Route
          path="/*"
          element={
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/search/:searchValue" element={<SearchProducts />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/user/*" element={<UserRoutes />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          }
        />

        <Route path="/test" element={<Loading />} />
      </Routes>

      <ToastContainer position="top-right" />
      <Footer />
    </>
  );
}

export default App;
