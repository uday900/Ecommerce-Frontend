import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('details'); // Manage active section

  const { isLoading, message, fetchUserById, 
    fetchOrderByUserId,
    orders,
    logout,
    user, } = useContext(AppContext);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout=() => {
    logout();
    navigate('/');
    
  };

  useEffect(()=>{

    if (activeTab === 'orders'){
      fetchOrderByUserId(userId);
    }
  },[activeTab])



  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Profile
          {/* <span className='font-normal text-sm mx-4'>
            <i class="fa-solid fa-pencil"></i>
          </span> */}
        </h2>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 border-b pb-2 mb-6">
          <button
            onClick={() => handleTabChange('details')}
            className={`cursor-pointer pb-2 text-gray-700 ${activeTab === 'details' ? 'border-b-2 border-indigo-500' : ''
              }`}
          >
            My Details
          </button>
          <button
            onClick={() => handleTabChange('orders')}
            className={`cursor-pointer pb-2 text-gray-700 ${activeTab === 'orders' ? 'border-b-2 border-indigo-500' : ''
              }`}
          >
            My Orders
          </button>
          <button
            onClick={() => handleTabChange('payment')}
            className={`cursor-pointer pb-2 text-gray-700 ${activeTab === 'payment' ? 'border-b-2 border-indigo-500' : ''
              }`}
          >
            Payment Methods
          </button>
        </div>

        {/* Content Section */}
        <div>
          {activeTab === 'details' && (
            <div>
              <h3 className="text-xl font-medium mb-4">Personal Information</h3>
              <p className="mb-2">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> {user.phoneNumber || 'N/A'}
              </p>
              <p>
                <strong>Address:</strong> {user.address && user.address.city || 'N/A'}
              </p>
              
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h3 className="text-xl font-medium mb-4">My Orders</h3>
              <ul className="space-y-4">
                { orders.length === 0 && <p>No orders found.</p> }
                {orders.map((order) => (
                  <li key={order.id} className="border p-4 rounded-md shadow-sm">
                    <p>
                      <strong>Order ID:</strong> {order.id}

                    </p>
                    <p>
                      <strong>Product Name: </strong> {order.productName}
                    </p>
                    <p>
                      <strong>Product Id: </strong> {order.productId}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {order.quantity}
                    </p>
                    <p>
                      <strong>Amount:</strong> {order.totalAmount}
                    </p>
                    <p>
                      <strong>Date:</strong> {order.orderDate}
                    </p>

                    <p >
                      <strong>Status:</strong> {order.status}
                    </p>
                    
                  </li>
                ))}
                
              </ul>
            </div>
          )}

          {/* {activeTab === 'payment' && (
            <div>
              <h3 className="text-xl font-medium mb-4">Payment Methods</h3>
              <ul className="space-y-4">
                <li className="border p-4 rounded-md shadow-sm">
                  <p>
                    <strong>Card:</strong> **** **** **** 1234
                  </p>
                  <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md">
                    Remove
                  </button>
                </li>
                <li className="border p-4 rounded-md shadow-sm">
                  <p>
                    <strong>PayPal:</strong> johndoe@example.com
                  </p>
                  <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md">
                    Remove
                  </button>
                </li>
              </ul>
              <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md">
                Add New Payment Method
              </button>
            </div>
          )} */}
        </div>

        {/* Logout Button */}
        {/* <div className="mt-10 text-right">
          <button className="px-6 py-2 bg-red-500 text-white rounded-md"
            onClick={()=>handleLogout()}>
            Logout
          </button>
        </div> */}
      </div>
    </>
  );
};

export default UserProfile;
