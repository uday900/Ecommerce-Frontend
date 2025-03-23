import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';



function Card({ product }) {
  const navigate = useNavigate();

  // const newImageUrl = product.imageData ? `data:image/jpeg;base64,${product.imageData}` : null;
  const newImageUrl = product.imageDataBase64 ? `data:image/jpeg;base64,${product.imageDataBase64}` : null;
  return (
    <div>
      <div
        key={product.id}
        className="border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
      >
        {/* { console.log(product.imageUrl)} */}

        <img src={newImageUrl}
          alt={product.imageName}
          className="w-full h-auto object-cover rounded-md mb-2" />
        <h3 className="text-lg font-semibold mt-4 cursor-pointer">{product.name}</h3>
        <p className="text-gray-700 mt-2">Price: ${product.price}</p>
        <button
          className="primary-button mt-1"
          onClick={() => {
            navigate(`/admin/product-details/${product.id}`);
          }
          }
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default Card