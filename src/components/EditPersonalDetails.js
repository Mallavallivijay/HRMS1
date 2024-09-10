import React, { useState, useEffect } from "react";
import { MdCancelPresentation } from "react-icons/md";

const EditFamilyDetails = ({ member, onSave, onCancel }) => {
  const [formValues, setFormValues] = useState({
    prefix: "",
    firstname: "",
    middlename: "",
    lastname: "",

    phoneNumber: "",
    maritalStatus: "",
    dob: "",
    gender: "",
    fatherName: "",
    doj: "",
    bloodGroup: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (member) {
      setFormValues(member);
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
   // Define a regex that matches only letters with spaces allowed between words
const regex = /^[A-Za-z]+( [A-Za-z]+)*$/;

if (["firstname", "lastname", "fatherName"].includes(name)) {
  const trimmedValue = value.trim(); // Remove leading and trailing spaces

  if (regex.test(trimmedValue)) {
    setFormValues({ ...formValues, [name]: trimmedValue });
    setErrors({ ...errors, [name]: "" }); // Clear any errors if valid
  } else {
    setErrors({ ...errors, [name]: "Only letters are allowed, with spaces between words." }); // Set error message
    return; // Exit to avoid further processing on invalid input
  }
} else {
  setFormValues({ ...formValues, [name]: value });
}


    if (name === "prefix") {
      if (value === "Mr ") {
        setFormValues({
          ...formValues,
          [name]: value,
          gender: "Male",
          maritalStatus: "",
        });
      } else if (value === "Ms ") {
        setFormValues({
          ...formValues,
          [name]: value,
          gender: "Female",
          maritalStatus: "Single",
        });
      } else if (value === "Mrs ") {
        setFormValues({
          ...formValues,
          [name]: value,
          gender: "Female",
          maritalStatus: "Married",
        });
      } else {
        setFormValues({ ...formValues, [name]: value });
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  const handleMobileInput = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormValues((prev) => ({
        ...prev,
        phoneNumber: value,
      }));
    }
  };

  // Custom validation function
  const validateForm = () => {
    let validationErrors = {};
    const currentDate = new Date();

    // Prefix
    if (!formValues.prefix) {
      validationErrors.prefix = "Prefix is required.";
    }

    // First Name, Middle Name, Last Name, Father Name
    ["firstname", "lastname", "fatherName"].forEach((field) => {
      if (!formValues[field]) {
        validationErrors[field] = `${field} is required.`;
      } else if (!/^[A-Za-z ]+$/.test(formValues[field])) {
        validationErrors[field] = "Only characters are allowed.";
      } else if (formValues[field].length < 2) {
        validationErrors[field] = `${field} must be at least 2 characters.`;
      } else if (formValues[field].length > 30) {
        validationErrors[field] = `${field} must be at most 30 characters.`;
      }
    });

    //CountryCode
    if (!formValues.countryCode) {
      validationErrors.countryCode = "Country code is required.";
    }

    // Phone Number
    if (!formValues.phoneNumber) {
      validationErrors.phoneNumber = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formValues.phoneNumber)) {
      validationErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    } else if (/^0+$/.test(formValues.phoneNumber)) {
      validationErrors.phoneNumber = "Phone number cannot be all zeros.";
    } else if (/^0/.test(formValues.phoneNumber)) {
      validationErrors.phoneNumber = "Phone number should not start with '0'.";
    }
    

    // Marital Status
    if (!formValues.maritalStatus) {
      validationErrors.maritalStatus = "Marital status is required.";
    }

    // Date of Birth (DOB)
    const dobDate = new Date(formValues.dob);
    if (!formValues.dob) {
      validationErrors.dob = "Date of Birth is required.";
    } else if (dobDate > currentDate) {
      validationErrors.dob = "Date of Birth cannot be in the future.";
    } else {
      // Calculate age
      let age = currentDate.getFullYear() - dobDate.getFullYear();
      const monthDifference = currentDate.getMonth() - dobDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && currentDate.getDate() < dobDate.getDate())
      ) {
        age--;
      }
      if (age < 18) {
        validationErrors.dob = "You must be at least 18 years old.";
      } else if (age > 100) {
        validationErrors.dob = "DOB should not exceed 100 years in the past.";
      }
    }

    // Gender
    if (!formValues.gender) {
      validationErrors.gender = "Gender is required.";
    }

    // Date of Joining
    const joiningDate = new Date(formValues.doj);

    const today = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    if (!formValues.doj) {
      validationErrors.doj = "Date is required.";
    } else if (joiningDate < today) {
      validationErrors.doj =
        "Date of joining should not be in the past.";
    }

    // Blood Group
    if (!formValues.bloodGroup) {
      validationErrors.bloodGroup = "Bloodgroup is required.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formValues);
      console.log("Form submitted successfully", formValues);
    } else {
      console.log("Form submission failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-gray-200 p-4 rounded-md shadow-md w-1/2  ">
        <div className="bg-orange-400 rounded-md p-2 mb-10 flex items-center justify-between border-gray-950">
          <h2 className="text-xl pl-2">Edit Personal Details</h2>
          <button
            className="text-black-500 pr-1 hover:text-gray-700"
            onClick={onCancel}
          >
            <MdCancelPresentation size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* First Row ..............................*/}
          <div className="grid grid-cols-4 gap-6 mb-9">
            {/* Prefix */}
            <div>
              <label className="block text-gray-700">Prefix</label>
              <select
                name="prefix"
                value={formValues.prefix}
                onChange={handleChange}
                className="w-full p-1 border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Mr ">Mr.</option>
                <option value="Ms ">Ms.</option>
                <option value="Mrs ">Mss.</option>
              </select>
              {errors.prefix && (
                <span className="text-red-800 block h-4">{errors.prefix}</span>
              )}
            </div>
            {/* First Name */}
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstname"
                value={formValues.firstname}
                onChange={handleChange}
                // className="w-full p-1 border border-gray-300 rounded-md"
                className="border border-gray-300 rounded-md p-1 w-full overflow-hidden whitespace-nowrap text-ellipsis"
              />
              {errors.firstname && (
                <span className="text-red-800 block h-4">
                  {errors.firstname}
                </span>
              )}
            </div>
            {/* Middle Name */}
            <div>
              <label className="block text-gray-700">Middle Name</label>
              <input
                type="text"
                name="middlename"
                value={formValues.middlename}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded-md"
              />
              {/* {errors.middlename && (
                <span className="text-red-800 block h-2">
                  {errors.middlename}
                </span>
              )} */}
            </div>
            {/* Last Name */}
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formValues.lastname}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded-md"
              />
              {errors.lastname && (
                <span className="text-red-800 block h-2">
                  {errors.lastname}
                </span>
              )}
            </div>
          </div>

          {/* Second Row................................
          
          */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Phone Number */}

            <div>
              <label className="block text-gray-700">Phone Number</label>
              <div className="grid grid-cols-2 gap-2">
                {/* Country Code Selection */}
                <select
                  id="countryCode"
                  name="countryCode"
                  value={formValues.countryCode}
                  onChange={handleChange}
                  className={`p-1 border border-gray-300 rounded-md ${
                    errors.countryCode ? "border-red-500" : ""
                  }`}
                >
                  {/* <option value="">Country Code</option> */}
                  <option value="+code" >
                    select
                  </option>
                  <option value="+91">+91 (INDIA)</option>
                  <option value="+1">+1 (USA)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+61">+61 (AUSTRALIA)</option>
                  <option value="+64">+64 (NEW ZEALAND)</option>
                  <option value="+27">+27 (SOUTH AFRICA)</option>
                  <option value="+977">+977 (NEPAL)</option>
                  <option value="+94">+94 (SRILANKA)</option>
                  <option value="+60">+60 (MALAYSIA)</option>
                  <option value="+65">+65 (SINGAPORE)</option>
                </select>
                {errors.countryCode && (
                  <p className="text-red-800">{errors.countryCode}</p>
                )}

                {/* Phone Number Input */}
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  // onChange={handleChange}
                  onChange={handleMobileInput}
                  maxLength="10"
                  className={`w-full p-1 border border-gray-300 rounded-md ${
                    errors.phoneNumber ? "border-red-500" : ""
                  }`}
                  // placeholder="Enter Phone Number"
                />
                {errors.phoneNumber && (
                  <span className="text-red-800 block h-4">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>
            </div>

            {/* Marital Status */}
            <div>
              <label className="block text-gray-700">Marital Status</label>
              <select
                name="maritalStatus"
                value={formValues.maritalStatus}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded-md"
              >
                <option value="">Select Marital Status</option>
                <option value="Married">Married</option>
                <option value="Single">Single</option>
                <option value="Divorce">Divorce</option>
              </select>
              {errors.maritalStatus && (
                <span className="text-red-800 block h-4">
                  {errors.maritalStatus}
                </span>
              )}
            </div>
            {/* Date of Birth */}
            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                max={new Date().toISOString().split("T")[0]}
                value={formValues.dob}
                onChange={handleChange}
                // onKeyDown={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                  if (e.key !== "Tab") e.preventDefault();
                }}
                className="w-full p-1 border border-gray-300 rounded-md"
              />
              {errors.dob && (
                <span className="text-red-800 block h-4">{errors.dob}</span>
              )}
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-4     gap-6 mb-6">
            {/* Gender */}
            <div>
              <label className="block text-gray-700">Gender</label>
              <select
                name="gender"
                value={formValues.gender}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded-md"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <span className="text-red-800 block h-4">{errors.gender}</span>
              )}
            </div>
            {/* Father Name */}
            <div>
              <label className="block text-gray-700">Father Name</label>
              <input
                type="text"
                name="fatherName"
                value={formValues.fatherName}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded-md"
              />
              {errors.fatherName && (
                <span className="text-red-800 block h-4">
                  {errors.fatherName}
                </span>
              )}
            </div>
            {/* Date of Joining */}
            <div>
              <label className="block text-gray-700">Date of Joining</label>
              <input
                type="date"
                name="doj"
                min={new Date().toISOString().split("T")[0]}
                value={formValues.doj}
                onChange={handleChange}
                // onKeyDown={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                  if (e.key !== "Tab") e.preventDefault();
                }}
                className="w-full p-1 border border-gray-300 rounded-md"
              />
              {errors.doj && (
                <span className="text-red-800 block h-4">
                  {errors.doj}
                </span>
              )}
            </div>
            {/* Blood Group */}
            <div>
              <label className="block text-gray-700">Blood Group</label>

              <select
                name="bloodGroup"
                value={formValues.bloodGroup}
                onChange={handleChange}
                onKeyDown={(e) => e.preventDefault()}
                className="w-full p-1 border border-gray-300 rounded-md"
              >
                <option value="">Select bloodGroup</option>
                <option value="O +ve">O+</option>
                <option value="O -ve">O-</option>
                <option value="A +ve">A+</option>
                <option value="A -ve">A-</option>
                <option value="B +ve">B+</option>
                <option value="B -ve">B-</option>
                <option value="AB +ve">AB+</option>
                <option value="AB -ve">AB-</option>
                {/* <option value="Others">others</option> */}
              </select>
              {errors.bloodGroup && (
                <span className="text-red-800 block h-4">
                  {errors.bloodGroup}
                </span>
              )}
            </div>
          </div>

          {/* <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button> */}
          <div className="  ml-30 flex justify-end ">
            <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-3"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFamilyDetails;

