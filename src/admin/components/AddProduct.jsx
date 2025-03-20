import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";
import Loading from "../../common-componets/Loading";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  
  const navigate = useNavigate();
  const { register, 
    handleSubmit, 
    reset,
    watch,
    formState: { errors },

   } = useForm();
  const { categories, isLoading, addProduct,  } = useContext(AppContext);
  
  const [size, setSize] = useState(""); // To store the current size input
  const [sizes, setSizes] = useState([]); // To store the list of sizes
  const [color, setColor] = useState(""); // To store the current size input
  const [colors, setColors] = useState([]); // To store the list of sizes

  const watchedFields = watch();
  // Handler for adding size
  const handleAddSize = () => {
    if (size.trim() === "") return; // Prevent adding empty sizes
    setSizes([...sizes, size]); // Add the size to the array
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
        // if (key !== "colors" && key !== "sizes") {
          formData.append(key, data[key]);
        // }
      });

      // Append `colors` and `sizes` as JSON strings
      formData.append("colors", colors)
      formData.append("sizes", sizes)

      formData.append("image", data.image[0]);

      formData.forEach((key, value) => {
        console.log(key, value)
      })

      // Add product
      addProduct(formData)
      reset();  



      // dispatch(addProduct(formData));

      // reset();
      // if (!productsLoading) {
      //   navigate('/admin/dashboard')
      // }

      // reset();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  
  useEffect(() => {
    reset(
      {
        rating: 1,
      }
    );

  }, []); 

 
  // console.log(watchedFields);
  return (
    <div className="flex justify-start">
      { isLoading && <Loading/>}
      
      {/* Main Content */}
      <div className="flex-grow">
        <div className="flex justify-start">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Product Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    {...register("name", { required:  "Product name is required" })}
                    placeholder="Enter product name"
                  />
                { errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2"
                  {...register("description", { required: "Product description is required" })}
                  placeholder="Enter product description"
                ></textarea>
                { errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>

              
              <div className="flex gap-4 mb-4">
                <div className="w-full">
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    className="selection-field"
                    // value={category}
                    // onChange={(e) => setCategory(e.target.value)}
                    {...register("categoryName", { required: "Category is required" })}

                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                    { errors.categoryName && <p className="text-red-500 text-xs mt-1">{errors.image.categoryName}</p>}

                  </select>
                </div>
                {/* <div className="w-1/2">
                  <label className="block text-sm font-medium mb-2">Rating (Optional)</label>
                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    {...register("rating", { required: false })}
                    placeholder="Enter rating"
                  />
                  
                </div> */}


              </div>

              <div className="flex gap-4 mb-4">

                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    {...register("price", { required: "Product price is required" })}
                    placeholder="Enter price"
                  />
                  { errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-medium mb-2">Brand</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    {...register("brand", { required: "Product brand is required" })}
                    placeholder="Enter brand name"
                  />
                  { errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>}
                </div>

              </div>




              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-2">Sizes (Optional)</label>

                  <div>
                    <div className="flex gap-2 items-center mb-4">
                      <input
                        type="text"
                        value={size}
                        onChange={(e) => setSize(e.target.value.toUpperCase())}
                        placeholder="Enter size"
                        className="w-full border border-gray-300 rounded-lg p-2"
                      />
                      <button
                        onClick={handleAddSize}
                        className="secondary-button"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-slate-50 text-gray-700 px-3 py-1   rounded-full shadow-sm"
                        >
                          <span className="mr-2">{size}</span>
                          <button
                            onClick={() => handleRemoveSize(index)}
                            className="flex items-center justify-center w-5 h-5 bg-blue-900 text-white rounded-full hover:bg-blue-700"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-2">Colors (Optional)</label>
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
                        onClick={handleAddColor}
                        className="secondary-button"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {colors.map((size, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-slate-50 text-gray-700 px-3 py-1   rounded-full shadow-sm"
                        >
                          <span className="mr-2">{size}</span>
                          <button
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
                <label className="block text-sm font-medium mb-2">Image</label>
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  {...register("image", { required: "Image is required" })}
                  accept="image/*"
                />
                { errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
              </div>


              <div className="flex justify-end">
                <button
                  type="reset"
                  className="cancel-button"
                  onClick={() => {
                    reset();
                    navigate("/admin/dashboard")
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${
                    watchedFields.name === "" || 
                    watchedFields.description === "" || 
                    watchedFields.price === "" || 
                    watchedFields.categoryName === "" ||
                    !watchedFields.image || watchedFields.image.length === 0 ||
                    watchedFields.brand === "" ? "disabled-button" : 'primary-button'}`}
                  disabled={watchedFields.name === "" || 
                  watchedFields.description === "" || 
                  watchedFields.price === "" || 
                  watchedFields.categoryName === "" ||
                  !watchedFields.image || watchedFields.image.length === 0 ||
                  watchedFields.brand === ""}

                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;



