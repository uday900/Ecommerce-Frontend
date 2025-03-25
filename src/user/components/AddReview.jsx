import React, { use, useContext, useEffect } from 'react'
import { useState } from "react";
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
import { toast } from 'react-toastify';
import api from '../../api/api';

export default function AddReview({ productId }) {
  const [rating, setRating] = useState("5");
  const [review, setReview] = useState("");

  const navigate = useNavigate();

  const {
    isLoading,
    setIsLoading,
    isLoggedIn,
    isAuthenticated,
    user,
    setIsAdmin,
  } = useContext(AppContext);

  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to add review");
      navigate('/login');
      return;
    }

    if (user.role === "ADMIN") {
      toast.error("Admins cannot add reviews");
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
        // fetchProductReviews(productId);
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


  return (
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
  );
}
