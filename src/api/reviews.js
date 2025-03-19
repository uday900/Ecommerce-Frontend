
import { useContext } from "react";
import toast from 'react-hot-toast';
import { AppContext } from "../context/AppContext";
const {
    setIsLoading
} = useContext(AppContext);

export async function fetchProductReviews(productId) {
    setIsLoading(true);
    console.log("Fetching reviews...");
    try {
        const response = await api.get(`/product/reviews/${productId}`);
        console.log(response)
        if (response.data.status == 200) {
            setIsLoading(false);    
            return response.data;
        } else {
            // console.log(response.data.message);
            toast.error(response.data.message);
        }
    } catch (error) {
        toast.error("Error fetching categories");
        // setFailedToFetch(true);
        console.log("Error fetching categories:", error);
        
    } finally {
        // console.log("set false")
        setIsLoading(false);  // Stop loading after response or error
    }
}