import React, { useState, useEffect} from "react";
import UserContext from "./UserContext";
import axios from "axios";
const UserContextProvider = ({children})=>{
      const [user,setUser]= useState(null);
      const [loading, setLoading] = useState(null);
      const [room,setRoom]= useState(null);
      useEffect(() => {
            const fetchUser = async () => {
              try {
                const userId = "123456";
                const response = await axios.get(`/api/user/${userId}`);
                setUser(response.data);
                setLoading(false);
              } catch (error) {
                console.error("Error fetching user:", error);
                setLoading(false);
              }
            };
            fetchUser();
          }, []);


      return(
            <UserContext.Provider value={{user,setUser}}>
            {children}
            </UserContext.Provider>
      )
}

export default UserContextProvider