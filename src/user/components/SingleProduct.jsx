import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext, newImageUrl } from '../../context/AppContext';
import Loading from '../../common-componets/Loading';
import SampleProductsInLandingPage from './SampleProductsInLandingPage';
import { set } from 'react-hook-form';
import api from '../../api/api';
import AddReview from './AddReview';
import { toast, ToastContainer } from 'react-toastify';
import ErrorPage from '../../common-componets/Errorpage';

function SingleProduct() {

  const { productId, categoryName } = useParams();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("5");
  const [review, setReview] = useState("");

  const [showAllReviews, setShowAllReviews] = useState(false);
  // console.log("first")
  const {
    fetchProductById,
    fetchProductsByCategory,
    product,
    failedToFetch,
    addToCart,
    products,
    isLoading, setIsLoading, isAuthenticated,
    user,
    isLoggedIn,
    isAdmin,

    placeOrder,
  } = useContext(AppContext);

  const [stars, setStars] = useState([1, 2, 3, 4, 5]);
  //  const stars = [];



  const handleAddToCart = () => {
    // addToCart(product);

    if (isAuthenticated && user != null) {
      addToCart(user.id, productId);
      // toast.success("Item added to cart");

    } else {
      toast.error("Please login to add to cart");
     
    }
  };

  const handleOrderNow = () => {
    if (isAuthenticated && user != null) {

      // take input from alert box
      const quantity = prompt("Enter the quantity");
      // addToCart(user.id, productId, quantity);
      placeOrder(user.id, productId, quantity);
    } else {
      toast.error("Please login to buy product");
      navigate('/login');
    }
  };


  async function fetchProductReviews(productId) {
    setIsLoading(true);
    console.log("Fetching reviews...");
    try {
      const response = await api.get(`/product/reviews/${productId}`);
      console.log(response)
      if (response.status == 200) {
        setReviews(response.data)
      } else {
        // console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching reviews");
      // setFailedToFetch(true);
      console.log("Error fetching reviews:", error);

    } finally {
      // console.log("set false")
      setIsLoading(false);  // Stop loading after response or error
    }
  }

  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to add review");
      navigate('/login');
      return;
    }


    setIsLoading(true);
    console.log("Adding review...");

    const formData = {
      productId,
      rating: Number(rating),
      comment: review,
      userId: user.id
    };

    try {
      // const response = await axios.post(`${BASE_URL}/category/add`, category);
      const response = await api.post(`/product/reviews`, formData);
      if (response != null && response.status == 200) {
        //  setMessage(response.data.message);
        toast.success(response.data);
        fetchProductReviews(productId);
      } else {
        // setError(response.data.message);
        toast.error(response.data.message);
        // console.log("Error adding category");
      }
    } catch (error) {
      toast.error("Error adding reviws");
      console.log("Error adding category:", error);
    } finally {
      setIsLoading(false);  // Stop loading after response or error
    }

    // Handle form submission here
    setRating("5");
    setReview("");
  };

  async function handleDeleteReview(reviewId, userId) {

    console.log(reviewId, user.id, userId);
    setIsLoading(true);

    try {
      const response = await api.delete(`/product/reviews/${reviewId}/${userId}`);
      console.log(response)
      // if(response.status == 4)
     
      if (response != null && response.status == 200) {
        toast.success(response.data);
        fetchProductReviews(productId);
        // console.log("first")
      } else {
        toast.error("Error deleting review");
      }
    } catch (error) {
      toast.error("Error deleting review");
      console.log("Error deleting review:", error);
    } finally {
      setIsLoading(false);  // Stop loading after response or error
    }

  }

  const dateFormat = (timestamp) => {
    const date = new Date(timestamp);
    // Extract date components
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    // Extract time components
    let hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight 

    return `${day}-${month}-${year} at ${hours}:${minutes} ${amPm}`;
  };
  useEffect(() => {
    isLoggedIn();
  }, [])

  // useEffect(() => {
  //   // fetching reviews
  //   fetchProductReviews(productId);
  //   console.log("reviews", reviews);
  // }, [product]);  
  
  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
      fetchProductsByCategory(categoryName);
      fetchProductReviews(productId);  // Ensure reviews are fetched after the product
    }
  }, [productId, categoryName]);

  // useEffect(() => {
  //   fetchProductById(productId);
  //   fetchProductsByCategory(categoryName);
  // }, [productId, categoryName]);


  useEffect(() => {
    if (isAuthenticated && user ) {

      // Filter out matching userId reviews
      const userReviews = reviews.filter(review => review.userId === user.id);

      // Get remaining reviews
      const otherReviews = reviews.filter(review => review.userId !== user.id);

      // Merge them with user reviews first
      const sortedReviews = [...userReviews, ...otherReviews];
      if (JSON.stringify(sortedReviews) !== JSON.stringify(reviews)) {
        setReviews(sortedReviews);
      }
      // setReviews(sortedReviews);
    }
  }, [isAuthenticated, user, reviews]);

  if (failedToFetch) {
    return <ErrorPage/>;
  }

  return (
    <>
      {isLoading && <Loading />}

      <div className="container mx-auto py-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={newImageUrl + product.imageData}
              alt="Raven Hoodie"
              className="w-full h-96 object-contain rounded-lg sticky top-16"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {/* display brand */}
            <p className="text-sm text-gray-500 mb-4"> by {product.brand}</p>

            <div className="flex items-center mb-4">
              {/* { stars.map(star => star) } */}
              {stars.map((star, _) => {
                return <span key={_} className={` ${star <= product.rating ? 'text-yellow-500' : 'text-gray-400'}`}>★</span>
              })}
              <span className="text-sm text-gray-500 ml-2">
                ({product.rating})
              </span>
            </div>

            <p className="text-2xl font-semibold mb-4">&#8377;{product.price}</p>

            { product.sizes && 
            <div className="mt-6">
              <h2 className="text-sm font-semibold mb-2">Sizes Avaliable</h2>

              <div className="flex space-x-2">
                {product.sizes && product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className="border border-gray-200 rounded-md px-3 py-1 hover:bg-slate-200 cursor-pointer"
                  >
                    {size}
                  </button>
                ))}

                {/* { product.sizes} */}
              </div>
            </div>

              }
            { product.colors && 
            <div className="mt-5">
              <h2 className="text-sm font-semibold mb-2">Colour Available</h2>
              <div className="flex space-x-2 mb-4 ">
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="inline-block border border-slate-200 p-2 w-5 h-5 rounded-full cursor-pointer"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  ></span>
                ))}
                {/* { product.colors} */}
              </div>
            </div>
}

            {!isAdmin && <>
              <button
                className="primary-button mt-4"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>

              <button
                className="mx-3 secondary-button"
                onClick={() => handleOrderNow(product)}
              >Buy Now</button>
            </>}

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Product Description</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
            </div>

            {/* Ratings and Reviews Section */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Ratings and Reviews</h2>
              <div className="space-y-4">
                {reviews?.length ? (
                  reviews.map((review, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 p-4 rounded-md shadow-sm"
                    >
                      <div> <span className='font-semibold'>{review.userName}</span>
                        <span className='text-sm ml-4'>reviewed on {dateFormat(review.createdAt)}</span>

                        {isAuthenticated && review.userId === user.id && <button className='ml-2 text-sm text-red-600 cursor-pointer hover:text-red-900'
                          onClick={() => handleDeleteReview(review.id, review.userId)}>remove review
                        </button>
                        }
                      </div>
                      <div className="flex items-center justify-between">
                        <div>

                          {stars.map((star, _) => {
                            return <span key={_} className={` ${star <= review.rating ? 'text-yellow-500' : 'text-gray-400'}`}>★</span>
                          })}
                          <span className="ml-2 text-sm text-gray-600">
                            ({review.rating}/5)
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {review.date}
                        </p>
                      </div>
                      <p className="text-gray-800 mt-2">{review.comment}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        - by {review.userName}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No reviews available.</p>
                )}
                {/* <AddReview productId={productId} /> */}
                <div className="relative w-full  bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

                  <form onSubmit={handleAddReview}>
                    {/* Rating Selection */}
                    <label className="block font-medium">Rating:</label>
                    <select
                      className="w-full mt-2 p-2 border rounded-md text-sm"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                      <option value="4">⭐⭐⭐⭐ - Good</option>
                      <option value="3">⭐⭐⭐ - Average</option>
                      <option value="2">⭐⭐ - Poor</option>
                      <option value="1">⭐ - Very Bad</option>
                    </select>

                    {/* Review Input */}
                    <label className="block font-medium mt-4">Your Review:</label>
                    <textarea
                      className="w-full mt-2 p-2 border rounded-md resize-none h-24"
                      placeholder="Write your review here..."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}

                    />

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className={`${review.trim() ? 'primary-button' : 'disabled-button'} w-full mt-4`}
                      disabled={!review.trim()}
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SampleProductsInLandingPage
        products={products}
        title="Related Products"

      />
    </>
  );
}

export default SingleProduct;