// import React, { useState, useEffect } from "react";
// import { MdCancelPresentation } from "react-icons/md";
// import * as Yup from "yup"; // Import Yup for validation

// // Validation schema using Yup
// const validationSchema = Yup.object({
//   maritalStatus: Yup.string().required("Marital status is required"),
//   prefix: Yup.string().required("Prefix is required"),
//   firstname: Yup.string()
//     .matches(/^[A-Za-z ]*$/, "Only characters are allowed")
//     .min(4, "First name must be at least 4 characters")
//     .max(25, "First name must be at most 25 characters")
//     .required("First name is required"),

// });
// const EditFamilyDetails = ({ member, onSave, onCancel }) => {
//   const [formValues, setFormValues] = useState({
//     prefix: "",
//     firstname: "",
//     middlename: "",
//     lastname: "",
//     phoneNumber: "",
//     maritalStatus: "",
//     dob: "",
//     gender: "",
//     fatherName: "",
//     doj: "",
//     bloodGroup: "",
//   });

//   const [errors, setErrors] = useState({});

//   // Yup schema for validation

//   useEffect(() => {
//     if (member) {
//       setFormValues(member);
//     }
//   }, [member]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const validateForm = async () => {
//     try {
//       await validationSchema.validate(formValues, { abortEarly: false });
//       setErrors({});
//       return true;
//     } catch (err) {
//       const validationErrors = {};
//       err.inner.forEach((error) => {
//         validationErrors[error.path] = error.message;
//       });
//       setErrors(validationErrors);
//       return false;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (await validateForm()) {
//       onSave(formValues);
//       console.log("Form submitted successfully", formValues);
//     } else {
//       console.log("Form submission failed");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
//       <div className="bg-gray-200 p-4 rounded-md shadow-md w-1/2">
//         <div className="bg-orange-500 rounded-md p-3 mb-10 flex items-center justify-between">
//           <h2 className="text-2xl pl-2">Edit Personal Details</h2>
//           <button className="text-black-500 pr-1 hover:text-gray-700" onClick={onCancel}>
//             <MdCancelPresentation size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {/* First Row */}
//           <div className="grid grid-cols-4 gap-6 mb-6">
//             {/* Prefix */}
//             <div>
//               <label className="block text-gray-700">Prefix</label>
//               <select
//                 name="prefix"
//                 value={formValues.prefix}
//                 onChange={handleChange}
//                 className="w-full p-1 border-gray-300 rounded-md"
//               >
//                 <option value="" disabled>Select</option>
//                 <option value="Mr.">Mr.</option>
//                 <option value="Ms.">Ms.</option>
//                 <option value="Mrs.">Mrs.</option>
//               </select>
//               {errors.prefix && <span className="text-red-800">{errors.prefix}</span>}
//             </div>
//             {/* First Name */}
//             <div>
//               <label className="block text-gray-700">First Name</label>
//               <input
//                 type="text"
//                 name="firstname"
//                 value={formValues.firstname}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//               />
//               {errors.firstname && <span className="text-red-800">{errors.firstname}</span>}
//             </div>
//             {/* Middle Name */}
//             <div>
//               <label className="block text-gray-700">Middle Name</label>
//               <input
//                 type="text"
//                 name="middlename"
//                 value={formValues.middlename}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//               />
//               {errors.middlename && <span className="text-red-800">{errors.middlename}</span>}
//             </div>
//             {/* Last Name */}
//             <div>
//               <label className="block text-gray-700">Last Name</label>
//               <input
//                 type="text"
//                 name="lastname"
//                 value={formValues.lastname}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//               />
//               {errors.lastname && <span className="text-red-800">{errors.lastname}</span>}
//             </div>
//           </div>

