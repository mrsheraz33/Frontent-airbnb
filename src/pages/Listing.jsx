import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingData } from '../context/ListingContext';



const Listing = () => {
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
        setCatego
    } = useContext(listingData)

    const handelImg1 = (e) => {
        let file = e.target.files[0]
        setBackendImage1(file)
        let image = URL.createObjectURL(file)
        setFrontentImage1(image)
    }

    const handelImg2 = (e) => {
        let file = e.target.files[0]
        setBackendImage2(file)
        let image = URL.createObjectURL(file)
        setFrontentImage2(image)
    }

    const handelImg3 = (e) => {
        let file = e.target.files[0]
        setBackendImage3(file)
        let image = URL.createObjectURL(file)
        setFrontentImage3(image)
    }

    return (
        <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto'>
            <form className='max-w-[900px] w-[90%] h-[550px] flex items-center justify-start flex-col md:items-start mt-[50px] gap-[10px] overflow-auto' onSubmit={(e)=>{e.preventDefault()
                navigate("/listing2")
            }}>
                <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-full 
        flex items-center justify-center text-2xl' onClick={() => navigate("/")}>
                    <FaArrowLeftLong color='white' />
                </div>
                <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute
top-[5%] right-[10px] shadow-lg'>
                    SetUp Your Home
                </div>

                <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                    <label htmlFor="title" className='text-[20px]'>Title</label>
                    <input type="text" id='title' className='w-[90%] h-[40px] border-[2px] border-[#666666] rounded-lg text-[18px] px-[20px]' placeholder='_bnk house or best title' required value={title} onChange={(e)=> setTitle(e.target.value) } />
                </div>


                <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                    <label htmlFor="des" className='text-[20px]'>Description</label>
                    <textarea id="des" className='w-[90%] h-[80px] border-[2px] border-[#666666] rounded-lg text-[18px] px-[20px]' placeholder='Write description' value={description} onChange={(e)=> setDescription(e.target.value) }></textarea>
                </div>

                <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                    <label htmlFor="img1" className='text-[20px]'>Image1</label>
                    <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
                        <input type="file" id='img1' className='w-[100%]  text-[15px] px-[20px]' required onChange={handelImg1}/>
                    </div>
                </div>


                <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                    <label htmlFor="img2" className='text-[20px]'>Image2</label>
                    <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
                        <input type="file" id='img2' className='w-[100%]  text-[15px] px-[20px]' required onChange={handelImg2}/>
                    </div>
                </div>


                <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                    <label htmlFor="img3" className='text-[20px]'>Image3</label>
                    <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
                        <input type="file" id='img3' className='w-[100%]  text-[15px] px-[20px]' required onChange={handelImg3}/>
                    </div>
                </div>

                <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                    <label htmlFor="rent" className='text-[20px]'>Rent</label>
                    <input type="number" id='rent' className='w-[90%] h-[40px] border-[2px] border-[#666666] rounded-lg text-[18px] px-[20px]' placeholder='RS._____/day' required value={rent} onChange={(e)=> setRent(e.target.value) }/>
                </div>

                <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                    <label htmlFor="city" className='text-[20px]'>City</label>
                    <input type="text" id='city' className='w-[90%] h-[40px] border-[2px] border-[#666666] rounded-lg text-[18px] px-[20px]' placeholder='city,country' required value={city} onChange={(e)=> setCity(e.target.value) }/>
                </div>

                <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                    <label htmlFor="landmark" className='text-[20px]'>Land Mark</label>
                    <input type="text" id='landmark' className='w-[90%] h-[40px] border-[2px] border-[#666666] rounded-lg text-[18px] px-[20px]' required value={landMark} onChange={(e)=> setLandMark(e.target.value) }/>
                </div>

                <button className='px-[50px] py-[10px] bg-red-500 text-white text-[18px] md:px-[100px] rounded-xl mb-[10px]'>Next</button>



            </form>
        </div>
    )
}

export default Listing