import React, { useContext } from 'react'
import Signup from './pages/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Listing from './pages/Listing'
import Listing2 from './pages/Listing2'
import Listing3 from './pages/Listing3'
import { userDataContext } from './context/UserContext'
import MyListing from './pages/MyListing'
import ViewCard from './pages/ViewCard'
import MyBooking from './pages/MyBooking'
import Booked from './pages/Booked'
import {ToastContainer, toast} from "react-toastify"

const App = () => {
const {userData} = useContext(userDataContext)
  return (
    <div>
      <ToastContainer/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/listing'
   element={userData ? <Listing/> : <Navigate to={"/"}/> }/>
  <Route path='/listing2'
   element={userData  ? <Listing2/> : <Navigate to={"/"}/> }/>
  <Route path='/listing3'
   element={userData  ? <Listing3/> : <Navigate to={"/"}/> }/>
    <Route path='/mylisting'
   element={userData  ? <MyListing/> : <Navigate to={"/"}/> }/>
       <Route path='/viewcard'
   element={userData  ? <ViewCard/> : <Navigate to={"/"}/> }/>
          <Route path='/mybooking'
   element={userData  ? <MyBooking/> : <Navigate to={"/"}/> }/>
          <Route path='/booked'
   element={userData  ? <Booked/> : <Navigate to={"/"}/> }/>


</Routes>

    </div>
  )
}

export default App