import React from "react";
import './Home.css';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar></Navbar>
            <div className="header">
                <div className= "box">
                <div className="inner-header flex">
                    <h1 style={{ fontSize: '170%' }}>Simplifying hostel life with quick allotments and instant outpass approvals—right at your fingertips!</h1>
                    <div className="button-box-home">
                        <button className="btn-home mr-4" onClick={() => navigate('/outpass')}>Generate Outpass</button>
                        <button className="btn-home ml-2" onClick={() => navigate('/selection')}>Book Room</button>
                    </div>
                </div>
                <div className="sideimg"></div>

                </div>
                
                <div>
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                            <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                            <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                            <use href="#gentle-wave" x="48" y="7" fill="#fff" />
                        </g>
                    </svg>
                </div>
            </div>
            
            <div className="content flex">
            </div>
        </div>
    );
}

export default Home;
