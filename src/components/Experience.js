import { TiPencil } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { FaLessThan } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import axios from "axios";
import Navbar from "./ExperienceNav"
import {Link} from 'react-router-dom'

function App() {
  const initialData = {
    Organizationname: "",
    EmployeeId: "",
    Designation: "",
    DateofJoining: "",
    DateofExit: "",
    Experience: "",
    State: "",
    Country: "",
    Attachment: "",
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const nameRegex = /^[a-zA-Z][a-zA-Z\s]*$/;
  const employRegex = /^[a-zA-Z0-9\-\/]*$/;

  useEffect(() => {
    const fetchCurrentDetails = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.101:8080/employeeservice/experience/HRMS1"
        );
        const data = response.data[0];
        setFormData({
          Organizationname: data.organisationName,
          EmployeeId: data.id,
          Designation: data.designation,
          DateofJoining: data.doj,
          DateofExit: data.doe,
          Experience: data.experience,
          State: data.state,
          Country: data.country,
          Attachment: "",
        });
        console.log("Fetched data:", response.data);
      } catch (error) {
        console.error("Error fetching Current Experience Details:", error);
      }
    };
    fetchCurrentDetails();
  }, []);

  const validateForm = () => {
    let newError = {};

    // Validation logic
    // Similar to your original validation logic, ensure each field adheres to its rules
    // Check organization name
    if (formData.Organizationname === "") {
      newError.Organizationname = "Required Org.name";
    } else if (formData.Organizationname.length < 4) {
      newError.Organizationname = "Min 4 Characters";
    } else if (formData.Organizationname.length > 40) {
      newError.Organizationname = "Max 40 Characters";
    } else if (!nameRegex.test(formData.Organizationname)) {
      newError.Organizationname = "Must start with a Character";
    }

    // Check employee ID
    if (formData.EmployeeId === "") {
      newError.EmployeeId = "Required EmployeeId";
    } else if (formData.EmployeeId.length < 4) {
      newError.EmployeeId = "Min 4 Characters";
    } else if (formData.EmployeeId.length > 20) {
      newError.EmployeeId = "Max 20 Characters";
    } else if (!employRegex.test(formData.EmployeeId)) {
      newError.EmployeeId = "Enter Valid Emp.Id, spaces not allowed";
    }

    // Check joining and exit dates
    if (formData.DateofJoining === "") {
      newError.DateofJoining = "Date of Joining is required";
    }
    if (formData.DateofExit === "") {
      newError.DateofExit = "Date of Exit is required";
    }

    // Check experience
    if (formData.Experience === "") {
      newError.Experience = "Experience is required";
    }

    // Check state and country
    if (formData.State === "") {
      newError.State = "Required State";
    } else if (formData.State.length < 4) {
      newError.State = "Min 4 Characters";
    } else if (formData.State.length > 40) {
      newError.State = "Max 40 Characters";
    } else if (!nameRegex.test(formData.State)) {
      newError.State = "Enter only Characters";
    }

    if (formData.Country === "") {
      newError.Country = "Country is required";
    } else if (formData.Country.length < 1) {
      newError.Country = "Min 1 Character";
    } else if (formData.Country.length > 40) {
      newError.Country = "Max 40 Characters";
    } else if (!nameRegex.test(formData.Country)) {
      newError.Country = "Enter Only Characters";
    }

    // Check designation
    if (formData.Designation === "") {
      newError.Designation = "Choose any one";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const calculateExperience = (dateOfJoining, dateOfExit) => {
    const joinDate = new Date(dateOfJoining);
    const exitDate = new Date(dateOfExit);

    if (exitDate <= joinDate) {
      return "Invalid dates";
    }

    const diffTime = exitDate - joinDate;
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60  *24 * 365));
    const diffMonths = Math.floor(
      (diffTime % (1000 * 60 * 60  *24 * 365)) / (1000 * 60 * 60  *24 * 30)
    );
    const diffDays = Math.floor(
      (diffTime % ((1000 * 60 * 60  *24 * 30)) / (1000 * 60 * 60  *24 ))
    );

    return `${diffYears} years, ${diffMonths} months, ${diffDays} days`;
  };

  const handleOpenPopup = (index = null) => {
    if (index !== null) {
      setFormData({ ...tableData[index] });
      setEditIndex(index);
    } else {
      setFormData({ ...initialData });
      setEditIndex(null);
    }
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditIndex(null);
  };

  const preventManualInput = (e) => {
    if (e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (editIndex !== null) {
        const updatedTableData = tableData.map((row, index) =>
          index === editIndex ? formData : row
        );
        setTableData(updatedTableData);
      } else {
        setTableData([...tableData, formData]);
      }
      handleClosePopup();
    } else {
      console.log("Failed to submit");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (updatedData.DateofJoining && updatedData.DateofExit) {
        const joinDate = new Date(updatedData.DateofJoining);
        const exitDate = new Date(updatedData.DateofExit);
        const MINIMUM_DAYS = 90;

        const diffTime = exitDate - joinDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (joinDate < exitDate && diffDays >= MINIMUM_DAYS) {
          updatedData.Experience = calculateExperience(
            updatedData.DateofJoining,
            updatedData.DateofExit
          );
          setErrors((prevErrors) => ({
            ...prevErrors,
            DateofExit: "",
          }));
        } else if (joinDate >= exitDate) {
          updatedData.Experience = "";
          setErrors((prevErrors) => ({
            ...prevErrors,
            DateofExit: "Date of Exit must be after Date of Joining",
          }));
        } else {
          updatedData.Experience = "";
          setErrors((prevErrors) => ({
            ...prevErrors,
            DateofExit: `Experience must be at least ${MINIMUM_DAYS} days`,
          }));
        }
      } else {
        updatedData.Experience = "";
      }

      return updatedData;
    });
  };

  const handleEmployeeIdChange = (e) => {
    const { name, value } = e.target;

    if (employRegex.test(value)) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      setErrors((prevErrors) => ({ ...prevErrors, EmployeeId: "" }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        EmployeeId: "Spaces not allowed",
      }));
    }
  };

  const handleNameChar = (e) => {
    const key = e.key;
    const value = e.target.value;

    if ((value === "" && key === " ") || !/[a-zA-Z\s]/.test(key)) {
      e.preventDefault();
    }
  };

  const handleName = (e) => {
    const key = e.key;
    if (!/[a-zA-Z]/.test(key)) {
      e.preventDefault();
    }
  };
  


  

  const handleEnter = (e)=>{
    if (e.key === "Enter"){
     e.preventDefault()
    }
 }


  const handleDelete = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index);
    setTableData(updatedTableData);
  };

  const handleAddRow = () => {
    handleOpenPopup();
  };


  return (
    <div>
      <Navbar/>
    <div>
        <div className="mr-10 ml-6">
        <div className="flex items-center justify-start px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40 ml-5 mb-5 mt-5">
                <FaLessThan className="text-orange-500 mr-2" /><Link to='/'>
                <button><span className="text font-semibold text-orange-500">Previous Page</span></button>

                </Link>
        </div>
        </div>
      <div>
          
      <div className="pt-5 mt-5 ml-3  md:ml-20 lg:ml-40 mx-auto mr-3 md:mr-20 lg:mr-40">
        <div className="w-full mr-5 lg:mr-20">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-5 px-4  text-left bg-orange-500   rounded-t-md" colSpan="12">
                {/* {/ Vikram /} */}
              </th>
            </tr>
          <tr>
            <th className="py-2 px-4  text-left" colSpan="9">
              Experience
            </th>
            <th className="inline-block cursor-pointer  mr-2 py-1 px-4  text-right bg-green-600 m-2 text-white border-rounded  rounded-md" onClick={handleAddRow}>
              <button type="button">Add</button>
            </th>
          </tr>
        </thead>
        <tbody className="border border-black border-collapse">
        <tr>
            <th className="py-2 px-1 border-b-black border-2 border-solid border-black  w-1/5 text-center">Org Name</th>
            <th className="py-2 px-1 border-b-black border-2 border-solid border-black text-center w-1/6">Emp Id</th>
            <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center ">Designation</th>
            <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center w-1/4">Date of Joining</th>
            <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center w-1/4">Date of Exit</th>
            <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center">Experience</th>
            <th className="py-2 px-4 border-b-black border-2 border-solid border-black text-center w-1/6">State</th>
            <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center">Country</th>
            <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center">Attachment</th>
            <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center">Actions</th>
        </tr> 

          {tableData.map((row, index) => (
            <tr key={index}>
               <td className="py-5 px-4 border-b border-gray-900 border-r text-center   max-w-[100px] pr-5 overflow-x-auto">{row.Organizationname}</td>
               <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.EmployeeId}</td>
               <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.Designation}</td>
               <td className="py-5 px-4 border-b border-gray-900 border-r text-center   overflow-x-auto">{(row.DateofJoining)}</td>
               <td className="py-5 px-4 border-b border-gray-900 border-r text-center  overflow-x-auto">{(row.DateofExit)}</td>
               <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.Experience}</td>
               <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.State}</td>
               <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.Country}</td>
               <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.Attachment}</td>
               <td className="py-2 px-4 border-b border-gray-900 text-right">
               <div className='flex flex-row'>
                 <TiPencil className="inline-block mr-4 cursor-pointer text-blue-500 size-6" onClick={() => handleOpenPopup(index)} />
                 {index !== 0 && (  
                    <RiDeleteBin6Line
                      className="inline-block cursor-pointer text-red-500 size-6"
                      onClick={() => handleDelete(index)}
                    />
                  )}
                </div> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" >
  <div className="bg-gray-200 p-4 rounded-lg shadow-lg max-w-[90%] md:max-w-[650px] w-full" onClick={(e) => e.stopPropagation()}>
    <div className='flex items-center justify-between mb-4 bg-orange-500 p-2 rounded-t-md'>
      <h2 className="text-lg">{editIndex !== null ? "Edit Experience Details" : "Add New Experience"}</h2>
      <MdCancelPresentation className=' text-xl cursor-pointer' onClick={handleClosePopup}/>
    </div>
    <form onSubmit={handleFormSubmit} onKeyDown={handleEnter}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="flex flex-col">                   
                    <label className="text-gray-700 mb-1">Organization Name:</label>
                   <input
                     type="text"
                     name="Organizationname"
                     value={formData.Organizationname}
                     onKeyDown={handleNameChar}
                     
                     onChange={handleChange}
                     className="p-1 border border-gray-300  rounded-lg"
                     minLength={4}
                     maxLength={40}/>
                   {errors.Organizationname && <p className="text-red-500">{errors.Organizationname}</p>}
                </div>
                <div className="flex flex-col">
                   <label className="text-gray-700 mb-1 rounded-lg">Employee ID:</label> 
              <input
                    type="text"
                    name="EmployeeId"
                    value={formData.EmployeeId}
                    onChange={handleEmployeeIdChange} 
                    minLength={4}
                    maxLength={20}
                    
                    className="p-1 border border-gray-300 rounded-lg"
                  />
                  {errors.EmployeeId && <p className="text-red-500">{errors.EmployeeId}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Designation:</label>
                 
                   <select className="p-1 border border-gray-300 rounded-lg"
                        name="Designation"
                        value={formData.Designation}
                        onChange={handleChange}>
                          <option value="Select Designation">Select Designation</option>
                          <option value="Front-end Developer" >Front-end Developer</option>
                          <option value="Backend Developer">Backend Developer</option>
                          <option value="Full Stack Developer">Full Stack Developer</option>
                          <option value="Tester">Tester</option> 
                          <option value="DevOps Engineer">DevOps Engineer</option>
                          <option value="Data Scientist">Data Scientist</option>
                          <option value="Product Manager">Product Manager</option>
                          <option value="UI/UX Designer">UI/UX Designer</option>
                    </select>
                   {errors.Designation && <p className="text-red-500">{errors.Designation}</p>}
                 </div>
                 <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Date of Joining:</label>
                  <input 
                    type="date"
                    name="DateofJoining"
                    value={formData.DateofJoining}
                   onChange={handleChange}
                     onKeyDown={preventManualInput}
                     className="p-1 border border-gray-300 rounded-lg"
                   />
                   {errors.DateofJoining && <p className="text-red-500">{errors.DateofJoining}</p>}
                 </div>
                 <div className="flex flex-col">
                   <label className="text-gray-700 mb-1">Date of Exit:</label>
                   <input
                 type="date"
                     name="DateofExit"
                     value={formData.DateofExit}
                     onChange={handleChange}
                     onKeyDown={preventManualInput}
                    className="p-1 border border-gray-300 rounded-lg"
                   />
                   {errors.DateofExit && <p className="text-red-500">{errors.DateofExit}</p>}
                 </div>                 
                 <div className="flex flex-col">
                   <label className="text-gray-700 mb-1">Experience:</label>
                   <input
                    type="text"
                    name="Experience"
                    value={formData.Experience}
                     readOnly
                     className="p-1 border border-gray-300 rounded-lg"
                   /> 
                 {errors.Experience && <p className="text-red-500">{errors.Experience}</p>}
               </div>
                 <div className="flex flex-col">
                   <label className="text-gray-700 mb-1">State:</label>
                   <input
                     type="text"
                     name="State"
                     value={formData.State}
                     onChange={handleChange}
                     onKeyDown={handleNameChar}
                     minLength={4}
                     maxLength={40}
                     className="p-1 border border-gray-300 rounded-lg"
                   />
                   {errors.State && <p className="text-red-500">{errors.State}</p>}
                 </div>
                 <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Country:</label>
                   <input
                     type="text"
                     name="Country"
                     value={formData.Country}
                     onChange={handleChange}
                     onKeyDown={handleName}
                     minLength={4}
                     maxLength={40}
                    
                     className="p-1 border border-gray-300 rounded-lg"
                   />
                   {errors.Country && <p className="text-red-500">{errors.Country}</p>}
                 </div>
                 <div className="flex flex-col">
                   <label className="text-gray-700 mb-1">Attachment:</label>
                  <input
                     type="file"
                     name="Attachment"
                     value={formData.Attachment}
                     onChange={handleChange}
                     className="p-1 border border-gray-300  rounded-lg"
                   />
                 </div>
               </div>
               <div className="flex justify-end">                
                <button
                    type="submit"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-3 mb-2">
                   Save
                 </button>


                 <button
           
             onClick={handleClosePopup}
             className= "bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-3 mb-2"
           >
           Cancel
           </button>

               
               </div>
             </form>
           </div>
         </div>
       )}
     </div>
    </div>
     </div>
   );
 } export default App;
