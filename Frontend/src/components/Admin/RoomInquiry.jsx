import React from "react";
import Sidebar from "./Sidebar";
import { useState, useEffect, useRef } from "react";

export default function RoomInquiry() {
  const host = "http://localhost:8000";
  const [hostels, setHostels] = useState([]);

  const fetchHostels = async () => {
    try {
      const response = await fetch(`${host}/gethostel/hostel`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const hostel = await response.json();
      setHostels(hostel);
    } catch (error) {
      console.error("Error fetching hostels:", error);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  const handleOnClick = () => {
    ref.current.click();
  };

  const ref = useRef(null);

  return (
    <div>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Hostel Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Total Rooms</div>
                    Content for list item
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Available</div>
                    Content for list item
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Booked</div>
                    Content for list item
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Single Rooms</div>
                    Content for list item
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Double Rooms</div>
                    Content for list item
                  </div>
                </li>
              </ol>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <Sidebar></Sidebar>
      <div className="dashboard">
        <div className="hostel-box">
          <div className="boys-hostel">
            <div className="card w-25 mb-3">
              <div className="card-body">
                <h5 className="card-title">BH - 1</h5>
                <a href="#" className="btn btn-primary" onClick={handleOnClick}>
                  Hostel Details
                </a>
              </div>
            </div>

            <div className="card w-25 mb-3">
              <div className="card-body">
                <h5 className="card-title">BH - 2</h5>
                <a href="#" className="btn btn-primary" onClick={handleOnClick}>
                  Hostel Details
                </a>
              </div>
            </div>

            <div className="card w-25 mb-3">
              <div className="card-body">
                <h5 className="card-title">BH - 3</h5>
                <a href="#" className="btn btn-primary" onClick={handleOnClick}>
                  Hostel Details
                </a>
              </div>
            </div>

            <div className="card w-25 mb-3">
              <div className="card-body">
                <h5 className="card-title">BH - 4</h5>
                <a href="#" className="btn btn-primary" onClick={handleOnClick}>
                  Hostel Details
                </a>
              </div>
            </div>

            <div className="card w-25">
              <div className="card-body">
                <h5 className="card-title">BH - 5</h5>
                <a href="#" className="btn btn-primary" onClick={handleOnClick}>
                  Hostel Details
                </a>
              </div>
            </div>
          </div>

          <div className="girls-hostel">
            <div className="card w-25 mb-3">
              <div className="card-body">
                <h5 className="card-title">GH - 1</h5>
                <a href="#" className="btn btn-primary" onClick={handleOnClick}>
                  Hostel Details
                </a>
              </div>
            </div>

            <div className="card w-25 mb-3">
              <div className="card-body">
                <h5 className="card-title">GH - 2</h5>
                <a href="#" className="btn btn-primary" onClick={handleOnClick}>
                  Hostel Details
                </a>
              </div>
            </div>

            <div className="card w-25 mb-3">
              <div className="card-body">
                <h5 className="card-title">GH - 3</h5>
                <a href="#" className="btn btn-primary" onClick={handleOnClick}>
                  Hostel Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
