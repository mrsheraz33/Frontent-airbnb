import React, { useContext } from 'react'
import {useNavigate} from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6";
import { userDataContext } from '../context/UserContext';
import Card from '../component/Card';

function MyListing() {
let {userData, setUserdata} = useContext(userDataContext)
const navigate = useNavigate()

  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative px-[20px]'>
 <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-full 
        flex items-center justify-center text-2xl' onClick={()=> navigate("/")}>
          <FaArrowLeftLong color='white' />
        </div>

<div className='w-[60%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center text-[30px]
rounded-md text-[#613b3b] font-semibold mt-[50px] md:w-[600px] text-nowrap '  >
My Listing
</div>

<div className='w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]' >
{userData.listing.map((list)=> (
  <Card key={list._id } title={list.title} landMark={list.landMark} city={list.city} image1={list.image1}
  image2={list.image2} image3={list.image3} rent={list.rent} id={list._id} isBooked={list.isBooked} host={list.host}  ratings={list.ratings}/>
))} 
</div>

    </div>
  )
}

export default MyListing