import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constant";

function Login() {
const [emailId, setemailId]=useState("guptaomg23@gmail.com")
const [password, setpassword]=useState("Om@12345")
const dispatch=useDispatch();
const navigate=useNavigate();
const handellogin= async ()=>{
    try{
    const res= await axios.post(BASE_URL+"/login",{
    emailId,password
    },{withCredentials:true}    
    );
     console.log(res.data)
     dispatch(addUser(res.data))
     return navigate("/feed")

    }catch(err){
        console.error(err)
    }
}
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-sm bg-black p-6 rounded-xl shadow-md">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={emailId}
          className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          onChange={(e)=>setemailId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full mb-6 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          onChange={(e)=>setpassword(e.target.value)}
        />

        <button className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 transition" 
        onClick={handellogin}>
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-500">
          Don’t have an account?{" "}
          <span className="text-stone-50 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;