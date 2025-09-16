import React, { createContext, useContext, useState } from 'react'
import { dataContext } from './AuthContext'
import axios from 'axios'
import { listingData } from './ListingContext'
import { userDataContext } from './UserContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const bookingDataContext = createContext()

const BookingContext = ({children}) => {
let [checkIn, setCheckIn]=useState("")
let [checkOut, setCheckOut]=useState("")
let [total, setTotal]=useState(0)
let [nignt, setNight]=useState(0)
const {serverUrl} = useContext(dataContext)
const {getListing } = useContext(listingData)
const {getCurrentUser } = useContext(userDataContext)
const [bookingData, setBookingData]= useState([])
const [booking,setBooking]= useState(false)
const navigate = useNavigate()

const handelBooking = async (id)=>{
  setBooking(true)
  try {
    let result = await axios.post(serverUrl + `/api/booking/create/${id}`, {
      checkIn,
      checkOut,
      totalRent: total 
    },{withCredentials:true})
    await getCurrentUser()
    await getListing()
    setBookingData(result.data)
    console.log(result.data);
     toast.success("Booking Successfully!")
     setBooking(false)
     navigate("/booked")
    
  } catch (error) {
    console.log(error);
     setBookingData(null)
     setBooking(false)
        toast.error(error.response.data.message)
  }
}

const cancelBooking = async (id) =>{
    try {
    let result = await axios.delete(serverUrl + `/api/booking/cancel/${id}`
    ,{withCredentials:true})
    await getCurrentUser()
    await getListing()
    setBookingData(result.data)
    console.log(result.data);
     toast.success("Cancel bookig Successfully!")
  } catch (error) {
    console.log(error);
     setBookingData(null)
    toast.error(error.response.data.message)
  }
}

const value = {
checkIn,
setCheckIn,
checkOut,
setCheckOut,
total,
setTotal,
nignt,
setNight,
bookingData, 
setBookingData,
handelBooking,
cancelBooking,
booking,
setBooking,
}

  return (
    <div>
<bookingDataContext.Provider value={value}>
    {children}
</bookingDataContext.Provider>
    </div>
  )
}

export default BookingContext