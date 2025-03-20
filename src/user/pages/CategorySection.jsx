import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../common-componets/Loading';
import Card from '../components/Card';
import { FaFilter } from 'react-icons/fa';

function CategorySection() {
    const { categoryName } = useParams();

    const {
        fetchProductsByCategory,
        products,
        isLoading,
        categories,
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

    const handleBrandFilter = (e) => {
        if (e.target.checked) {
            setSelectedBrands([...selectedBrands, e.target.value]);
        } else {
            setSelectedBrands(selectedBrands.filter((brand) => brand !== e.target.value));
        }
    };

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
        fetchProductsByCategory(categoryName);
        setFilterProducts(products);
    }, [categoryName]);

    useEffect(() => {
        setFilterProducts(products);
    }, [products]);

    return (
        <>
            {isLoading && <Loading />}

            <div className="flex flex-col md:flex-row">
                {/* Filter Sidebar - Hidden on mobile unless toggled */}
                <div
                    className={`w-full md:w-1/4 p-4 border border-solid border-gray-200 mx-2 md:mx-10 my-4
                    bg-white fixed md:static top-0 left-0 h-full z-50 transition-transform duration-300 
                    ${isFilterVisible ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
                >
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-lg">Filter</h2>
                        {/* Close Button for Mobile */}
                        <button className="md:hidden text-sm" onClick={() => setIsFilterVisible(false)}>✖</button>
                    </div>

                    {/* Brands Filter */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Brands</h3>
                        <ul className="space-y-1">
                            {products.slice(0, showAll ? products.length : 4).map((product) => (
                                <li key={product.id}>
                                    <label className="cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="mx-1 cursor-pointer"
                                            value={product.brand}
                                            onClick={(e) => handleBrandFilter(e)}
                                        />
                                        {product.brand}
                                    </label>
                                </li>
                            ))}
                            {products.length > 4 && (
                                <button
                                    className="text-purple-500 cursor-pointer"
                                    onClick={() => setShowAll(!showAll)}
                                >
                                    {showAll ? 'Show less' : `+ ${products.length - 4} more`}
                                </button>
                            )}
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

                    {/* Other Categories */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Other Categories</h3>
                        <ul className="space-y-1">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link to={`/user/shop/${category.name}`} className="cursor-pointer">
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Products Section */}
                <div className="w-full md:w-3/4 py-4 px-4">
                    <div className="flex justify-between mb-4 items-center">
                        {/* Breadcrumb Navigation */}
                        <nav className="text-sm text-gray-500">
                            <ol className="list-reset flex">
                                <li className="mr-2">Products</li>
                                <li className="mr-2">&gt;</li>
                                <li className="text-gray-800 font-medium">{categoryName}</li>
                            </ol>
                        </nav>

                        {/* Mobile Filter Icon */}
                        <button
                            className="text-sm md:hidden  text-purple-600 flex items-center gap-2"
                            onClick={() => setIsFilterVisible(!isFilterVisible)}
                        >
                            <FaFilter /> Filter
                        </button>

                        <div className="hidden md:flex gap-4">
                            <button className="text-purple-500">New</button>
                            <button>Recommended</button>
                        </div>
                    </div>

                    {/* Product Grid - Responsive */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
                        {filterProducts.map((product, index) => (
                            <Card key={index} product={product} categoryName={categoryName} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategorySection;
