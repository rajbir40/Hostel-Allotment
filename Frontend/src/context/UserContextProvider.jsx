import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children})=>{
      const [user,setUser]= useState(null);
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