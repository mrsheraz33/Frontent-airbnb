import React, { useContext, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import { dataContext } from '../context/AuthContext';
import {userDataContext} from "../context/UserContext"
import { toast } from 'react-toastify';

const Login = () => {
  const [show, setShow] =useState(false)
  const navigate = useNavigate()
      const {serverUrl} = useContext(dataContext)
      const {userData, setUserdata} =  useContext(userDataContext)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handelLogin = async (e)=>{
      try {
        e.preventDefault()
        let result = await axios.post(serverUrl + "/api/user/login" ,{
          email,
          password
        },{withCredentials:true})
        console.log(result.data);
        setUserdata(result.data)
        navigate("/")
             toast.success("Login Successfully!")
              
      } catch (error) {
        console.log("Error" , error.message);
         toast.error(error.response.data.message)
      }
    }
 
  return (
     <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>
              <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-full 
              flex items-center justify-center text-2xl' onClick={()=> navigate("/")}>
                <FaArrowLeftLong color='white' />
              </div>
         <form action="" className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]' onSubmit={handelLogin}>
             <h1 className='text-[30px] text-[black]'>Wellcome to Airbnb</h1>
             <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                 <label htmlFor="mail" className='text-[20px]'>Email</label>
                 <input type="email" id='mail' className='w-[90%] h-[40px] border-[2px] border-[#666666] rounded-lg text-[18px] px-[20px]' placeholder='Enter Email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
             </div>
                <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] relative'>
 
                 <label htmlFor="pass" className='text-[20px]'>Password</label>
                 <input type={show ? "text" : "password"} id='pass'  className='w-[90%] h-[40px] border-[2px]  border-[#666666] rounded-lg text-[18px] px-[20px]' placeholder='Enter password'  value={password} onChange={(e)=> setPassword(e.target.value)}/>
               { !show && <FaEye className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer' onClick={()=> setShow(pre => !pre)}/> }
            {show &&   <IoMdEyeOff className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer' onClick={()=> setShow(pre => !pre)}/>}
             </div>
             <button className='px-[50px] py-[10px] bg-red-500 text-white text-[18px] md:px-[100px] rounded-xl mb-[10px]'>Login</button>
                       <p className='text-black '>You want to create a new account ? <span className='text-[#ff2b2b] cursor-pointer hover:opacity-85'  onClick={()=> navigate("/signup")}>Signup</span></p>
         </form>
     </div>
  )
}

export default Login