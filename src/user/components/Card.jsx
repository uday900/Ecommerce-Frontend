import React, { useState } from "react";
import { Link } from "react-router-dom";
import { newImageUrl } from "../../context/AppContext";

function Card({ product, categoryName }) {


  // const [isFavorite, setIsFavorite] = useState(false);

  // const toggleFavorite = () => {
  //   setIsFavorite(!isFavorite);
  //   console.log("first")
  // };

  return (
    <div className="w-full h-auto flex flex-col bg-white  rounded-lg relative">

      <Link to={`/user/shop/${categoryName}/${product.id}`}>
        {product.imageData && <img
          src={newImageUrl + product.imageData}
          alt={product.imageName}
          className="w-full h-auto object-cover rounded-md mb-2"
        />
        }

        {/* <button
          onClick={() => toggleFavorite()}
          className={`text-sm absolute top-5 right-5 bg-white px-2 py-1 rounded-full 
          ${isFavorite ? 'text-red-500' : 'text-gray-400'} focus:outline-none`}
          aria-label="Add to favorites"

        >
          <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
        </button> */}

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
