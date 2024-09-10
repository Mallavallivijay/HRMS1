// import React, { useState } from "react";

// const FamilyDetailsTable = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [familyDetails, setFamilyDetails] = useState([
//     { name: "John Doe", relationship: "Father", age: 58 },
//     { name: "Jane Doe", relationship: "Mother", age: 55 },
//     // Add more initial family members if needed
//   ]);

//   const [currentDetails, setCurrentDetails] = useState({
//     name: "",
//     relationship: "",
//     age: "",
//   });

//   const handleEditClick = () => {
//     setIsEditing(true);
//     setCurrentDetails({
//       name: familyDetails[0]?.name || "",
//       relationship: familyDetails[0]?.relationship || "",
//       age: familyDetails[0]?.age || "",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     setFamilyDetails((prevDetails) => [
//       {
//         name: currentDetails.name,
//         relationship: currentDetails.relationship,
//         age: currentDetails.age,
//       },
//       ...prevDetails.slice(1),
//     ]);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//   };

//   return (
//     <div className="p-4">
//       <div className="relative">
//         <h2 className="text-xl font-bold mb-4">Family Details</h2>
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="border-b">
//               <th className="p-2 text-left relative">
//                 <button
//                   className="absolute top-0 left-0 p-1"
//                   onClick={handleEditClick}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-gray-500 hover:text-gray-700"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 20h9"
//                     />
//                   </svg>
//                 </button>
//                 Name
//               </th>
//               <th className="p-2 text-left">Relationship</th>
//               <th className="p-2 text-left">Age</th>
//             </tr>
//           </thead>
//           <tbody>
//             {familyDetails.map((member, index) => (
//               <tr key={index} className="border-b">
//                 <td className="p-2">{member.name}</td>
//                 <td className="p-2">{member.relationship}</td>
//                 <td className="p-2">{member.age}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isEditing && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
//             <h3 className="text-xl font-bold mb-4">Edit Family Details</h3>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-1">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={currentDetails.name}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-1">Relationship</label>
//               <input
//                 type="text"
//                 name="relationship"
//                 value={currentDetails.relationship}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-1">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 value={currentDetails.age}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded"
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={handleCancel}
//                 className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FamilyDetailsTable;
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