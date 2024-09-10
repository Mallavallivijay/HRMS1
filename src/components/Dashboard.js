// import React from "react";
// import { AiTwotoneHome } from "react-icons/ai";
// import {
//   IoPersonSharp,
//   IoLocationOutline,
//   IoNotifications,
// } from "react-icons/io5";
// import { FaRegIdCard, FaLaptop,FaBookReader  } from "react-icons/fa";
// // import { MdCardTravel } from "react-icons/md";
// import { PiSuitcaseSimpleFill,PiAirplaneTiltFill } from "react-icons/pi";
// import { IoMdPersonAdd } from "react-icons/io";
// import { SlEnvolope } from "react-icons/sl";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       {/* Navbar */}
//       <div className="flex justify-between items-center p-2  bg-white shadow-md rounded-md">
//         <img src="/Rfchh logo" alt="Logo" className="h-11 " />
//         <h1 className="text-xl font-bold ml-44">Dashboard</h1>
//         <div className="flex items-center space-x-4">
//           <i>
//             <SlEnvolope size={20} />
//           </i>
//           <i>
//             <IoNotifications size={20} />
//           </i>
//           <div className="flex items-center">
//             <span className="mr-2">ProfileName</span>
//             <img
//               src="/Rfchh logo"
//               alt="Profile"
//               className="w-8 h-8 rounded-full"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="  mt-2 flex p-1  bg-gray-200 shadow-md max-w-7xl mx-auto  border  border-black  rounded-md">
//         <AiTwotoneHome size={20} className="mt-1 mr-2" />
//         <h1 className="text-xl font-bold">Home</h1>
//       </div>

//       {/* Profile Section */}
//       <div className="mt-4 p-3 bg-gray-200 border  border-black shadow-lg max-w-6xl mx-auto rounded-md">
//         <div className="flex items-center space-x-4">
//           <img
//             src="/Rfchh logo"
//             alt="Profile"
//             className="w-16 h-16 rounded-full"
//           />
//           <div>
//             <h2 className="text-lg font-semibold">Profile Name(E00001)</h2>
//             <p>Software Developer</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-4 p-4 bg-gray-200 shadow-lg rounded-md max-w-7xl  border-black mx-auto border-2">
//         {/* Tab Navigation */}
//         <div className="mt-4 p-3 bg-white border  border-black shadow-md flex text-sm flex-nowrap space-x-4 mb-6 max-w-7xl mx-auto rounded-md overflow-x-auto">
//           {[
//             { name: "Profile", route: "/personalDetails" },
//             { name: "NationalID", route: "/National" },
//             { name: "Education-Details", route: "/educationDetails" },
//             { name: "Address-Details", route: "/location" },
//             { name: "Travel-Details", route: "/Travel" },
//             { name: "Experience-Details", route: "experience" },
//             { name: "Family-Details", route: "/familyDetails" },
//             { name: "Current-Experience-Details", route: "/current" },
//           ].map((tab, index) => (
//             <Link to={tab.route} key={index}>
          
//             <button
//               key={index}
//               className="px-3 py-1 ml-3 border-2 border-transparent hover:border-yellow-700"
//             >
//               {tab.name}
//             </button>

//             </Link>
//           ))}
//         </div>

//         {/* Content Grid */}
//         {/* <div className="grid grid-cols-3 gap-4 mt-3  max-w-7xl mx-auto "> */}
//         <div className="grid grid-cols-3 gap-4 mt-3 max-w-7xl mx-auto ">
//           {/* Personal Section */}
//           <Link to="/personalDetails">
//             <div className="bg-white p-4 border  border-black shadow-md rounded-md">
//               {/* Flex container for the icon and heading */}
//               <div className="flex items-center mb-2 bg-gray-300 rounded-md ">
//                 <IoPersonSharp size={28} className="mr-2 pl-2" />
//                 <h3 className="font-semibold text-base ">Personal Details</h3>
//               </div>
//               <p>Date of Birth: 06/07/1997</p>
//               <p>Phone Number: 7036498882</p>
//               <p>Gender: Male</p>
//               <p>Marital Status: Unmarried</p>  
//             </div>
//           </Link>

//           {/* National ID Section */}
//           <Link to="/National">
//           <div className="bg-white p-4 shadow-md rounded-md border  border-black">
//             <div className="flex items-center mb-2 bg-gray-300 rounded-md ">
//               <FaRegIdCard size={28} className="mr-2 pl-2" />
//               <h3 className="font-semibold  ">National ID </h3>
//             </div>

