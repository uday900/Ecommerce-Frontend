import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Card from './Card';

function SampleProductsInLandingPage(props) {

  const navigate = useNavigate();
  const {products, title} = props;
  // console.log(title)
  // products = products.slice(4)

  if (!products || products.length === 0) {
    return ;
  }
  return (
    <>
    <div className="container p-8">
        {/* Section Title */}
        <h2 className="text-xl font-bold mb-4 inline">{title} &gt; </h2>
        <button onClick={()=> navigate(`/user/shop/${title}`)} 
        className="ml-1 text-purple-500 hover:text-purple-600 cursor-pointer">
          {/* <i className="fa-solid fa-chevron-right mx-10"></i> */}
          More
          </button>
        
       

        {/* Slider Container */}
        <div className="flex items-center">
          {/* Items */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-10 ">

            {products && products.map((product) => (
              <Card key={product.id} 
              product={product}
              categoryName={product.categoryName}
               />
            ))}
            
          </div>
          
          

        </div>
      </div>
      </>
  )
}

export default SampleProductsInLandingPage