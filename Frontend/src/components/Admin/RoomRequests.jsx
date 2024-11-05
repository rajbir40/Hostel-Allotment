import React from "react";
import Sidebar from "./Sidebar";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function RoomRequests() {

  const host = "http://localhost:8000";
  const [request,setRequest] = useState([]);
  const navigate = useNavigate();

  const fetchRequest = async () => {
    const response = await fetch(`${host}/roomrequests/fetch`);
    const data = await response.json();
    const pendingRequests = await data.filter(
      (item) => item.status === "Pending"
    )
    setRequest(pendingRequests);
  };

  const handleClick = (id,studentId) => {
    navigate('/adminpage/roomrequests/approval', {state : {id,studentId}}); 
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="dashboard">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S No.</th>
              <th scope="col">Hostel</th>
              <th scope="col">Room No.</th>
              <th scope="col">Room Type</th>
              <th scope="col">Availability</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {request.map((item,index) => (
              <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.hostel}</td>
              <td>{item.roomNumber}</td>
              <td>{item.type}</td>
              <td>{item.isAvailable.toString()}</td>
              <td>{item.status}</td>
              <td>
                <button type="button" className="btn btn-primary origin-center" onClick={() => handleClick(item._id,item.studentId)}>Proceed</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
