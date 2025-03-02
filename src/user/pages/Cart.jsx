import React, { useContext, useEffect } from 'react';
import { AppContext, newImageUrl } from '../../context/AppContext';
import emptyCartImage from '../../assests/empty-cart.webp'
import { useParams } from 'react-router-dom';
import Loading from '../../common-componets/Loading';
import toast from 'react-hot-toast';
import AuthRequired from '../../common-componets/AuthRequired';

function Cart() {

  // const { userId } = useParams();

  // console.log(userId)

  const { 
    cart, 
    setCart,
    isLoading,
    
    isAuthenticated,
    fetchCart, incrementQuantity, decrementQuantity, removeFromCart,

    isLoggedIn,
    checkOut,


   } = useContext(AppContext);

   const user = JSON.parse(localStorage.getItem("user"));

  //  console.log(user)
  

   const handleRemoveFromCart = (userId, cartItemId) => {
     removeFromCart(userId, cartItemId);
   }
   const handleCheckOut = () =>{
    // setting checkout;
    if (cart.cartItems.length > 0){
      checkOut(user.id);
    } else{
      toast.error("No items is present in cart")
    }
    
   }


  useEffect(() => {

    if (isLoggedIn()) {
      console.log("Fetching cart...", user.id);
      fetchCart(user.id);
    } else {
      toast.error("Please login to view cart");
    }

   

  },[])

  if (!isAuthenticated) {
    // toast.error("Please login to view cart");
    return <AuthRequired/>
  }

  return (
    <div>
    { isLoading && <Loading/>}
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column: Product Details */}
        <div className="md:col-span-2">
          {/* {console.log(cart)} */}
          {cart.cartItems.length === 0 ? (
            <div className="flex justify-center items-center">
              <div>
                <h1 className="text-3xl text-center mt-5">No items in cart</h1>
                <img src={emptyCartImage} alt="Cart empty" />
              </div>
            </div>
          ) : (
            cart.cartItems.map((cartItem, index) => (
              <div
                key={index}
                className="max-w-2xl mx-auto my-8 bg-white shadow-lg rounded-lg p-6 flex items-start mb-2"
              >
                <div className="flex space-x-10 flex-col md:flex-row justify-start items-start px-5">
                  {/* Product Image Section */}
                  <div className="w-2/6 flex relative">
                    <img
                      src={newImageUrl+cartItem.imageData}
                      alt={`${cartItem.productName} Image`}
                      className="w-full object-cover rounded-md"
                    />
                  </div>
                  {/* Product Details Section */}
                  <div className="flex-1 w-full">
                    <h1 className="text-xl font-bold">{cartItem.productName}</h1>
                    {/* <div className="text-sm text-gray-500 mt-2">
                      <span>By {cartItem.brand}</span>
                    </div> */}

                    <div className=" text-gray-900 mt-4">
                      Price:  <span className='text-xl font-bold'>₹{cartItem.price}</span> 
                    </div>
                    <div className="inline-block space-x-4 mt-6">
                      <button
                        className="bg-red-500 text-white text-sm py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
                        onClick={() => handleRemoveFromCart(user.id, cartItem.id)}
                      >
                        Remove
                      </button>
                      <button 
                      className="primary-button ">
                        Buy Now
                      </button>
                      <div className="inline-block ml-4">
                        <button
                          className="bg-slate-400 text-white text-sm py-1 px-3 rounded-lg shadow-md hover:bg-slate-500"
                          onClick={() => incrementQuantity(user.id, cartItem.id)}
                        
                        >
                          +
                        </button>
                        <span className="mx-2">{cartItem.quantity}</span>
                        <button
                          className="bg-slate-400 text-white text-sm py-1 px-3 rounded-lg shadow-md hover:bg-slate-500"
                          onClick={() => decrementQuantity(user.id, cartItem.id)}
                          disabled={cartItem.quantity === 1}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Summary */}
        <div className="bg-white p-6 sticky top-16 h-full rounded-lg border border-slate-200">
          <h2 className="text-2xl mb-4">Total Products</h2>
          <p className="text-lg">
            Total Items: <span className="font-bold">{cart.cartItems.length}</span>
          </p>
          <p className="text-lg">
            Grand Total: <span className="font-bold">₹{cart.totalAmount}</span>
          </p>
          <button className="mt-5 secondary-button"
          onClick={()=> handleCheckOut()}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;