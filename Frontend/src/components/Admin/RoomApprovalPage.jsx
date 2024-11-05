import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

export default function RoomApprovalPage() {
    const location = useLocation();
    const { id, studentId } = location.state || {};
    const host = "http://localhost:8000";

    const [details, setDetails] = useState(null);
    const [studentdata, setStudentData] = useState(null);

    const fetchDetails = async () => {
        if (!id || !studentId) return;

        try {
            const response = await fetch(`${host}/roomrequests/requestdetails/${id}`);
            if (!response.ok) throw new Error("Failed to fetch details");

            const data = await response.json();
            setDetails(data);
        } catch (error) {
            console.error("Error fetching details:", error);
        }

        try {
            const response = await fetch(`${host}/getuser/student/${studentId}`);
            if (!response.ok) throw new Error("Failed to fetch student details");

            const studentData = await response.json();
            setStudentData(studentData);
        } catch (error) {
            console.error("Error fetching student details:", error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id, studentId]);

    const handleApprove = async () => {
        try {
            const response = await fetch(`${host}/roomrequests/update/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ update: "Approved" }),
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Error approving request:", error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await fetch(`${host}/roomrequests/update/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ update: "Rejected" }),
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Error rejecting request:", error);
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="dashboard">
                <div className="student-details my-4">
                    <div className="heading">Room Details</div>
                    <ol className="list-group list-group-numbered">
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Hostel</div>
                                {details?.hostel || "Loading..."}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Room Number</div>
                                {details?.roomNumber || "Loading..."}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Room Type</div>
                                {details?.type || "Loading..."}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Availability</div>
                                {details?.isAvailable?.toString() || "Loading..."}
                            </div>
                        </li>
                    </ol>
                </div>

                <div className="room-details my-4">
                    <div className="heading">Student Details</div>
                    <ol className="list-group list-group-numbered">
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Name</div>
                                {studentdata?.name || "Loading..."}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Roll Number</div>
                                {studentdata?.rollNumber || "Loading..."}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Email</div>
                                {studentdata?.email || "Loading..."}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Address</div>
                                {studentdata?.address || "Loading..."}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Contact Details</div>
                                {studentdata?.phoneNumber || "Loading..."}
                            </div>
                        </li>
                    </ol>
                </div>

                <div className="buttons">
                    <button className="btn btn-primary" onClick={handleApprove}>Approve</button>
                    <button className="btn btn-danger mx-2" onClick={handleReject}>Reject</button>
                </div>
            </div>
        </div>
    );
}
