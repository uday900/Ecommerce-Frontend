import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import ConfirmationModal from '../../common-componets/ConfirmationModal';

const ProductDetails = () => {
  
  const navigate = useNavigate();
  const { productId } = useParams();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { product, isLoading, message, error, fetchProductById, deleteProduct} = useContext(AppContext);

  const newImageUrl = product.imageData ? `data:image/jpeg;base64,${product.imageData}` : null;


  // const handleDelete = async (id) => {
  //   dispatch(deleteProduct(id));
  //   if (!isLoading) navigate("/admin/dashboard")
  // };

  function onConfirm(isConfirmed) {
    if (isConfirmed) {
      
      console.log("confirm to delete")
      deleteProduct(productId);
      navigate('/admin/dashboard')
    }
    setIsModalOpen(false);
  }

  const handleUpdate = () => {
    // window.location.href = `/admin/update-product/${id}`;
    navigate(`/admin/update-product/${productId}`);
  };

  
  useEffect(()=>{
    fetchProductById(productId);
  },[])

  if ( product == [] || product.length == 0) {
    return <div>
      product not found
    </div>
  }

  return (
    <>
    <div className=" mx-auto my-1 px-4 ">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-5">
        <ol className="list-reset flex">
          <li className="mr-2">Products</li>
          <li className="mr-2">&gt;</li>
          <li className="text-gray-800 font-medium">{product.categoryName}</li>
        </ol>
      </nav>

      {/* Product Title */}
      <div className='flex mb-4'>
      <h2 className="text-2xl font-bold mr-4">{product.name}</h2>
      
      <div className='flex gap-2'>
      <button 
        onClick={()=> handleUpdate()} 
        className='cursor-pointer'
      ><i class="fa-solid fa-pencil"></i></button>
      <button 
      onClick={()=>setIsModalOpen(true)}
      className='cursor-pointer'
      > <i class="fa-solid fa-trash-can"></i></button>
      </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
       

        {/* Product First Image */}
        <div className="col-span-full">
          <img
            src={newImageUrl}
            alt={product.name}
            className="rounded-lg w-1/4 h-auto"
          />
        </div>

        {/* Product Details */}
        <div className="text-gray-800 mb-10">
          <h4 className="text-lg font-semibold mb-3">Description</h4>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <ul className="list-none space-y-2">
            <li>
              <strong>Price:</strong> <span className="text-blue-600">₹{product.price}</span>
            </li>
            <li>
              <strong>Category:</strong> {product.categoryName}
            </li>
            <li>
              <strong>Brand:</strong> {product.brand}
            </li>
            <li>
              <strong>Rating:</strong> {product.rating}
               {/* ({product.totalRatings} ratings) */}
            </li>
            <li>
              <strong>Available Sizes: </strong>
              {product.sizes ? product.sizes.map((size, index) => (
                <span key={index} className="bg-gray-200 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded mr-1 cursor-pointer">
                  {size}
                </span>
              )) : "No sizes available"}
            </li>
            <li>
              <strong>Colors: </strong>
              {/* { console.log(product.colors)} */}
              {product.colors ? product.colors.map((color, index) => (
                <span key={index} className="bg-gray-200 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded mr-1 cursor-pointer">
                  {color}
                </span>
              ))
            : "No colors available"}
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    { isModalOpen && <ConfirmationModal 
    setIsConfirmationModalOpen={setIsModalOpen} 
    onConfirm={onConfirm} 
    message = {"are you sure do you want to delete this product"} />}   
    </>
  );
};

export default ProductDetails;
