import { useState,useEffect } from 'react';
import { FaPen, FaTrash, FaPlus, FaLessThan, FaRegWindowClose } from 'react-icons/fa';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Navbar from '../components/NationalNavbar.js'

const NationalIDDetails = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    idType: '',
    nameOnDocument: '',
    idNumber: '',
    country: '',
    isPrimaryID: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const fetchNationalID = async () => {
        try {
            const response = await axios.get('http://192.168.1.16:8080/employeeservice/nationalID/getNationalID/HRMS1');
            const data = response.data[0];
            setFormData({
                idType: data.nationalId ,
                nameOnDocument: data.name ,
                idNumber: data.nationalIDNum ,
                country: data.country ,
                isPrimaryID: data.primary ,
            });
            console.log("Fetched data:", data);
        } catch (error) {
            console.error('Error fetching National ID Details:', error);
        }
    };
    fetchNationalID();
}, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    if (name === 'idNumber') {
      if (formData.idType === 'PAN Card') {
        newValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
        if (newValue.length <= 5) {
          newValue = newValue.replace(/[^A-Z]/g, '');
        } else if (newValue.length <= 9) {
          newValue = newValue.slice(0, 5) + newValue.slice(5).replace(/[^0-9]/g, '');
        } else {
          newValue = newValue.slice(0, 9) + newValue.slice(9).replace(/[^A-Z]/g, '');
        }
      } else if (formData.idType === 'Voter ID') {
        newValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
        if (newValue.length <= 3) {
          newValue = newValue.replace(/[^A-Z]/g, '');
        } else {
          newValue = newValue.slice(0, 3) + newValue.slice(3).replace(/[^0-9]/g, '');
        }
      } else if (formData.idType === 'Aadhaar card') {
        newValue = value.replace(/\D/g, '').slice(0, 12);
      }
    }

    setFormData({ ...formData, [name]: newValue });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.idType || formData.idType.length < 4 || formData.idType.length > 14) {
      errors.idType = "ID Type must be 4-14 characters.";
    }
    if (!formData.nameOnDocument || formData.nameOnDocument.length < 3 || formData.nameOnDocument.length > 40) {
      errors.nameOnDocument = "Name as per document must be 3-40 characters.";
    }
    if (!formData.idNumber) {
      errors.idNumber = "ID Number is required.";
    } else if (formData.idType === 'Aadhaar card' && formData.idNumber.length !== 12) {
      errors.idNumber = "Aadhaar card must be 12 digits.";
    } else if (formData.idType === 'PAN Card' && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.idNumber)) {
      errors.idNumber = "PAN Card must be in the format ABCDE1234E.";
    } else if (formData.idType === 'Voter ID' && !/^[A-Z]{3}[0-9]{7}$/.test(formData.idNumber)) {
      errors.idNumber = "Voter ID must be in the format ABC1234567.";
    }
    if (!formData.country || formData.country.length < 4 || formData.country.length > 14) {
      errors.country = "Country must be 4-14 characters.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    const isIdTypeExists = tableData.some((item) => item.idType === formData.idType);
    
    if (isIdTypeExists && !isEditMode) {
      setFormErrors({ ...errors, idType: 'This ID Type already exists in the table.' });
      return; 
    }
    
    if (Object.keys(errors).length === 0) {
      try {
        if (isEditMode) {
          await axios.put(`http://192.168.1.16:8080/employeeservice/nationalID/updateNationalID/${formData.idNumber}`, formData);
          // Update the local tableData
          let updatedTableData = tableData.map((item, index) => 
            index === formData.index ? { ...formData } : item
          );
          setTableData(updatedTableData);
        } else {
          await axios.post('http://192.168.1.16:8080/employeeservice/nationalID/addNationalID', formData);
          // Add the new record to local tableData
          let updatedTableData = [...tableData];
          if (formData.isPrimaryID) {
            updatedTableData = updatedTableData.map(item => ({ ...item, isPrimaryID: false }));
          }
          updatedTableData.push(formData);
          updatedTableData.sort((a, b) => b.isPrimaryID - a.isPrimaryID);
          setTableData(updatedTableData);
        }
        setIsPopupOpen(false);
        setIsEditMode(false);
        setFormData({
          idType: '',
          nameOnDocument: '',
          idNumber: '',
          country: '',
          isPrimaryID: false
        });
        setFormErrors({});
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    } else {
      setFormErrors(errors);
    }
  };
  
  
  const handleDelete = async (index) => {
    try {
      await axios.delete(`http://192.168.1.16:8080/employeeservice/nationalID/deleteNationalID/${tableData[index].idNumber}`);
      let updatedTableData = tableData.filter((_, i) => i !== index);
      if (updatedTableData.length > 0 && !updatedTableData.some(item => item.isPrimaryID)) {
        updatedTableData[0].isPrimaryID = true;
      }
      setTableData(updatedTableData);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  

  const handleEdit = (index) => {
    setFormData({ ...tableData[index], index });
    setIsPopupOpen(true);
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setIsEditMode(false);
    setFormData({
      idType: 'Aadhaar card',
      nameOnDocument: '',
      idNumber: '',
      country: '',
      isPrimaryID: false
    });
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-start px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40 ml-4 mb-5 mt-5">
                <FaLessThan className="text-orange-500 mr-2" />
                <Link to='/'>
                <button><span className="text font-semibold text-orange-500">Previous Page</span></button>
                </Link>
        </div>
    <div className=" mr-48 ml-48 border border-black rounded-t-md">
        
        <div className="bg-orange-400 text-white p-6 flex justify-between items-center">
                    {/* <h2 className="font-semibold">National ID</h2> */}
                    
        </div>
        <div className="bg-white p-2  border-1 border-black flex justify-between items-center">
                    <span className="font-semibold">National ID</span>
                    <button className="flex items-center text-black bg-green-500 px-2 py-1 rounded" onClick={() => setIsPopupOpen(true)}>
                      Add
                    </button>
        </div>
        <div className='overflow-x-auto'>
            <table className="min-w-full border-collapse border border-gray-400">
            <thead>
                <tr className="bg-gray-300">
                    <th className="border border-gray-400 px-4 py-2 w-1/6">ID Type</th>
                    <th className="border border-gray-400 px-4 py-2 w-1/6">Name on Document</th>
                    <th className="border border-gray-400 px-4 py-2 w-1/6">ID Number</th>
                    <th className="border border-gray-400 px-4 py-2 w-1/6">Country</th>
                    {tableData.length >0 && <th className="border border-gray-400 px-4 py-2 w-1/6">Actions</th>}
                </tr>
            </thead>
            <tbody>
                {tableData.length === 0 ? (
                <tr>
                    <td colSpan="6" className="text-center py-4">No National ID Details Added</td>
                </tr>
                ) : (
                tableData.map((data, index) => (
                <tr key={index}>
                    <td className="border border-gray-400 px-4 py-2">{data.idType}</td>
                    <td className="border border-gray-400 px-4 py-2">{data.nameOnDocument}</td>
                    <td className="border border-gray-400 px-4 py-2">{data.idNumber}</td>
                    <td className="border border-gray-400 px-4 py-2">{data.country}</td>
                    <td className="border border-gray-400 px-4 py-2 ">
                      <div className=' flex justify-center  items-center space-x-2 '>
                         <FaPen  size={17}className="  inline cursor-pointer mr-2" onClick={() => handleEdit(index)}/>
                      {index > 0 && (
                         <FaTrash size={17} className="inline cursor-pointer" onClick={() => handleDelete(index)} />
                      )}</div>
                    </td>
                </tr>
                )))}
            </tbody>
            </table>
        </div>

      {isPopupOpen && (
        <div className="bg-black fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-gray-200 p-4 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2">
            <div className="flex justify-between items-center mb-8 bg-orange-400 rounded-lg pl-2 pr-2 w-full p-2">
              <h2 className="text-xl  w-full">{isEditMode ? 'Edit' : 'Add'} National ID</h2>
              <button className='text-black cursor-pointer' onClick={handleCancel}>
                <FaRegWindowClose  size={24}/>
              </button>
            </div>
            <form onSubmit={handleSubmit} >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-4 ">
              <div className='col-span-1'>
                <label className="block mb-1">ID Type:</label>
                <select
                  name="idType"
                  value={formData.idType}
                  onChange={handleInputChange}
                  className="w-full p-1 border border-gray-300 rounded-lg"
                  
                >
                  <option value="">Select ID</option>
                  <option value="Aadhaar card">Aadhaar card</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Voter ID">Voter ID</option>
                  
                </select>
                {formErrors.idType && <p className="text-red-600 text-sm mt-1">{formErrors.idType}</p>}
              </div>
              <div className="col-span-1 ">
                <label className="block mb-1">Name as per Doc:</label>
                <input
                  type="text"
                  name="nameOnDocument"
                  value={formData.nameOnDocument}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (/^[a-zA-Z\s]*$/.test(value)) {
                        setFormData({ ...formData, nameOnDocument: value });
                        setFormErrors({ ...formErrors, nameOnDocument: "" });}
                    }}
                  className="w-full p-1 border border-gray-300 rounded-lg"
                  minLength={3}
                  maxLength={40}
                  
                />
                {formErrors.nameOnDocument && <p className="text-red-600 text-sm mt-1">{formErrors.nameOnDocument}</p>}
              </div>
              <div className="col-span-1 ">
                <label className="block mb-1">National ID Number:</label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className="w-full p-1 border border-gray-300 rounded-lg"
                 
                />
                {formErrors.idNumber && <p className="text-red-600 text-sm mt-1">{formErrors.idNumber}</p>}
              </div>
              <div className="col-span-1 ">
                <label className="block mb-1">Country:</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (/^[a-zA-Z\s]*$/.test(value)) {
                        setFormData({ ...formData, country: value });
                        setFormErrors({ ...formErrors, country: "" });}
                    }}
                  className="w-full p-1 border border-gray-300 rounded-lg"
                  minLength={2}
                  maxLength={14}
                  
                />
                {formErrors.country && <p className="text-red-600 text-sm mt-1">{formErrors.country}</p>}
              </div>
              </div>
              <div>
                <label className="block p-4 text-gray-700">
                  <input
                    type="checkbox"
                    name="isPrimaryID"
                    checked={formData.isPrimaryID}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Primary ID
                </label>
              </div>
              <div className=" mt-4 flex justify-end space-x-2">
              <button type="submit" className="border border-black bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ">
                {isEditMode ? 'Update' : 'Save'}
              </button>
              <button  onClick={handleCancel} className='border border-black bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600  '>Cancel</button></div>
            </form>
          </div>
        </div>
      )}
    </div></>
  );
};

export default NationalIDDetails;