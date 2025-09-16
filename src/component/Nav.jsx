import React, { useContext, useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineWhatshot } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { MdOutlinePool } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaTreeCity } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dataContext } from '../context/AuthContext';
import { userDataContext } from "../context/UserContext"
import { listingData } from '../context/ListingContext';


const Nav = () => {
  const [show, setShow] = useState()
  const [cate, setCate] = useState()
  const navigate = useNavigate()
  let { serverUrl } = useContext(dataContext)
  const { userData, setUserdata } = useContext(userDataContext)
  const { addnewlistingData, setNewAddListingData, addlistingData, setAddListingData ,handelSearch,
searchData,handelViewCard} = useContext(listingData)
let [input, setInput]= useState("")

  const handelLogout = async () => {
    try {
      let result = await axios.post(serverUrl + "/api/user/logout", {
      }, { withCredentials: true })
      setUserdata(null)
    } catch (error) {
      console.log(error);
    }
  }

  const firstName = userData?.userName?.charAt(0)?.toUpperCase() || "?"

  const colors = [
    "bg-gray-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-pink-500",
  ]

  const value = firstName?.charCodeAt(0)

  const bgColor = colors[value % colors.length]


  const handleCategory = (category) => {
    setCate(category)
    if(category=== "trending"){
      setNewAddListingData(addlistingData)
    } else{
setNewAddListingData(addlistingData.filter((list) => list.category === category))
    }
    
  }

  const handelClick = (id   )=>{ 
    if(userData){
        handelViewCard(id)
    }else{
        navigate("/login")
    }
}

useEffect(()=>{
 handelSearch(input)
},[input])


  return (
    <div className='fixed top-0 bg-white z-[20]'>
      <div className='w-[100vw] min-h-[80px] border-b-[1px] border-[#cdcdcd] px-[20px] md:px- [40px]
        flex items-center justify-between '>
        <div><img src={logo} className='w-[130px]' /></div>
        <div className='w-[35%] relative  hidden md:block'>
          <input type="text" className='w-[100%] px-[30px] py-[10px] border-[2px] border-[#c5c5c5]
                    outline-none overflow-auto rounded-[30px] text-[17px]' placeholder='Any Where | Any Location | Any city' value={input} onChange={(e)=> setInput(e.target.value)}/>
          <button className=' p-[10px] absolute rounded-[50px] bg-[red] text-white right-[3%] top-[4.5px] '><IoSearch className='text-xl font-semibold' /></button>
        </div>
        <div className='flex items-center justify-center gap-[10px] relative'>
          <span className='text-[18px] cursor-pointer rounded-[50px] hover:bg-[#dedede] px-[8px] py-[5px] hidden md:block' onClick={() => navigate("/listing")}>List your home</span>
          <button className='px-[20px] py-[10px] cursor-pointer flex items-center justify-center gap-[5px] border-[1px] border-[#a8a8a8]
                    rounded-full hover:shadow-lg' onClick={() => setShow((pre) => !pre)}>
            <span> <GiHamburgerMenu className='size-[20px]' /> </span>
            {userData == null && <span>  <CgProfile className='size-[23px]' /></span>}
            {userData != null && <span className={`size-[30px] font-semibold ${bgColor} text-white rounded-full flex items-center justify-center`} >{firstName}</span>}
          </button>
          {show && <div className='w-[220px] h-[250px] absolute bg-slate-50 right-[3%] md:right-[10%] top-[110%] border-[1px] border-[#a1a1a1]
                        rounded-lg z-10'>

            <ul className='w-[100%] h-[100%] text-[17px] flex items-start justify-around flex-col py-[0px]'>
              {!userData && <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick={() => {
                navigate("/login");
                setShow(false)
              }

              }>Login</li>}

              {userData && <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick={() => {
                handelLogout();
                setShow(false)
              }}>Logout</li>}

              <div className='w-[100%] h-[1px] bg-[#c1c0c0]'></div>
              <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick={() => { navigate("/listing"); setShow(false) }}>List your home</li>
              <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick={() => { navigate("/mylisting"); setShow(false) }}>My Listing</li>
              <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer'  onClick={() => { navigate("/mybooking"); setShow(false) }}>My Booking</li>
            </ul>

          </div>}
        </div>
      </div>

 {searchData?.length > 0 && <div className='w-[100vw] h-[450px] flex flex-col gap-[20px] absolute top-[50%] overflow-auto
 left-0 justify-start items-center'>
<div className='max-w-[700px] w-[100vw] h-[300px] overflow-hidden flex flex-col bg-[#fefdfd] p-[20px] rounded-lg
border-[1px] border-[#a2a1a1] cursor-pointer'>
{
searchData.map((search)=> (
<div className='border-b border-black p-[10px]'onClick={()=> handelClick(search._id)}>
{search.title} in {search.landMark}, {search.city}
</div>
))
}
</div>
</div>}




      <div className='w-[100%]  md:hidden flex items-center justify-center h-[60px]'>
        <div className='w-[35%] relative  '>
          <input type="text" className='w-[100%] px-[30px] py-[10px] border-[2px] border-[#c5c5c5]
                    outline-none overflow-auto rounded-[30px] text-[17px]' placeholder='Any Where | Any Location | Any city'  value={input} onChange={(e)=> setInput(e.target.value)}/>
          <button className=' p-[10px] absolute rounded-[50px] bg-[red] text-white right-[3%] top-[4.5px] '><IoSearch className='text-xl font-semibold' /></button>
        </div>
      </div>

      <div className='w-[100vw] h-[85px] bg-white flex items-center justify-start gap-[40px] cursor-pointer overflow-auto md:justify-center px-[15px]'>
        <div className='flex items-center justify-center flex-col hover:border-b-[1px] border-[#787878] text-[13px]' 
        onClick={()=> {handleCategory("trending");
          setCate("")}
        }>
          <MdOutlineWhatshot className='size-[30px] text-black ' />
          <h3>Trending</h3>
        </div>

        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#787878] text-[13px] ${cate == "rooms" ?
          "border-b-[1px] border-[#a6a5a5]" : ""
          }`} onClick={() => handleCategory("rooms")}>
          <MdBedroomParent className='size-[30px] text-black ' />
          <h3>Rooms</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#787878] text-[13px] ${cate == "villa" ?
          "border-b-[1px] border-[#a6a5a5]" : ""
          }`} onClick={() => handleCategory("villa")}>
          <GiFamilyHouse className='size-[30px] text-black ' />
          <h3>Villa</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#787878] text-[13px] ${cate == "flat" ?
          "border-b-[1px] border-[#a6a5a5]" : ""
          }`} onClick={() => handleCategory("flat")}>

          < BiBuildingHouse className='size-[30px] text-black ' />
          <h3>Flat</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#787878] text-[13px] ${cate == "poolhouse" ?
          "border-b-[1px] border-[#a6a5a5]" : ""
          }`} onClick={() => handleCategory("poolhouse")}>
          <MdOutlinePool className='size-[30px] text-black ' />
          <h3>Pool House</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#787878] text-[13px] ${cate == "pg" ?
          "border-b-[1px] border-[#a6a5a5]" : ""
          }`} onClick={() => handleCategory("pg")}>
          <IoBedOutline className='size-[30px] text-black ' />
          <h3>PG</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#787878] text-[13px] ${cate == "cabins" ?
          "border-b-[1px] border-[#a6a5a5]" : ""
          }`} onClick={() => handleCategory("cabins")}>
          <GiWoodCabin className='size-[30px] text-black ' />
          <h3>Cabins</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#787878] text-[13px] ${cate == "shops" ?
          "border-b-[1px] border-[#a6a5a5]" : ""
          }`} onClick={() => handleCategory("shops")}>
          <SiHomeassistantcommunitystore className='size-[30px] text-black ' />
          <h3>Shops</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#787878] text-[13px] ${cate == "farmhouse" ?
          "border-b-[1px] border-[#a6a5a5]" : ""
          }`} onClick={() => handleCategory("farmhouse")}>
          <FaTreeCity className='size-[30px] text-black ' />
          <h3>Farm House</h3>
        </div>
      </div>
    </div>
  )
}

export default Nav