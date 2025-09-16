import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingData } from '../context/ListingContext';

const Listing3 = () => {
    const navigate = useNavigate()

    const {
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
        setCatego,
        handelListing,
        adding,
        setAdding
    } = useContext(listingData)

    return (
        <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center gap-[10px] flex-col overflow-auto relative '>
            <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-full 
        flex items-center justify-center text-2xl' onClick={() => navigate("/listing2")}>
                <FaArrowLeftLong color='white' />
            </div>
            <div className='w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]'>
                <h1 className='text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-[0px] '>
                    {`In ${landMark.toUpperCase()} , ${city.toUpperCase()}`}
                </h1>
            </div>

            <div className='w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row'>
                <div className='w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white '>
                    <img src={frontentImage1} alt="" className='w-[100%]' />
                </div>

                <div className='w-[100%] h-[30%] flex items-center justify-center md:w-[30%] md:h-[100%] md:flex-col'>
                    <div className='w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] '>
                        <img src={frontentImage2} alt="" className='w-[100%]' />
                    </div>
                    <div className='w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] '>
                        <img src={frontentImage3} alt="" className='w-[100%]' />
                    </div>
                </div>
            </div>

            <div className='ww-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>
                {`${title.toUpperCase()} ${category.toUpperCase()} , ${landMark.toUpperCase()}`}
            </div>

            <div className='ww-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>
                {`${description.toUpperCase()}`}
            </div>

            <div className='ww-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>
                {`${rent}/day`}
            </div>

            <div className='w-[95%] h-[50px] flex items-center justify-start px-[110px]'>
                <button className='px-[30px] text-nowrap py-[10px] bg-red-500 text-white text-[18px] md:px-[100px] rounded-lg' disabled={adding} onClick={handelListing}>
                    {adding ? "adding..." : "Add listing"}  </button>
            </div> 
        </div>
    )
}

export default Listing3