//           {/* Second Row */}
//           <div className="grid grid-cols-4 gap-4 mb-2">
//             {/* Phone Number */}
//             <div>
//               <label className="block text-gray-700">Phone Number</label>
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 value={formValues.phoneNumber}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//               />
//               {errors.phoneNumber && <span className="text-red-800">{errors.phoneNumber}</span>}
//             </div>
//             {/* Marital Status */}
//             <div>
//               <label className="block text-gray-700">Marital Status</label>
//               <select
//                 name="maritalStatus"
//                 value={formValues.maritalStatus}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select Marital Status</option>
//                 <option value="Married">Married</option>
//                 <option value="Single">Single</option>
//                 <option value="Divorce">Divorce</option>
//               </select>
//               {errors.maritalStatus && <span className="text-red-800">{errors.maritalStatus}</span>}
//             </div>
//             {/* Date of Birth */}
//             <div>
//               <label className="block text-gray-700">Date of Birth</label>
//               <input
//                 type="date"
//                 name="dob"
//                 max={new Date().toISOString().split("T")[0]}
//                 value={formValues.dob}
//                 onChange={handleChange}
//                 onKeyDown={(e) => e.preventDefault()}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//               />
//               {errors.dob && <span className="text-red-800">{errors.dob}</span>}
//             </div>
//             {/* Gender */}
//             <div>
//               <label className="block text-gray-700">Gender</label>
//               <select
//                 name="gender"
//                 value={formValues.gender}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//               >
//                 <option value="" disabled>Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//               {errors.gender && <span className="text-red-800">{errors.gender}</span>}
//             </div>
//           </div>

