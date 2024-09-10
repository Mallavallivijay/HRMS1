// middlename, lastname, maritalStatus, gender, bloodGroup were removed since they are not present in the API data.
// Data Initialization: Updated the useState initialization with default values that are relevant to the fields you expect from the API.
// Data Fetching and Parsing: Adjusted fetchData to correctly parse and map fields from the API response to the component's state.

import React, { useState, useEffect } from "react";
import axios from "axios";
import EditFamilyDetails from "./EditPersonalDetails";
import { FaEdit } from "react-icons/fa";
import Navbar from "./PersonalNavbar";
import { FaLessThan } from "react-icons/fa";
import { Link } from "react-router-dom";
const PersonalInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    prefix: "",
    firstname: "",
    middlename: "",
    lastname: "",
    countryCode: "",
    phoneNumber: "",
    maritalStatus: "",
    dob: "",
    gender: "",
    fatherName: "",
    dateOfJoining: "",
    bloodGroup: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://192.168.0.113:8080/employeeservice/employee/HRMS1');
        const response = await axios.get(
          "http://192.168.0.101:8080/employeeservice/employee/getEmployeeProfile/HRMS1"
        );
        const data = response.data;

        setPersonalDetails({
          firstname: data.firstname,
          lastname: data.lastname,
          phoneNumber: data.phoneNumber,
          maritalStatus: data.maritialStatus,
          dob: new Date(data.dob).toISOString().split("T")[0], // Converting ISO to YYYY-MM-DD4
          Gender: data.gender,

          fatherName: data.fatherName,
          dateOfJoining: new Date(data.doj).toISOString().split("T")[0],
          bloodGroup: data.bloodGroup,
        });
        console.log("Feteched data:", response.data);
      } catch (error) {
        console.error("Error fetching data in url :", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (updatedDetails) => {
    setPersonalDetails(updatedDetails);
    setIsModalOpen(false);
  };


  
  // const handleSave = async (updatedDetails) => {
  //   try {
  //     // Update the state with the new details
  //     setPersonalDetails(updatedDetails);

  //     // Make the POST request to update details on the server
  //     const response = await axios.post(
  //       "http://192.168.0.101:8080/employeeservice/employee/create" ,
  //       updatedDetails
  //     );

  //     console.log("Data successfully saved:", response.data);

  //     // Close the modal
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //   }
  // };

  // const handleSave = async (updatedDetails) => {
  //   try {
  //     // Update the state with the new details
  //     setPersonalDetails(updatedDetails);
   
  //     console.log("Formatted Data:", updatedDetails);

  //     // Make the POST request to update details on the server
  //     const response = await axios.post(
  //       "http://192.168.0.101:8080/employeeservice/employee/create",
  //       updatedDetails
  //     );
   
  //     console.log("Data successfully saved:", response.data);
   
  //     // Close the modal
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     console.error("Error saving data:", error.response?.data || error.message);
  //   }
  // }

  return (
    <div>
      <Navbar />
      <div>
        {/* <button className="border-2 flex border-amber-700  over:bg-gray-600 p-2 mt-7 ml-8 px-5 rounded-md"><div className="p-1 "><IoArrowBack/></div>Previous</button> */}
        <Link to="/">
          {/* <button className="border-2 flex border-black p-2 hover:bg-gray-100  w-32 mt-7 ml-7 px-4 rounded-md"> */}
            {/* <div className="mt-1 pr-2  text-orange-500"> */}
              {/* <IoArrowBack /> */}
              {/* <FaLessThan/> */}
            {/* </div> */}
            {/* <span className="text font-semibold text-orange-500">Previous Page</span> */}
          {/* </button> */}

          <div className="flex items-center justify-start px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40 ml-5 mb-5 mt-5">
                <FaLessThan className="text-orange-500 mr-2" />
                <button><link to=''></link><span className="text font-semibold text-orange-500">Previous Page</span></button>
        </div>
        </Link>
      </div>

      <div className="flex  justify-center  items-start p-5 mt-16 ">
        {/* p-36 */}

        <div className="w-2/3 mt-5 bg-white shadow-lg rounded-lg relative">
          {/* w-2/3 */}

          <div className="bg-orange-500 text-white p-6 rounded-t-lg">
            {/* <h1 className="text-base sm:text-lg font-bold">
              {personalDetails.firstname} {personalDetails.lastname}
            </h1> */}
          </div>
          <div className="p-8 border border-gray-300 rounded-b-lg relative">
            {/* <div className="absolute top-9 right-8 flex space-x-2"> */}
            <div className="absolute top-9   right-9 flex space-x-2">
              <button
                className="text-black-500 hover:text-orange-700"
                onClick={handleEditClick}
              >
                <FaEdit size={20} />
              </button>
            </div>
            <div className="bg-gray-100 p-5 rounded-md border border-gray-300">
              {/* <div className="grid grid-cols-4 gap-4"> */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="font-bold">Prefix</p>
                  <p>{personalDetails.prefix}</p>
                </div>
                <div>
                  <p className="font-bold">First Name</p>
                  <p>{personalDetails.firstname}</p>
                </div>
                <div>
                  <p className="font-bold">Last Name</p>
                  <p>{personalDetails.lastname}</p>
                </div>
                <div>
                  <p className="font-bold">Middle Name</p>
                  <p>{personalDetails.middlename}</p>
                </div>
                <div>
                  <p className="font-bold">Phone Number</p>
                  <p>
                    {personalDetails.countryCode} {personalDetails.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="font-bold">Martial Status</p>
                  <p>{personalDetails.maritalStatus}</p>
                </div>
                <div>
                  <p className="font-bold">Date of Birth</p>
                  <p>{personalDetails.dob}</p>
                </div>
                <div>
                  <p className="font-bold">Gender</p>
                  <p>{personalDetails.gender}</p>
                </div>
                <div>
                  <p className="font-bold">Date of Joining</p>
                  <p>{personalDetails.dateOfJoining}</p>
                </div>
                <div>
                  <p className="font-bold">Father's Name</p>
                  <p>{personalDetails.fatherName}</p>
                </div>
                <div>
                  <p className="font-bold">Blood Group</p>
                  <p>{personalDetails.bloodGroup}</p>
                </div>
                {/* Add other fields as necessary */}
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <EditFamilyDetails
            member={personalDetails}
            onSave={handleSave}
            onCancel={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
