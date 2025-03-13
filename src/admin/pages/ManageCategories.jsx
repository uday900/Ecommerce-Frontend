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

  const [validated, setValidated] = useState(true);


  const { categories, isLoading,
    fetchCategories, addCategory, updateCategory,
    deleteCategory, fetchCategoryById,
    message, setMessage,
    error, setError } = useContext(AppContext);






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

  useEffect(() => {
    fetchCategories();
  }, [])
  useEffect(() => {
    setError('');
  }, [newCategory])

  useEffect(() => {
    console.log("new category", newCategory, validated);
    if (newCategory !== null && newCategory.trim() !== ""

    ) {
      setValidated(false);
    } else {
      setValidated(true);
    }
  }, [newCategory, updatedCategoryName])

  return (
    <>
      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <ConfirmationModal
          setIsConfirmationModalOpen={setIsConfirmationModalOpen}
          onConfirm={onConfirm}
          message={`Are you sure you want to delete this category?`}
        />
      )}
      {isLoading && <Loading />}
      <div className="p-6 max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>

        {/* Add Category */}
        <div className="flex flex-col gap-4 mb-6">

          <form action="" onSubmit={(e) => { e.preventDefault(); handleAddCategory() }}>
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              placeholder="Add new category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            // required = {true}

            />
            {/* change button dispaly when disabled to lower color */}
            <button
              className={`mt-2 ${validated ? 'disabled-button' : ' primary-button  '}`}
              type='submit'
              disabled={validated}
            >
              Add
            </button>
          </form>
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
                    {/* <button
                      onClick={() => handleUpdateCategory(category.id, updatedCategoryName)}
                      // className=""
                      className={` ' bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 '}`}
                    >
                      Save
                    </button> */}
                    <button
                      onClick={() => handleUpdateCategory(category.id, updatedCategoryName)}
                      className={`${updatedCategoryName === category.name || !updatedCategoryName.trim() ? 'disabled-button' : 'bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'} `}
                      disabled={updatedCategoryName === category.name || !updatedCategoryName.trim()} // Disable if unchanged or empty
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
                    {/* Edit Button */}
                    <button
                      className="cursor-pointer hover:text-sky-500"
                      onClick={() => {
                        setUpdatedCategoryId(category.id);
                        setUpdatedCategoryName(category.name);
                      }}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      onClick={() => {
                        setIsConfirmationModalOpen(true);
                        setCurrentCategoryId(category.id);
                        // setNewCategory(category.name);
                      }}
                      className="cursor-pointer hover:text-red-500"
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
