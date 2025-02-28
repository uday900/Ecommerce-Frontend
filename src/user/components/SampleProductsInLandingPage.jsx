import React from 'react'
import { Link } from 'react-router-dom';
import Card from './Card';

function SampleProductsInLandingPage(props) {
  const {products, title} = props;
  // console.log(title)
  // products = products.slice(4)
  return (
    <>
    <div className="container pl-8 py-8">
        {/* Section Title */}
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {/* Slider Container */}
        <div className="flex items-center">
          {/* Items */}
          <div className="grid grid-cols-5 gap-10">

            {products.map((product) => (
              <Card key={product.id} 
              product={product}
              categoryName={product.categoryName}
               />
            ))}
            
          </div>
          <button>
          <i class="fa-solid fa-chevron-right mx-10"></i>
          </button>
          

        </div>
      </div>
      </>
  )
}

export default SampleProductsInLandingPage