import React, { useContext, useEffect, useState } from 'react'
import { AppContext, newImageUrl } from '../../context/AppContext'
import Loading from '../../common-componets/Loading';
import SampleProductsInLandingPage from '../components/SampleProductsInLandingPage';
import ErrorPage from '../../common-componets/Errorpage';
import { Link } from 'react-router-dom';

function LandingPage() {

  const {
    fetchCategories,
    fetchCarouselImages,
    fetchProductsByCategory,
    carouselImages,
    categories,
    isLoading,
    message,
    error,
    failedToFetch, setFailedToFetch,
    setMessage,


  } = useContext(AppContext)

  const [currentSlide, setCurrentSlide] = useState(0);
  const [listOfCategoryProducts, setListOfCategoryProducts] = useState([]);


  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? carouselImages.length - 1 : prevSlide - 1));
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [carouselImages.length])

  // useEffect(()=>{
  //   if(failedToFetch){
      
  //     return <ErrorPage/>
  //   }
  // },[failedToFetch, setFailedToFetch])

  useEffect(() => {
    async function loadProducts() {

      const response = await Promise.all(
        categories.slice(0, 4).map(async (category) => ({
          title: category.name,
          products: await fetchProductsByCategory(category.name),
        }))
      )

      setListOfCategoryProducts(response);
    }
    // loadProducts();
    if (categories.length > 0) {
      loadProducts();
    }

  }, [categories])

 
  if (failedToFetch) {
    return <ErrorPage/>
  }
  return (
    <div className='min-h-screen'>
      {isLoading && <Loading />}
      {error && <p className='text-center text-red-500'>{error}</p>}


      {/* slider */}
      <div className='relative overflow-hidden max-h-screen '>

        <div className='flex transition-transform duration-500'
          style={{
            transform: `translateX(-${currentSlide * 100}%)`
          }}
        >

          {carouselImages && carouselImages.map((image, index) => (
            //w-screen flex-shrink-0
            <div className="w-[100%] flex-shrink-0" key={index}>
              { categories.length > 0 ? <Link to ={`/user/shop/${categories[0].name}`}> 
              <img
                src={newImageUrl + image.imageData}
                alt={`Slide ${index + 1}`}
                className="w-[100%] h-auto object-cover"
              />
              </Link> 
              :  <img
              src={newImageUrl + image.imageData}
              alt={`Slide ${index + 1}`}
              className="w-[100%] h-auto object-cover"
            /> }
              
            </div>
          ))}

        </div>

        {/* Arrows */}
        <div>
          {carouselImages && carouselImages.length > 1 && (
            <>
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2  bg-transparent p-2 rounded-full cursor-pointer"
                onClick={handlePrevSlide}
              >
                &lt;
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent p-2 rounded-full cursor-pointer"
                onClick={handleNextSlide}
              >
                &gt;
              </button>
            </>
          )}

        </div>
        {/* Dots */}
        <div className="flex justify-center mt-4">
          {carouselImages && carouselImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-2 cursor-pointer ${currentSlide === index ? "bg-gray-600" : "bg-gray-400"
                }`}
              onClick={() => handleDotClick(index)}
            ></button>
          ))}
        </div>

      </div>


      {listOfCategoryProducts && listOfCategoryProducts.map(({ title, products }) => {
        // const products = loadProducts(category.name);
        return (
          <SampleProductsInLandingPage
            key={title}
            title={title}
            products={products}
          />
        )
      })}


    </div>
  )
}

export default LandingPage