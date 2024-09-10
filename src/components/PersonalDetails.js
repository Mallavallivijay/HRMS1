// import React, { useState } from "react";
// import FamilyDetailsForm from "./EditFamilyDetails.js"
// import { FaMapMarkerAlt } from "react-icons/fa";

// const PersonalDetails = () => {
//   const [familyDetails, setFamilyDetails] = useState([
//     {
//       name: "John Doe",
//       phoneNumber: "123-456-7890",
//       relation:"",
//       // maritalStatus: "Married",
//       // dob: "1990-01-01",
//       // gender: "Male",
//       // fatherName: "Michael Doe",
//       // dateOfJoining: "2020-05-15",
//       // bloodGroup: "O+",
//     },
//   ]);

//   const [selectedMember, setSelectedMember] = useState(null);
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   const handleEdit = (index) => {
//     setSelectedMember({ ...familyDetails[index], index });
//     setIsFormVisible(true);
//   };

//   const handleAdd = () => {
//     setSelectedMember(null);
//     setIsFormVisible(true);
//   };

//   const handleSave = (member) => {
//     const updatedDetails = [...familyDetails];
//     if (member.index !== undefined) {
//       updatedDetails[member.index] = member;
//     } else {
//       updatedDetails.push(member);
//     }
//     setFamilyDetails(updatedDetails);
//     setIsFormVisible(false);
//   };

//   const handleDelete = (index) => {
//     const updatedDetails = familyDetails.filter((_, i) => i !== index);
//     setFamilyDetails(updatedDetails);
//   };

//   return (
//     <div className="p-3">
//       <div className="flex justify-center items-center mb-4">
//         <FaMapMarkerAlt className="mr-2 text-black-500" size={20} />
//         <h2 className="text-xl font-bold text-gray-700">Personal</h2>
//       </div>
//       <div className="bg-yellow-500 text-white p-4 rounded-md flex justify-between items-center">
//         <h1 className="text-xl">Family Details</h1>
//         <div className="flex items-center">
//           <button
//             onClick={handleAdd}
//             className="bg-green-500 p-2 rounded-md text-white"
//           >
//             + Add Member
//           </button>
//         </div>
//       </div>
//       <div className="mt-8">
//         {familyDetails.map((member, index) => (
//           <div key={index} className="bg-white p-4 rounded-md shadow-md mb-4">
//             <div className="grid grid-cols-3 gap-4 mb-2">
//               <div>
//                 <p>
//                   <strong>Name:</strong> {member.name}
//                 </p>
//               </div>
//               <div>
//                 <p>
//                   <strong>Relation:</strong> {member.relation}
//                 </p>
//               </div>
//               <div>
//                 <p>
//                   <strong>Phone Number:</strong> {member.phoneNumber}
//                 </p>
//               </div>
//             </div>

//             {/* <div className="grid grid-cols-3 gap-4 mb-2">
//               <div>
//                 <p>
//                   <strong>Date of Birth:</strong> {member.dob}
//                 </p>
//               </div>
//               <div>
//                 <p>
//                   <strong>Gender:</strong> {member.gender}
//                 </p>
//               </div>
//               <div>
//                 <p>
//                   <strong>Father's Name:</strong> {member.fatherName}
//                 </p>
//               </div>
//             </div> */}

//             <div className="grid grid-cols-2 gap-4 mb-2">
//               {/* <div>
//                 <p>
//                   <strong>Date of Joining:</strong> {member.dateOfJoining}
//                 </p>
//               </div>
//               <div>
//                 <p>
//                   <strong>Blood Group:</strong> {member.bloodGroup}
//                 </p>
//               </div> */}
//             </div>

//             <div className="flex justify-end">
//               <button
//                 onClick={() => handleEdit(index)}
//                 className="mr-2 text-blue-500"
//               >
//                 <i className="fas fa-edit">✏️</i>
//               </button>
//               <button
//                 onClick={() => handleDelete(index)}
//                 className="text-red-500"
//               >
//                 <i className="fas fa-trash">🗑️</i>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {isFormVisible && (
//         <FamilyDetailsForm
//           member={selectedMember}
//           onSave={handleSave}
//           onCancel={() => setIsFormVisible(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default PersonalDetails;
