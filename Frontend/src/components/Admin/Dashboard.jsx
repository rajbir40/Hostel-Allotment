import React from 'react'
import Sidebar from './Sidebar'
import { useState, useEffect } from 'react';

export default function Dashboard() {

    const host = "http://localhost:8000";
    const [usercount,setUsercount] = useState(0);
    const [roomcount,setRoomcount] = useState(0);
    const [outpasscount,setOutpasscount] = useState(0);

    const fetchUsers = async () => {

      const response = await fetch(`${host}/getnumber/students`);
      const data = await response.json();
      setUsercount(data.number);

      const roomrequests = await fetch(`${host}/roomrequests/fetch`);
      const roomdata = await roomrequests.json();
      setRoomcount(roomdata.length);

      const outpasses = await fetch(`${host}/pending/fetchoutpass`);
      const outpassdata = await outpasses.json();
      setOutpasscount(outpassdata.length);

    };

    useEffect(() => {
      fetchUsers();
    }, []);

  return (
    <div>
        <Sidebar></Sidebar>
      <section className="dashboard">
        <div className="top">
            <i className="uil uil-bars sidebar-toggle"></i>
            <div className="search-box">
                <i className="uil uil-search"></i>
                <input type="text" placeholder="Search here..."/>
            </div>
            </div>
        <div className="dash-content">
            <div className="overview">
                <div className="title">
                    <i className="uil uil-tachometer-fast-alt"></i>
                    <span className="text">Dashboard</span>
                </div>
                <div className="boxes">
                    <div className="box box1">
                        <i className="uil uil-thumbs-up"></i>
                        <span className="text">Total Students</span>
                        <span className="number">{usercount}</span>
                    </div>
                    <div className="box box2">
                        <i className="uil uil-comments"></i>
                        <span className="text">Outpass Requests</span>
                        <span className="number">{outpasscount}</span>
                    </div>
                    <div className="box box3">
                        <i className="uil uil-share"></i>
                        <span className="text">Room Requests</span>
                        <span className="number">{roomcount}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}