//           {/* Third Row */}
//           <div className="grid grid-cols-3 gap-4 mb-2">
//             {/* Father's Name */}
//             <div>
//               <label className="block text-gray-700">Father's Name</label>
//               <input
//                 type="text"
//                 name="fatherName"
//                 value={formValues.fatherName}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//               />
//               {errors.fatherName && <span className="text-red-800">{errors.fatherName}</span>}
//             </div>
//             {/* Date of Joining */}
//             <div>
//               <label className="block text-gray-700">Date of Joining</label>
//               <input
//                 type="date"
//                 name="dateOfJoining"
//                 min={new Date().toISOString().split("T")[0]}
//                 value={formValues.dateOfJoining}
//                 onChange={handleChange}
//                 onKeyDown={(e) => e.preventDefault()}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//               />
//               {errors.dateOfJoining && <span className="text-red-800">{errors.dateOfJoining}</span>}
//               {errors.age && <span className="text-red-800">{errors.age}</span>}
//             </div>
//             {/* Blood Group */}
//             <div>
//               <label className="block text-gray-700">Blood Group</label>
//               <input
//                 type="text"
//                 name="bloodGroup"
//                 value={formValues.bloodGroup}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//               />
//               {errors.bloodGroup && <span className="text-red-800">{errors.bloodGroup}</span>}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="mt-4 flex justify-center">
//             <button
//               type="submit"
//               className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 mr-2"
//             >
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={onCancel}
//               className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditFamilyDetails;

