import React from "react";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";

export default function OutpassRequest() {
  const host = "http://localhost:8000";
  const [outpass, setOutpass] = useState([]);

  const fetchOutpass = async () => {
    const response = await fetch(`${host}/pending/fetchoutpass`);
    const data = await response.json();
    const pendingOutpasses = await data.filter(
      (item) => item.status === "Pending"
    );
    setOutpass(pendingOutpasses);
  };

  useEffect(() => {
    fetchOutpass();
  }, []);

  const handleApprove = async (roll_no) => {
    const response = await fetch(`${host}/update/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Approved",
        roll_number: roll_no,
      }),
    });

    const outpass = await response.json();
    if (outpass.status === "Approved") {
      fetchOutpass();
    }
  };

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="dashboard">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S No.</th>
              <th scope="col">Name</th>
              <th scope="col">Roll No.</th>
              <th scope="col">Where</th>
              <th scope="col">Reasponsibility</th>
              <th scope="col">Reason</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {outpass.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.roll_no}</td>
                <td>{item.where}</td>
                <td>{item.responsibility}</td>
                <td>{item.reason}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleApprove(item.roll_no)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
