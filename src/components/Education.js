import { TiPencil } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useEffect, useState } from 'react';
import { FaLessThan } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from "./EducationNav"

function Laxman() {
  const initialData = {
    Education: "",
    SchoolName: "",
    Board: "",
    Degree: "",
    Majors: "",
    YearOfPassing: "",
    CertificateIssueDate: "",
    PercentageGrade: "",
    State: "",
    Country: "",
    Attachment: "",
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [educationLabel, setEducationLabel] = useState({
    SchoolName: "School Name",
    Board: "Board",
    Degree: "Degree",
    Majors: "Majors",
  });

  const educationOptions = [
    "SSC",
    "Inter",
    "Degree",
    "Post-Graduation"
  ];

  useEffect(() => {
    if (formData.Education) {
      switch (formData.Education) {
        case "SSC":
          setEducationLabel({
            SchoolName: "School Name",
            Board: "Board",
            Degree: "Degree",
            Majors: "Majors",
          });
          break;
        case "Inter":
          setEducationLabel({
            SchoolName: "College Name",
            Board: "Board",
            Degree: "Degree",
            Majors: "Majors",
          });
          break;
        case "Degree":
          setEducationLabel({
            SchoolName: "College Name",
            Board: "University",
            Degree: "Degree",
            Majors: "Majors",
          });
          break;
        case "Post-Graduation":
          setEducationLabel({
            SchoolName: "College Name",
            Board: "University",
            Degree: "Degree",
            Majors: "Majors",
          });
          break;
        default:
          setEducationLabel({
            SchoolName: "School Name",
            Board: "Board",
            Degree: "Degree",
            Majors: "Majors",
          });
      }
    }
  }, [formData.Education]);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.SchoolName.match(/^[A-Za-z\s]{4,40}$/)) {
      newErrors.SchoolName = `${educationLabel.SchoolName} must be 4-40 characters and contain only letters.`;
    }

    if (!formData.Board.match(/^[A-Za-z\s]{4,40}$/)) {
      newErrors.Board = `${educationLabel.Board} must be 4-40 characters and contain only letters.`;
    }

    if (!formData.Degree.match(/^[A-Za-z\s]{4,40}$/)) {
      newErrors.Degree = 'Degree must be 4-40 characters and contain only letters.';
    }

    if (!formData.Majors.match(/^[A-Za-z\s]{3,40}$/)) {
      newErrors.Majors = 'Majors must be 3-40 characters and contain only letters.';
    }

    if (!formData.YearOfPassing.match(/^\d{4}$/)) {
      newErrors.YearOfPassing = 'Year of Passing must be a 4-digit number.';
    }

    if (!formData.CertificateIssueDate) {
      newErrors.CertificateIssueDate = 'Certificate Issue Date is required.';
    }

    if (!formData.PercentageGrade.match(/^\d{1,3}(\.\d{0,1})?$/) || parseFloat(formData.PercentageGrade) < 0 || parseFloat(formData.PercentageGrade) > 100) {
      newErrors.PercentageGrade = 'Percentage/Grade must be a number between 0 and 100, with up to 1 decimal place.';
    }

    if (!formData.State.match(/^[A-Za-z\s]{4,40}$/)) {
      newErrors.State = 'State must be 4-40 characters and contain only letters.';
    }

    if (!formData.Country.match(/^[A-Za-z\s]{4,40}$/)) {
      newErrors.Country = 'Country must be 4-40 characters and contain only letters.';
    }

    if (!formData.Attachment) {
      newErrors.Attachment = 'Attachment is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      console.log('Failed to submit');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleDelete = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index);
    setTableData(updatedTableData);
  };

  const handleAddRow = () => {
    handleOpenPopup();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Restrict input based on field type
    if (name === "YearOfPassing") {
      // Allow only numeric values
      if (/^\d{0,4}$/.test(value)) {
        setFormData(prevData => ({ ...prevData, [name]: value }));
      }
    } else if (name === "PercentageGrade") {
      // Allow only numbers with one decimal point
      if (/^\d*\.?\d{0,1}$/.test(value)) {
        setFormData(prevData => ({ ...prevData, [name]: value }));
      }
    } else if (["SchoolName", "Board", "Degree", "Majors", "State", "Country"].includes(name)) {
      // Allow only alphabetic characters and spaces
      if (/^[A-Za-z\s]*$/.test(value)) {
        setFormData(prevData => ({ ...prevData, [name]: value }));
      }
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="mr-10 ml-6">
        <div className="flex flex-row text-left justify-start px-3 py-2  border-2 border-orange-500 rounded-md w-[160px] mb-5 mt-5">
          <FaLessThan className="text-black mr-1 mt-1" />
          <Link to="/">          <button><span className="text font-semibold text-black">Previous Page</span></button>
          </Link>
        </div>
      </div>
      <div>
        <div className="p-4 pt-5 mt-5">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left bg-orange-500 text-white rounded-t-md" colSpan="12">
                  Vikram
                </th>
              </tr>
              <tr>
                <th className="py-2 px-4 text-left" colSpan="10">
                  Education Details
                </th>
                <th className="inline-block cursor-pointer mr-2 py-1 px-4 text-right bg-green-600 m-2 text-white border-rounded" onClick={handleAddRow}>
                  <button type="button">Add</button>
                </th>
              </tr>
            </thead>
            <tbody className="border border-black border-collapse">
              <tr>
                <th className="py-2 px-1 border-b-black border-2 border-solid border-black text-center">Education</th>
                <th className="py-2 px-1 border-b-black border-2 border-solid border-black text-center">{educationLabel.SchoolName}</th>
                <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center">{educationLabel.Board}</th>
                <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center">{educationLabel.Degree}</th>
                <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center">{educationLabel.Majors}</th>
                <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center">Year of Passing</th>
                <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center">Certificate Issue Date</th>
                <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center">Percentage/Grade</th>
                <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center">State</th>
                <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center">Country</th>
                <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center">Attachment</th>
                <th className="py-2 px-2 border-b-black border-2 border-solid border-black text-center">Actions</th>
              </tr>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.Education}</td>
                  <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.SchoolName}</td>
                  <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.Board}</td>
                  <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.Degree}</td>
                  <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.Majors}</td>
                  <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.YearOfPassing}</td>
                  <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.CertificateIssueDate}</td>
                  <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.PercentageGrade}</td>
                  <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.State}</td>
                  <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.Country}</td>
                  <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto">{row.Attachment}</td>
                  <td className="py-5 px-4 border-b border-gray-900 border-r text-center  max-w-[100px]  overflow-x-auto text-center">
                    <div className='flex flex-row justify-center'>
                    <TiPencil className="inline-block mr-4 cursor-pointer text-lg" onClick={() => handleOpenPopup(index)} />
                    {index !== 0 && (  
                    <RiDeleteBin6Line
                      className="inline-block cursor-pointer "
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

        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-200 w-3/4 h-auto border-2 border-black p-4 rounded-md relative">
            <div className='flex items-center justify-between mb-4 bg-orange-500 border border-gray-950 m-2 border-radius'>
                <h2 className="p-1 m-1">{editIndex !== null ? 'Edit Education Details' : 'Add Education Details'}</h2>
                <MdCancelPresentation className='text-xl mr-2 cursor-pointer' onClick={handleClosePopup} />
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <div>
                    <label htmlFor="Education" className="mb-1 text-gray-700">Education</label>
                    <select name="Education" value={formData.Education} onChange={handleChange} className="mt-1 block w-full border border-gray-300  p-2 rounded-md">
                      <option value="">Select Education</option>
                      {educationOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.Education && <p className="text-red-500 text-xs">{errors.Education}</p>}
                  </div>
                  <div>
                    <label htmlFor="SchoolName" className="mb-1 text-gray-700">{educationLabel.SchoolName}</label>
                    <input type="text" name="SchoolName" value={formData.SchoolName} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300  p-2 rounded" />
                    {errors.SchoolName && <p className="text-red-500 text-xs">{errors.SchoolName}</p>}
                  </div>
                  <div>
                    <label htmlFor="Board" className="mb-1 text-gray-700">{educationLabel.Board}</label>
                    <input type="text" name="Board" value={formData.Board} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300  p-2 rounded" />
                    {errors.Board && <p className="text-red-500 text-xs">{errors.Board}</p>}
                  </div>
                  <div>
                    <label htmlFor="Degree" className="mb-1 text-gray-700">{educationLabel.Degree}</label>
                    <input type="text" name="Degree" value={formData.Degree} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300  p-2 rounded" />
                    {errors.Degree && <p className="text-red-500 text-xs">{errors.Degree}</p>}
                  </div>
                  <div>
                    <label htmlFor="Majors" className="mb-1 text-gray-700">{educationLabel.Majors}</label>
                    <input type="text" name="Majors" value={formData.Majors} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300  p-2 rounded" />
                    {errors.Majors && <p className="text-red-500 text-xs">{errors.Majors}</p>}
                  </div>
                  <div>
                    <label htmlFor="YearOfPassing" className="mb-1 text-gray-700">Year of Passing</label>
                    <input type="text" name="YearOfPassing" value={formData.YearOfPassing} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300  p-2 rounded" />
                    {errors.YearOfPassing && <p className="text-red-500 text-xs">{errors.YearOfPassing}</p>}
                  </div>
                  <div>
                    <label htmlFor="CertificateIssueDate" className="mb-1 text-gray-700">Certificate Issue Date</label>
                    <input type="date" name="CertificateIssueDate" value={formData.CertificateIssueDate} onChange={handleChange} className="mt-1 block w-full border border-gray-300  p-2 rounded" />
                    {errors.CertificateIssueDate && <p className="text-red-500 text-xs">{errors.CertificateIssueDate}</p>}
                  </div>
                  <div>
                    <label htmlFor="PercentageGrade" className="mb-1 text-gray-700">Percentage/Grade</label>
                    <input type="text" name="PercentageGrade" value={formData.PercentageGrade} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300  p-2 rounded" />
                    {errors.PercentageGrade && <p className="text-red-500 text-xs">{errors.PercentageGrade}</p>}
                  </div>
                  <div>
                    <label htmlFor="State" className="mb-1 text-gray-700">State</label>
                    <input type="text" name="State" value={formData.State} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300  p-2 rounded" />
                    {errors.State && <p className="text-red-500 text-xs">{errors.State}</p>}
                  </div>
                  <div>
                    <label htmlFor="Country" className="mb-1 text-gray-700">Country</label>
                    <input type="text" name="Country" value={formData.Country} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300  p-2 rounded" />
                    {errors.Country && <p className="text-red-500 text-xs">{errors.Country}</p>}
                  </div>
                  <div>
                    <label htmlFor="Attachment" className="mb-1 text-gray-700">Attachment</label>
                    <input type="file" name="Attachment" onChange={(e) => setFormData(prevData => ({ ...prevData, Attachment: e.target.files[0]?.name || '' }))} className="mt-1 block w-full border border-gray-300 rounded" />
                    {errors.Attachment && <p className="text-red-500 text-xs">{errors.Attachment}</p>}
                  </div>
                 <div>
                  <button className="bg-gray-400 px-4 py-2  hover:bg-gray-600 rounded-md mr-2"> Save</button>
                  <button className="bg-gray-400 px-4    hover:bg-gray-600 rounded-md py-2">Cancel</button>
                 </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Laxman;