// import React, { useState, useEffect } from 'react';

// const EditFamilyDetails = ({ member, onSave, onCancel }) => {
//   const [formValues, setFormValues] = useState({
//     name: '',
//     phoneNumber: '',
//     maritalStatus: '',
//     dob: '',
//     gender: '',
//     fatherName: '',
//     dateOfJoining: '',
//     bloodGroup: '',
//   });

//   useEffect(() => {
//     if (member) {
//       setFormValues(member);
//     }
//   }, [member]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formValues);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-slate-50 p-4 rounded-md shadow-md w-1/2">
//         <h2 className="text-xl mb-5">Edit Personal Details</h2>
//         <form onSubmit={handleSubmit}>
//           {/ First Row /}
//           <div className="grid grid-cols-3 gap-6 mb-6">
//             <div>
//               <label className="block text-gray-700">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formValues.name}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Phone Number</label>
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 value={formValues.phoneNumber}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Marital Status</label>
//               <input
//                 type="text"
//                 name="maritalStatus"
//                 value={formValues.maritalStatus}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//           </div>

//           {/ Second Row /}
//           <div className="grid grid-cols-3 gap-4 mb-2">
//             <div>
//               <label className="block text-gray-700">Date of Birth</label>
//               <input
//                 type="date"
//                 name="dob"
//                 value={formValues.dob}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Gender</label>
//               <select
//                 name="gender"
//                 value={formValues.gender}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//                 required
//               >
//                 <option value="" disabled>Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700">Father's Name</label>
//               <input
//                 type="text"
//                 name="fatherName"
//                 value={formValues.fatherName}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//           </div>

//           {/ Third Row /}
//           <div className="grid grid-cols-2 gap-4 mb-2">
//             <div>
//               <label className="block text-gray-700">Date of Joining</label>
//               <input
//                 type="date"
//                 name="dateOfJoining"
//                 value={formValues.dateOfJoining}
//                 onChange={handleChange}
//                 className="w-full p-1 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Blood Group</label>
//              <select
// name="bloodGroup"
// value={formValues.bloodGroup}
// onChange={handleChange}
// className="w-full p-1 border border-gray-300 rounded-md"
// >
// <option value="">Select bloodGroup</option>
// <option value="Male">O+</option>
// <option value="Female">O-</option>
// <option value="Other">A+</option>
// <option value="Other">A+</option>
// <option value="Other">B+</option>
// <option value="Other">B-</option>
// <option value="Other">AB+</option>
// <option value="Other">AB-</option>
// <option value="Other">others</option>
// </select>
//             </div>
//           </div>

//           <div className="flex justify-end mt-2">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="bg-red-500 text-white p-2 rounded-md mr-2"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white p-2 rounded-md"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditFamilyDetails;
