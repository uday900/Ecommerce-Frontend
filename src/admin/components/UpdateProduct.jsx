import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const UpdateProduct = () => {
  const { productId } = useParams(); // Get the product ID from URL params
  const navigate = useNavigate();

  const [disableUpdate, setDisableUpdate] = useState(true);
  const [initialData, SetInitialData] = useState(null);

  const { register, handleSubmit, reset, watch } = useForm();
  const watchedFields = watch();

  const { product,
    categories,
    fetchCategories,
    isLoading, message, error, fetchProductById, updateProduct } = useContext(AppContext);

  const newImageUrl = product.imageData ? `data:image/jpeg;base64,${product.imageData}` : null;

  

  const [size, setSize] = useState(""); // To store the current size input
  const [sizes, setSizes] = useState([]); // To store the list of sizes
  const [color, setColor] = useState(""); // To store the current size input
  const [colors, setColors] = useState([]); // To store the list of sizes

  // Handler for adding size
  const handleAddSize = () => {
    if (size.trim() === "") return; // Prevent adding empty sizes
    setSizes([...sizes, size.toUpperCase()]); // Add the size to the array
    setSize(""); // Clear the input field
  };
  const handleAddColor = () => {
    if (color.trim() === "") return; // Prevent adding empty sizes
    setColors([...colors, color]); // Add the size to the array
    setColor(""); // Clear the input field
  };
  const handleRemoveSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index)); // Remove size by index
  };

  const handleRemoveColor = (index) => {
    setColors(colors.filter((_, i) => i !== index)); // Remove size by index
  };



  const onSubmit = async (data) => {

    try {
      const formData = new FormData();

      // Append other data fields to FormData
      Object.keys(data).forEach((key) => {
        if (key !== "colors" && key !== "sizes") {
          formData.append(key, data[key]);
        }
      });

      formData.append("colors", colors);
      formData.append("sizes", sizes)

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
      // formData.append("image", data.image && data.image.length > 0 ? data.image[0] : null);

      // formData.forEach((key, value) => {
      //   console.log(key, value)
      // })


      // Update product
      updateProduct(productId, formData);

      // dispatch(updateProduct({ id, updatedProduct: formData }));

      reset();
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error adding product:", error);
    }

  };

  useEffect(() => {
    fetchCategories();
    fetchProductById(productId);
  }, []);

  useEffect(() => {
    if (product) {
      // SetInitialData(product); // Store original product data
      setSizes(product.sizes || []);
      setColors(product.colors || []);
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        categoryName: product.categoryName,
        brand: product.brand,
        rating: product.rating,
      });
    }
  }, [product, reset]);

  // useEffect(() => {

  //   fetchCategories();
  //   fetchProductById(productId);

  //   setColors(product.colors)
  //   setSizes(product.sizes)
  //   reset({
  //     name: product.name,
  //     description: product.description,
  //     price: product.price,
  //     quantity: product.quantity,
  //     categoryName: product.categoryName,
  //     brand: product.brand,
  //     rating: product.rating,

  //   })
  // }, []);

 


  return (
    <div className="flex justify-start">
      {/* Main Content */}
      <div className="flex-grow">
        <div className="flex justify-start">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  {...register("name", { required: true })}
                  placeholder="Enter product name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2"
                  {...register("description", { required: true })}
                  placeholder="Enter product description"
                ></textarea>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    {...register("price", { required: true })}
                    placeholder="Enter price"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-medium mb-2">Brand</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    {...register("brand", { required: true })}
                    placeholder="Enter brand name"
                  />
                </div>
              </div>



              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg p-2"
                    {...register("categoryName", { required: true })}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    {...register("rating", { required: true })}
                    placeholder="Enter rating"
                  />
                </div>
              </div>



              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-2">Sizes</label>

                  <div>
                    <div className="flex gap-2 items-center mb-4">
                      <input
                        type="text"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="Enter size"
                        className="w-full border border-gray-300 rounded-lg p-2"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddSize()}
                        className="secondary-button"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {sizes && sizes.map((size, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-slate-50 text-gray-700 px-3 py-1   rounded-full shadow-sm"
                        >
                          <span className="mr-2">{size}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSize(index)}
                            className=" flex items-center justify-center w-5 h-5 bg-blue-900 text-white rounded-full hover:bg-blue-700"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-2">Colors</label>
                  <div>
                    <div className="flex gap-2 items-center mb-4">
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="Enter color"
                        className="w-full border border-gray-300 rounded-lg p-2"
                      />
                      <button
                        type="button"
                        onClick={handleAddColor}
                        className="secondary-button"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {colors && colors.map((size, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-slate-50 text-gray-700 px-3 py-1   rounded-full shadow-sm"
                        >
                          <span className="mr-2">{size}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(index)}
                            className="flex items-center justify-center w-5 h-5 bg-blue-900 text-white rounded-full hover:bg-blue-700"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
              <div className="mb-4">
                <img src={newImageUrl} alt={product.imageName}
                  className="w-1/4" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select New Image Here If you want </label>
                <input
                  type="file"
                  // name="image"
                  // value={product.imageName}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  {...register("image")}
                  accept="image/*"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="reset"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={() => navigate('/admin/dashboard')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className='primary-button'
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
