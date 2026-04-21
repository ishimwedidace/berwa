import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from '../api/axios';

function REPORT() {
  const [users, setUsers] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await instance.get('/api/users');

      // Handle both possible API formats
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.users;

      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await instance.delete(`/api/users/${id}`);

      // Update UI instantly (better UX)
      setUsers((prevUsers) =>
        prevUsers.filter((user) => (user._id || user.id) !== id)
      );
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className='underline text-center text-2xl'>Report</h1>

      <table className='table-auto w-full mt-4'>
        <thead>
          <tr>
            <th className='border px-4 py-2'>ID</th>
            <th className='border px-4 py-2'>Fname</th>
            <th className='border px-4 py-2'>Lname</th>
            <th className='border px-4 py-2'>Age</th>
            <th className='border px-4 py-2'>Location</th>
            <th className='border px-4 py-2'>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user) => {
              const userId = user._id || user.id;

              return (
                <tr key={userId}>
                  <td className='border px-4 py-2'>{userId}</td>
                  <td className='border px-4 py-2'>{user.fname}</td>
                  <td className='border px-4 py-2'>{user.lname}</td>
                  <td className='border px-4 py-2'>{user.age}</td>
                  <td className='border px-4 py-2'>{user.location}</td>
                  <td className='border px-4 py-2'>
                    <Link
                      to={`/EDIT/${userId}`}
                      className='text-blue-500 hover:text-blue-700'
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteUser(userId)}
                      className='ml-2 text-red-500 hover:text-red-700'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default REPORT;