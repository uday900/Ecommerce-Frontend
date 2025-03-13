import React, { useContext, useEffect, useState } from "react";
import { AppContext, newImageUrl } from "../../context/AppContext";
import Loading from "../../common-componets/Loading";

function Carousel() {
  


  const [newImage, setNewImage] = useState(null);
  // const newImageUrl = product.imageData ? `data:image/jpeg;base64,${product.imageData}` : null;

  const { carouselImages, setCarouselImages,
    fetchCarouselImages, addCarouselImage, 
    deleteCarouselImage, message, setMessage, 
    error, isLoading} = useContext(AppContext);

  // Function to add a new image
  
  function handleImageAdd(image) {
    const formData = new FormData();
    formData.append('image', image);
    addCarouselImage(formData);
    setNewImage(null);
  }


  // Function to delete an image
  function handleDeleteImage(imageId) {
    deleteCarouselImage(imageId);
  }

  useEffect(()=>{
    fetchCarouselImages();
  },[])

  return (
    <div className="p-6 min-h-screen">
        {isLoading && <Loading/>}
      <h2 className="text-2xl font-bold mb-4 text-center">Image Carousel</h2>

<p className="text-gray-600 mb-2">make sure image resolution should be 1200 x 500</p>
      {/* Input for adding a new image */}
      <div className="flex gap-2 mb-4">
        <input
          type="file"
          placeholder="Enter image URL"
    
          onChange={(e) => setNewImage(e.target.files[0])}
          className="input-field w-2/3"
        required/>
        
        <button
          onClick={()=> handleImageAdd(newImage)}
          className={`${newImage == null ? "disabled-button" : "primary-button"}`}
          disabled={newImage == null}
        >
          Add Image
        </button>
      </div>
      { carouselImages.length == 0 && <h1 className=" font-bold text-gray-800">No images found</h1> }

      {/* Display Images with IDs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {carouselImages.map((image) => (
          <div key={image.id} className="bg-white shadow-md p-4 rounded-lg">
            <p className="text-center font-bold">ID: {image.id}</p>
            <img
              src={`${newImageUrl}${image.imageData}`}
              alt={`Image ${image.id}`}
              className="w-full object-cover rounded-md mt-2"
            />
            <button
              onClick={() => handleDeleteImage(image.id)}
              className="secondary-button mt-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
