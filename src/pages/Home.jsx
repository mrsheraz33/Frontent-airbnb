import React, { useContext } from 'react'
import Nav from '../component/Nav'
import { listingData } from '../context/ListingContext'
import Card from '../component/Card'

const Home = () => {
  let { addlistingData,setAddListingData,addnewlistingData,setNewAddListingData,isBooked,host} = useContext(listingData)

  return (
    <div>
      <Nav/>
    <div className='w-[100vw] h-[77vh] flex items-center justify-center gap-[25px] flex-wrap mt-[250px]
    md:mt-[180px]'>
{addnewlistingData.map((list)=> (
  <Card key={list._id } title={list.title} landMark={list.landMark} city={list.city} image1={list.image1}
  image2={list.image2} image3={list.image3} rent={list.rent} id={list._id} ratings={list.ratings} isBooked={list.isBooked} host={list.host} />
))}
    </div>
    </div>
  )
}

export default Home