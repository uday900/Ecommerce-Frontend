import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import Card from '../user/components/Card';
import Loading from './Loading';

function SearchProducts() {
  const { searchValue } = useParams();
  const {
    fetchProductsBySearchValue,
    products,
    isLoading,
  } = useContext(AppContext);

  const [showAll, setShowAll] = useState(false);
  const [filterProducts, setFilterProducts] = useState(products);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false); // For mobile filter toggle
      const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  
  
      const priceRanges = [
          { label: "0 - 500", min: 0, max: 500 },
          { label: "500 - 1000", min: 500, max: 1000 },
          { label: "1000 - 2000", min: 1000, max: 2000 },
          { label: "2000+", min: 2000, max: Infinity },
      ];
  
      const handlePriceFilterChange = (e, min, max) => {
        // filter products man

      

        if (e.target.checked){

            if (selectedPriceRanges.length === 0){
                setSelectedPriceRanges([{ min, max }]);
                return;
            }
            setSelectedPriceRanges([...selectedPriceRanges, { min, max }]);

        } else{
            setSelectedPriceRanges(selectedPriceRanges.filter((range) => range.min !== min || range.max != max));
        }
        // setSelectedPriceRanges((prev) =>{
        //     // check min, max already present

        //     prev.some((range) => range.min !== min && range.max != max)
        //     ? selectedPriceRanges.filter((range) => range.min !== min || range.max != max)
        //     : [...prev, { min, max }]
        // });
        
    }

  const handleBrandFilter = (e) => {
    console.log(e.target.value);
    if (e.target.checked) {
      setSelectedBrands([...selectedBrands, e.target.value]);
    } else {
      setSelectedBrands(selectedBrands.filter((brand) => brand !== e.target.value));
    }

    const filteredProducts = products.filter((product) => selectedBrands.includes(product.brand));
    setFilterProducts(filteredProducts);

  }


  // useEffect(() => {
  //   // Only filter products if there are selected brands
  //   if (selectedBrands.length > 0) {
  //     const filteredProducts = products.filter((product) =>
  //       selectedBrands.includes(product.brand)
  //     );
  //     setFilterProducts(filteredProducts);
  //   } else {
  //     // If no brand is selected, show all products
  //     setFilterProducts(products);
  //   }
  // }, [selectedBrands, products]);

   useEffect(() => {
          let overAllFilteredProducts = products;
          if (selectedBrands.length > 0) {
              const filteredProductsbyBrand = products.filter((product) =>
                  selectedBrands.includes(product.brand)
              );
              overAllFilteredProducts = filteredProductsbyBrand;
              // setFilterProducts(filteredProductsbyBrand);
          } 
          // else {
          //     setFilterProducts(products);
          // }
  
          if (selectedPriceRanges && selectedPriceRanges.length > 0) {
              const filteredProductsByPrice = products.filter((product) =>
                  selectedPriceRanges.some((range) => 
                      product.price >= range.min && product.price <= range.max
                  )
              );
              overAllFilteredProducts = overAllFilteredProducts.filter((product) =>
                  filteredProductsByPrice.includes(product)
              );
              // setFilterProducts(filteredProductsByPrice);
          }
  
          
          setFilterProducts(overAllFilteredProducts);
      }, [selectedBrands, products, selectedPriceRanges]);
  


  useEffect(() => {
    fetchProductsBySearchValue(searchValue);
  }, [searchValue]);
  useEffect(() => {
      setFilterProducts(products);
  }, [products]);

  // if (filterProducts.length === 0) {
  //   return (
  //     <div className='flex flex-col items-center justify-center min-h-screen'>
  //       <h1 className="text-2xl font-bold mb-4">No products found</h1>
  //       <p className="text-gray-600">There are no products that match the search criteria.</p>
  //     </div>
  //   )
  // }
  return (
    <div>
       {isLoading && <Loading />}
        <div className="flex">
            {/* <FilterSidebar products={products}/> */}

            <div className="w-1/4 p-4 border border-solid border-gray-200 mx-10 my-4 h-max-screen">
                <h2 className="font-bold text-lg mb-4">Filter</h2>

                {/* Categories */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Brands</h3>
                    <ul className="space-y-1">
                        {products.slice(0, showAll ? products.length : 4).map((product) => (
                            <li key={product.id}>
                              <label className="cursor-pointer" >
                                <input type="checkbox"
                                    className="mx-1"
                                    value={product.brand} 
                                    onClick={(e) => handleBrandFilter(e)} />
                                {product.brand}
                                
                                </label>
                            </li>
                        ))}
                        { products.length > 4 && <button className="text-purple-500 cursor-pointer"
                            onClick={() => setShowAll(!showAll)}>+ {  products.length - 4} more</button>}
                        
                    </ul>
                </div>
                
                    {/* price filters */}
                    <div>
                        <p>Price Filter</p>
                        {priceRanges.map(({ label, min, max }) => (
                            <label key={label} style={{ display: "block", cursor: "pointer" }}>
                                <input type='checkbox'
                                className='mx-1 cursor-pointer'
                                    onClick={(e) => handlePriceFilterChange(e, min, max)}
                                    // checked={priceRanges.some(range => range.min === min && range.max === max)}
                                />
                                {label}
                            </label>

                        ))}


                    </div>
            </div>


            <div className="w-3/4 py-4 px-4">
                <div className="flex justify-between mb-4">

                    <nav className="text-sm text-gray-500">
                        <ol className="list-reset flex">
                            <li className="mr-2">Products</li>
                            <li className="mr-2">&gt;</li>
                            <li className="text-gray-800 font-medium">{searchValue}</li>
                        </ol>

                    </nav>
                    <div className="flex gap-4">
                        <button className="text-purple-500">New</button>
                        <button>Recommended</button>
                    </div>
                </div>
                
                {filterProducts.length === 0 && (
    
      <div className='flex flex-col items-center justify-center '>
        <h1 className="text-2xl font-bold mb-4">No products found</h1>
        <p className="text-gray-600">There are no products that match the search criteria.</p>
      </div>
    )
  }
                <div className="grid grid-cols-3 gap-6">
                    {filterProducts.map((product, index) => (
                        <Card key={index} product={product} categoryName={product.categoryName} />

                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchProducts