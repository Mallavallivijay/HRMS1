import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LocationTest  from "../src/components/Location";
import Dashboard1 from './components/Dashboard.js';
import Profile from './components/PersonalInfo.js'
import Education from "../src/components/Education.js";
import Current from "../src/components/CurrentExperience.js"
import FamilyDetails from "../src/components/FamilyDetails.js"
import Experience from "../src/components/Experience"
import Location  from "../src/components/Location";
import Holiday from "../src/components/Holidays.js"
import National from "../src/components/National.js"
import Travel from "../src/components/Travel.js"
// import FamilyDetailsTable from './components/Family';
// import Dashboard from './components/PersonalDetails';
// import validationyup from './components/validationyup';
// import Ex from './components/ex';

function App() {
  return (
    <>
 <Router>
      <Routes>
        <Route path="/" element={<Dashboard1 />} />
        <Route path="/personalDetails" element={<Profile/>} />
        <Route path="/educationDetails" element={<Education/>} />
        <Route path="/current" element={<Current/>} />
        <Route path="/familyDetails" element={<FamilyDetails/>} />
        <Route path="/experience" element={<Experience/>} />       
        <Route path="/location" element={<Location/>} />       
        <Route path="/National" element={<National/>} />       
        <Route path="/Travel" element={<Travel/>} />       
      </Routes>
</Router> 

   {/* <div><Travel/></div> */}
   {/* <div><National/></div> */}
   {/* <div><Holiday/></div> */}
   {/* <div><Profile/></div> */}
   {/* <div><Experience/></div> */}
   {/* <div><Education/></div> */}
   {/* <div><Location/></div> */}
    </>
  )
}

export default App