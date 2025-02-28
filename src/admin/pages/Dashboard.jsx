import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../common-componets/Loading';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('All');

  const { fetchProducts,
    fetchProductsByCategory,
    categories, isLoading, products, setMessage, message, error } = useContext(AppContext);


  const handleOnChangeFilter = (e) => {
    setSelectedCategory(e.target.value);
    if (e.target.value === 'All') {

      // fetch all
      console.log("fetching All products")
      fetchProducts();
      
    } else {
      // fetch by category;
      console.log(e.target.value);
      fetchProductsByCategory(e.target.value);
      // fetchProducts(e.target.value);
    }
  }

  useEffect(() => {
    fetchProducts();

  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 2000)

    return () => clearTimeout(timer);
  })

  return (
    <>
      <div>

        {isLoading && <Loading />}

        <div className="p-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-500">Welcome Back</h2>
          </div>

          {/* Buttons Section */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => navigate('/admin/manage-categories')}
              className="primary-button cursor-pointer hover:bg-transparent hover:text-black border border-black"
            >
              Manage Categories
            </button>

            <button
              onClick={() => navigate('/admin/add-product')}
              className="primary-button hover:bg-transparent hover:text-black border border-black"
            >
              Add Product
            </button>



            <select name="category" id="category" className="input-field w-auto"
            value={selectedCategory}
            onChange={(e) => handleOnChangeFilter(e)}
            
            >
              <option value="All">All</option>
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>



          </div>

          {products.length === 0 ? <div> No Products are available </div> : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
          {/* Products List */}

        </div>

      </div>
    </>
  )
}

export default Dashboard