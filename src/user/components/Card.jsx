import React, { useState } from "react";
import { Link } from "react-router-dom";

function Card({ product, categoryName }) {

  // const imageSrc = product.imageData ? `${newImageUrl}${product.imageData.trim()}` : "/placeholder.jpg"; // Add a default image if null

  const newImageUrlSameAsAdminCard = product.imageData ? `data:image/jpeg;base64,${product.imageData}` : null;
  const newImageUrl = product.imageDataBase64 ? `data:image/jpeg;base64,${product.imageDataBase64}` : null;

  return (
    <div className="w-full h-auto flex flex-col bg-white  rounded-lg relative">

      <Link to={`/user/shop/${categoryName}/${product.id}`}>
        {product.imageData && <img
          // src={newImageUrlSameAsAdminCard}
          src={newImageUrl }
          // src = {imageSrc}
          alt={product.imageName}
          className="w-full h-auto object-cover rounded-md mb-2"
        />
        }

       
        <div className="flex ">
          <div >
            {/* <Link to={`/user/shop/${categoryName}/${product.id}`}> */}
            <h3 className="font-medium hover:underline">{product.name}</h3>
            {/* </Link> */}
            <p className="text-gray-600">{product.brand}</p>
          </div>
          <div className="ml-auto">
            <p className="px-2 py-1 bg-slate-100 h-auto text-gray-600 font-bold rounded-lg">${product.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