//             <p>Aadhar Card: 1234-5678-9101</p>
//             <p>PAN Card: ABCDE1234F</p>
//             <p>PAN Card: ABCDE1234F</p>
//             <p>PAN Card: ABCDE1234F</p>
//           </div>
//           </Link>
//           {/* Education Details Section */}
//           <Link to="/EducationDetails">
//             <div className="bg-white p-4 shadow-md rounded-md border  border-black">
//               <div className="flex items-center bg-gray-300 mb-2  rounded-md          ">
//                 <FaBookReader  size={25} className="pl-2 mr-1" />
//                 <h3 className="font-semibold    rounded-md ">
//                   Education Details
//                 </h3>
//               </div>
//               <p>Graduation: Bachelor of Technology</p>
//               <p>Institute: Some University</p>
//               <p>Year: 2019</p>
//               <p>Phone Number: 7036498882</p>
//               {/* <p>Gender: Male</p> */}
//               {/* <p>Marital Status: Unmarried</p> */}
//             </div>
//           </Link>

//           {/* Location Section */}
//           <Link to="/location">
//           <div className="bg-white p-4 shadow-md rounded-md border  border-black">
//             <div className="flex items-center bg-gray-300 mb-2  rounded-md">
//               <IoLocationOutline size={28} className="pl-2 mr-1" />
//               <h3 className="font-semibold   bg-gray-300  rounded-md ">
//                 Address Details
//               </h3>
//             </div>

//             <p>Permanent Address: ABC Street, City, Country</p>
//             <p>Permanent Address: ABC Street, City, Country</p>
//             <p>Permanent Address: ABC Street, City, Country</p>
//           </div>
//           </Link>
//           {/* Travel Details Section */}
//           <Link to='/Travel'>
//           <div className="bg-white p-4 shadow-md rounded-md border  border-black">
//             <div className="flex items-center bg-gray-300 mb-2  rounded-md">
//               <PiAirplaneTiltFill size={28} className="pl-2 mr-1" />
//               <h3 className="font-semibold  bg-gray-300  rounded-md ">
//                 Travel Details
//               </h3>
//             </div>
//             <p>Passport: Available</p>
//             <p>Visa: None</p>
//           </div>
//           </Link>
//           {/* Experience Details Section */}
//           <Link to="/experience">
//           <div className="bg-white p-4 shadow-md rounded-md border  border-black">
//             <div className="flex items-center bg-gray-300 mb-2  rounded-md">
//               <PiSuitcaseSimpleFill size={28} className="pl-2 mr-1" />
//               <h3 className="font-semibold  bg-gray-300  rounded-md ">
//                 Experience Details
//               </h3>
//             </div>

//             <p>Organization: Tech Software</p>
//             <p>Experience: 2 Years</p>
//             <p>Designation: Frontend Developer</p>
//           </div>
//           </Link>
//           {/* Family Details Section */}
//           <Link to="/FamilyDetails">
//             <div className="bg-white p-4 shadow-md rounded-md border  border-black">
//               <div className="flex items-center bg-gray-300 mb-2  rounded-md">
//                 <IoMdPersonAdd size={28} className="pl-2 mr-1" />
//                 <h3 className="font-semibold  bg-gray-300  rounded-md ">
//                   Family Details
//                 </h3>
//               </div>
//               <p>Name: Arvind</p>
//               <p>Relation: Father</p>
//             </div>
//           </Link>
//           {/* Current Experience Details Section */}
//           <Link to="/Current">
//             <div className="bg-white p-4 shadow-md rounded-md border  border-black">
//               <div className="flex items-center bg-gray-300 mb-2  rounded-md">
//                 <FaLaptop size={28} className="pl-2 mr-1" />
//                 <h3 className="font-semibold  bg-gray-300  rounded-md ">
//                   Current Experience Details
//                 </h3>
//               </div>
//               <p>Organization: Tech Software</p>
//               <p>Designation: Frontend Developer</p>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// with using url....

