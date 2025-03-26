import axios from "axios";
import { createContext, useState } from "react";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export const newImageUrl = `data:image/jpeg;base64,`
export const AppContext = createContext();

export const BASE_URL = import.meta.env.VITE_BACKEND_API;
export const AppProvider = ({ children }) => {

    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({ name: "", id: "" });
    const [carouselImages, setCarouselImages] = useState([]);

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "",
        id: "",
        city: "",
        country: "",
        address: "",
        mobile: "",
        image: "",
    });
    const [orders, setOrders] = useState([]);
    const [cart, setCart] = useState({
        cartItems: [],
        totalAmount: 0
    });
    const [cartCount, setCartCount] = useState(0);

    // let's say authenticated
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [info, setInfo] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [failedToFetch, setFailedToFetch] = useState(false);

    // const navigate = useNavigate();
    async function isLoggedIn() {

        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        // console.log(token, user)

        if (token && user) {

            // console.log("checking user exists or not")
            // console.log(token)
            setIsLoading(true);
            setFailedToFetch(false);    
            try {
                const response = await api.post(`/auth/verify-account?token=${token}`)
                // console.log(response, "in logged in")
                if (response != null && response.status == 200) {
                    setIsAuthenticated(true);
                    setIsAdmin(user.role === "ADMIN");
                    setIsUser(user.role === "USER");
                    setUser(user);
                    // toast.success("Login status checked successfully");
                    setIsLoading(false);
                    return true;
                } else {
                    console.log("removing credentials")
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    console.log(localStorage.getItem("token"))
                    toast.error(response.data.message);
                    // console.log(response.data.message);
                }
            } catch (error) {
                toast.error("Error checking login status");
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setFailedToFetch(true);
                setUser({});
                setIsAuthenticated(false);
                setIsAdmin(false);
                setIsUser(false);
                // navigate('/login');

                // navigate to login page
                Windows.location.href = "/login";
                
                console.log("Error checking login status:", error);
                setIsLoading(false);
                return false;
            } finally{
                setIsLoading(false);
            }
        }

        else{
            setIsAuthenticated(false);
            setIsAdmin(false);
            setIsUser(false);
            setUser({});
        }



        return false;
    }
    // API calls
    async function fetchCategories() {
        setIsLoading(true);
        setFailedToFetch(false);
        console.log("Fetching categories...");
        try {
            const response = await api.get(`/category/fetch`);
            // console.log(response)
            if (response.data.status == 200) {
                setCategories(response.data.categories);
            } else {
                // console.log(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error fetching categories");
            setFailedToFetch(true);
            console.log("Error fetching categories:", error);
            
        } finally {
            // console.log("set false")
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function addCategory(category) {
        setIsLoading(true);
        console.log("Adding category...");
        try {
            // const response = await axios.post(`${BASE_URL}/category/add`, category);
            const response = await api.post(`/category/add`, category);
            if (response != null && response.data.status == 200) {
                //  setMessage(response.data.message);
                toast.success(response.data.message);
                fetchCategories();
            } else {
                // setError(response.data.message);
                toast.error(response.data.message);
                console.log("Error adding category");
            }
        } catch (error) {
            toast.error("Error adding category");
            console.log("Error adding category:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    // category { name, id }    
    async function updateCategory(category) {
        setIsLoading(true);
        console.log("Updating category...");
        try {
            // const response = await axios.put(`${BASE_URL}/category/update/${category.id}`, category);
            const response = await api.put(`/category/update/${category.id}`, category);
            if (response != null && response.data.status == 200) {
                //  setMessage(response.data.message);

                toast.success(response.data.message);
                fetchCategories();
            } else {

                toast.error(response.data.message);
                console.log("Error updating category");
            }
        } catch (error) {
            toast.error("Error updating category");
            console.log("Error updating category:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function deleteCategory(categoryId) {
        setIsLoading(true);
        console.log("Deleting category...");
        try {
            // const response = await axios.delete(`${BASE_URL}/category/delete/${categoryId}`);
            const response = await api.delete(`/category/delete/${categoryId}`);
            if (response != null && response.data.status == 200) {
                toast.success(response.data.message);
                fetchCategories();
            } else {
                toast.error(response.data.message);
                console.log("Error deleting category");
            }
        } catch (error) {
            toast.error("Error deleting category");
            console.log("Error deleting category:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function fetchCategoryById(categoryId) {
        setIsLoading(true);
        console.log("Fetching category...");
        try {
            // const response =await axios.get(`${BASE_URL}/category/fetch/${categoryId}`);
            const response = await api.get(`/category/fetch/${categoryId}`);


            if (response.data.status == 200) {
                setCategory(response.data.category);
                toast.success(response.data.message);
                // setProduct(response.data.category);
            } else {
                // setError(response.data.message);
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error fetching category");
            console.log("Error fetching category:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    // products api calls
    async function fetchProducts() {
        setIsLoading(true);
        console.log("Fetching All products...");
        try {
            // const response =await axios.get(`${BASE_URL}/products/fetch`);
            const response = await api.get(`/products/fetch`);


            if (response.data.status == 200) {
                setProducts(response.data.products);
            } else {
                // setError(response.data.message);
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            // setFailedToFetch(true);
            toast.error("Error fetching products");
            console.log("Error fetching products:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function fetchProductById(productId) {
        setIsLoading(true);
        console.log("Fetching product... by id");
        try {
            // const response =await axios.get(`${BASE_URL}/products/fetch/${productId}`);
            const response = await api.get(`/products/fetch/${productId}`);

            if (response.data.status == 200) {
                setProduct(response.data.product);
            } else {
                // setError(response.data.message);
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error fetching product");
            console.log("Error fetching product:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function updateProduct(productId, updatedProduct) {
        setIsLoading(true);
        console.log("Updating product...");
        try {
            // const response = await axios.put(`${BASE_URL}/products/update/${productId}`, updatedProduct);
            const response = await api.put(`/products/update/${productId}`, updatedProduct);
            if (response != null && response.data.status == 200) {
                //  setMessage(response.data.message);
                toast.success(response.data.message);
                fetchProducts();
            } else {
                // setError(response.data.message);
                toast.error(response.data.message);
                console.log("Error updating product");
            }
        } catch (error) {
            toast.error("Error updating product");
            console.log("Error updating product:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function deleteProduct(productId) {
        setIsLoading(true);
        console.log("Deleting product...");
        try {
            // const response = await axios.delete(`${BASE_URL}/products/delete/${productId}`);
            const response = await api.delete(`/products/delete/${productId}`);

            if (response != null && response.data.status == 200) {
                //  setMessage(response.data.message);
                toast.success(response.data.message);
                fetchProducts();
            } else {
                // setError(response.data.message);
                toast.error(response.data.message);
                console.log("Error deleting product");
            }
        } catch (error) {
            toast.error("Error deleting product");
            console.log("Error deleting product:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function addProduct(product) {
        setIsLoading(true);
        console.log("Adding product...");
        try {
            // const response = await axios.post(`${BASE_URL}/products/add`, product);
            const response = await api.post(`/products/add`, product);

            if (response != null && response.data.status == 200) {
                //  setMessage(response.data.message);
                toast.success(response.data.message);
                fetchProducts();
            } else {
                // setError(response.data.message);
                toast.error(response.data.message);
                console.log("Error adding product");
            }
        } catch (error) {
            toast.error("Error adding product");
            console.log("Error adding product:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function fetchProductsByCategory(categoryName) {
        setIsLoading(true);
        console.log("Fetching products by category...");
        try {
            // const response =await axios.get(`${BASE_URL}/products/fetch/category?categoryName=${categoryName}`);
            const response = await api.get(`/products/fetch/category?categoryName=${categoryName}`);

            // console.log(response)
            if (response.data.status == 200) {
                setProducts(response.data.products);
                setIsLoading(false);
                setFailedToFetch(false);
                return response.data.products;
            } else {
                // setError(response.data.message);
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error fetching products by category");
            console.log("Error fetching products by category:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function fetchProductsBySearchValue(searchValue) {
        setIsLoading(true)
        console.log("Fetching products by search value")
        try {
            const response = await api.get(`/products/fetch/search?searchValue=${searchValue}`)
            if (response.data.status == 200) {
                setProducts(response.data.products);

            } else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error fetching products by category");
            console.log("Error fetching products by category:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function fetchCarouselImages() {
        setIsLoading(true);
        console.log("Fetching carousel images...");
        try {
            // const response =await axios.get(`${BASE_URL}/carousels/fetch`);
            const response = await api.get(`/carousels/fetch`);

            if (response.data.status == 200) {
                setCarouselImages(response.data.carouselList);
            } else {
                // setError(response.data.message);
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error fetching carousel images");
            console.log("Error fetching carousel images:", error);

        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }
    async function addCarouselImage(image) {
        setIsLoading(true);
        console.log("Adding carousel image...");
        try {
            // const response = await axios.post(`${BASE_URL}/carousels/add`, image);
            const response = await api.post(`/carousels/add`, image);
            if (response != null && response.data.status == 200) {
                toast.success(response.data.message);
                fetchCarouselImages();
            } else {
                toast.error(response.data.message);
                console.log("Error adding carousel image");
            }
        } catch (error) {
            toast.error("Error adding carousel image");
            console.log("Error adding carousel image:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function deleteCarouselImage(imageId) {
        setIsLoading(true);
        console.log("Deleting carousel image...");
        try {
            // const response = await axios.delete(`${BASE_URL}/carousels/delete/${imageId}`);
            const response = await api.delete(`/carousels/delete/${imageId}`);
            if (response != null && response.data.status == 200) {
                toast.success(response.data.message);
                fetchCarouselImages();
            } else {
                toast.error(response.data.message);
                console.log("Error deleting carousel image");
            }
        } catch (error) {
            toast.error("Error deleting carousel image");
            console.log("Error deleting carousel image:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    // user api calls
    async function fetchUsers() {
        setIsLoading(true);
        console.log("Fetching All users...");
        try {
            // const response =await axios.get(`${BASE_URL}/users/fetch`);
            const response = await api.get(`/users/fetch`);

            if (response.data.status == 200) {
                setUsers(response.data.users);
            } else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error fetching users");
            console.log("Error fetching users:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function fetchUserById(userId) {
        setIsLoading(true);
        console.log("Fetching user...by id", userId);
        try {
            // const response =await axios.get(`${BASE_URL}/users/fetch/${userId}`);
            const response = await api.get(`/users/fetch/${userId}`);

            if (response.data.status == 200) {
                setUser(response.data.user);
            } else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error fetching user");
            console.log("Error fetching user:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }


    // orders api calls
    async function fetchOrders() {
        setIsLoading(true);
        console.log("Fetching All orders...");
        try {
            // const response =await axios.get(`${BASE_URL}/orders/fetch`);
            const response = await api.get(`/orders/fetch`);

            if (response.data.status == 200) {
                setOrders(response.data.orders);
            } else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error fetching orders");
            console.log("Error fetching orders:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function updateOrderStatus(id, newStatus) {
        setIsLoading(true);
        console.log("Updating order status...");
        try {
            // const response =await axios.put(`${BASE_URL}/orders/update-status/${id}?status=${newStatus}`);
            const response = await api.put(`/orders/update-status/${id}?status=${newStatus}`);

            if (response.data.status == 200) {
                toast.success(response.data.message);
                fetchOrders();
            } else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error updating order status");
            console.log("Error updating order status:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function fetchOrderByUserId(userId) {
        setIsLoading(true);
        console.log("Fetching user orders...", userId);
        try {
            // const response =await axios.get(`${BASE_URL}/orders/fetch/user/${userId}`);
            const response = await api.get(`/orders/fetch/user/${userId}`);

            if (response.data.status == 200) {
                setOrders(response.data.orders);
                // console.log(response.data.orders);
            } else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            // setFailedToFetch(true);
            toast.error("Error fetching orders");
            console.log("Error fetching orders:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function placeOrder(userId, productId, quantity) {
        setIsLoading(true);
        console.log("Placing order...");
        try {
            const response = await api.post(`/orders/place-order/${userId}?productId=${productId}&quantity=${quantity}`);

            if (response != null && response.data.status == 200) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error Placing order");
            console.log("Error Placing order:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function checkOut(userId) {
        setIsLoading(true)
        console.log("check-out for user")
        try {
            const response = await api.post(`/orders/check-out/${userId}`);
            if (response != null && response.data.status == 200) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error Placing order");
            console.log("Error Placing order:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }



    // cart api

    async function fetchCart(userId) {
        setIsLoading(true);
        console.log("Fetching user cart...", userId);
        try {
            // const response =await axios.get(`${BASE_URL}/users/cart/fetch/${userId}`);
            const response = await api.get(`/users/cart/fetch/${userId}`);

            if (response.data.status == 200) {
                setCart(response.data.cart);
            } else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error fetching cart");
            console.log("Error fetching cart:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function addToCart(userId, productId) {
        setIsLoading(true);
        console.log("Adding to cart...");
        try {
            // const response = await axios.post(`${BASE_URL}/users/cart/add/${userId}?productId=${productId}`);
            const response = await api.post(`/users/cart/add/${userId}?productId=${productId}`);

            if (response != null && response.data.status == 200) {
                fetchCart(userId);
                fetchCartCount(userId);
                toast.success(response.data.message);
            } else {
                // setError(response.data.message);
                toast.error(response.data.message);
                console.log("Error adding to cart");
            }
        } catch (error) {
            // setFailedToFetch(true);
            toast.error("Error adding to cart");
            console.log("Error adding to cart:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function removeFromCart(userId, cartItemId) {
        setIsLoading(true);
        console.log("Removing from cart...", userId, cartItemId);
        try {
            // const response = await axios.delete(`${BASE_URL}/users/cart/remove/${userId}/${cartItemId}`);
            const response = await api.delete(`/users/cart/remove/${userId}/${cartItemId}`);
            if (response != null && response.data.status == 200) {
                toast.success(response.data.message);
                fetchCart(userId);
                fetchCartCount(userId);
            } else {
                toast.error(response.data.message);
                console.log("Error removing from cart");
            }
        } catch (error) {
            toast.error("Error removing from cart");
            console.log("Error removing from cart:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function fetchCartCount(userId) {
        setIsLoading(true);
        console.log("Fetching cart count...withidd", userId);
        if (userId === null || userId === undefined) return

        try {
            // const response =await axios.get(`${BASE_URL}/users/cart/count/${userId}`);
            const response = await api.get(`/users/cart/count/${userId}`);

            if (response.data.status == 200) {
                setCartCount(response.data.cartCount);
                // response.data.cartCount;
            } else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            // toast.error("Error fetching cart count");
            console.log("Error fetching cart count:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function incrementQuantity(userId, cartItemId) {
        setIsLoading(true);
        console.log("Incrementing quantity...");
        try {
            // const response =await axios.post(`${BASE_URL}/users/cart/increment/${userId}?cartItemId=${cartItemId}`);
            const response = await api.post(`/users/cart/increment/${userId}?cartItemId=${cartItemId}`);

            if (response.data.status == 200) {
                toast.success(response.data.message);
                fetchCart(userId);
            } else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error incrementing quantity");
            console.log("Error incrementing quantity:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }

    async function decrementQuantity(userId, cartItemId) {
        setIsLoading(true);
        console.log("Decrementing quantity...");
        try {
            // const response =await axios.post(`${BASE_URL}/users/cart/decrement/${userId}?cartItemId=${cartItemId}`);
            const response = await api.post(`/users/cart/decrement/${userId}?cartItemId=${cartItemId}`);

            if (response.data.status == 200) {
                toast.success(response.data.message);
                fetchCart(userId);
            } else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error("Error decrementing quantity");
            console.log("Error decrementing quantity:", error);
        } finally {
            setIsLoading(false);  // Stop loading after response or error
        }
    }




    const values = {

        isUser, isAdmin, isAuthenticated, isLoading,
        setIsAuthenticated, setIsLoading, setIsUser, setIsAdmin,
        info, setInfo,

        failedToFetch, setFailedToFetch,
        categories, setCategories,
        fetchCategories, addCategory, updateCategory, deleteCategory, fetchCategoryById,

        products, setProducts,
        product, setProduct,
        fetchProducts, addProduct, updateProduct, deleteProduct, fetchProductById,
        fetchProductsByCategory,
        fetchProductsBySearchValue,

        message, setMessage,
        error, setError,

        carouselImages, setCarouselImages,
        fetchCarouselImages, addCarouselImage, deleteCarouselImage,


        users, setUsers,
        user, setUser,
        fetchUsers, fetchUserById,

        orders, setOrders,
        fetchOrders, fetchOrderByUserId, updateOrderStatus,
        placeOrder,
        checkOut,

        cart, setCart, cartCount,
        fetchCart, addToCart, removeFromCart, fetchCartCount, incrementQuantity, decrementQuantity,

        isLoggedIn,


    }


    return (
        <AppContext.Provider
            value={values}>

            {children}
        </AppContext.Provider>

    )
}