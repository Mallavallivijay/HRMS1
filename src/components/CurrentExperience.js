import React, { useEffect, useState } from "react";
import { FaPen, FaRegWindowClose,FaLessThan} from "react-icons/fa";
import Navbar from "./CurrentNav"
import axios from 'axios';
import {Link} from 'react-router-dom'

const ExperienceCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    orgName: "",
    empName: "",
    empId: "",
    designation: "",
    doj: "",
    manager: "",
    pay: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [tableData, setTableData] = useState(null);
  const designationOptions = ["Backend Developer","Bussiness Analyst","Data Analyst","Digital Marketing"," Frontend Developer", "Tester"];
  const manager=["Manager1","Manager2"]

  useEffect(()=>{
    const fetchCurrentDetails=async()=>{
      try{
        const response=await axios.get('http://192.168.0.101:8080/employeeservice/currentexperience/HRMS1')
        const data=response.data;
        setFormData({
          orgName: data.organisationName,
          empName: data.employeeName,
          empId: data.employeeId,
          designation: data.designation,
          doj: data.doj,
          manager: data.reportingManager,
          pay: data.pay,
        })
        console.log("Feteched data:",response.data);
      } catch(error){
        console.error('Error fetching Current Experience Details:',error)
      }
    };
    fetchCurrentDetails();
  },[]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); 
  };
  const handleDesignationChange = (e) => {
    setFormData({ ...formData, designation: e.target.value });
    setFormErrors({ ...formErrors, designation: "" });
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
  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setFormData({ ...formData, [name]: value });
      setFormErrors({ ...formErrors, [name]: "" }); 
    } else {
      setFormErrors({ ...formErrors, [name]: "Only numbers are allowed." });
    }
  };
  const preventManualInput = (e) => {
    e.preventDefault();
  };
  const handleDateChange = (e) => {
    setFormData({ ...formData, doj: e.target.value });
    setFormErrors({ ...formErrors, doj: "" });
  };
  const validateForm = () => {
    const errors = {};

    if (!formData.empName) {
      errors.empName = "Employee Name is required.";
    } else if (formData.empName.length < 4 || formData.empName.length > 40) {
      errors.empName = "Employee Name should be between 4 and 40 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.empName)) {
      errors.empName = "Employee Name should contain only alphabets and spaces.";
    }

    if (!formData.orgName) {
      errors.orgName = "Organization Name is required.";
    }else if (formData.orgName.length < 4 || formData.orgName.length > 40) {
      errors.orgName = "Employee Name should be between 4 and 40 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.orgName)) {
      errors.orgName = "Employee Name should contain only alphabets and spaces.";
    }

    if (!formData.empId) {
      errors.empId = "Employee ID is required.";
    }else if (formData.empId.length < 4 || formData.empId.length > 40) {
      errors.empId = "Employee Name should be between 4 and 40 characters.";
    } 

    if (!formData.designation) {
      errors.designation = "Designation is required.";
    }

    if (!formData.doj) {
      errors.doj = "Date of Joining is required.";
    }else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.doj)) {
      errors.doj = "Date must be in the format YYYY-MM-DD.";
    }

    if (!formData.manager) {
      errors.manager = "Reporting Manager is required.";
    }
    
    if (!formData.pay) {
      errors.pay = "Pay is required.";
    }else if (!/^\d+$/.test(formData.pay)) {
      errors.pay = "Pay  should contain only numbers.";
    } else if (formData.pay < 0 || formData.pay > 9999999) {
      errors.pay = "Pay should be between 0 and 9,999,999.";
    }
    

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://192.168.0.101:8080/employeeservice/currentexperience/createCurrentEmployement?employeeId=HRMS1', formData);
        const data = response.data
        console.log('Post response:',data);
        setTableData(formData);
        setIsPopupOpen(false);
        setIsEditMode(false);
        setFormData({
          orgName: "",
          empName: "",
          empId: "",
          designation: "",
          doj: "",
          manager: "",
          pay: "",
        });
        setFormErrors({});
      } catch (error) {
        console.error('Error posting experience data:', error);
      }
    } else {
      setFormErrors(errors);
    }
  };
  const handleDelete = () => {
    setTableData(null); 
  };

  const handleEdit = () => {
    setIsPopupOpen(true);
    setIsEditMode(true);
  };
 

  const handleCancel = () => {
    setIsPopupOpen(false);
    setIsEditMode(false);
    setFormData({
      orgName: "",
      empName: "",
      empId: "",
      designation: "",
      doj: "",
      manager: "",
      pay: "",
    });
  };

  return (
    <>
    <div><Navbar/> </div>
    <div className="flex items-center justify-start px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40 ml-5 mb-5 mt-5">
                <FaLessThan className="text-orange-500 mr-2" />
                <Link to='/'>
                <button><span className="text font-semibold text-orange-500">Previous Page</span></button></Link>
        </div>
    <div className="mr-48 ml-48 border border-black rounded-t-md">
   
      <div className="bg-orange-500  text-white p-2 rounded-t-md">
         <h2 className="font-semibold">Current Experience</h2>
      </div>

      <div className="bg-white p-2  border-1 border-black flex justify-between items-center">
        <span className="font-semibold">Current Experience</span>
        <button className="flex items-center bg-gray-300 p-1 rounded mr-2" onClick={handleEdit}>
            <FaPen className="text-black cursor-pointer" />
         </button>
                     
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-400 px-4 py-2">Org Name</th>
              <th className="border border-gray-400 px-4 py-2">Emp Name</th>
              <th className="border border-gray-400 px-4 py-2">Emp ID</th>
              <th className="border border-gray-400 px-4 py-2">Designation</th>
              <th className="border border-gray-400 px-4 py-2">Date Of Joining</th>
              <th className="border border-gray-400 px-4 py-2">Reporting Manager</th>
              <th className="border border-gray-400 px-4 py-2">Pay</th>
            </tr>
          </thead>
          <tbody>
            {tableData ? (
              <tr>
                <td className="border border-gray-400 px-4 py-2">{tableData.orgName}</td>
                <td className="border border-gray-400 px-4 py-2">{tableData.empName}</td>
                <td className="border border-gray-400 px-4 py-2">{tableData.empId}</td>
                <td className="border border-gray-400 px-4 py-2">{tableData.designation}</td>
                <td className="border border-gray-400 px-4 py-2">{tableData.doj}</td>
                <td className="border border-gray-400 px-4 py-2">{tableData.manager}</td>
                <td className="border border-gray-400 px-4 py-2">{tableData.pay}</td>
              </tr>
               ) : (
                <tr>
                    <td className="border border-gray-400 px-4 py-2 text-center" colSpan="7">
                      No Experience Added
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      
       {isPopupOpen && (
        <div className="bg-black fixed inset-0 flex items-center justify-center bg-opacity-50 ">
          <div className="bg-gray-300 p-4 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2">
            <div className="flex justify-between items-center mb-8 bg-orange-500 rounded-lg pl-2 pr-2 w-full p-2">
              <h3 className=" text-xl  w-full">{isEditMode ? "Edit Current Experience Details" : "Enter Details"}</h3>
               <button ><FaRegWindowClose   size={24} className="text-black  text-xl cursor-pointer" onClick={handleCancel}/></button>
            </div>
            <form>
             <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-4 " >
              <div className="col-span-1 ">
                <label  className="block mb-1 ">Emp Name:</label>
                <input
                  type="text"
                  name="empName"
                  value={formData.empName}
                  onChange={handleAlphaInputChange}
                  minLength={4}
                  maxLength={40}
                  className="w-full p-1 border border-gray-300 rounded-lg"
                />
                {formErrors.empName && <p className=" text-red-600 text-sm mt-1">{formErrors.empName}</p>}
               </div>
               <div className="col-span-1 ">
                <label className="block mb-1 ">Org Name:</label>
                <input
                  type="text"
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleAlphaInputChange}
                  minLength={4}
                  maxLength={40}
                  
                  className="w-full p-1 border border-gray-300 rounded-lg"
                />
                {formErrors.orgName && <p className="text-red-600 text-sm mt-1">{formErrors.orgName}</p>}
                </div>
                
               <div className="col-span-1 ">
                <label className="block mb-1 ">Emp ID:</label>
                <input
                  type="text"
                  name="empId"
                  value={formData.empId}
                  onChange={handleInputChange}
                  minLength={4}
                  maxLength={20}
                 
                  className="w-full p-1 border border-gray-300 rounded-lg"
                />
                {formErrors.empId && <p className="text-red-600 text-sm mt-1">{formErrors.empId}</p>}
                </div>
                <div className="col-span-1 ">
                <label className="block mb-1 ">Designation:</label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleDesignationChange}
                  className="w-full p-1 border border-gray-300 rounded-lg"
                 
                >
                  <option value="">Select Designation</option>
                  {designationOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {formErrors.designation && <p className="text-red-600 text-sm mt-1">{formErrors.designation}</p>}
               </div>
               <div className="col-span-1 ">
                <label className="block mb-1 ">Date Of Joining:</label>
                <input
                  type="date"
                  id="doj"
                  value={formData.doj}
                  onChange={handleDateChange}
                  className="w-full p-1 border border-gray-300 rounded-lg"
                  onKeyDown={preventManualInput}
                  onClick={(e) => e.target.readOnly = false}  
                  
                />
                {formErrors.doj && <p className="text-red-600 text-sm mt-1">{formErrors.doj}</p>}
                </div>
                <div className="col-span-1 ">
                <label className="block mb-1 ">Reporting Manager:</label>
                <select
                  type="text"
                  name="manager"
                  value={formData.manager}
                  onChange={handleAlphaInputChange}
                  minLength={4}
                  maxLength={40}
                  className="w-full p-1 border border-gray-300 rounded-lg"
                  >
                  <option value="">Select Manager</option>
                  {manager.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {formErrors.manager && <p className="text-red-600 text-sm mt-1">{formErrors.manager}</p>}
                </div>
                <div className="col-span-1 ">
                  <label className="block mb-1 ">Pay:</label>
                  <input
                    type="text"
                    name="pay"
                    value={formData.pay}
                    onChange={handleNumericChange}
                    minLength={4}
                    maxLength={40}
                    className="w-full p-1 border border-gray-300 rounded-lg"
                  />
                  {formErrors.pay && <p className="text-red-600 text-sm mt-1">{formErrors.pay}</p>}
               </div>
              </div>
              <div className="  mt-10 flex justify-end space-x-4">
              <button type="button"  onClick={handleSubmit} className="  bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ">
               {isEditMode ? "Save " : "Submit"} 
              </button>
              <button
                onClick={handleCancel}
                className=" bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ">Cancel
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

export default ExperienceCard;
