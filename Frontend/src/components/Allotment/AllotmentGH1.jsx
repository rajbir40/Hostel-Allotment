import React,{useState} from 'react';
import Navbar from '../Navbar/Navbar';
import './Allotment.css'
export default function AllotmentGH1() {
  const [detail, setDetail] = useState('ground');
  const setDetails=(floor)=>{
      setDetail(floor);
  }
  return (
    <div>
      <Navbar/>
      <div className="flex flex-row mt-5">
        <button type="button" class="grid-item text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setDetails('ground')}>Ground Floor</button>
        <button type="button" class="grid-item text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setDetails('first')}>1st Floor</button>
      </div>
      {detail==='ground'?(
        <div className='ml-[25%] mr-[25%] mt-[7%] '>
        <div className="flex justify-center items-center">
          <div className="w-full p-12 ml=[20%]" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)', display: '-ms-flexbox', justifyContent: 'center' }}>
            <div className="flex flex-col justify-center" >
              <div className="flex justify-evenly">
                <div className="flex justify-center gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">105</button>
                </div>
                <div className="flex justify-center gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                </div>
  
              </div>
            <div className="flex justify-evenly mt-5">
              <div className="flex flex-col w-full gap-y-2">
              <div className="flex justify-center gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                </div>
                <div className="flex justify-center gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                </div>
                <div className="flex justify-center mt-5 gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                </div>
              </div>
              <div className="flex flex-col w-full gap-y-2">
              <div className="flex justify-center gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                </div>
                <div className="flex justify-center gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                </div>
                <div className="flex justify-center mt-5 gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                </div>
              </div>
              </div>
            </div>
  
            
          </div>
        </div>
        </div>
      ):(
      
        <div className='ml-[25%] mr-[25%] mt-[7%] '>
        <div className="flex justify-center items-center">
          <div className="w-full p-12 ml=[20%]" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)', display: '-ms-flexbox', justifyContent: 'center' }}>
            <div className="flex flex-col justify-center" >
              <div className="flex justify-evenly">
                <div className="flex justify-center gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">105</button>
                </div>
                <div className="flex justify-center gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                </div>
  
              </div>
            <div className="flex justify-evenly mt-5">
              <div className="flex flex-col w-full gap-y-2">
              <div className="flex justify-center gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                </div>
                <div className="flex justify-center gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                </div>
                <div className="flex justify-center mt-5 gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                </div>
              </div>
              <div className="flex flex-col w-full gap-y-2">
              <div className="flex justify-center gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                </div>
                <div className="flex justify-center gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                </div>
                <div className="flex justify-center mt-5 gap-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
                </div>
              </div>
              </div>
            </div>
  
            
          </div>
          //the one to use
          <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 h-[30px] w-[50px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">104</button>
        </div>
        </div>
      )
      }
      
    </div>
  );
};

