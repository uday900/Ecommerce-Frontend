import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../common-componets/Loading';

function Users() {
  const { users, fetchUsers, isLoading, error } = useContext(AppContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Users List</h2>

      {isLoading && <Loading/>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-slate-300 bg-opacity-50 text-black">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">City</th>
              <th className="py-2 px-4">Country</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4 text-center">{user.id}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.city}</td>
                  <td className="py-2 px-4">{user.country}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
