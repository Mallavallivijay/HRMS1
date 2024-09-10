import { useState,useEffect } from 'react';
import { FaPen, FaTrash, FaPlus, FaLessThan, FaRegWindowClose } from 'react-icons/fa';
import axios from 'axios';
import Navbar from './TravelNavbar';
import {Link} from 'react-router-dom'

const TravelDetails = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        passportNumber: '',
        issueDate: '',
        expireDate: '', 
        placeOfIssue: '',
        countryOfIssue: '',
        issuingAuthority: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
      const fetchTravel = async () => {
          try {
              const response = await axios.get('http://192.168.0.113:8080/employeeservice/travel/HRMS1');
              const data = response.data;
              setFormData({
                passportNumber: data.passportNumber,
                issueDate: data.issueDate,
                expireDate: data.expireDate,
                placeOfIssue: data.placeOfIssue,
                countryOfIssue: data.country,
                issuingAuthority: data.issuingAuthority
              });
              console.log("Fetched data:", data);
          } catch (error) {
              console.error('Error fetching National ID Details:', error);
          }
      };
      fetchTravel();
  }, []);

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
    if (name === 'issueDate') {
        const issueDate = new Date(value);
        const expiryDate = new Date(issueDate);
        expiryDate.setFullYear(issueDate.getFullYear() + 10);
        setFormData((prevState) => ({
            ...prevState,
            expireDate: expiryDate.toISOString().split('T')[0], 
        }));
        document.getElementById('expireDate').setAttribute('max', expiryDate.toISOString().split('T')[0]);
    }
};


    const preventManualInput = (e) => {
          e.preventDefault();
        };

    const handleAlphaInputChange = (e) => {
          const { name, value } = e.target;
          const regex = /^[a-zA-Z\s]*$/;
          if (regex.test(value)) {
            setFormData({ ...formData, [name]: value });
            setFormErrors({ ...formErrors, [name]: "" }); 
          } else {
            setFormErrors({ ...formErrors, [name]: "Only letters are allowed." });
          }
        };

        const validateForm = () => {
            const errors = {};
            const issueDate = new Date(formData.issueDate);
            const expireDate = new Date(formData.expireDate);
            const maxExpiryDate = new Date(issueDate);
            maxExpiryDate.setFullYear(issueDate.getFullYear() + 10);
            
            if (!formData.passportNumber) errors.passportNumber = "Passport Number is required.";
            if (!formData.issueDate) errors.issueDate = "Issue Date is required.";
            if (!formData.expireDate) {
                errors.expireDate = "Expiry Date is required.";
            } else if (expireDate > maxExpiryDate) {
                errors.expireDate = "Expiry Date cannot exceed 10 years from the Issue Date.";
            }
            if (!formData.placeOfIssue) errors.placeOfIssue = "Place of Issue is required.";
            if (!formData.countryOfIssue) errors.countryOfIssue = "Country of Issue is required.";
            if (!formData.issuingAuthority) errors.issuingAuthority = "Issuing Authority is required.";
        
            return errors;
        };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            if (isEditMode) {
                const updatedTableData = tableData.map((item, index) =>
                    index === formData.index ? { ...formData } : item
                );
                setTableData(updatedTableData);
            } else {
                setTableData([...tableData, formData]);
            }
            setIsPopupOpen(false);
            setIsEditMode(false);
            setFormData({
                passportNumber: '',
                issueDate: '',
                expireDate: '',
                placeOfIssue: '',
                countryOfIssue: '',
                issuingAuthority: ''
            });
            setFormErrors({});
        } else {
            setFormErrors(errors);
        }
    };

    const handleDelete = (index) => {
        const updatedTableData = tableData.filter((_, i) => i !== index);
        setTableData(updatedTableData);
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
            passportNumber: '',
            issueDate: '',
            expireDate: '',
            placeOfIssue: '',
            countryOfIssue: '',
            issuingAuthority: ''
        });
    };

    return (
      <>
      <div><Navbar/></div>
      <div className="flex items-center justify-start px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40 ml-5 mb-5 mt-5">
                <FaLessThan className="text-orange-500 mr-2" />
                <Link to="/"><button><span className="text font-semibold text-orange-500">Previous Page</span></button></Link>
        </div>
        <div className=" mr-48 ml-48 border border-black rounded-t-md">
            
            <div className="">
                <div className="bg-orange-500 text-white p-2 rounded-t-md flex justify-between items-center">
                    <h2 className="font-semibold">Travel Details</h2>
                    
                </div>
                <div className="bg-white p-2  border-1 border-black flex justify-between items-center">
                    <span className="font-semibold">Travel Details</span>
                    <button className="flex items-center text-black bg-green-500 px-2 py-1 rounded" onClick={() => setIsPopupOpen(true)}>
                      Add
                    </button>
        </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-400">
                        <thead>
                            <tr className="bg-gray-300">
                                <th className="border border-gray-400 px-4 py-2 w-1/6">Passport Number</th>
                                <th className="border border-gray-400 px-4 py-2 w-1/6">Issue Date</th>
                                <th className="border border-gray-400 px-4 py-2 w-1/6">Expire Date</th>
                                <th className="border border-gray-400 px-4 py-2 w-1/6">Place of Issue</th>
                                <th className="border border-gray-400 px-4 py-2 w-1/6">Country of Issue</th>
                                <th className="border border-gray-400 px-4 py-2 w-1/6">Issuing Authority</th>
                                {tableData.length >0 && <th className="border border-gray-400 px-4 py-2 w-1/6">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? (
                                tableData.map((data, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-400 px-4 py-2">{data.passportNumber}</td>
                                        <td className="border border-gray-400 px-4 py-2">{data.issueDate}</td>
                                        <td className="border border-gray-400 px-4 py-2">{data.expireDate}</td>
                                        <td className="border border-gray-400 px-4 py-2">{data.placeOfIssue}</td>
                                        <td className="border border-gray-400 px-4 py-2">{data.countryOfIssue}</td>
                                        <td className="border border-gray-400 px-4 py-2">{data.issuingAuthority}</td>
                                        <td className="border border-gray-400 px-4 py-2 ">
                                           <div className=' flex justify-center  items-center space-x-2 '>
                                              <FaPen  size={17}className="  inline cursor-pointer mr-2" onClick={() => handleEdit(index)}/>
                                             {index > 0 && (
                                              <FaTrash size={17} className="inline cursor-pointer" onClick={() => handleDelete(index)} />
                                              )}
                                            </div>
                                         </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">No Travel Details Added</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isPopupOpen && (
                <div className="bg-black fixed inset-0 flex items-center justify-center bg-opacity-50">
                    <div className="bg-gray-200 p-4 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2">
                        <div className="flex justify-between items-center mb-8 bg-orange-400 rounded-lg pl-2 pr-2 w-full p-2">
                            <h2 className="text-xl  w-full">{isEditMode ? 'Edit' : 'Add'} Travel Details</h2>
                            <FaRegWindowClose  size={24} className="text-black cursor-pointer  text-lg" onClick={handleCancel} />
                        </div>
                        <form onSubmit={handleSubmit} >
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-4 ">
                                <div className='col-span-1'>
                                    <label className="block mb-1">Passport Number:</label>
                                    <input
                                        type="text"
                                        name="passportNumber"
                                        value={formData.passportNumber}
                                        onChange={handleAlphaInputChange}
                                        minLength={8}
                                        maxLength={8}
                                        className="w-full p-1 border border-gray-300 rounded-lg"
                                    />
                                    {formErrors.passportNumber && <span className="text-red-600 text-sm mt-1">{formErrors.passportNumber}</span>}
                                </div>
                                <div className='col-span-1'>
                                    <label className="block mb-1">Issue Date:</label>
                                    <input
                                        type="date"
                                        // max="2030-12-31"
                                        name="issueDate"
                                        value={formData.issueDate}
                                        onChange={handleInputChange}
                                        onKeyDown={preventManualInput}
                                        className="w-full p-1 border border-gray-300 rounded-lg"
                                    />
                                    {formErrors.issueDate && <span className="text-red-600 text-sm mt-1">{formErrors.issueDate}</span>}
                                </div>
                                <div className='col-span-1'>
                                    <label className="block mb-1">Expired Date:</label>
                                    <input
                                        type="date"
                                        // max="2030-12-31"
                                        name="expireDate"
                                        value={formData.expireDate}
                                        onChange={handleInputChange}
                                        onKeyDown={preventManualInput}
                                        className="w-full p-1 border border-gray-300 rounded-lg"
                                    />
                                    {formErrors.expireDate && <span className="text-red-600 text-sm mt-1">{formErrors.expireDate}</span>}
                                </div>
                                <div className='col-span-1'>
                                    <label className="block mb-1">Place of Issue:</label>
                                    <input
                                        type="text"
                                        name="placeOfIssue"
                                        value={formData.placeOfIssue}
                                        onChange={handleAlphaInputChange}
                                        className="w-full p-1 border border-gray-300 rounded-lg"
                                    />
                                    {formErrors.placeOfIssue && <span className="text-red-600 text-sm mt-1">{formErrors.placeOfIssue}</span>}
                                </div>
                                <div className='col-span-1'>
                                    <label className="block mb-1">Country of Issue:</label>
                                    <input
                                        type="text"
                                        name="countryOfIssue"
                                        value={formData.countryOfIssue}
                                        onChange={handleAlphaInputChange}
                                        className="w-full p-1 border border-gray-300 rounded-lg"
                                    />
                                    {formErrors.countryOfIssue && <span className="text-red-600 text-sm mt-1">{formErrors.countryOfIssue}</span>}
                                </div>
                                <div className='col-span-1'>
                                    <label className="block mb-1">Issuing Authority:</label>
                                    <input
                                        type="text"
                                        name="issuingAuthority"
                                        value={formData.issuingAuthority}
                                        onChange={handleAlphaInputChange}
                                        className="w-full p-1 border border-gray-300 rounded-lg"
                                    />
                                    {formErrors.issuingAuthority && <span className="text-red-600 text-sm mt-1">{formErrors.issuingAuthority}</span>}
                                </div>
                            </div>
                            <div className=" mt-4 flex justify-end space-x-4">
                              <button type="submit" className=" bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ">
                                 {isEditMode ? 'Update' : 'Save'}
                              </button>
                              <button  onClick={handleCancel} className=' bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 '>Cancel
                                </button>   
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default TravelDetails;
