// import React, { useContext, useState, useEffect } from 'react';
// import { AppContext } from '../../context/AppContext';
// import Loading from '../../common-componets/Loading';

// function Orders() {

//   const [filteredOrders, setFilteredOrders] = useState([]);

//   const { orders, 
//     fetchOrders, 
//     updateOrderStatus, 
//     isLoading, 
//     message,
//     setMessage,
//     error } = useContext(AppContext);
//   const [updatedOrders, setUpdatedOrders] = useState([]);



//   // Handle status change
//   const handleStatusChange = (id, newStatus) => {
//     updateOrderStatus(id, newStatus);

//     // setUpdatedOrders((prevOrders) =>
//     //   prevOrders.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
//     // );
//   };
//   useEffect(() => {
//     fetchOrders();
    
//   }, []);

//   // // Update local state when orders change
//   // useEffect(() => {
//   //   // setUpdatedOrders(orders);
//   // }, [orders]);

  

//   // Save updated status
//   // const handleSaveStatus = async (id) => {
//   //   // const orderToUpdate = updatedOrders.find((order) => order.id === id);
//   //   // if (orderToUpdate) {
//   //   //   await updateOrderStatus(id, orderToUpdate.status);
//   //   //   fetchOrders(); // Refresh orders after update
//   //   // }
//   // };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {isLoading && <Loading/>}
//       <h2 className="text-2xl font-bold mb-4 text-center">Orders List</h2>

//       <div className="overflow-x-auto shadow-lg rounded-lg">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//           <thead className=''>
//             <tr className="bg-slate-300 bg-opacity-50 text-black">
//               <th className="py-2 px-4">Order ID</th>
//               <th className="py-2 px-4">User ID</th>
//               <th className="py-2 px-4">Product ID</th>
//               <th className="py-2 px-4">Product Name</th>
//               <th className="py-2 px-4">Quantity</th>
//               <th className="py-2 px-4">Total Amount</th>
//               <th className="py-2 px-4">Order Date</th>
//               <th className="py-2 px-4">Status</th>
//               {/* <th className="py-2 px-4">Action</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {orders.length > 0 ? (
//               orders.map((order) => (
//                 <tr key={order.id} className="border-b hover:bg-gray-100 text-center">
//                   <td className="py-2 px-4">{order.id}</td>
//                   <td className="py-2 px-4">{order.userId}</td>
//                   <td className="py-2 px-4">{order.productId}</td>
//                   <td className="py-2 px-4">{order.productName}</td>
//                   <td className="py-2 px-4">{order.quantity}</td>
//                   <td className="py-2 px-4">${order.totalAmount.toFixed(2)}</td>
//                   <td className="py-2 px-4">{new Date(order.orderDate).toLocaleString()}</td>
//                   <td className="py-2 px-4">
//                     <select
//                       className="border border-gray-300 p-1 rounded focus:ring-2 focus:ring-blue-500"
//                       value={order.status}
//                       onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                     >
//                       <option value="PENDING">PENDING</option>
//                       <option value="PROCESSING">PROCESSING</option>
//                       <option value="SHIPPED">SHIPPED</option>
//                       <option value="DELIVERED">DELIVERED</option>
//                       <option value="CANCELLED">CANCELLED</option>
//                     </select>
//                   </td>
//                   {/* <td className="py-2 px-4">
//                     <button
//                       className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
//                       onClick={() => handleSaveStatus(order.id)}
//                     >
//                       Save
//                     </button>
//                   </td> */}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center py-4 text-gray-500">
//                   {message}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Orders;

// ----------------------------------------



import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../common-componets/Loading';

function Orders() {
  const { orders, fetchOrders, updateOrderStatus, isLoading, message } = useContext(AppContext);
  
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [statusFilter, setStatusFilter] = useState('default');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let updatedOrders = [...orders];
    
    if (searchQuery) {
      updatedOrders = updatedOrders.filter(order => 
        order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toString().includes(searchQuery)
      );
    }
    
    if (statusFilter !== 'default') {
      updatedOrders = updatedOrders.filter(order => order.status === statusFilter);
    }

    if (sortOrder === 'date') {
      updatedOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    }

    setFilteredOrders(updatedOrders);
  }, [orders, searchQuery, sortOrder, statusFilter]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {isLoading && <Loading />}
      <h2 className="text-2xl font-bold mb-4 text-center">Orders List</h2>
      {/* filter and search */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by Order ID or Product Name"
          className="border p-2 rounded w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="selection-field"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="date">Date</option>
        </select>
        <select
          className="selection-field"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="default">Filter By Status</option>
          <option value="PENDING">PENDING</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>
      
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-slate-300 bg-opacity-50 text-black">
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">User ID</th>
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Total Amount</th>
              <th className="py-2 px-4">Order Date</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-100 text-center">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.userId}</td>
                  <td className="py-2 px-4">{order.productName}</td>
                  <td className="py-2 px-4">{order.quantity}</td>
                  <td className="py-2 px-4">${order.totalAmount.toFixed(2)}</td>
                  <td className="py-2 px-4">{new Date(order.orderDate).toLocaleString()}</td>
                  <td className="py-2 px-4">
                    <select
                      className="selection-field"
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  {message}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
