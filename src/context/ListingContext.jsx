import React, { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'
import { dataContext } from './AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'



export const listingData = createContext()

const ListingContext = ({children}) => {
const navigate = useNavigate()
const [adding , setAdding] = useState(false)
const [updating , setUpdating] = useState(false)
const [deleting , setDeleting] = useState(false)
const [title, setTitle] = useState("")
const [frontentImage1, setFrontentImage1] = useState("")
const [frontentImage2, setFrontentImage2] = useState("")
const [frontentImage3, setFrontentImage3] = useState("")
const [backendImage1, setBackendImage1] = useState("")
const [backendImage2, setBackendImage2] = useState("")
const [backendImage3, setBackendImage3] = useState("")
const [rent, setRent] = useState("")
const [city, setCity] = useState("")
const [landMark, setLandMark] = useState("")
const [category , setCategory] = useState("")
const [description , setDescription] = useState("")
const [addlistingData,setAddListingData] = useState([])
const [addnewlistingData,setNewAddListingData] = useState([])
const [cardDetails, setCardDetails]= useState(null)
const [searchData, setSearcData]= useState([])

const {serverUrl} = useContext(dataContext)

const handelListing = async (e)=>{
   setAdding(true)
  try {
    let formdata = new FormData()
    formdata.append("title",title)
     formdata.append("image1",backendImage1)
    formdata.append("image2",backendImage2)
    formdata.append("image3",backendImage3)
    formdata.append("description",description)
    formdata.append("rent",rent)
    formdata.append("city",city)
    formdata.append("landMark",landMark)
    formdata.append("category",category)

    let result = await axios.post(serverUrl + "/api/listing/add" ,formdata ,{withCredentials:true})
    console.log(result);
    
    setAdding(false)
    navigate("/")
    toast.success("AddListing Successfully!")
    setTitle(""),
    setDescription(""),
    setFrontentImage1(null),
    setFrontentImage2(null),
    setFrontentImage3(null),
    setBackendImage1(null),
    setBackendImage2(null),
    setBackendImage3(null),
   setRent(""),
   setCity(""),
   setLandMark(""),
   setCategory("")
  


  } catch (error) {
    console.log(error);
     setAdding(false)
      toast.error(error.response.data.message)
  }
}

const handelViewCard = async (id)=>{
  try {
    let result = await axios.get(serverUrl + `/api/listing/findlistingbyid/${id}`,{withCredentials:true})
    console.log(result.data)
    setCardDetails(result.data)
    navigate("/viewcard")
  } catch (error) {
    console.log(error)
  }
}

const getListing = async ()=>{
  try {
    let result = await axios.get(serverUrl + "/api/listing/get", {withCredentials:true})
setAddListingData(result.data)
setNewAddListingData(result.data)
  } catch (error) {
    console.log(error);
    
  }
}

const handelSearch = async (data)=>{
  try {
    let result = await axios.get(serverUrl + `/api/listing/search?query=${data}`)
    setSearcData(result.data)
  } catch (error) {
      setSearcData(null)
      console.log(error);
      
  }
}

useEffect(()=>{
getListing()
},[adding,updating,deleting])

let value = {
title,
setTitle,
description,
setDescription,
frontentImage1,
setFrontentImage1,
frontentImage2,
setFrontentImage2,
frontentImage3,
setFrontentImage3,
backendImage1,
setBackendImage1,
backendImage2,
setBackendImage2,
backendImage3,
setBackendImage3,
rent,
setRent,
landMark,
setLandMark,
city,
setCity,
category,
setCategory,
 handelListing,
 adding,
 setAdding,
 addlistingData,
 setAddListingData,
getListing,
addnewlistingData,
setNewAddListingData,
handelViewCard,
cardDetails,
setCardDetails,
updating , 
setUpdating,
deleting , 
setDeleting,
handelSearch,
searchData, 
setSearcData
}

  return (
    
<listingData.Provider value={value}>
  {children}
</listingData.Provider>
   
  )
}

export default ListingContext