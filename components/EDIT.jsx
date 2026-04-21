import React,{useState,useEffect} from 'react'
import instance from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

function EDIT() {
  const navigate = useNavigate();
  const { id } = useParams();
 const[formData, setFormData] = useState({
    fname: '',
    lname: '',
    age: '',
    location: ''
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleReset = () => {
    setFormData({
      fname: '',
      lname: '',
      age: '',
      location: ''
    });
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    try {      await instance.put(`/api/users/${id}`, formData);
      alert('User updated successfully!');
      navigate('/Report');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user. Please try again.');
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await instance.get(`/api/users/${id}`);
        setFormData(res.data[0]);
      } catch (error) {
        console.error('Error fetching user:', error);
        alert('Could not fetch user details.');
      }
    };
    fetchUser();
  }, [id]);


  return(
    <div>
      <h1 className='underline text-center text-2xl'>Update User</h1>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-4'>
        <div className='mb-4'>
          <table className='table-auto w-full'>
            <tbody>
              <tr>
                <td className='border px-4 py-2'>First Name:</td>
                <td className='border px-4 py-2'>
                  <input type="text" name="fname" value={formData.fname} onChange={handleChange} className='w-full px-3 py-2 border rounded' required />
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Last Name:</td>
                <td className='border px-4 py-2'>
                  <input type="text" name="lname" value={formData.lname} onChange={handleChange} className='w-full px-3 py-2 border rounded' required />
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Age:</td>
                <td className='border px-4 py-2'>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className='w-full px-3 py-2 border rounded' required />
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Location:</td>
                <td className='border px-4 py-2'>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} className='w-full px-3 py-2 border rounded' required />
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2' colSpan="2">
                  <button type="submit" className='w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700'>
                    Update
                  </button>
                  <button type="button" onClick={handleReset} className='w-full mt-2 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-700'>
                    Clean
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>

    </div>
  )
}

export default EDIT
