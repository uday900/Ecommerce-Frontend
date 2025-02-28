import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const FilterSidebar = ({products}) => {
    
    const [showAll, setShowAll] = useState(false);
    const [filterProducts, setFilterProducts] = useState(products);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const handleBrandFilter = (e) => {
        console.log(e.target.value);
        if (e.target.checked){
            setSelectedBrands([...selectedBrands, e.target.value]);
        } else{
            setSelectedBrands(selectedBrands.filter((brand) => brand !== e.target.value));
        }

        const filteredProducts = products.filter((product) => selectedBrands.includes(product.brand));
        setFilterProducts(filteredProducts);

    }
    return (
        <div className="w-1/4 p-4 border border-solid border-gray-200 mx-10 my-4">
            <h2 className="font-bold text-lg mb-4">Filter</h2>

            {/* Categories */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Categories</h3>
                <ul className="space-y-1">
                    { products.slice(0, showAll ? products.length : 4).map((product) => (
                        <li>
                            <input type="checkbox" 
                            className = "mx-1" value={product.brand} onClick={(e) => handleBrandFilter(e)} /> 
                            <label>{product.brand}</label>
                        </li>
                    ))}
                    <button className="text-purple-500 cursor-pointer"
                    onClick={() => setShowAll(!showAll)}>+ {products.length - 4} more</button>
                </ul>   
            </div>

            {/* Price */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Price</h3>
                <input type="range" min="70" max="600" className="w-full" />
                <div className="flex justify-between text-sm mt-1">
                    <span>$70</span>
                    <span>$600</span>
                </div>
            </div>

            

        </div>
    );
};

export default FilterSidebar;
