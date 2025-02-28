import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../common-componets/Loading';
import ConfirmationModal from '../../common-componets/ConfirmationModal';

export default function ManageCategories() {
  console.log("manage categories component");
  const [newCategory, setNewCategory] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [updatedCategoryId, setUpdatedCategoryId] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState(null);


  const { categories, isLoading, 
    fetchCategories, addCategory, updateCategory,
     deleteCategory, fetchCategoryById,
     message, setMessage,
     error, setError } = useContext(AppContext);

useEffect(()=>{
  fetchCategories();
},[])
  

  const handleAddCategory = () => {
    
    addCategory({ name: newCategory });
    setNewCategory('');
  }

  const handleUpdateCategory = (categoryId, updatedCategoryName) => {
    console.log("category id", categoryId, updatedCategoryName);
    updateCategory({ name: updatedCategoryName, id: categoryId });
    setNewCategory('');
    setCurrentCategoryId(null);
    setUpdatedCategoryId(null);
    setUpdatedCategoryName(null);
  }
  
  function onConfirm(isConfirmed) {
    if (isConfirmed) {
      deleteCategory(currentCategoryId);
      setNewCategory("")
    }
    setIsConfirmationModalOpen(false);
  }

  useEffect(()=>{
    setError('');
  },[newCategory])

  useEffect(()=>{
    const timer = setTimeout(() => {
      setMessage('');
    }, 2000)

    return () => clearTimeout(timer);
  })

  return (
    <>
    {/* Confirmation Modal */}
    {isConfirmationModalOpen && (
        <ConfirmationModal
          setIsConfirmationModalOpen={setIsConfirmationModalOpen}
          onConfirm={onConfirm}
          message={`Are you sure you want to delete this category  ${newCategory}?`}
        />
      )}
      {isLoading && <Loading />}
      <div className="p-6 max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>

        {/* Add Category */}
        <div className="flex flex-col gap-4 mb-6">
          { error && <p className='text-red-500'>{error}</p>}
          { message && <p className='text-green-500'>{message}</p>}
          {/* <p className='text-red-500'>{error}</p> */}
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Add new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <div>
            <button
              onClick={handleAddCategory} 
              className="secondary-button">
              Add
            </button>
          </div>
        </div>

        {/* List Categories */}
        <ul className="divide-y divide-gray-200">

          {categories.map((category) => (

            <li key={category.id} className="flex py-2">

              {/* checking is edit */}
              {updatedCategoryId === category.id ? (
                <div className="flex flex-col gap-4 w-full">
                  <input
                    type="text"
                    className="border border-gray-300 rounded px-4 py-2 flex-1"
                    value={updatedCategoryName}
                    onChange={(e) => setUpdatedCategoryName(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={()=>handleUpdateCategory(category.id, updatedCategoryName)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                      
                        setUpdatedCategoryId(null);
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span className="flex-1 ">{category.name}</span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setUpdatedCategoryId(category.id);
                        setUpdatedCategoryName(category.name);
                      }}
                        
                      className="">
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                    onClick={() => {
                      setIsConfirmationModalOpen(true);
                      setCurrentCategoryId(category.id);
                      setNewCategory(category.name);
                    }}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

    </>
  );
}