import React, { useEffect, useState } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import {
  IoPersonSharp,
  IoLocationOutline,
  IoNotifications,
} from "react-icons/io5";
import { FaRegIdCard, FaBookReader } from "react-icons/fa";
// import { MdCardTravel } from "react-icons/md"; //removed
import { PiSuitcaseSimpleFill,PiAirplaneTiltFill } from "react-icons/pi";
import { FaUserGroup} from "react-icons/fa";
import { SlEnvolope } from "react-icons/sl";
import { Link } from "react-router-dom";
import { TiGroup } from "react-icons/ti";
const Dashboard = () => {
  // State to store employee data
  const [employeeData, setEmployeeData] = useState(null);
   // Mock data to use if the API call fails
   const mockData = {
    employeeProfileDetails: {
      firstname: "John",
      employeeId: "HRMS123",
      employeeDesignation: "Software Developer",
      dob: "1990-01-01",
      phoneNumber: "1234567890",
      doj: "2020-01-01",
    },
    educationDetails: {
      degree: "B.Tech",
      institutionName: "XYZ University",
      yearOfPass: "2012",
    },
    currentExperienceDetails: {
      organisationName: "TechCorp",
      experience: "2",
      designation: "Senior Developer",
    },
    experienceDetails: {
      organisationName: "OldTech",
      experience: "3",
      designation: "Junior Developer",
    },
    familyDetails: {
      name: "Doe Family",
      relation: "Father",
    },
    AddressDetails: {
      houseNumber: "123",
      street: "Main Street",
      village: "Sample Village",
      town: "Sample Town",
      district: "Sample District",
      state: "Sample State",
      country: "Sample Country",
      pincode: "123456",
    },
    nationalIDDetails: {
      nationalId: "Passport",
      nationalIDNum: "A1234567",
    },
    travelDetails: {
      passportNumber: "A1234567",
      issueDate: "2015-01-01",
      expireDate: "2025-01-01",
    },
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.101:8080/employeeservice/employee/getProfileDashboard/HRMS1"
        );
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setEmployeeData(mockData)
      }
    };

    fetchData();
  }, []);

  // Display a loading message until data is fetched
  if (!employeeData) {
    return <div>Loading...  I think there is an issue with the connection or with the Api kindly check the connection or the URl.. to proced</div>;
  }

  const {
    employeeProfileDetails,
    educationDetails,
    currentExperienceDetails,
    experienceDetails,
    familyDetails,
    locationDetails,
    nationalIDDetails,
    travelDetails,
  } = employeeData;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center p-2  bg-white shadow-md rounded-md">
        <img src="/Rfchh logo" alt="Logo" className="h-11 w-12 object-cover rounded-xl " />
        <h1 className="text-xl font-bold ml-44">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <i>
            <SlEnvolope size={20} />
          </i>
          <i>
            <IoNotifications size={20} />
          </i>
          <div className="flex items-center">
            {/* <span className="mr-2">ProfileName</span> */}
            <img
              src="/Rfchh logo"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="mr-2">{employeeProfileDetails?.firstname}</span>
          </div>
        </div>
      </div>
      <div className="  mt-2 flex p-1  bg-gray-200 shadow-md max-w-7xl mx-auto border  border-black  rounded-md">
        <AiTwotoneHome size={20} className="mt-1 mr-2" />
        <h1 className="text-xl font-bold">Home</h1>
      </div>

      {/* Profile Section */}
      <div className="mt-4 p-3 bg-white shadow-lg max-w-6xl mx-auto border  border-black rounded-md">
        <div className="flex items-center border   space-x-4">
          <img
            src="/Rfchh logo"
            alt="Profile"
            className="w-16 h-16  border  border-black rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {employeeProfileDetails?.firstname} ({employeeProfileDetails?.employeeId})
            </h2>
            <h2>Designation</h2>
            <p>{employeeProfileDetails?.employeeDesignation}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-200 shadow-lg rounded-md max-w-7xl  border  border-black mx-auto border-t-2">
        {/* Tab Navigation */}
        <div className="mt-4 p-3 bg-white shadow-md flex border  border-black text-sm flex-nowrap space-x-4 mb-6 max-w-7xl mx-auto rounded-md overflow-x-auto">
          {[
            { name: "Profile", route: "/personalDetails" },
            { name: "National-ID", route: "/National" },
            { name: "Education-Details", route: "/educationDetails" },
            { name: "Address-Details", route: "/location" },
            { name: "Travel-Details", route: "/travel-details" },
            { name: "Experience-Details", route: "experience" },
            { name: "Family-Details", route: "/familyDetails" },
            { name: "Current-Experience-Details", route: "/current" },
          ].map((tab, index) => (
            <Link to={tab.route} key={index}>
              <button
                className="px-3 py-1 ml-3 border-2 border-transparent hover:border-yellow-700"
              >
                {tab.name}
              </button>
            </Link>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-4 mt-3 max-w-7xl mx-auto">
          {/* Personal Section */}
          <Link to="/personalDetails">
            <div className="bg-white p-4 shadow-md rounded-md border  border-black">
              <div className="flex items-center mb-2 bg-gray-300 rounded-md ">
                <IoPersonSharp size={28} className="mr-2 pl-2" />
                <h3 className="font-semibold text-base ">Profile </h3>
              </div>
              <p>Name: {employeeProfileDetails?.firstname}</p>
              <p>Date of Birth: {employeeProfileDetails?.dob}</p>
              <p>Phone Number: {employeeProfileDetails?.phoneNumber}</p>
              <p>Date of Joining: {employeeProfileDetails?.doj}</p>

              {/* <p>Gender: Male</p> */}
               {/* Gender is hardcoded as it's not in the API data */}
              {/* <p>Marital Status: Unmarried</p>  */}
            </div>
          </Link>

          {/* National ID Section */}
          <div className="bg-white p-4 shadow-md rounded-md border  border-black">
            <div className="flex items-center mb-2 bg-gray-300 rounded-md">
              <FaRegIdCard size={28} className="mr-2 pl-2" />
              <h3 className="font-semibold">National ID</h3>
            </div>
            <p>ID Type: {nationalIDDetails?.nationalId}</p>
            <p>ID Number: {nationalIDDetails?.nationalIDNum}</p>
          </div>

          {/* Education Details Section */}
          <Link to="/educationDetails">
            <div className="bg-white p-4 shadow-md rounded-md border  border-black">
              <div className="flex items-center bg-gray-300 mb-2  rounded-md">
                <FaBookReader size={25} className="pl-2 mr-1" />
                <h3 className="font-semibold">Education Details</h3>
              </div>
              <p>Degree: {educationDetails?.degree}</p>
              <p>Institute: {educationDetails?.institutionName}</p>
              <p>certificateIssueDate:{educationDetails?.certificateIssueDate}</p>
              <p>Year: {educationDetails?.yearOfPass}</p>
              {/* <p>Year: {educationDetails?.yearOfPass}</p> */}
            </div>
          </Link>

          {/* Location Section */}
          <Link to="/location">
            <div className="bg-white p-4 shadow-md rounded-md border  border-black">
              <div className="flex items-center bg-gray-300 mb-2  rounded-md">
                <IoLocationOutline size={28} className="pl-2 mr-1" />
                <h3 className="font-semibold">Address Details</h3>
              </div>
              <p>Address: {`${locationDetails?.houseNumber}, ${locationDetails?.street}, ${locationDetails?.village}, ${locationDetails?.town}, ${locationDetails?.district}, ${locationDetails?.state}, ${locationDetails?.country} - ${locationDetails?.pincode}`}</p>
            </div>
          </Link>

          {/* Travel Details Section */}
          <Link to="/National">
          <div className="bg-white p-4 shadow-md rounded-md border  border-black">
            <div className="flex items-center bg-gray-300 mb-2  rounded-md">
              <PiAirplaneTiltFill size={28} className="pl-2 mr-1" />
              <h3 className="font-semibold">Travel Details</h3>
            </div>
            <p>Passport: {travelDetails?.passportNumber}</p>
            <p>Issue Date: {travelDetails?.issueDate}</p>
            <p>Expire Date: {travelDetails?.expireDate}</p>
          </div>
          </Link>

          {/* Experience Details Section */}
          <Link to="/experience">
            <div className="bg-white p-4 shadow-md rounded-md border  border-black">
              <div className="flex items-center bg-gray-300 mb-2  rounded-md">
                <PiSuitcaseSimpleFill size={28} className="pl-2 mr-1" />
                <h3 className="font-semibold">Experience Details</h3>
              </div>
              <p>Organization: {experienceDetails?.organisationName}</p>
              <p>Experience: {experienceDetails?.experience} Years</p>
              <p>Designation: {experienceDetails?.designation}</p>
            </div>
          </Link>

          {/* Family Details Section */}
          <Link to="/familyDetails">
            <div className="bg-white p-4 shadow-md rounded-md border  border-black">
              <div className="flex items-center bg-gray-300 mb-2  rounded-md">
                <TiGroup  size={28} className="pl-2 mr-1" />
                <h3 className="font-semibold">Family Details</h3>
              </div>
              <p>Father's Name: {familyDetails?.name}</p>
              <p>Relationship: {familyDetails?.relation}</p>
              <p>Marital Status: Unmarried</p>
            </div>
          </Link>

          {/* Current Experience Details Section */}
          <Link to="/current">
            <div className="bg-white p-4 shadow-md rounded-md border  border-black">
              <div className="flex items-center bg-gray-300 mb-2  rounded-md">
                <PiSuitcaseSimpleFill size={28} className="pl-2 mr-1" />
                <h3 className="font-semibold">Current Experience </h3>
              </div>
              <p>Organization: {currentExperienceDetails?.organisationName}</p>
              <p>Experience: {currentExperienceDetails?.experience} Years</p>
              <p>Designation: {currentExperienceDetails?.designation}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
