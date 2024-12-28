import React, { useEffect } from 'react'
import {io} from "socket.io-client"

export default function Review() {

    const socket = io(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}`);

    useEffect(()=>{
        socket.on("connect",()=>{
            console.log("connected");
        })
        socket.on("welcome",(s)=>{
            console.log(s);
        })
    })

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}
