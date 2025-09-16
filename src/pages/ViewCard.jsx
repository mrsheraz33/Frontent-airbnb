import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingData } from '../context/ListingContext';
import { userDataContext } from '../context/UserContext';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { dataContext } from '../context/AuthContext';
import {FaStar} from "react-icons/fa";
import { bookingDataContext } from '../context/BookingContext';
import { toast } from 'react-toastify';

const ViewCard = () => {
    let { cardDetails, setCardDetails, deleting, setDeleting } = useContext(listingData)
    const { userData } = useContext(userDataContext)
    const [updatepopup, setUpdatepopup] = useState(false)
    const [bookingpopup, setBookingpopup] = useState(false)
    let { serverUrl } = useContext(dataContext)
    const navigate = useNavigate()
    const [title, setTitle] = useState(cardDetails.title)
    const [backendImage1, setBackendImage1] = useState("")
    const [backendImage2, setBackendImage2] = useState("")
    const [backendImage3, setBackendImage3] = useState("")
    const [rent, setRent] = useState(cardDetails.rent)
    const [city, setCity] = useState(cardDetails.city)
    const [landMark, setLandMark] = useState(cardDetails.landMark)
    const [description, setDescription] = useState(cardDetails.description)
    let { updating, setUpdating } = useContext(listingData)
    let [minDate, setMinDate]= useState("")
    let {
checkIn,
setCheckIn,
checkOut,
setCheckOut,
total,
setTotal,
nignt,
setNight,
handelBooking,
booking,
setBooking
}= useContext(bookingDataContext)


 useEffect(()=>{
if(checkIn && checkOut){
    let inDate = new Date(checkIn)
    let outDate = new Date(checkOut)
    let n =( outDate - inDate) / (24*60*60*1000)
    setNight(n)

    let airBnbCharge = (cardDetails.rent * (7/100))
    let tax = (cardDetails.rent * (7/100))

    if(n>0) {
        setTotal((cardDetails.rent * n) + airBnbCharge + tax)
    }else{
        setTotal(0)
    }
}
 },[checkIn,checkOut,cardDetails,rent,total])


    const handelUpdatelisting = async () => {
        setUpdating(true)
        try {
            let formdata = new FormData()
            formdata.append("title", title)
            if (backendImage1) { formdata.append("image1", backendImage1) }
            if (backendImage2) { formdata.append("image2", backendImage2) }
            if (backendImage3) { formdata.append("image3", backendImage3) }
            formdata.append("description", description)
            formdata.append("rent", rent)
            formdata.append("city", city)
            formdata.append("landMark", landMark)


            let result = await axios.post(serverUrl + `/api/listing/update/${cardDetails._id}`, formdata, { withCredentials: true })
            console.log(result);
            setUpdating(false)
 toast.success("Update listing Successfully!")
            navigate("/")
            setTitle(""),
                setDescription(""),
                setBackendImage1(null),
                setBackendImage2(null),
                setBackendImage3(null),
                setRent(""),
                setCity(""),
                setLandMark("")

        } catch (error) {
            console.log(error);
            setUpdating(false)
             toast.error(error.response.data.message)

        }
    }

    const handeldeletelisting = async () => {
        setDeleting(true)
        try {
            let result = await axios.delete(serverUrl + `/api/listing/delete/${cardDetails._id}`, { withCredentials: true })
            console.log(result.data);
             toast.success("Delete listing Successfully!")
            navigate("/ ")
            setDeleting(false)
        } catch (error) {
            console.log(error);
            setDeleting(false)
        toast.error(error.response.data.message)

        }
    }


    const handelImg1 = (e) => {
        let file = e.target.files[0]
        setBackendImage1(file)
    }

    const handelImg2 = (e) => {
        let file = e.target.files[0]
        setBackendImage2(file)
    }

    const handelImg3 = (e) => {
        let file = e.target.files[0]
        setBackendImage3(file)
    }

useEffect(()=>{
let today = new Date().toISOString().split('T')[0]
console.log(today);

setMinDate(today)
},[])

    return (
        <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center gap-[10px] flex-col overflow-auto relative '>
            <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-full 
           flex items-center justify-center text-2xl' onClick={() => navigate("/")}>
                <FaArrowLeftLong color='white' />
            </div>
            <div className='w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]'>
                <h1 className='text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-[0px] '>
                    {`In ${cardDetails.landMark.toUpperCase()} , ${cardDetails.city.toUpperCase()}`}
                </h1>
            </div>

            <div className='w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row'>
                <div className='w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white '>
                    <img src={cardDetails.image1} alt="" className='w-[100%]' />
                </div>

                <div className='w-[100%] h-[30%] flex items-center justify-center md:w-[30%] md:h-[100%] md:flex-col'>
                    <div className='w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] '>
                        <img src={cardDetails.image2} alt="" className='w-[100%]' />
                    </div>
                    <div className='w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] '>
                        <img src={cardDetails.image3} alt="" className='w-[100%]' />
                    </div>
                </div>
            </div>

            <div className='ww-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>
                {`${cardDetails.title.toUpperCase()} ${cardDetails.category.toUpperCase()} , ${cardDetails.landMark.toUpperCase()}`}
            </div>

            <div className='ww-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>
                {`${cardDetails.description}`}
            </div>

            <div className='ww-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>
                {`${cardDetails.rent}/day`}
            </div>

            <div className='w-[95%]
                h-[50px] flex items-center justify-start px-[110px]'>
                {cardDetails.host == userData._id && <button className='px-[30px] py-[10px] bg-red-500 text-white text-[18px] md:px-[100px] rounded-lg text-nowrap' onClick={() => setUpdatepopup(pre => !pre)}>
                    Edit listing   </button>
                }
                {cardDetails.host != userData._id && <button className='px-[30px] py-[10px] bg-red-500 text-white text-[18px] md:px-[100px] rounded-lg text-nowrap' onClick={() => setBookingpopup(pre => !pre)}>
                    Reserve   </button>}
            </div>

            {/* update listing */}
            {updatepopup && <div className='w-[100%] h-[100%] flex items-center justify-center bg-[#000000c6] absolute top-[0px] z-[100] backdrop-blur-sm
                ' >
                <RxCross2 className='w-[30px] h-[30px] bg-[red] cursor-pointer absolute top-[6%] left-[25px] rounded-full 
           flex items-center justify-center text-2xl' onClick={() => setUpdatepopup(false)} />

                <form className='max-w-[900px] w-[90%]  text-white p-[20px] bg-[#272727] h-[550px] flex items-center justify-start flex-col rounded-lg mt-[50px] gap-[10px] overflow-auto' onSubmit={(e) => {
                    e.preventDefault()
                    navigate("/listing2")
                }}>
]
                    <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute
               top-[5%] right-[10px] shadow-lg'>
                        update your details
                    </div>

                    <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px] bg-w'>
                        <label htmlFor="title" className='text-[20px]'>Title</label>
                        <input type="text" id='title' className='w-[90%] text-black  bg-white h-[40px] border-[2px] border-[#666666] rounded-lg text-[18px] px-[20px]' placeholder='_bnk house or best title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>


                    <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                        <label htmlFor="des" className='text-[20px]'>Description</label>
                        <textarea id="des" className='w-[90%]  bg-white  text-black  h-[80px] border-[2px] border-[#666666] rounded-lg text-[18px] px-[20px]' placeholder='Write description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                        <label htmlFor="img1" className='text-[20px]'>Image1</label>
                        <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
                            <input type="file" id='img1' className='w-[100%]  text-[15px] px-[20px]' required onChange={handelImg1} />
                        </div>
                    </div>


                    <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                        <label htmlFor="img2" className='text-[20px]'>Image2</label>
                        <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
                            <input type="file" id='img2' className='w-[100%]  text-[15px] px-[20px]' required onChange={handelImg2} />
                        </div>
                    </div>


                    <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                        <label htmlFor="img3" className='text-[20px]'>Image3</label>
                        <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
                            <input type="file" id='img3' className='w-[100%]  text-[15px] px-[20px]' required onChange={handelImg3} />
                        </div>
                    </div>

                    <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                        <label htmlFor="rent" className='text-[20px]'>Rent</label>
                        <input type="number" id='rent' className='w-[90%]  text-black  bg-white  h-[40px] border-[2px] border-[#666666] rounded-lg text-[18px] px-[20px]' placeholder='RS._____/day' required value={rent} onChange={(e) => setRent(e.target.value)} />
                    </div>

                    <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                        <label htmlFor="city" className='text-[20px]'>City</label>
                        <input type="text" id='city' className='w-[90%]  text-black bg-white  h-[40px] border-[2px] border-[#666666] rounded-lg text-[18px] px-[20px]' placeholder='city,country' required value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                        <label htmlFor="landmark" className='text-[20px]'>Land Mark</label>
                        <input type="text" id='landmark' className='w-[90%] text-black  bg-white  h-[40px] border-[2px] border-[#666666] rounded-lg text-[18px] px-[20px]' required value={landMark} onChange={(e) => setLandMark(e.target.value)} />
                    </div>

                    <div className='w-[100%] flex items-center justify-center gap-[30px] mt-[20px]' >
                        <button className='px-[10px] text-nowrap py-[10px] bg-red-500 text-white text-[15px] md:text-[18px] md:px-[100px] rounded-xl mb-[10px]' onClick={handelUpdatelisting} disabled={updating} >{updating ? "updating..." : "Update listing"} </button>
                        <button className='px-[10px] text-nowrap py-[10px] bg-red-500 text-white text-[15px] md:text-[18px] md:px-[100px] rounded-xl mb-[10px]' onClick={handeldeletelisting} disabled={deleting} >{deleting ? "deleting..." : " Delete listing"}  </button>
                    </div>
                </form>
            </div>}

            {bookingpopup && <div className='w-[100%] h-[100%] flex items-center justify-center bg-[#ffffffcd] absolute top-[0px] z-[100] backdrop-blur-sm  md:flex-row md:gap-[100px]'>
                <RxCross2 className='w-[30px] h-[30px] bg-[red] cursor-pointer absolute top-[6%] left-[25px] rounded-full 
           flex items-center justify-center text-2xl' onClick={() => setBookingpopup(false)} />



                <form className='max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f7fbfcfe] p-[20px] rounded-lg flex items-center
                 justify-center flex-col gap-[10px] border-[1px] border-[#dedddd]' onSubmit={(e)=> e.preventDefault()}>
                <h1 className='w-[100%] flex items-center justify-center py-[10px] text-[25px] border-b-[1px] border-[#a3a3a3]'> Confirm & Book</h1>
              <div className=' w-[100%] h-[70%] mt-[10px] rounded-lg p-[10px]'>
                <h3 className='text-[19px] font-semibold '>Your Trip -</h3>

                    <div className='w-[90%] flex flex-col md:flex-row items-center justify-start md:items-start md:justify-center gap-[24px] mt-[20px]'>
                        <label htmlFor="checkIn" className='text-[18px] md:text-[20px]'>CheckIn</label>
                        <input type="date" min={minDate} id='checkIn' className='border-[#555656] border-2 w-[200px] h-[40px] rounded-[10px] bg-transparent
                         px-[10px] text-[15px] md:text-[18px]' required value={checkIn} onChange={(e)=> setCheckIn(e.target.value)} />
                    </div>

                    <div className='w-[90%] flex flex-col md:flex-row items-center justify-start md:items-start md:justify-center gap-[10px] mt-[40px]'>
                        <label htmlFor="checkout" className='text-[18px] md:text-[20px]'>CheckOut</label>
                        <input type="date"  min={minDate} id='checkout' className='border-[#555656] border-2 w-[200px] h-[40px] rounded-[10px] bg-transparent
                         px-[10px] text-[15px] md:text-[18px]' required value={checkOut} onChange={(e)=> setCheckOut(e.target.value)}  />
                    </div>

                    <div className='w-[100%] flex items-center justify-center '>
                <button className='px-[80px] py-[10px] bg-red-500 text-white text-[18px] md:px-[100px] rounded-xl mb-[20px] text-nowrap mt-[30px]' onClick={()=> handelBooking(cardDetails._id)} disabled={booking} >{booking ? "booking..." : "Book Now"} </button>

                    </div>

              </div>
              
                </form>

<div className='max-w-[450px] w-[90%] h-[450px] bg-[#f7fbfcfe] p-[20px] rounded-lg flex items-center justify-center flex-col gap-[10px]
 border-[1px] border-[#e2e1e1]'>
<div className='w-[95%]  h-[30%] border-[1px] border-[#9b9b9b] rounded-lg flex justify-center items-center gap-[8px] p-[20px]  overflow-hidden'>
    <div className='w-[70px] h-[90px] flex justify-center items-center flex-shrink-0 rounded-lg md:w-[100px] md:h-[100px]'><img 
    className='w-[100%] h-[100%] rounded-lg' src={cardDetails.image1} alt="" /></div>
<div className='w-[80%] h-[100px] gap-[5px]'>
    <h1 className='w-[90%] truncate'>
{`In ${cardDetails.landMark.toUpperCase()} , ${cardDetails.city.toUpperCase()}`}
    </h1>
    <h1>{cardDetails.title.toUpperCase()} </h1>
    <h1>{cardDetails.category.toUpperCase()} </h1>
    <h1 className='flex items-center justify-start gap-[5px] '><FaStar className="text-[#eb6262]"/> {cardDetails.ratings}</h1>
</div>
</div>


<div className='w-[95%] h-[60%] border-[1px] border-[#9b9b9b] rounded-lg flex justify-start items-start p-[20px] gap-[15px] flex-col'>
<h1 className='text-[22px] font-semibold'>Booking price -</h1>
<p className='w-[100%] flex justify-between items-center px-[20px]'>
    <span className='font-semibold'>{`${cardDetails.rent} X ${nignt} nignts`} </span>
    <span>{cardDetails.rent * nignt}</span>
</p>

<p className='w-[100%] flex justify-between items-center px-[20px]'>
    <span className='font-semibold'>Tax </span>
    <span>{`${cardDetails.rent * 7/100}`}</span>
</p>

<p className='w-[100%] flex justify-between items-center px-[20px] border-b-[1px] border-gray-500 pb-[10px]'>
    <span className='font-semibold '>Airbnb Charge </span>
    <span>{cardDetails.rent * 7/100}</span>
</p>

<p className='w-[100%] flex justify-between items-center px-[20px]'>
    <span className='font-semibold'>Total price </span>
    <span>{Math.floor(total)}</span>
</p>

</div>

</div>

            </div>}

        </div>
    )
}

export default ViewCard