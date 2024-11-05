import React, { useEffect } from 'react'
import {io} from "socket.io-client"

export default function Review() {

    const socket = io("http://localhost:8000");

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
