import React, { useState } from 'react';
import './Selection.css'; // Make sure to import your CSS
import Navbar from '../Navbar/Navbar';

export default function HostelSelection() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <Navbar/>
          <div className=" flex h-screen">

      <div className="hello w-1/2 h-screen" >
        <div className="sideimg-2"></div>

      </div>


      <div className="w-1/2 flex flex-col justify-center items-center p-8 " >
        <h1 className="text-4xl font-bold mb-7 text-center animated-heading Hostel-choose">
          Choose your hostel
          <div className="aurora">
            {/* <div className="aurora__item"></div>
            <div className="aurora__item"></div>
            <div className="aurora__item"></div>
            <div className="aurora__item"></div> */}
          </div>
        </h1>
       
        <button
          onClick={toggleDropdown}
          className="text-white bg-[#247cbc] hover:bg-[#1c88bc] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[30%]"
          type="button"
        >
         
          Click Here
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
       

        <div
          className={`z-10 ${isDropdownOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mt-2`} 
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">BH-1</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">BH-2</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">BH-3</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">BH-4</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">BH-5</a>
            </li>
            <li>
              <a href="/alloGh1" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">GH-1</a>
            </li>
            <li>
              <a href="/allotmentgh2" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">GH-2</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">GH-3</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}
