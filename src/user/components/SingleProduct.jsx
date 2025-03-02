import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext, newImageUrl } from '../../context/AppContext';
import Loading from '../../common-componets/Loading';
import SampleProductsInLandingPage from './SampleProductsInLandingPage';
import toast from 'react-hot-toast';

function SingleProduct() {

  const { productId, categoryName } = useParams();
  // console.log("first")
  const {
    fetchProductById,
    fetchProductsByCategory,
    product,
    failedToFetch,
    addToCart,
    products,
    isLoading, isAuthenticated,
    message,
    error, setError,
    user,
    isLoggedIn,
    isAdmin,

    placeOrder,
  } = useContext(AppContext);

  const [stars, setStars] = useState([1, 2, 3, 4, 5]);
  //  const stars = [];

  useEffect(() => {
    fetchProductById(productId);
    fetchProductsByCategory(categoryName);
  }, [productId, categoryName]);



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
    }
  };


  useEffect(()=>{
    isLoggedIn();
  },[])

  if (failedToFetch) {
    return <div>"Failed to fetch data from the server. Please try again later."</div>;
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

            <div className="mt-6">
              <h2 className="text-sm font-semibold mb-2">Select Size</h2>

              <div className="flex space-x-2">
                {product.sizes && product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className="border border-gray-200 rounded-md px-3 py-1 hover:bg-slate-200"
                  >
                    {size}
                  </button>
                ))}

                {/* { product.sizes} */}
              </div>
            </div>

            <div className="mt-5">
              <h2 className="text-sm font-semibold mb-2">Colour Available</h2>
              <div className="flex space-x-2 mb-4 ">
                {product.colors && product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="inline-block border border-slate-200 p-2 w-5 h-5 rounded-full"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  ></span>
                ))}
                {/* { product.colors} */}
              </div>
            </div>

            { !isAdmin && <>
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
                {product.reviews?.length ? (
                  product.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 p-4 rounded-md shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-yellow-500">★</span>
                          <span className="text-yellow-500">★</span>
                          <span className="text-yellow-500">★</span>
                          <span className="text-yellow-500">★</span>
                          <span className="text-yellow-400">★</span>
                          <span className="ml-2 text-sm text-gray-600">
                            {review.rating}/5
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {review.date}
                        </p>
                      </div>
                      <p className="text-gray-800 mt-2">{review.comment}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        - {review.user}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No reviews available.</p>
                )}
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
